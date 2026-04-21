/**
 * Upsert Study.com Introduction to Biology (Science). Matches supabase migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-introduction-to-biology.mjs
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

const slug = 'study-com-introduction-to-biology';

const learning_outcomes = `Explain cell structure, membrane transport, and how cells obtain and use energy.
Describe DNA, gene expression, inheritance patterns, and sources of variation.
Summarize evolutionary mechanisms and evidence supporting common ancestry.
Outline major groups of organisms and ecological interactions at multiple scales.
Apply biological vocabulary and reasoning to introductory lab-style scenarios.`;

const general_education_note =
	'Commonly satisfies natural-science or life-science general-education requirements and is standard for nursing prerequisites, allied health, pre-professional tracks, environmental studies, kinesiology, and STEM majors needing biology credit — lab requirements vary by program; confirm articulation.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Introduction to Biology',
			slug,
			description:
				'Study.com Introduction to Biology surveys core life-science foundations: chemistry of life, cells and organelles, metabolism and energy (photosynthesis and cellular respiration), genetics and molecular biology (DNA, RNA, inheritance), evolution and natural selection, taxonomy and diversity of life, ecology (populations, communities, ecosystems), and introductory human body systems themes as appropriate. Video lessons, practice, and assessments align with a college-level introductory biology survey suitable for majors and non-majors pathways. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.',
			short_description:
				'ACE/NCCRS-recommended Introduction to Biology on Study.com — cells, genetics, evolution, ecology, and more. College Accelerator subscription. Verify transfer at your school.',
			course_url: 'https://study.com/academy/course/introduction-to-biology.html',
			image_url: '/images/courses/study-com-introduction-to-biology.png',
			duration: 'Self-paced',
			level: 'Introductory',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'Introduction to Biology',
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
