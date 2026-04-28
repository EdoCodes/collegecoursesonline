import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.PUBLIC_SUPABASE_ANON_KEY
);

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

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

    if (error) throw error;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('forum-reply error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};
