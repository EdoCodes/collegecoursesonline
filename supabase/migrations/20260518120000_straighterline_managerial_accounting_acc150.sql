-- StraighterLine Managerial Accounting (ACC150) — https://www.straighterline.com/online-college-courses/managerial-accounting/
-- ACE code OOSL-0033 (2025). Category: Business. Card image: /images/courses/straighterline-managerial-accounting.png (spreadsheet/analysis — RDNE Pexels 7821914)

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
  'Managerial Accounting (ACC150)',
  'straighterline-managerial-accounting',
  $DESC$StraighterLine Managerial Accounting (ACC150) is ACE Credit–recommended (course code OOSL-0033) for 3 semester credits. You will distinguish managerial from financial accounting and examine how internal reporting supports planning, controlling, and evaluating performance; ethics in managerial settings; cost terminology and classification; job-order and process costing systems; activity-based costing versus volume-based overhead allocation; cost behavior and cost-volume-profit analysis including break-even reasoning; relevant costs, sunk costs, and opportunity costs for short-term decisions; budgeting and flexible budgets; responsibility accounting and performance evaluation; pricing and capital-budgeting orientation including time value of money as introduced. Includes digital textbook (Wild & Shaw, Managerial Accounting, 8th ed., McGraw Hill). Coursework uses checkpoints and benchmarks with a cumulative open-book benchmark; passing typically requires 70% or higher; scientific calculator allowed. No formal prerequisites, though completing introductory financial accounting first is strongly suggested. Membership required; transcript delivery included. Confirm transfer with your registrar.$DESC$,
  'ACE-recommended Managerial Accounting — 3 credits, checkpoints & benchmarks. Costing, CVP, budgeting, responsibility accounting. $79/course + membership (StraighterLine). Often follows financial accounting; verify transfer.',
  'https://www.straighterline.com/online-college-courses/managerial-accounting/',
  '/images/courses/straighterline-managerial-accounting.png',
  'Self-paced (~25 days avg)',
  'Intermediate',
  '$79',
  79,
  true,
  '3 credits (ACE-recommended)',
  false,
  'Managerial Accounting',
  $OUT$Contrast managerial versus financial accounting and relate internal reports to planning and control decisions.
Analyze product and period costs using job-order, process, and activity-based costing approaches as presented.
Apply cost-volume-profit reasoning and contribution-margin thinking to operational scenarios.
Build and interpret budgets, flexible budgets, and responsibility-accounting summaries for decentralized units.
Evaluate short-term decisions using relevance, sunk costs, and opportunity-cost frameworks from the course.$OUT$,
  $NOTE$Typical sequence after introductory financial accounting for accounting and business majors; some institutions label this “cost” or “managerial” differently — confirm degree requirements and waiver rules.$NOTE$
FROM colleges c
CROSS JOIN course_categories cat
WHERE c.slug = 'straighterline' AND cat.slug = 'business'
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
