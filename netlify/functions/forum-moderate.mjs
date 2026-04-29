import { createClient } from '@supabase/supabase-js';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase env vars. URL:', !!supabaseUrl, 'Key:', !!supabaseKey);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server configuration error' }) };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Verify admin secret
  const secret = event.headers['x-admin-secret'];
  if (secret !== process.env.FORUM_ADMIN_SECRET) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  try {
    const { action, type, id, reply_body, data } = JSON.parse(event.body);
    // action: 'approve' | 'delete' | 'staff-reply' | 'ping' | list/admin topic actions
    // type: 'post' | 'reply'

    if (action === 'ping') {
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    } else if (action === 'list-pending-posts') {
      const { data: rows, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_approved', false)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ rows }) };
    } else if (action === 'list-pending-replies') {
      const { data: rows, error } = await supabase
        .from('replies')
        .select('*')
        .eq('is_approved', false)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ rows }) };
    } else if (action === 'list-approved-posts') {
      const { data: rows, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ rows }) };
    } else if (action === 'list-topics') {
      const { data: rows, error } = await supabase.from('topics').select('*').order('name', { ascending: true });
      if (error) throw error;
      return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ rows }) };
    } else if (action === 'add-topic') {
      const payload = data || {};
      const { slug, name, icon, description } = payload;
      if (!slug || !name) return { statusCode: 400, body: JSON.stringify({ error: 'slug and name required' }) };
      const { error } = await supabase.from('topics').insert({ slug, name, icon: icon || '💬', description });
      if (error) throw error;
    } else if (action === 'toggle-topic') {
      const payload = data || {};
      const { topic_id, is_active } = payload;
      if (!topic_id || typeof is_active !== 'boolean') {
        return { statusCode: 400, body: JSON.stringify({ error: 'topic_id and is_active required' }) };
      }
      const { error } = await supabase.from('topics').update({ is_active }).eq('id', topic_id);
      if (error) throw error;
    } else if (action === 'delete-topic') {
      if (!id) return { statusCode: 400, body: JSON.stringify({ error: 'id required' }) };
      const { error } = await supabase.from('topics').delete().eq('id', id);
      if (error) throw error;
    } else if (action === 'approve') {
      const table = type === 'post' ? 'posts' : 'replies';
      const { error } = await supabase.from(table).update({ is_approved: true }).eq('id', id);
      if (error) throw error;
    } else if (action === 'delete') {
      const table = type === 'post' ? 'posts' : 'replies';
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
    } else if (action === 'staff-reply') {
      const { error } = await supabase.from('replies').insert({
        post_id: id,
        author_name: 'College Courses Online Team',
        author_email: 'staff@collegecoursesonline.com',
        body: reply_body.trim(),
        is_approved: true,
        is_staff_reply: true,
      });
      if (error) throw error;
    } else {
      return { statusCode: 400, body: JSON.stringify({ error: 'Unknown action' }) };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('forum-moderate error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err?.message || 'Server error' }) };
  }
};
