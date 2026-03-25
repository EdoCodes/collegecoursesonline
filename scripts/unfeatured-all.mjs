import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  'https://dlxyjoaxyektgqraayfl.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || ''
);
const { error } = await supabase.from('courses').update({ featured: false }).neq('id', '00000000-0000-0000-0000-000000000000');
if (error) { console.error('Error:', error.message); process.exit(1); }
console.log('✅ All courses set to featured=false');
