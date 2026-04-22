/**
 * Upsert StraighterLine Spanish I SPAN101 (Humanities). Matches migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-straighterline-spanish-i-span101.mjs
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

const slug = 'straighterline-spanish-i';

const learning_outcomes = `Recognize and produce foundational Spanish vocabulary and structures for introductions, routines, preferences, and daily interactions.
Apply present-tense patterns with attention to noun–adjective agreement and basic subject–verb alignment.
Demonstrate novice listening and reading comprehension using course-supported authentic-style tasks.
Compose short paragraphs and guided dialogues appropriate to assigned scenarios and cultural prompts.
Discuss cross-cultural themes introduced through checkpoint contexts with accurate, respectful terminology.`;

const general_education_note =
	'Often fulfills first-semester Spanish or foreign-language breadth; placement exams and sequence rules (Spanish II prerequisites) vary — confirm equivalency at your receiving school.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Spanish I (SPAN101)',
			slug,
			description:
				"StraighterLine Spanish I (SPAN101) is ACE Credit–recommended (course code OOSL-0068) for 3 semester credits. Through Rosetta Stone–integrated activities aligned to Units 1–4 (language basics through shopping themes as presented), you will develop novice-level listening, speaking, reading, and writing in Spanish—grammar awareness for nouns and articles; present-tense verbs and agreement; vocabulary for introductions, daily life, school and work contexts, shopping, colors, numbers, family, clothing, food, body, household, time, preferences, seasons, routines, and simple interpersonal scenarios. Checkpoint themes frame cultural contexts across Spanish-speaking regions. Policies discourage inappropriate use of machine translation outside instructor guidance; confirm system requirements for Rosetta Stone (Chromebooks before 2019 unsupported). Five checkpoints, six capstones, and an open-book benchmark; passing typically requires 70% or higher. No prerequisites. Membership required plus course fee; transcript delivery included. Confirm transfer with your registrar.",
			short_description:
				'ACE-recommended Spanish I — 3 credits, novice Spanish with Rosetta Stone pathways. $249/course + membership (StraighterLine). World-language gen-ed; verify transfer.',
			course_url: 'https://www.straighterline.com/online-college-courses/spanish-i/',
			image_url: '/images/courses/straighterline-spanish-i.jpg',
			duration: 'Self-paced (~30 days avg)',
			level: 'Introductory',
			price: '$249',
			price_numeric: 249,
			certificate_available: true,
			credits: '3 credits (ACE-recommended)',
			featured: false,
			subcategory: 'Spanish',
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
