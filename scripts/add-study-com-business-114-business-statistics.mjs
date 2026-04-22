/**
 * Upsert Study.com BUS 114: Business Statistics (Business). Matches supabase migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-business-114-business-statistics.mjs
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

const slug = 'study-com-business-114-business-statistics';

const learning_outcomes = `Summarize and visualize business data using tables, charts, and descriptive measures.
Apply probability and sampling concepts to quantify uncertainty in managerial settings.
Conduct and interpret hypothesis tests and confidence intervals for common business metrics.
Use correlation and regression to describe relationships relevant to forecasting and decisions.
Communicate statistical findings clearly for non-technical stakeholders.`;

const general_education_note =
	'Standard for business, accounting, economics, analytics, and management programs; often satisfies quantitative or statistics requirements distinct from general math-stat paths — confirm whether your school accepts “business statistics” for your major.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'BUS 114: Business Statistics',
			slug,
			description:
				'Study.com Business Statistics applies statistical reasoning to managerial and organizational contexts: organizing and summarizing data, probability and distributions, sampling and estimation, hypothesis testing for means and proportions, correlation and simple/multiple regression as used in forecasting and analysis of variance intuition where covered, quality and process thinking, and interpreting quantitative results for business decisions (operations, finance, marketing analytics themes as appropriate). Video lessons, practice, and assessments align with an introductory business statistics course. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.',
			short_description:
				'ACE/NCCRS-recommended Business Statistics on Study.com — data analysis, inference, regression for decisions. College Accelerator subscription. Verify transfer at your school.',
			course_url: 'https://study.com/academy/course/business-114-business-statistics.html',
			image_url: '/images/courses/study-com-business-114-business-statistics.png',
			duration: 'Self-paced',
			level: 'Introductory',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'Business Statistics',
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
