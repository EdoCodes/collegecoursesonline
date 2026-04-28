import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.PUBLIC_SUPABASE_ANON_KEY
);

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  // Verify admin secret
  const secret = event.headers['x-admin-secret'];
  if (secret !== process.env.FORUM_ADMIN_SECRET) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  try {
    const { action, type, id, reply_body } = JSON.parse(event.body);
    // action: 'approve' | 'delete' | 'staff-reply' | 'ping'
    // type: 'post' | 'reply'

    if (action === 'ping') {
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
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
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};
