-- Study.com Accounting 101: Financial Accounting — https://study.com/academy/course/financial-accounting.html
-- Category: Business. Card image: /images/courses/study-com-financial-accounting.png (desk, bank statement — RDNE Pexels 7821708)

ALTER TABLE courses
  ADD COLUMN IF NOT EXISTS learning_outcomes text,
  ADD COLUMN IF NOT EXISTS general_education_note text;

INSERT INTO courses (
  college_id,
  category_id,
  title,
  slug,
  description,
  short_description,
  course_url,
  image_url,
  duration,
  level,
  price,
  price_numeric,
  certificate_available,
  credits,
  featured,
  subcategory,
  learning_outcomes,
  general_education_note
)
SELECT
  c.id,
  cat.id,
  'Accounting 101: Financial Accounting',
  'study-com-financial-accounting',
  $DESC$Study.com Accounting 101: Financial Accounting (SDCM-0075) covers foundational financial accounting for service and merchandise businesses aligned with introductory undergraduate courses: the accounting cycle, Generally Accepted Accounting Principles (GAAP) orientation as presented, internal control concepts, recording transactions with debits and credits through the general ledger, adjusting entries, merchandising operations including inventory methods as introduced, receivables, payables, and other current assets and liabilities themes, equity and dividend impacts, preparation of the income statement, balance sheet, statement of cash flows at a survey level, and basic ratio or statement analysis. Video lessons, chapter tests, and an open-book final emphasize vocabulary, journalizing, posting, and constructing complete financial statements. Credit is earned through the College Accelerator / College Saver plan; courses carry ACE and NCCRS recommendations. Always confirm prerequisites and transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended Financial Accounting on Study.com — accounting cycle, statements, merchandising. College Accelerator subscription. Common business core; verify transfer.',
  'https://study.com/academy/course/financial-accounting.html',
  '/images/courses/study-com-financial-accounting.png',
  'Self-paced',
  'Introductory',
  '$95/mo',
  95,
  true,
  'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'Financial Accounting',
  $OUT$Define core accounting terminology and explain the roles of internal controls in safeguarding assets and records.
Journalize and post routine and adjusting transactions for service and merchandising scenarios.
Prepare and interpret the income statement, balance sheet, and statement of cash flows at an introductory level.
Apply basic analysis to link transactions to changes in financial position and operating results.
Demonstrate readiness for intermediate accounting or managerial accounting prerequisites at your institution.$OUT$,
  $NOTE$Satisfies lower-division financial accounting for many business, accounting, and pre-professional tracks; some programs require a lab or spreadsheet supplement — confirm with your advisor and receiving school.$NOTE$
FROM colleges c
CROSS JOIN course_categories cat
WHERE c.slug = 'study-com' AND cat.slug = 'business'
ON CONFLICT (slug) DO UPDATE SET
  college_id = EXCLUDED.college_id,
  category_id = EXCLUDED.category_id,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  short_description = EXCLUDED.short_description,
  course_url = EXCLUDED.course_url,
  image_url = EXCLUDED.image_url,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  price = EXCLUDED.price,
  price_numeric = EXCLUDED.price_numeric,
  certificate_available = EXCLUDED.certificate_available,
  credits = EXCLUDED.credits,
  featured = EXCLUDED.featured,
  subcategory = EXCLUDED.subcategory,
  learning_outcomes = EXCLUDED.learning_outcomes,
  general_education_note = EXCLUDED.general_education_note,
  updated_at = now();
