/**
 * Upsert Study.com Introduction to Business (Business). Matches supabase migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-intro-to-business.mjs
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

const slug = 'study-com-intro-to-business';

const learning_outcomes = `Explain core business concepts across functional areas using appropriate vocabulary.
Describe tradeoffs among ownership structures, ethical lenses, and stakeholder expectations.
Identify how marketing, operations, HR, accounting, finance, and IT interconnect in organizations.
Interpret introductory financial statements and basic metrics used in managerial decisions.
Apply frameworks from the course to simple business scenarios and cases.`;

const general_education_note =
	'Common first course for business minors and majors and often satisfies breadth or exploratory requirements — accounting/finance-heavy programs may sequence specialized courses afterward; confirm articulation.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Introduction to Business',
			slug,
			description:
				'Study.com Introduction to Business surveys the foundations of commerce and organizations: economic systems and business ethics, entrepreneurship and small business basics, forms of ownership, management functions (planning, organizing, leading, controlling), operations and quality, human resources themes, marketing fundamentals (segmentation, targeting, positioning, promotion), accounting and finance literacy for managers, financial markets and investing orientation, international business introduction, information systems and analytics awareness, legal and regulatory context, and career-ready communication of business concepts. Video lessons, practice, and assessments align with an introductory undergraduate business overview. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.',
			short_description:
				'ACE/NCCRS-recommended Intro to Business on Study.com — management, marketing, finance literacy, entrepreneurship. College Accelerator subscription. Verify transfer at your school.',
			course_url: 'https://study.com/academy/course/intro-to-business.html',
			image_url: '/images/courses/study-com-intro-to-business.jpg',
			duration: 'Self-paced',
			level: 'Introductory',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'Introduction to Business',
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
