/**
 * Upsert Study.com Physics 112: Physics II (Science). Matches supabase migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-physics-112-physics-ii.mjs
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

const slug = 'study-com-physics-112-physics-ii';

const learning_outcomes = `Analyze electrostatic and magnetostatic situations using fields, potentials, and symmetry where appropriate.
Solve DC circuit problems using Ohm's law, equivalent resistance, and Kirchhoff's rules.
Apply Faraday's law and Lenz's law to changing flux and basic AC themes covered in the course.
Explain wave behavior and optical systems using ray and wave models at an introductory level.
Use modern-physics themes introduced in the course to interpret basic phenomena on assessments.`;

const general_education_note =
	'Typically taken after Physics I (mechanics); STEM majors may require calculus-based physics and coordinated labs — confirm your program’s sequence and lab requirements.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Physics 112: Physics II',
			slug,
			description:
				"Study.com Physics II continues algebra/trigonometry-based physics with emphasis on electricity and magnetism, waves, and optics: electric charge and fields, electric potential, capacitance and dielectrics; direct-current circuits (Ohm's law, resistance, Kirchhoff rules); magnetic fields and forces, induction and Faraday's law; alternating-current basics where covered; electromagnetic waves; geometric and physical optics (reflection, refraction, lenses, interference, diffraction); and selected modern physics topics such as quantization or photon ideas as aligned with a second-semester survey. Video lessons, practice, and assessments match expectations for Physics 112–level coursework. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm prerequisites and transfer with your receiving institution.",
			short_description:
				'ACE/NCCRS-recommended Physics II on Study.com — E&M, circuits, waves, optics. College Accelerator subscription. Usually follows Physics I; verify transfer.',
			course_url: 'https://study.com/academy/course/physics-112-physics-ii.html',
			image_url: '/images/courses/study-com-physics-112-physics-ii.jpg',
			duration: 'Self-paced',
			level: 'Introductory',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'Physics II',
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
