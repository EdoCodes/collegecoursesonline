/**
 * Upsert Study.com Accounting 101: Financial Accounting (Business). Matches migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-financial-accounting.mjs
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
const { data: cat, error: gErr } = await supabase.from('course_categories').select('id').eq('slug', 'business').single();

if (cErr || gErr || !college || !cat) {
	console.error('Lookup failed:', cErr?.message || gErr?.message);
	process.exit(1);
}

const slug = 'study-com-financial-accounting';

const learning_outcomes = `Define core accounting terminology and explain the roles of internal controls in safeguarding assets and records.
Journalize and post routine and adjusting transactions for service and merchandising scenarios.
Prepare and interpret the income statement, balance sheet, and statement of cash flows at an introductory level.
Apply basic analysis to link transactions to changes in financial position and operating results.
Demonstrate readiness for intermediate accounting or managerial accounting prerequisites at your institution.`;

const general_education_note =
	'Satisfies lower-division financial accounting for many business, accounting, and pre-professional tracks; some programs require a lab or spreadsheet supplement — confirm with your advisor and receiving school.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Accounting 101: Financial Accounting',
			slug,
			description:
				'Study.com Accounting 101: Financial Accounting (SDCM-0075) covers foundational financial accounting for service and merchandise businesses aligned with introductory undergraduate courses: the accounting cycle, Generally Accepted Accounting Principles (GAAP) orientation as presented, internal control concepts, recording transactions with debits and credits through the general ledger, adjusting entries, merchandising operations including inventory methods as introduced, receivables, payables, and other current assets and liabilities themes, equity and dividend impacts, preparation of the income statement, balance sheet, statement of cash flows at a survey level, and basic ratio or statement analysis. Video lessons, chapter tests, and an open-book final emphasize vocabulary, journalizing, posting, and constructing complete financial statements. Credit is earned through the College Accelerator / College Saver plan; courses carry ACE and NCCRS recommendations. Always confirm prerequisites and transfer with your receiving institution.',
			short_description:
				'ACE/NCCRS-recommended Financial Accounting on Study.com — accounting cycle, statements, merchandising. College Accelerator subscription. Common business core; verify transfer.',
			course_url: 'https://study.com/academy/course/financial-accounting.html',
			image_url: '/images/courses/study-com-financial-accounting.png',
			duration: 'Self-paced',
			level: 'Introductory',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'Financial Accounting',
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
