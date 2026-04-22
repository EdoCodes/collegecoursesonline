/**
 * Upsert Study.com Physics 111L: Physics I with Lab (Science). Matches supabase migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-physics-111l-physics-i-with-lab.mjs
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

const slug = 'study-com-physics-111l-physics-i-with-lab';

const learning_outcomes = `Perform measurements and propagate uncertainty using consistent SI units and appropriate precision.
Design or follow experimental procedures to test mechanics concepts and compare with predictions.
Analyze datasets graphically and statistically at the level expected in introductory physics labs.
Communicate methods, results, and limitations in structured lab-style reporting.
Apply safety and instrumentation literacy common to undergraduate physics laboratories.`;

const general_education_note =
	'Programs requiring a separate on-campus lab may not accept online lab credit — confirm gen-ed and major rules and whether Physics 111 lecture alone satisfies your requirement.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Physics 111L: Physics I with Lab',
			slug,
			description:
				'Study.com Physics I with Lab integrates first-semester mechanics concepts with laboratory practice: measurement, uncertainty, unit conversion, and data analysis; kinematics and dynamics experiments; energy, momentum, and rotational motion labs as applicable; oscillations and waves lab introduction; electrical measurement basics where the course includes instrumentation and DC circuit exercises; reporting and interpreting results vs. theory. Video lessons, lab-style investigations, practice, and assessments align with an introductory physics course that includes lab credit. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm lab credit, equipment expectations, and transfer with your receiving institution.',
			short_description:
				'ACE/NCCRS-recommended Physics I with lab on Study.com — mechanics + hands-on measurement and inquiry. College Accelerator subscription. Verify lab credit at your school.',
			course_url: 'https://study.com/academy/course/physics-111l-physics-i-with-lab.html',
			image_url: '/images/courses/study-com-physics-111l-physics-i-with-lab.jpg',
			duration: 'Self-paced',
			level: 'Introductory',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 4 semester credits with lab (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'Physics I with Lab',
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
