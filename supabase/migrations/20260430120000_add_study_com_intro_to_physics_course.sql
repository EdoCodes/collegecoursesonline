-- Study.com Introduction to Physics — https://study.com/academy/course/intro-to-physics-course.html
-- Category: Science (Natural Sciences). Card image: /images/courses/study-com-intro-to-physics.jpg (plasma globes — cottonbro Pexels 6208386)

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
  'Introduction to Physics',
  'study-com-intro-to-physics',
  $DESC$Study.com Introduction to Physics builds quantitative reasoning about the physical world: measurement, units, and vectors; kinematics and dynamics (Newton’s laws, forces, friction, circular motion); work, energy, and momentum; gravitation basics; properties of matter, fluids, and thermodynamics introduction; vibrations, waves, and sound; geometric optics introduction; electricity and magnetism fundamentals (charge, electric fields, circuits, magnetism); and modern physics previews such as quantization where covered. Video lessons, practice, and assessments align with a college-level introductory algebra-based physics survey. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended Introduction to Physics on Study.com — mechanics, waves, E&M, energy. College Accelerator subscription. Verify transfer at your school.',
  'https://study.com/academy/course/intro-to-physics-course.html',
  '/images/courses/study-com-intro-to-physics.jpg',
  'Self-paced',
  'Introductory',
  '$95/mo',
  95,
  true,
  'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'Introduction to Physics',
  $OUT$Translate physical situations into diagrams, equations, and consistent units using introductory algebra/trigonometry.
Apply Newton’s laws, conservation principles, and basic circuit rules to textbook-style problems.
Explain wave phenomena, geometric optics setups, and everyday physics themes at a survey level.
Interpret graphs and quantitative results in context (energy, momentum, circuit quantities).
Solve multi-step problems typical of an introductory physics course assessment.$OUT$,
  $NOTE$Often satisfies physical-science or lab-science breadth for STEM, pre-health, engineering pathways, and teacher preparation — calculus-based physics may be required for some majors; confirm sequencing and lab requirements.$NOTE$
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
