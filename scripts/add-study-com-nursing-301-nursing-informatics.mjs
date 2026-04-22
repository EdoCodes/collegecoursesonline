/**
 * Upsert Study.com Nursing 301: Nursing Informatics (Health). Matches supabase migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-nursing-301-nursing-informatics.mjs
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
	.eq('slug', 'health')
	.single();

if (cErr || gErr || !college || !cat) {
	console.error('Lookup failed:', cErr?.message || gErr?.message);
	process.exit(1);
}

const slug = 'study-com-nursing-301-nursing-informatics';

const learning_outcomes = `Explain how clinical information systems support documentation, communication, and care coordination.
Describe privacy, security, and ethical obligations when handling patient-identifiable health information.
Identify opportunities for clinical decision support and quality measurement using standardized data.
Analyze workflow and usability considerations during informatics implementations relevant to nursing.
Apply informatics vocabulary and frameworks to scenarios typical of nursing leadership coursework.`;

const general_education_note =
	'Common in RN-to-BSN and nursing leadership tracks; acute-care employers increasingly expect informatics literacy — confirm whether your program bundles informatics into capstone or requires a separate clinical practicum.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Nursing 301: Nursing Informatics',
			slug,
			description:
				'Study.com Nursing Informatics examines how information technology supports safe, efficient nursing practice and healthcare delivery: electronic health records (EHR), standardized terminologies (e.g., NANDA, NIC/NOC themes as introduced), clinical decision support, interoperability and health information exchange; privacy, security, HIPAA awareness, and ethical use of data; patient engagement technologies; telehealth and remote monitoring contexts; workflow, usability, and change management when adopting systems; basic data literacy and quality improvement uses of informatics for nursing-sensitive indicators. Video lessons, practice, and assessments align with upper-level undergraduate nursing informatics expectations. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm RN-to-BSN or program requirements and transfer with your institution.',
			short_description:
				'ACE/NCCRS-recommended Nursing Informatics on Study.com — EHRs, data ethics, CDS, telehealth themes. College Accelerator subscription. Usually junior/senior nursing; verify transfer.',
			course_url: 'https://study.com/academy/course/nursing-301-nursing-informatics.html',
			image_url: '/images/courses/study-com-nursing-301-nursing-informatics.jpg',
			duration: 'Self-paced',
			level: 'Intermediate',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'Nursing Informatics',
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
