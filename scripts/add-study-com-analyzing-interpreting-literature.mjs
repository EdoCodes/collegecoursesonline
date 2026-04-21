/**
 * Upsert Study.com Analyzing and Interpreting Literature (Humanities). Matches supabase migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-analyzing-interpreting-literature.mjs
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

const slug = 'study-com-analyzing-and-interpreting-literature';

const learning_outcomes = `Interpret poetry, prose, drama, and excerpts using close-reading strategies.
Identify figurative language, symbolism, imagery, tone, voice, and point of view.
Analyze character, conflict, plot structure, setting, and theme within context.
Situate readings within genre conventions and broader literary traditions.
Develop evidence-based interpretations supported by quotations and analysis.`;

const general_education_note =
	'Often fulfills humanities or literature breadth general-education requirements and is commonly taken alongside English majors, liberal arts pathways, journalism and communications minors, secondary-education English tracks, and transfer students needing introductory literature analysis — verify your articulation agreement.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Analyzing and Interpreting Literature',
			slug,
			description:
				'Study.com Analyzing & Interpreting Literature develops close-reading skills across poetry, drama, fiction, and nonfiction: figurative language, symbolism, imagery, tone, characterization, narrative structure, conflict, theme, historical and cultural context, and introductory critical approaches to texts from multiple periods and traditions. Video lessons, readings, practice, and assessments align with a college-level literature survey emphasizing interpretation and evidence-based analysis. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.',
			short_description:
				'ACE/NCCRS-recommended literature analysis course on Study.com — close reading, genres, themes, and critical interpretation. College Accelerator subscription. Verify transfer at your school.',
			course_url: 'https://study.com/academy/course/analyzing-and-interpreting-literature.html',
			image_url: '/images/courses/study-com-analyzing-and-interpreting-literature.png',
			duration: 'Self-paced',
			level: 'Introductory',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'Analyzing and Interpreting Literature',
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
