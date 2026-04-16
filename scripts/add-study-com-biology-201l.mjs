/**
 * Upsert Study.com college + Biology 201L A&P I with Lab (matches supabase migration).
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-biology-201l.mjs
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

const { error: colErr } = await supabase.from('colleges').upsert(
	{
		name: 'Study.com',
		slug: 'study-com',
		description:
			'Study.com offers 220+ online college courses with ACE and NCCRS credit recommendations. College Accelerator plans include video lessons, quizzes, and proctored exams for transferable credit.',
		website_url: 'https://www.study.com',
		accreditation: 'ACE- and NCCRS-recommended courses',
		accreditation_level: 'National',
		country: 'USA',
		featured: false,
		popularity_score: 90,
		ease_of_access_score: 92,
	},
	{ onConflict: 'slug' },
);

if (colErr) {
	console.error('College upsert:', colErr.message);
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

const slug = 'study-com-biology-201l-anatomy-physiology-i-with-lab';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Biology 201L: Anatomy & Physiology I with Lab',
			slug,
			description:
				"Study.com Biology 201L covers human anatomy and physiology with an integrated lab sequence: body organization, tissues, skeletal and muscular systems, and nervous system basics. Video lessons, assessments, and lab-style activities align with a first-semester A&P I with lab. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.",
			short_description:
				'ACE/NCCRS-recommended A&P I with lab on Study.com — self-paced video courses and proctored exams. College Accelerator subscription. Verify transfer at your school.',
			course_url:
				'https://study.com/academy/course/biology-201l-anatomy-physiology-i-with-lab.html',
			image_url:
				'https://images.pexels.com/photos/3825539/pexels-photo-3825539.jpeg?auto=compress&cs=tinysrgb&w=800',
			duration: 'Self-paced',
			level: 'Introductory',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 4 semester credits (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'Anatomy & Physiology',
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
