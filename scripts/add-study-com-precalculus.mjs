/**
 * Upsert Study.com Precalculus (Mathematics). Matches supabase migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-precalculus.mjs
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
	.eq('slug', 'mathematics')
	.single();

if (cErr || gErr || !college || !cat) {
	console.error('Lookup failed:', cErr?.message || gErr?.message);
	process.exit(1);
}

const slug = 'study-com-precalculus';

const learning_outcomes = `Manipulation and graphing of algebraic, exponential, logarithmic, and trigonometric functions.
Solve trigonometric equations and apply identities and the unit circle in standard precalculus contexts.
Represent vectors and selected polar/parametric relationships at an introductory level.
Use sequences and series reasoning appropriate to placement into calculus.
Model word problems and interpret solutions using precalculus tools common on assessments.`;

const general_education_note =
	'Often satisfies prerequisites for Calculus I and engineering/STEM pathways; some schools embed precalculus topics across two courses — confirm your math placement rules.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Precalculus',
			slug,
			description:
				'Study.com Precalculus prepares you for calculus and STEM quantitative work: advanced functions (polynomial, rational, exponential, logarithmic); trigonometric functions, identities, equations, and the unit circle; polar coordinates and introductory parametric reasoning; vectors in the plane; sequences and series foundations; inequalities and analytic geometry refreshers; transformations and graphs; and algebraic manipulation at the rigor expected before calculus. Video lessons, practice, and assessments align with a college-level precalculus course. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm placement and transfer with your receiving institution.',
			short_description:
				'ACE/NCCRS-recommended Precalculus on Study.com — trig, exponentials/logs, vectors, graphs. College Accelerator subscription. Often follows algebra; verify transfer.',
			course_url: 'https://study.com/academy/course/precalculus-course.html',
			image_url: '/images/courses/study-com-precalculus.jpg',
			duration: 'Self-paced',
			level: 'Introductory',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'Precalculus',
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
