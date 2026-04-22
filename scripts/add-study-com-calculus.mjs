/**
 * Upsert Study.com Calculus (Mathematics). Matches supabase migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-calculus.mjs
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

const slug = 'study-com-calculus';

const learning_outcomes = `Compute limits and derivatives using algebraic tools and interpret results graphically and in context.
Solve optimization and related-rates problems using calculus reasoning appropriate to the course level.
Evaluate definite and indefinite integrals and apply the Fundamental Theorem of Calculus.
Use integration to compute areas and other quantities emphasized in introductory calculus.
Communicate solutions with correct notation and justify steps typical of first calculus assessments.`;

const general_education_note =
	'Often labeled Calculus I on transcripts; STEM majors usually continue with multivariable calculus — confirm whether your school requires a specific calculus sequence or placement exam.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Calculus',
			slug,
			description:
				'Study.com Calculus introduces differential and integral calculus at a first-course level: limits and continuity; differentiation rules and implicit differentiation; applications including related rates, optimization, curve sketching, and linear approximation; definition of the integral, antiderivatives, and the Fundamental Theorem of Calculus; techniques of integration as covered in the course; applications of definite integrals such as area, volumes of revolution, and average value; selected differential equations or modeling previews where applicable. Video lessons, practice, and assessments align with introductory college calculus expectations. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm prerequisites and transfer with your receiving institution.',
			short_description:
				'ACE/NCCRS-recommended Calculus on Study.com — limits, derivatives, integrals, applications. College Accelerator subscription. Usually after precalculus; verify transfer.',
			course_url: 'https://study.com/academy/course/calculus.html',
			image_url: '/images/courses/study-com-calculus.jpg',
			duration: 'Self-paced',
			level: 'Introductory',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'Calculus',
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
