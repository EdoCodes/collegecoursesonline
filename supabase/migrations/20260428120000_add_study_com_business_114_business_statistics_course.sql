-- Study.com BUS 114: Business Statistics — https://study.com/academy/course/business-114-business-statistics.html
-- Category: Business. Card image: /images/courses/study-com-business-114-business-statistics.png (report/charts — Tiger Lily Pexels 7109290)

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
  'BUS 114: Business Statistics',
  'study-com-business-114-business-statistics',
  $DESC$Study.com Business Statistics applies statistical reasoning to managerial and organizational contexts: organizing and summarizing data, probability and distributions, sampling and estimation, hypothesis testing for means and proportions, correlation and simple/multiple regression as used in forecasting and analysis of variance intuition where covered, quality and process thinking, and interpreting quantitative results for business decisions (operations, finance, marketing analytics themes as appropriate). Video lessons, practice, and assessments align with an introductory business statistics course. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended Business Statistics on Study.com — data analysis, inference, regression for decisions. College Accelerator subscription. Verify transfer at your school.',
  'https://study.com/academy/course/business-114-business-statistics.html',
  '/images/courses/study-com-business-114-business-statistics.png',
  'Self-paced',
  'Introductory',
  '$95/mo',
  95,
  true,
  'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'Business Statistics',
  $OUT$Summarize and visualize business data using tables, charts, and descriptive measures.
Apply probability and sampling concepts to quantify uncertainty in managerial settings.
Conduct and interpret hypothesis tests and confidence intervals for common business metrics.
Use correlation and regression to describe relationships relevant to forecasting and decisions.
Communicate statistical findings clearly for non-technical stakeholders.$OUT$,
  $NOTE$Standard for business, accounting, economics, analytics, and management programs; often satisfies quantitative or statistics requirements distinct from general math-stat paths — confirm whether your school accepts “business statistics” for your major.$NOTE$
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
