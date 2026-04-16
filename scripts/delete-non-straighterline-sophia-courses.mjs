/**
 * Deletes every course whose college is not StraighterLine or Sophia Learning (same as migration).
 * Usage: SUPABASE_SERVICE_KEY=... node scripts/delete-non-straighterline-sophia-courses.mjs
 */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	'https://dlxyjoaxyektgqraayfl.supabase.co',
	process.env.SUPABASE_SERVICE_KEY || '',
);

if (!process.env.SUPABASE_SERVICE_KEY) {
	console.error('Missing SUPABASE_SERVICE_KEY');
	process.exit(1);
}

const { data: colleges } = await supabase.from('colleges').select('id, slug');
const allowed = new Set(
	(colleges || []).filter((c) => c.slug === 'straighterline' || c.slug === 'sophia-learning').map((c) => c.id),
);

const { data: courses } = await supabase.from('courses').select('id, college_id');
const toDelete = (courses || []).filter((c) => c.college_id && !allowed.has(c.college_id)).map((c) => c.id);

if (toDelete.length === 0) {
	console.log('Nothing to delete.');
	process.exit(0);
}

const { error } = await supabase.from('courses').delete().in('id', toDelete);

if (error) {
	console.error(error.message);
	process.exit(1);
}

console.log('Deleted', toDelete.length, 'course(s).');
