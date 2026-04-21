-- Study.com Macroeconomics — https://study.com/academy/course/macroeconomics-course.html
-- Category: Business. Card image: /images/courses/study-com-macroeconomics.png (financial indicators/laptop stocks — Leeloo the First Pexels 7873550)

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
  'Macroeconomics',
  'study-com-macroeconomics',
  $DESC$Study.com Macroeconomics introduces national and global economic behavior: GDP and economic growth, unemployment and inflation, aggregate demand and supply, fiscal and monetary policy, money and banking, interest rates, exchange rates and open-economy basics, business cycles, and role of government stabilization — using models and data interpretation suitable for a first college-level macro course. Video lessons, practice, and assessments align with introductory macroeconomics expectations. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended Macroeconomics on Study.com — GDP, policy, money & banking, international basics. College Accelerator subscription. Verify transfer at your school.',
  'https://study.com/academy/course/macroeconomics-course.html',
  '/images/courses/study-com-macroeconomics.png',
  'Self-paced',
  'Introductory',
  '$95/mo',
  95,
  true,
  'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'Macroeconomics',
  $OUT$Interpret GDP, inflation, unemployment, and growth using standard macro indicators.
Apply aggregate demand/supply reasoning to shocks and policy scenarios.
Explain roles of fiscal policy, monetary policy, and the banking system.
Describe exchange rates, balance-of-payments themes, and open-economy linkages at an introductory level.
Use graphs and quantitative intuition common to college macro assessments.$OUT$,
  $NOTE$Often satisfies social-science or economics breadth requirements and is common for business, finance, accounting, public policy, international relations, and liberal arts majors — prerequisite sequencing with microeconomics varies by school.$NOTE$
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
