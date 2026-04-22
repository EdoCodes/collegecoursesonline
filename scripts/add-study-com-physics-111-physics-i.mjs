/**
 * Upsert Study.com Physics 111: Physics I (Science). Matches supabase migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-physics-111-physics-i.mjs
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

const slug = 'study-com-physics-111-physics-i';

const learning_outcomes = `Set up and solve kinematics and dynamics problems using vectors, diagrams, and consistent SI units.
Apply Newton's laws to particles and rigid-body situations common in introductory mechanics.
Use work–energy and impulse–momentum frameworks to analyze collisions and energy transformations.
Explain rotational quantities and torques at the level expected in a first mechanics course.
Interpret graphs, symbolic solutions, and conceptual reasoning typical of Physics I assessments.`;

const general_education_note =
	'Often paired with a second-semester Physics II course (E&M, optics, modern topics); engineering and physics majors may require a calculus-based sequence instead — confirm your catalog.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Physics 111: Physics I',
			slug,
			description:
				"Study.com Physics I is a first-semester–style algebra/trigonometry-based mechanics course: measurements, dimensional analysis, vectors in one and two dimensions; kinematics with constant acceleration; Newton's laws, free-body diagrams, friction, inclined planes, and circular motion; work and energy, kinetic and potential energy, conservative forces; linear momentum, collisions, and impulse; rotational kinematics and dynamics basics; equilibrium and elasticity introduction; gravitation (orbital intuition where covered); fluids and harmonic motion/waves previews as aligned with Physics I curricula. Video lessons, practice, and assessments match expectations for Physics 111–level coursework. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm prerequisites and transfer with your receiving institution.",
			short_description:
				'ACE/NCCRS-recommended Physics I on Study.com — mechanics, energy, momentum, rotation intro. College Accelerator subscription. Typically before Physics II; verify transfer.',
			course_url: 'https://study.com/academy/course/physics-111-physics-i.html',
			image_url: '/images/courses/study-com-physics-111-physics-i.jpg',
			duration: 'Self-paced',
			level: 'Introductory',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'Physics I',
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
