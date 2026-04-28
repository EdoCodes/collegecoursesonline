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

  try {
    const { post_id, author_name, author_email, body } = JSON.parse(event.body);

    if (!post_id || !author_name || !author_email || !body) {
      return { statusCode: 400, body: JSON.stringify({ error: 'All fields are required' }) };
    }

    const { error } = await supabase.from('replies').insert({
      post_id,
      author_name: author_name.trim(),
      author_email: author_email.trim().toLowerCase(),
      body: body.trim(),
      is_approved: false,
      is_staff_reply: false,
    });

    if (error) {
      console.error('Supabase insert error:', JSON.stringify(error));
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('forum-reply error:', err.message, err.stack);
    return { statusCode: 500, body: JSON.stringify({ error: err.message || 'Server error' }) };
  }
};
