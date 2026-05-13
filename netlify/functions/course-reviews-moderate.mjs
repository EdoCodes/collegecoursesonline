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

  const secret = event.headers['x-admin-secret'];
  if (secret !== process.env.FORUM_ADMIN_SECRET) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  try {
    const { action, id } = JSON.parse(event.body || '{}');

    if (action === 'ping') {
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }

    if (action === 'list-pending-course-reviews') {
      const { data: rows, error } = await supabase
        .from('course_reviews')
        .select('id, rating, review_title, review_text, user_name, user_email, verified_enrollment, created_at, course_id, courses(slug, title)')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(100);
      if (error) throw error;
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rows: rows || [] }),
      };
    }

    if (action === 'list-pending-program-reviews') {
      const { data: rows, error } = await supabase
        .from('certificate_program_reviews')
        .select('id, rating, review_title, review_text, user_name, user_email, program_slug, program_title, verified_enrollment, created_at')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(100);
      if (error) throw error;
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rows: rows || [] }),
      };
    }

    if (action === 'approve-course-review' || action === 'reject-course-review') {
      if (!id) return { statusCode: 400, body: JSON.stringify({ error: 'id required' }) };
      const status = action === 'approve-course-review' ? 'approved' : 'rejected';
      const { error } = await supabase
        .from('course_reviews')
        .update({ status, moderated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    } else if (action === 'delete-course-review') {
      if (!id) return { statusCode: 400, body: JSON.stringify({ error: 'id required' }) };
      const { error } = await supabase.from('course_reviews').delete().eq('id', id);
      if (error) throw error;
    } else if (action === 'approve-program-review' || action === 'reject-program-review') {
      if (!id) return { statusCode: 400, body: JSON.stringify({ error: 'id required' }) };
      const status = action === 'approve-program-review' ? 'approved' : 'rejected';
      const { error } = await supabase
        .from('certificate_program_reviews')
        .update({ status, moderated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    } else if (action === 'delete-program-review') {
      if (!id) return { statusCode: 400, body: JSON.stringify({ error: 'id required' }) };
      const { error } = await supabase.from('certificate_program_reviews').delete().eq('id', id);
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
    console.error('course-reviews-moderate error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err?.message || 'Server error' }) };
  }
};
