/**
 * Upsert Study.com Introduction to Physics (Science). Matches supabase migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-intro-to-physics.mjs
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

const slug = 'study-com-intro-to-physics';

const learning_outcomes = `Translate physical situations into diagrams, equations, and consistent units using introductory algebra/trigonometry.
Apply Newton's laws, conservation principles, and basic circuit rules to textbook-style problems.
Explain wave phenomena, geometric optics setups, and everyday physics themes at a survey level.
Interpret graphs and quantitative results in context (energy, momentum, circuit quantities).
Solve multi-step problems typical of an introductory physics course assessment.`;

const general_education_note =
	'Often satisfies physical-science or lab-science breadth for STEM, pre-health, engineering pathways, and teacher preparation — calculus-based physics may be required for some majors; confirm sequencing and lab requirements.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Introduction to Physics',
			slug,
			description:
				'Study.com Introduction to Physics builds quantitative reasoning about the physical world: measurement, units, and vectors; kinematics and dynamics (Newton\'s laws, forces, friction, circular motion); work, energy, and momentum; gravitation basics; properties of matter, fluids, and thermodynamics introduction; vibrations, waves, and sound; geometric optics introduction; electricity and magnetism fundamentals (charge, electric fields, circuits, magnetism); and modern physics previews such as quantization where covered. Video lessons, practice, and assessments align with a college-level introductory algebra-based physics survey. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.',
			short_description:
				'ACE/NCCRS-recommended Introduction to Physics on Study.com — mechanics, waves, E&M, energy. College Accelerator subscription. Verify transfer at your school.',
			course_url: 'https://study.com/academy/course/intro-to-physics-course.html',
			image_url: '/images/courses/study-com-intro-to-physics.jpg',
			duration: 'Self-paced',
			level: 'Introductory',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'Introduction to Physics',
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
