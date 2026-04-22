/**
 * Upsert StraighterLine Managerial Accounting ACC150 (Business). Matches migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-straighterline-managerial-accounting-acc150.mjs
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

const slug = 'straighterline-managerial-accounting';

const learning_outcomes = `Contrast managerial versus financial accounting and relate internal reports to planning and control decisions.
Analyze product and period costs using job-order, process, and activity-based costing approaches as presented.
Apply cost-volume-profit reasoning and contribution-margin thinking to operational scenarios.
Build and interpret budgets, flexible budgets, and responsibility-accounting summaries for decentralized units.
Evaluate short-term decisions using relevance, sunk costs, and opportunity-cost frameworks from the course.`;

const general_education_note =
	'Typical sequence after introductory financial accounting for accounting and business majors; some institutions label this “cost” or “managerial” differently — confirm degree requirements and waiver rules.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Managerial Accounting (ACC150)',
			slug,
			description:
				"StraighterLine Managerial Accounting (ACC150) is ACE Credit–recommended (course code OOSL-0033) for 3 semester credits. You will distinguish managerial from financial accounting and examine how internal reporting supports planning, controlling, and evaluating performance; ethics in managerial settings; cost terminology and classification; job-order and process costing systems; activity-based costing versus volume-based overhead allocation; cost behavior and cost-volume-profit analysis including break-even reasoning; relevant costs, sunk costs, and opportunity costs for short-term decisions; budgeting and flexible budgets; responsibility accounting and performance evaluation; pricing and capital-budgeting orientation including time value of money as introduced. Includes digital textbook (Wild & Shaw, Managerial Accounting, 8th ed., McGraw Hill). Coursework uses checkpoints and benchmarks with a cumulative open-book benchmark; passing typically requires 70% or higher; scientific calculator allowed. No formal prerequisites, though completing introductory financial accounting first is strongly suggested. Membership required; transcript delivery included. Confirm transfer with your registrar.",
			short_description:
				'ACE-recommended Managerial Accounting — 3 credits, checkpoints & benchmarks. Costing, CVP, budgeting, responsibility accounting. $79/course + membership (StraighterLine). Often follows financial accounting; verify transfer.',
			course_url: 'https://www.straighterline.com/online-college-courses/managerial-accounting/',
			image_url: '/images/courses/straighterline-managerial-accounting.png',
			duration: 'Self-paced (~25 days avg)',
			level: 'Intermediate',
			price: '$79',
			price_numeric: 79,
			certificate_available: true,
			credits: '3 credits (ACE-recommended)',
			featured: false,
			subcategory: 'Managerial Accounting',
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
