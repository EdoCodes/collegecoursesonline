/**
 * One-off: delete course row for public-health-fundamentals (same effect as migration).
 * Usage: SUPABASE_SERVICE_KEY=... node scripts/delete-course-public-health-fundamentals.mjs
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

const { data, error } = await supabase
	.from('courses')
	.delete()
	.eq('slug', 'public-health-fundamentals')
	.select('id, slug, title');

if (error) {
	console.error(error.message);
	process.exit(1);
}
if (!data?.length) {
	console.log('No row found for slug public-health-fundamentals (already removed?)');
} else {
	console.log('Deleted:', data);
}
