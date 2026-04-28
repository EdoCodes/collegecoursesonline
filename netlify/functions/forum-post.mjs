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
    const { topic_slug, author_name, author_email, title, body } = JSON.parse(event.body);

    if (!topic_slug || !author_name || !author_email || !title || !body) {
      return { statusCode: 400, body: JSON.stringify({ error: 'All fields are required' }) };
    }

    if (title.length > 200) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Title too long' }) };
    }

    const { error } = await supabase.from('posts').insert({
      topic_slug,
      author_name: author_name.trim(),
      author_email: author_email.trim().toLowerCase(),
      title: title.trim(),
      body: body.trim(),
      is_approved: false,
    });

    if (error) throw error;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('forum-post error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};
