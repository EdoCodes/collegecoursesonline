/**
 * Upsert Study.com Macroeconomics (Business). Matches supabase migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-macroeconomics.mjs
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

const slug = 'study-com-macroeconomics';

const learning_outcomes = `Interpret GDP, inflation, unemployment, and growth using standard macro indicators.
Apply aggregate demand/supply reasoning to shocks and policy scenarios.
Explain roles of fiscal policy, monetary policy, and the banking system.
Describe exchange rates, balance-of-payments themes, and open-economy linkages at an introductory level.
Use graphs and quantitative intuition common to college macro assessments.`;

const general_education_note =
	'Often satisfies social-science or economics breadth requirements and is common for business, finance, accounting, public policy, international relations, and liberal arts majors — prerequisite sequencing with microeconomics varies by school.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Macroeconomics',
			slug,
			description:
				'Study.com Macroeconomics introduces national and global economic behavior: GDP and economic growth, unemployment and inflation, aggregate demand and supply, fiscal and monetary policy, money and banking, interest rates, exchange rates and open-economy basics, business cycles, and role of government stabilization — using models and data interpretation suitable for a first college-level macro course. Video lessons, practice, and assessments align with introductory macroeconomics expectations. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.',
			short_description:
				'ACE/NCCRS-recommended Macroeconomics on Study.com — GDP, policy, money & banking, international basics. College Accelerator subscription. Verify transfer at your school.',
			course_url: 'https://study.com/academy/course/macroeconomics-course.html',
			image_url: '/images/courses/study-com-macroeconomics.png',
			duration: 'Self-paced',
			level: 'Introductory',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'Macroeconomics',
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
