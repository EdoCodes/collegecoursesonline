/**
 * Upsert StraighterLine Microeconomics ECON102 (Business). Matches migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-straighterline-microeconomics-econ102.mjs
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
const { data: cat, error: gErr } = await supabase.from('course_categories').select('id').eq('slug', 'business').single();

if (cErr || gErr || !college || !cat) {
	console.error('Lookup failed:', cErr?.message || gErr?.message);
	process.exit(1);
}

const slug = 'straighterline-microeconomics';

const learning_outcomes = `Explain scarcity-driven tradeoffs using opportunity cost, marginal reasoning, and basic market models.
Predict price and quantity effects using supply-and-demand shifts and elasticity intuition.
Describe firm-level production, cost curves, and competitive versus imperfect market outcomes.
Analyze efficiency, externalities, and introductory strategic interaction in oligopoly-style settings.
Interpret course graphs and quantitative prompts typical of introductory microeconomics assessments.`;

const general_education_note =
	'Often fulfills social-science or economics breadth for business, finance, policy, and liberal arts majors; sequencing with macroeconomics varies — confirm whether your program requires micro first.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Microeconomics (ECON102)',
			slug,
			description:
				"StraighterLine Microeconomics (ECON102) is ACE Credit–recommended (course code OOSL-0008) for 3 semester credits. You will apply the economic way of thinking—scarcity, opportunity cost, marginal analysis, specialization, and production possibilities; build and interpret supply-and-demand models; study elasticity, utility, and consumer choice; analyze production, costs, and perfectly competitive supply; evaluate market efficiency and exchange; compare market structures including pure competition, monopoly, oligopoly, and monopolistic competition with attention to strategic behavior and game theory; examine market failures, externalities, and behavioral-economics themes as presented; and connect price elasticity to firm profitability across structures. Includes digital textbook (Frank et al., Principles of Microeconomics, 2024 Release, McGraw-Hill). Eleven checkpoints, benchmarks, capstones, and an open-book final; passing typically requires 70% or higher; scientific or graphing calculator allowed. No prerequisites listed. Membership required; free transcript delivery to your school. Taught by Marlo Chavarria. Confirm transfer with your registrar.",
			short_description:
				'ACE-recommended Microeconomics — 3 credits, supply & demand, elasticity, market structure, strategic behavior. $79/course + membership (StraighterLine). Pair with macro; verify transfer.',
			course_url: 'https://www.straighterline.com/online-college-courses/microeconomics/',
			image_url: '/images/courses/straighterline-microeconomics.png',
			duration: 'Self-paced (~31 days avg)',
			level: 'Introductory',
			price: '$79',
			price_numeric: 79,
			certificate_available: true,
			credits: '3 credits (ACE-recommended)',
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
