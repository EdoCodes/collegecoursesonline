/**
 * Upsert Study.com Microeconomics (Business). Matches supabase migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-microeconomics.mjs
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

const slug = 'study-com-microeconomics';

const learning_outcomes = `Use supply-and-demand reasoning to analyze prices, shortages, surpluses, and shifts.
Interpret elasticity concepts for consumers and producers across policy or pricing scenarios.
Explain firm behavior across production stages and common market structures at an introductory level.
Identify externalities, efficiency, deadweight loss, and basic corrective policy tools.
Solve graph-based problems typical of introductory microeconomics assessments.`;

const general_education_note =
	'Satisfies economics or social-science breadth at many colleges and pairs with macro in business core sequences — confirm whether micro should be taken before macro at your institution.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Microeconomics',
			slug,
			description:
				'Study.com Microeconomics introduces how individuals, firms, and markets allocate scarce resources: supply and demand, elasticity, consumer choice and utility, production and costs, competitive and imperfectly competitive market structures (monopoly, oligopoly, monopolistic competition), labor markets, welfare economics, externalities, public goods, and introductory game-theory intuition where applicable. Video lessons, practice, and assessments align with a first college-level microeconomics course. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.',
			short_description:
				'ACE/NCCRS-recommended Microeconomics on Study.com — markets, elasticity, firms, costs, market structure. College Accelerator subscription. Verify transfer at your school.',
			course_url: 'https://study.com/academy/course/microeconomics-course.html',
			image_url: '/images/courses/study-com-microeconomics.png',
			duration: 'Self-paced',
			level: 'Introductory',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'Microeconomics',
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
