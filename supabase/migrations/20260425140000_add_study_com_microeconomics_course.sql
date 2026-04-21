-- Study.com Microeconomics — https://study.com/academy/course/microeconomics-course.html
-- Category: Business. Card image: /images/courses/study-com-microeconomics.png (calculator/cash/legal pad — Tara Winstead Pexels 7111593)

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
  'Microeconomics',
  'study-com-microeconomics',
  $DESC$Study.com Microeconomics introduces how individuals, firms, and markets allocate scarce resources: supply and demand, elasticity, consumer choice and utility, production and costs, competitive and imperfectly competitive market structures (monopoly, oligopoly, monopolistic competition), labor markets, welfare economics, externalities, public goods, and introductory game-theory intuition where applicable. Video lessons, practice, and assessments align with a first college-level microeconomics course. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended Microeconomics on Study.com — markets, elasticity, firms, costs, market structure. College Accelerator subscription. Verify transfer at your school.',
  'https://study.com/academy/course/microeconomics-course.html',
  '/images/courses/study-com-microeconomics.png',
  'Self-paced',
  'Introductory',
  '$95/mo',
  95,
  true,
  'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'Microeconomics',
  $OUT$Use supply-and-demand reasoning to analyze prices, shortages, surpluses, and shifts.
Interpret elasticity concepts for consumers and producers across policy or pricing scenarios.
Explain firm behavior across production stages and common market structures at an introductory level.
Identify externalities, efficiency, deadweight loss, and basic corrective policy tools.
Solve graph-based problems typical of introductory microeconomics assessments.$OUT$,
  $NOTE$Satisfies economics or social-science breadth at many colleges and pairs with macro in business core sequences — confirm whether micro should be taken before macro at your institution.$NOTE$
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
