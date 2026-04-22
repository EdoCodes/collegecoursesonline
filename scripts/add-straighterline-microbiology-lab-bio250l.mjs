/**
 * Upsert StraighterLine Microbiology Lab BIO250L (Science). Matches migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-straighterline-microbiology-lab-bio250l.mjs
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
const { data: cat, error: gErr } = await supabase.from('course_categories').select('id').eq('slug', 'science').single();

if (cErr || gErr || !college || !cat) {
	console.error('Lookup failed:', cErr?.message || gErr?.message);
	process.exit(1);
}

const slug = 'straighterline-microbiology-lab';

const learning_outcomes = `Describe major groups of microorganisms and explain how samples can be enumerated or compared quantitatively.
Perform safe culturing, isolation, and basic identification workflows appropriate to home-lab exercises.
Interpret selective and differential media results and relate them to microbial metabolism and ecology.
Apply aseptic technique, staining, and morphology observations to distinguish common bacterial patterns.
Communicate experimental design, controls, and results using accurate microbiology vocabulary.`;

const general_education_note =
	'Commonly bundled with microbiology lecture for nursing and allied-health prerequisites; programs differ on accepting online/at-home labs—confirm with your school before purchasing the kit.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Microbiology Lab (BIO250L)',
			slug,
			description:
				"StraighterLine Microbiology Lab (BIO250L) is ACE Credit–recommended (course code OOSL-0086) for 1 semester credit as a standalone lab paired with StraighterLine’s lecture Microbiology (BIO250)—concurrent enrollment strongly encouraged. Delivered through Science Interactive (formerly eScience Labs), you complete at-home experiments using kit SI-11070-MB-01 (sold separately through Science Interactive; typically about $265 plus shipping—confirm current pricing after enrollment). Modules cover laboratory safety and virtual microscopy orientation, microbiology preparation and incubation practices, quantitative reasoning about microbial populations, culture and selective media concepts, microbial growth control, fermented-food themes, biochemical identification approaches, staining and morphology of bacteria, selective and differential media interpretation, environmental/fomite transmission reasoning, and food-safety considerations. Four checkpoints and nine capstone-style lab activities plus recording and analysis assignments; passing typically requires 70% or higher. Suggested preparation: introductory biology lecture and lab; membership required alongside course tuition. Taught by Jenilyn Mulkey (MS, MLS). Confirm transfer with your registrar.",
			short_description:
				'ACE-recommended Microbiology Lab — 1 credit, at-home kit (sold separately ~$265+shipping). $69 course + membership (StraighterLine). Pair with BIO250 lecture; verify nursing/lab acceptance.',
			course_url: 'https://www.straighterline.com/online-college-courses/microbiology-lab/',
			image_url: '/images/courses/straighterline-microbiology-lab.jpg',
			duration: 'Self-paced (~30 days avg)',
			level: 'Intermediate',
			price: '$69',
			price_numeric: 69,
			certificate_available: true,
			credits: '1 credit (ACE-recommended)',
			featured: false,
			subcategory: 'Microbiology Lab',
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
