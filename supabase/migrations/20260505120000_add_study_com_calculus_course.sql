-- Study.com Calculus — https://study.com/academy/course/calculus.html
-- Category: Mathematics. Card image: /images/courses/study-com-calculus.jpg (whiteboard integrals — Jeswin Thomas Pexels 3781338)

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
  'Calculus',
  'study-com-calculus',
  $DESC$Study.com Calculus introduces differential and integral calculus at a first-course level: limits and continuity; differentiation rules and implicit differentiation; applications including related rates, optimization, curve sketching, and linear approximation; definition of the integral, antiderivatives, and the Fundamental Theorem of Calculus; techniques of integration as covered in the course; applications of definite integrals such as area, volumes of revolution, and average value; selected differential equations or modeling previews where applicable. Video lessons, practice, and assessments align with introductory college calculus expectations. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm prerequisites and transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended Calculus on Study.com — limits, derivatives, integrals, applications. College Accelerator subscription. Usually after precalculus; verify transfer.',
  'https://study.com/academy/course/calculus.html',
  '/images/courses/study-com-calculus.jpg',
  'Self-paced',
  'Introductory',
  '$95/mo',
  95,
  true,
  'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'Calculus',
  $OUT$Compute limits and derivatives using algebraic tools and interpret results graphically and in context.
Solve optimization and related-rates problems using calculus reasoning appropriate to the course level.
Evaluate definite and indefinite integrals and apply the Fundamental Theorem of Calculus.
Use integration to compute areas and other quantities emphasized in introductory calculus.
Communicate solutions with correct notation and justify steps typical of first calculus assessments.$OUT$,
  $NOTE$Often labeled Calculus I on transcripts; STEM majors usually continue with multivariable calculus — confirm whether your school requires a specific calculus sequence or placement exam.$NOTE$
FROM colleges c
CROSS JOIN course_categories cat
WHERE c.slug = 'study-com' AND cat.slug = 'mathematics'
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
