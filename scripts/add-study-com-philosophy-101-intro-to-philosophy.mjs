/**
 * Upsert Study.com Philosophy 101: Intro to Philosophy (Humanities). Matches supabase migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-philosophy-101-intro-to-philosophy.mjs
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
	.eq('slug', 'humanities')
	.single();

if (cErr || gErr || !college || !cat) {
	console.error('Lookup failed:', cErr?.message || gErr?.message);
	process.exit(1);
}

const slug = 'study-com-philosophy-101-intro-to-philosophy';

const learning_outcomes = `Reconstruct and evaluate arguments using clear logical structure and standard philosophical vocabulary.
Compare major ethical theories and apply them to concrete moral scenarios at an introductory level.
Explain core problems in epistemology and metaphysics as they appear in assigned readings and lectures.
Engage primary texts and secondary commentary with accurate paraphrase and critical analysis.
Write short philosophy responses that state a thesis, support it with reasons, and address objections.`;

const general_education_note =
	'Often satisfies humanities, arts, or "ways of knowing" general-education requirements; pre-law, political science, and liberal arts students frequently take it early — confirm your catalog for philosophy vs. religious studies credit.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Philosophy 101: Intro to Philosophy',
			slug,
			description:
				'Study.com Intro to Philosophy surveys major questions and methods in Western and comparative traditions as presented in the course: logic and argument reconstruction; metaphysics and philosophy of mind (identity, free will, personal identity); epistemology (knowledge, skepticism, justification); ethics and social philosophy (theories of value, rights, distributive justice); political philosophy at an introductory level; and selected classic texts and thinkers (e.g., Socrates, Plato, Aristotle, and modern authors as covered). Video lessons, practice, and assessments align with a first college-level philosophy survey. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.',
			short_description:
				'ACE/NCCRS-recommended Intro to Philosophy on Study.com — ethics, knowledge, being, and classic texts. College Accelerator subscription. Verify transfer at your school.',
			course_url: 'https://study.com/academy/course/philosophy-101-intro-to-philosophy.html',
			image_url: '/images/courses/study-com-philosophy-101-intro-to-philosophy.jpg',
			duration: 'Self-paced',
			level: 'Introductory',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'Philosophy',
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
