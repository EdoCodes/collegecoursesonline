/**
 * Upsert StraighterLine Information Technology Fundamentals IT101 (Computer Science). Matches migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-straighterline-information-technology-fundamentals-it101.mjs
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
const { data: cat, error: gErr } = await supabase
	.from('course_categories')
	.select('id')
	.eq('slug', 'computer-science')
	.single();

if (cErr || gErr || !college || !cat) {
	console.error('Lookup failed:', cErr?.message || gErr?.message);
	process.exit(1);
}

const slug = 'straighterline-information-technology-fundamentals';

const learning_outcomes = `Explain core hardware and software concepts and how computers represent and process information.
Navigate Internet, web, operating-system, and common application environments at an introductory level.
Identify privacy and security risks and apply baseline practices for safer personal and organizational computing.
Describe information systems and cloud contexts relevant to careers in IT-related fields.
Discuss societal and ethical implications of computing, including emerging AI themes from the course.`;

const general_education_note =
	'Satisfies introductory IT or literacy electives for many business and STEM pathways; ABET-style CS majors may substitute a deeper programming prerequisite — confirm your catalog.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Information Technology Fundamentals (IT101)',
			slug,
			description:
				"StraighterLine Information Technology Fundamentals (IT101) is ACE Credit–recommended (course code OOSL-0090) for 3 semester credits. Delivered via zyBooks in an interactive format, you will survey computing history and basics; hardware and software layers; Internet and web fundamentals including introductory HTML, CSS, and JavaScript themes; operating systems and applications (productivity suites, databases, SQL orientation); web and mobile-app contexts; privacy and digital footprints; security threats, defenses, and cryptography concepts; information systems and cloud-oriented career paths; societal impacts including e‑commerce and the digital divide; computational thinking such as abstraction and data visualization; and introductory artificial intelligence—including generative AI and ethics—as presented. Twelve integrated checkpoints span these topics without a separate purchased textbook. No prerequisites. Membership required; passing typically 70% or higher; transcript delivery included. Confirm transfer with your registrar.",
			short_description:
				'ACE-recommended IT fundamentals — 3 credits, hardware/software, web, privacy, security, cloud & AI literacy. $79/course + membership (StraighterLine). Verify transfer.',
			course_url: 'https://www.straighterline.com/online-college-courses/information-technology-fundamentals/',
			image_url: '/images/courses/straighterline-information-technology-fundamentals.jpg',
			duration: 'Self-paced (~23 days avg)',
			level: 'Introductory',
			price: '$79',
			price_numeric: 79,
			certificate_available: true,
			credits: '3 credits (ACE-recommended)',
			featured: false,
			subcategory: 'Information Technology',
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
