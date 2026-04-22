-- Study.com Physics 111: Physics I — https://study.com/academy/course/physics-111-physics-i.html
-- Category: Science (Natural Sciences). Card image: /images/courses/study-com-physics-111-physics-i.jpg (chalkboard / E=mc² — jeshoots Pexels 714698)

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
  'Physics 111: Physics I',
  'study-com-physics-111-physics-i',
  $DESC$Study.com Physics I is a first-semester–style algebra/trigonometry-based mechanics course: measurements, dimensional analysis, vectors in one and two dimensions; kinematics with constant acceleration; Newton’s laws, free-body diagrams, friction, inclined planes, and circular motion; work and energy, kinetic and potential energy, conservative forces; linear momentum, collisions, and impulse; rotational kinematics and dynamics basics; equilibrium and elasticity introduction; gravitation (orbital intuition where covered); fluids and harmonic motion/waves previews as aligned with Physics I curricula. Video lessons, practice, and assessments match expectations for Physics 111–level coursework. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm prerequisites and transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended Physics I on Study.com — mechanics, energy, momentum, rotation intro. College Accelerator subscription. Typically before Physics II; verify transfer.',
  'https://study.com/academy/course/physics-111-physics-i.html',
  '/images/courses/study-com-physics-111-physics-i.jpg',
  'Self-paced',
  'Introductory',
  '$95/mo',
  95,
  true,
  'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'Physics I',
  $OUT$Set up and solve kinematics and dynamics problems using vectors, diagrams, and consistent SI units.
Apply Newton’s laws to particles and rigid-body situations common in introductory mechanics.
Use work–energy and impulse–momentum frameworks to analyze collisions and energy transformations.
Explain rotational quantities and torques at the level expected in a first mechanics course.
Interpret graphs, symbolic solutions, and conceptual reasoning typical of Physics I assessments.$OUT$,
  $NOTE$Often paired with a second-semester Physics II course (E&M, optics, modern topics); engineering and physics majors may require a calculus-based sequence instead — confirm your catalog.$NOTE$
FROM colleges c
CROSS JOIN course_categories cat
WHERE c.slug = 'study-com' AND cat.slug = 'science'
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
