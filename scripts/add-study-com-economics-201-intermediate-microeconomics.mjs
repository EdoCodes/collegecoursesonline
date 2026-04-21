/**
 * Upsert Study.com Economics 201: Intermediate Microeconomics (Business). Matches supabase migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-economics-201-intermediate-microeconomics.mjs
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
	.eq('slug', 'business')
	.single();

if (cErr || gErr || !college || !cat) {
	console.error('Lookup failed:', cErr?.message || gErr?.message);
	process.exit(1);
}

const slug = 'study-com-economics-201-intermediate-microeconomics';

const learning_outcomes = `Analyze consumer choice using utility, constraints, and comparative statics beyond introductory supply-and-demand drills.
Explain firm supply, cost curves, and profit maximization under competitive and imperfect competition with intermediate rigor.
Apply basic game theory and strategic reasoning to oligopoly and related market settings.
Evaluate welfare, efficiency, and equity tradeoffs using intermediate microeconomic tools.
Solve structured problems typical of an intermediate microeconomics course assessment.`;

const general_education_note =
	'Usually taken after introductory microeconomics in business and economics programs; some schools pair or sequence with intermediate macro — confirm your catalog.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Economics 201: Intermediate Microeconomics',
			slug,
			description:
				'Study.com Intermediate Microeconomics builds on introductory micro with deeper theory and applications: consumer theory (preferences, utility, income and substitution effects), producer theory and cost minimization, profit maximization across market structures, partial and general equilibrium intuition, welfare economics and market failures in more depth, strategic interaction and game theory foundations, and topics such as oligopoly behavior and introductory information economics where covered. Video lessons, practice, and assessments align with a second‑course microeconomics expectations. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm prerequisites and transfer with your receiving institution.',
			short_description:
				'ACE/NCCRS-recommended Intermediate Microeconomics on Study.com — consumer/producer theory, strategic markets, welfare. College Accelerator subscription. Usually follows intro micro; verify transfer.',
			course_url:
				'https://study.com/academy/course/economics-201-intermediate-microeconomics.html',
			image_url: '/images/courses/study-com-economics-201-intermediate-microeconomics.png',
			duration: 'Self-paced',
			level: 'Intermediate',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'Intermediate Microeconomics',
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
