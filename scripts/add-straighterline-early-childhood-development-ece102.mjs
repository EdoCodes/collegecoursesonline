/**
 * Upsert StraighterLine Early Childhood Development ECE102 (Education). Matches migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-straighterline-early-childhood-development-ece102.mjs
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
const { data: cat, error: gErr } = await supabase.from('course_categories').select('id').eq('slug', 'education').single();

if (cErr || gErr || !college || !cat) {
	console.error('Lookup failed:', cErr?.message || gErr?.message);
	process.exit(1);
}

const slug = 'straighterline-early-childhood-development';

const learning_outcomes = `Explain patterns of cognitive, language, and socioemotional growth using major developmental frameworks from the course.
Relate learning science concepts—including attention, memory, and motivation—to age-appropriate instructional choices.
Compare behavioral, social constructivist, and information-processing perspectives on how young children learn.
Evaluate developmentally appropriate strategies for literacy, mathematics, and broader elementary curriculum themes.
Apply course ideas to scenarios involving families, peers, classroom management, and educational technology.`;

const general_education_note =
	'Common for elementary education, early childhood education, and child-development minors; licensure programs may require additional field experiences — confirm how this credit maps to your teacher-prep checklist.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Early Childhood Development (ECE102)',
			slug,
			description:
				"StraighterLine Early Childhood Development (ECE102) is ACE Credit–recommended (course code OOSL-0117) for 3 semester credits. Framed through educational psychology, you will trace biological, cognitive, and socioemotional changes from conception through early childhood; compare theories of development and language acquisition; examine families, peers, and schools as contexts for learning; connect classical and operant conditioning and behavior-analytic ideas to classroom practice; study attention, memory, and information-processing perspectives; explore social constructivist teaching and collaborative learning; analyze literacy, mathematics, and content-area instruction developmentally; contrast teacher-centered and learner-centered models and responsible uses of instructional technology; and discuss motivation and sociocultural supports for achievement. Uses Santrock, Educational Psychology (7th ed., McGraw-Hill, 2021), included digitally. Nine checkpoints, benchmarks, capstones, and an open-book cumulative benchmark; passing typically requires 70% or higher. No prerequisites. Membership required; transcript delivery included. Confirm transfer with your registrar.",
			short_description:
				'ACE-recommended Early Childhood Development — 3 credits, development theories & PreK–elem teaching implications. $79/course + membership (StraighterLine). Education majors; verify transfer.',
			course_url: 'https://www.straighterline.com/online-college-courses/early-childhood-development/',
			image_url: '/images/courses/straighterline-early-childhood-development.png',
			duration: 'Self-paced (~25 days avg)',
			level: 'Introductory',
			price: '$79',
			price_numeric: 79,
			certificate_available: true,
			credits: '3 credits (ACE-recommended)',
			featured: false,
			subcategory: 'Early Childhood Education',
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
