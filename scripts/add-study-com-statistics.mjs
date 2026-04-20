/**
 * Upsert Study.com Statistics (matches supabase migration).
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-statistics.mjs
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
	.eq('slug', 'mathematics')
	.single();

if (cErr || gErr || !college || !cat) {
	console.error('Lookup failed:', cErr?.message || gErr?.message);
	process.exit(1);
}

const slug = 'study-com-statistics';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Statistics',
			slug,
			description:
				'Study.com Statistics covers descriptive and inferential methods: data collection, probability, distributions, hypothesis testing, confidence intervals, correlation, and regression. Video lessons, practice, and assessments align with a first college-level statistics course. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.',
			short_description:
				'ACE/NCCRS-recommended statistics on Study.com — self-paced lessons and proctored exams. College Accelerator subscription. Verify transfer at your school.',
			course_url: 'https://study.com/academy/course/statistics-course.html',
			image_url: '/images/courses/study-com-statistics.png',
			duration: 'Self-paced',
			level: 'Introductory',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'Statistics',
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
