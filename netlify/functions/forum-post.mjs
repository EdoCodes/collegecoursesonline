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
    const { topic_slug, author_name, author_email, title, body } = JSON.parse(event.body);

    if (!topic_slug || !author_name || !author_email || !title) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Required fields missing' }) };
    }

    if (title.length > 200) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Title too long' }) };
    }

    const { error } = await supabase.from('posts').insert({
      topic_slug,
      author_name: author_name.trim(),
      author_email: author_email.trim().toLowerCase(),
      title: title.trim(),
      body: (body || '').trim() || '(no details provided)',
      is_approved: false,
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
    console.error('forum-post error:', err.message, err.stack);
    return { statusCode: 500, body: JSON.stringify({ error: err.message || 'Server error' }) };
  }
};
