/**
 * Upsert Study.com American Literature (Humanities). Matches supabase migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-american-literature.mjs
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

const slug = 'study-com-american-literature';

const learning_outcomes = `Trace key periods, authors, and movements in U.S. literary history.
Explore major works in fiction, poetry, drama, and nonfiction with close reading.
Connect texts to cultural, social, and historical contexts in American life.
Support interpretive claims with evidence and clear academic writing.
Compare themes, styles, and perspectives across authors and eras.`;

const general_education_note =
	'Often fulfills humanities or literature breadth requirements and is widely taken by English majors, liberal arts transfer paths, secondary-education English tracks, journalism and communications minors, and students satisfying arts & humanities gen-ed — confirm each school’s catalog and transfer rules.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'American Literature',
			slug,
			description:
				'Study.com American Literature surveys major U.S. authors, movements, and themes from the colonial period through the modern era: early American writing, Romanticism, Transcendentalism, Realism, Naturalism, Modernism, Harlem Renaissance, and contemporary voices. You will read and interpret fiction, poetry, drama, and essays; place works in historical and cultural context; and build skills in close reading, analysis, and written argument. Video lessons, readings, practice, and assessments fit a college-level American literature survey. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.',
			short_description:
				'ACE/NCCRS-recommended American Literature on Study.com — U.S. authors, periods, and critical reading. College Accelerator subscription. Verify transfer at your school.',
			course_url: 'https://study.com/academy/course/american-literature-course.html',
			image_url: '/images/courses/study-com-american-literature.png',
			duration: 'Self-paced',
			level: 'Introductory',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'American Literature',
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
