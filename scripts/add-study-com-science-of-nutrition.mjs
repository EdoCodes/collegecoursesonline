/**
 * Upsert Study.com Science of Nutrition (Science). Matches supabase migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-science-of-nutrition.mjs
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
	.eq('slug', 'science')
	.single();

if (cErr || gErr || !college || !cat) {
	console.error('Lookup failed:', cErr?.message || gErr?.message);
	process.exit(1);
}

const slug = 'study-com-science-of-nutrition';

const learning_outcomes = `Classify major nutrient groups, their functions, and common dietary sources at an introductory level.
Describe digestion, absorption, and energy balance using standard nutrition-science framing.
Interpret Dietary Guidelines and label information to compare foods and plan balanced meals.
Explain links between dietary patterns and selected health outcomes discussed in the course.
Apply course concepts to lifestyle, lifecycle, or activity contexts typical of introductory assessments.`;

const general_education_note =
	'Often satisfies natural-science or health-related general-education requirements and supports nursing, allied health, kinesiology, public health, and wellness pathways — clinical dietetics programs may require additional coursework; confirm articulation.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Science of Nutrition',
			slug,
			description:
				'Study.com Science of Nutrition explores how food supports health and performance: macronutrients and micronutrients, digestion and absorption, energy balance and metabolism, dietary guidelines and planning, lifecycle and population nutrition themes, relationships between diet and chronic disease risk, sports and exercise nutrition basics, food safety and labeling literacy, and applying evidence-informed reasoning to everyday eating decisions. Video lessons, practice, and assessments align with a college-level introductory nutrition science course. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.',
			short_description:
				'ACE/NCCRS-recommended Science of Nutrition on Study.com — macros/micros, metabolism, dietary planning, health links. College Accelerator subscription. Verify transfer at your school.',
			course_url: 'https://study.com/academy/course/science-of-nutrition-course.html',
			image_url: '/images/courses/study-com-science-of-nutrition.png',
			duration: 'Self-paced',
			level: 'Introductory',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'Nutrition',
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
