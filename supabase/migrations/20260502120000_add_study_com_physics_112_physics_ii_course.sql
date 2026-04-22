-- Study.com Physics 112: Physics II — https://study.com/academy/course/physics-112-physics-ii.html
-- Category: Science (Natural Sciences). Card image: /images/courses/study-com-physics-112-physics-ii.jpg (prism spectrum — design bits / Pexels 3845162)

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
  'Physics 112: Physics II',
  'study-com-physics-112-physics-ii',
  $DESC$Study.com Physics II continues algebra/trigonometry-based physics with emphasis on electricity and magnetism, waves, and optics: electric charge and fields, electric potential, capacitance and dielectrics; direct-current circuits (Ohm’s law, resistance, Kirchhoff rules); magnetic fields and forces, induction and Faraday’s law; alternating-current basics where covered; electromagnetic waves; geometric and physical optics (reflection, refraction, lenses, interference, diffraction); and selected modern physics topics such as quantization or photon ideas as aligned with a second-semester survey. Video lessons, practice, and assessments match expectations for Physics 112–level coursework. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm prerequisites and transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended Physics II on Study.com — E&M, circuits, waves, optics. College Accelerator subscription. Usually follows Physics I; verify transfer.',
  'https://study.com/academy/course/physics-112-physics-ii.html',
  '/images/courses/study-com-physics-112-physics-ii.jpg',
  'Self-paced',
  'Introductory',
  '$95/mo',
  95,
  true,
  'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'Physics II',
  $OUT$Analyze electrostatic and magnetostatic situations using fields, potentials, and symmetry where appropriate.
Solve DC circuit problems using Ohm’s law, equivalent resistance, and Kirchhoff’s rules.
Apply Faraday’s law and Lenz’s law to changing flux and basic AC themes covered in the course.
Explain wave behavior and optical systems using ray and wave models at an introductory level.
Use modern-physics themes introduced in the course to interpret basic phenomena on assessments.$OUT$,
  $NOTE$Typically taken after Physics I (mechanics); STEM majors may require calculus-based physics and coordinated labs — confirm your program’s sequence and lab requirements.$NOTE$
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
