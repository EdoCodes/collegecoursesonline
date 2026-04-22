-- Study.com Precalculus — https://study.com/academy/course/precalculus-course.html
-- Category: Mathematics. Card image: /images/courses/study-com-precalculus.jpg (textbook/math focus — Ian Panelo Pexels 4494634)

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
  'Precalculus',
  'study-com-precalculus',
  $DESC$Study.com Precalculus prepares you for calculus and STEM quantitative work: advanced functions (polynomial, rational, exponential, logarithmic); trigonometric functions, identities, equations, and the unit circle; polar coordinates and introductory parametric reasoning; vectors in the plane; sequences and series foundations; inequalities and analytic geometry refreshers; transformations and graphs; and algebraic manipulation at the rigor expected before calculus. Video lessons, practice, and assessments align with a college-level precalculus course. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm placement and transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended Precalculus on Study.com — trig, exponentials/logs, vectors, graphs. College Accelerator subscription. Often follows algebra; verify transfer.',
  'https://study.com/academy/course/precalculus-course.html',
  '/images/courses/study-com-precalculus.jpg',
  'Self-paced',
  'Introductory',
  '$95/mo',
  95,
  true,
  'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'Precalculus',
  $OUT$Manipulation and graphing of algebraic, exponential, logarithmic, and trigonometric functions.
Solve trigonometric equations and apply identities and the unit circle in standard precalculus contexts.
Represent vectors and selected polar/parametric relationships at an introductory level.
Use sequences and series reasoning appropriate to placement into calculus.
Model word problems and interpret solutions using precalculus tools common on assessments.$OUT$,
  $NOTE$Often satisfies prerequisites for Calculus I and engineering/STEM pathways; some schools embed precalculus topics across two courses — confirm your math placement rules.$NOTE$
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
