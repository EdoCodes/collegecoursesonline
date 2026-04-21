/**
 * Upsert Study.com US History I (Humanities). Matches supabase migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-us-history-i.mjs
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

const slug = 'study-com-us-history-i';

const learning_outcomes = `Explain European contact, colonial societies, and the road to independence.
Analyze the Constitution, early republic politics, and territorial expansion.
Interpret sectionalism, Civil War, and Reconstruction causes and consequences.
Describe industrialization, labor, immigration, and reform movements in context.
Trace political, economic, and cultural shifts from the Gilded Age into the Progressive era.`;

const general_education_note =
	'Almost always satisfies U.S. history or social-science general-education requirements and is standard for history minors, political science, education licensure pathways, liberal arts transfer plans, and many business or social-science majors — compare your transfer matrix and catalog year.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'US History I',
			slug,
			description:
				'Study.com US History I surveys major themes from early North American societies and European colonization through the American Revolution, Constitution and early republic, territorial expansion, sectional conflict, Civil War and Reconstruction, industrialization and the Gilded Age, and into the Progressive era and United States emergence on the world stage — political, economic, social, and cultural developments that shaped the nation. Video lessons, readings, practice, and assessments align with a first-semester college U.S. history survey. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.',
			short_description:
				'ACE/NCCRS-recommended US History I on Study.com — colonial era through early 20th century themes. College Accelerator subscription. Verify transfer at your school.',
			course_url: 'https://study.com/academy/course/us-history-i.html',
			image_url: '/images/courses/study-com-us-history-i.png',
			duration: 'Self-paced',
			level: 'Introductory',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'US History I',
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
