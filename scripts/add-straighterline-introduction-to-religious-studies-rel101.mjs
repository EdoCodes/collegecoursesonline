/**
 * Upsert StraighterLine Introduction to Religious Studies REL101 (Humanities). Matches migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-straighterline-introduction-to-religious-studies-rel101.mjs
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

const { data: college, error: cErr } = await supabase.from('colleges').select('id').eq('slug', 'straighterline').single();
const { data: cat, error: gErr } = await supabase
	.from('course_categories')
	.select('id')
	.eq('slug', 'humanities')
	.single();

if (cErr || gErr || !college || !cat) {
	console.error('Lookup failed:', cErr?.message || gErr?.message);
	process.exit(1);
}

const slug = 'straighterline-introduction-to-religious-studies';

const learning_outcomes = `Define religion in academic terms and contrast major world traditions using appropriate comparative vocabulary.
Interpret central beliefs, practices, and historical developments for the traditions covered in the course.
Analyze rituals, sacred sites, and symbols as expressions of religious identity and community life.
Evaluate scholarly approaches to studying religion and apply them to examples of diversity and change.
Discuss religion’s roles in social, political, and cultural contexts with descriptive accuracy and analytical care.`;

const general_education_note =
	'Often satisfies humanities, global studies, or “world religions” breadth requirements; seminary-bound or theology majors should confirm whether a survey course meets denominational prerequisites.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Introduction to Religious Studies (REL101)',
			slug,
			description:
				"StraighterLine Introduction to Religious Studies (REL101) is ACE Credit–recommended (course code OOSL-0066) for 3 semester credits. Using Molloy, Experiencing the World’s Religions (8th ed., McGraw-Hill, 2021), you will survey major traditions—including indigenous themes, Hinduism, Buddhism, Jainism and Sikhism, Daoism and Confucianism, Shinto, Judaism, Christianity, and Islam—alongside foundational concepts in the academic study of religion: definitions of religion, comparative method and vocabulary, creation and cosmic-order themes, salvation and ethical orientations, ritual, sacred space and symbol, and social and political influence across cultures and history. Ten checkpoints, capstones, and a benchmark build understanding from descriptive overview toward critical comparison; passing typically requires 70% or higher. No prerequisites. Membership required; transcript delivery included. Taught by Michelle Mueller. Confirm transfer with your registrar.",
			short_description:
				'ACE-recommended Religious Studies — 3 credits, world traditions & academic methods. $79/course + membership (StraighterLine). Humanities gen-ed; verify transfer.',
			course_url: 'https://www.straighterline.com/online-college-courses/introduction-to-religious-studies/',
			image_url: '/images/courses/straighterline-introduction-to-religious-studies.jpg',
			duration: 'Self-paced (~28 days avg)',
			level: 'Introductory',
			price: '$79',
			price_numeric: 79,
			certificate_available: true,
			credits: '3 credits (ACE-recommended)',
			featured: false,
			subcategory: 'Religious Studies',
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
