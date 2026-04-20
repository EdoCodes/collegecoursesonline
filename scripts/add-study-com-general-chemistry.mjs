/**
 * Upsert Study.com General Chemistry (Natural Sciences). Matches supabase migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-general-chemistry.mjs
 */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	process.env.SUPABASE_URL || 'https://dlxyjoaxyektgqraayfl.supabase.co',
	process.env.SUPABASE_SERVICE_KEY || '',
);

if (!process.env.SUPABASE_SERVICE_KEY) {
	console.error('Missing SUPABASE_SERVICE_KEY');
	process.exit(1);
}

const { data: college, error: cErr } = await supabase.from('colleges').select('id').eq('slug', 'study-com').single();
const { data: cat, error: gErr } = await supabase
	.from('course_categories')
	.select('id')
	.eq('slug', 'science')
	.single();

if (cErr || gErr || !college || !cat) {
	console.error('Lookup failed:', cErr?.message || gErr?.message);
	process.exit(1);
}

const slug = 'study-com-general-chemistry';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'General Chemistry',
			slug,
			description:
				'Study.com General Chemistry surveys atomic structure and bonding, stoichiometry, gases, liquids and solids, solutions, thermodynamics, equilibrium, acids and bases, electrochemistry, and introductory organic highlights. Laboratory-style concepts complement video lessons and assessments for a college-level Gen Chem survey. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.',
			short_description:
				'ACE/NCCRS-recommended General Chemistry on Study.com — self-paced lessons and proctored exams. College Accelerator subscription. Verify transfer at your school.',
			course_url: 'https://study.com/academy/course/general-chemistry-course.html',
			image_url: '/images/courses/study-com-general-chemistry.png',
			duration: 'Self-paced',
			level: 'Introductory',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 4 semester credits (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'General Chemistry',
		},
		{ onConflict: 'slug' },
	)
	.select('id, title')
	.single();

if (error) {
	console.error(error.message);
	process.exit(1);
}

console.log('✅ Upserted:', data.title);
console.log('Course page: /courses/' + slug);
