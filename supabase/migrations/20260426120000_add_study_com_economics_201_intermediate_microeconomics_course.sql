-- Study.com Economics 201: Intermediate Microeconomics — https://study.com/academy/course/economics-201-intermediate-microeconomics.html
-- Category: Business. Card image: /images/courses/study-com-economics-201-intermediate-microeconomics.png (Euro coin / graphs — Gabby K Pexels 5849572)

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
  'Economics 201: Intermediate Microeconomics',
  'study-com-economics-201-intermediate-microeconomics',
  $DESC$Study.com Intermediate Microeconomics builds on introductory micro with deeper theory and applications: consumer theory (preferences, utility, income and substitution effects), producer theory and cost minimization, profit maximization across market structures, partial and general equilibrium intuition, welfare economics and market failures in more depth, strategic interaction and game theory foundations, and topics such as oligopoly behavior and introductory information economics where covered. Video lessons, practice, and assessments align with a second‑course microeconomics expectations. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm prerequisites and transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended Intermediate Microeconomics on Study.com — consumer/producer theory, strategic markets, welfare. College Accelerator subscription. Usually follows intro micro; verify transfer.',
  'https://study.com/academy/course/economics-201-intermediate-microeconomics.html',
  '/images/courses/study-com-economics-201-intermediate-microeconomics.png',
  'Self-paced',
  'Intermediate',
  '$95/mo',
  95,
  true,
  'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'Intermediate Microeconomics',
  $OUT$Analyze consumer choice using utility, constraints, and comparative statics beyond introductory supply-and-demand drills.
Explain firm supply, cost curves, and profit maximization under competitive and imperfect competition with intermediate rigor.
Apply basic game theory and strategic reasoning to oligopoly and related market settings.
Evaluate welfare, efficiency, and equity tradeoffs using intermediate microeconomic tools.
Solve structured problems typical of an intermediate microeconomics course assessment.$OUT$,
  $NOTE$Usually taken after introductory microeconomics in business and economics programs; some schools pair or sequence with intermediate macro — confirm your catalog.$NOTE$
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
