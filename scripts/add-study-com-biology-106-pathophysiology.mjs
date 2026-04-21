/**
 * Upsert Study.com Biology 106: Pathophysiology (Science). Matches supabase migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-biology-106-pathophysiology.mjs
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

const slug = 'study-com-biology-106-pathophysiology';

const learning_outcomes = `Explain how cellular injury, inflammation, and healing relate to disease presentation.
Apply concepts of altered immunity, genetics, and neoplasia to clinical examples.
Describe pathophysiologic changes in major organ systems and common disorders.
Interpret relationships between normal physiology and disrupted homeostasis in illness.
Use course frameworks to reason through signs, symptoms, and disease progression.`;

const general_education_note =
	'Commonly taken by nursing, ASN/BSN pathways, allied health, pre-health, medical laboratory science, healthcare administration, and biology-focused majors needing pathophysiology or science elective credit — degree plans vary; confirm prerequisite and gen-ed rules at your college.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Biology 106: Pathophysiology',
			slug,
			description:
				'Study.com Biology 106: Pathophysiology explores how disease disrupts normal physiology across body systems — cellular injury and adaptation, inflammation and immunity, fluid and electrolyte balance, hemodynamics, genetic and neoplastic processes, and common disorders of cardiovascular, respiratory, renal, gastrointestinal, endocrine, nervous, musculoskeletal, and reproductive systems. Video lessons, practice, and assessments align with an introductory college pathophysiology survey. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.',
			short_description:
				'ACE/NCCRS-recommended Pathophysiology on Study.com — disease mechanisms and body systems. College Accelerator subscription. Verify transfer at your school.',
			course_url: 'https://study.com/academy/course/biology-106-pathophysiology.html',
			image_url: '/images/courses/study-com-biology-106-pathophysiology.png',
			duration: 'Self-paced',
			level: 'Introductory',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'Pathophysiology',
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
