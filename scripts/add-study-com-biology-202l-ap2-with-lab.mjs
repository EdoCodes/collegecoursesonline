/**
 * Upsert Study.com Biology 202L A&P II with Lab (Science). Matches supabase migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-biology-202l-ap2-with-lab.mjs
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

const slug = 'study-com-biology-202l-anatomy-physiology-ii-with-lab';

const learning_outcomes = `Relate structure to function across cardiovascular, lymphatic/immune, and respiratory systems.
Explain digestion, absorption, metabolism, and urinary regulation of fluids and wastes.
Interpret endocrine signaling and reproductive anatomy at an introductory survey level.
Complete lab-aligned activities reinforcing cadaver/book-style competencies where applicable.
Prepare for assessments that integrate systems thinking from A&P I through A&P II.`;

const general_education_note =
	'Typically taken after A&P I; required or strongly recommended for nursing (RN/BSN), allied health, OT/PT pathways, exercise science, and many pre-health plans — verify whether your program accepts online lab components and matches credit hours.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Biology 202L: Anatomy & Physiology II with Lab',
			slug,
			description:
				'Study.com Biology 202L covers human anatomy and physiology with an integrated lab sequence focused on second-semester systems: blood and cardiovascular physiology, lymphatic and immune defenses, respiratory mechanics and gas exchange, digestive anatomy and metabolism, urinary system and fluid/electrolyte balance, endocrine integration, and reproductive anatomy and physiology — building on A&P I foundations. Video lessons, assessments, and lab-style activities align with a second-semester A&P II with lab. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.',
			short_description:
				'ACE/NCCRS-recommended A&P II with lab on Study.com — integrated lecture and lab-style activities. College Accelerator subscription. Verify transfer at your school.',
			course_url: 'https://study.com/academy/course/biology-202l-anatomy-physiology-ii-with-lab.html',
			image_url: '/images/courses/study-com-biology-202l-anatomy-physiology-ii-with-lab.png',
			duration: 'Self-paced',
			level: 'Introductory',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 4 semester credits (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'Anatomy & Physiology',
			learning_outcomes,
			general_education_note,
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
