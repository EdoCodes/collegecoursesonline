-- Study.com Physics 111L: Physics I with Lab — https://study.com/academy/course/physics-111l-physics-i-with-lab.html
-- Complements Physics 111 (lecture-style); includes lab measurement and inquiry themes.
-- Category: Science (Natural Sciences). Card image: /images/courses/study-com-physics-111l-physics-i-with-lab.jpg (bench instruments — delot / Pexels 18471414)

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
  'Physics 111L: Physics I with Lab',
  'study-com-physics-111l-physics-i-with-lab',
  $DESC$Study.com Physics I with Lab integrates first-semester mechanics concepts with laboratory practice: measurement, uncertainty, unit conversion, and data analysis; kinematics and dynamics experiments; energy, momentum, and rotational motion labs as applicable; oscillations and waves lab introduction; electrical measurement basics where the course includes instrumentation and DC circuit exercises; reporting and interpreting results vs. theory. Video lessons, lab-style investigations, practice, and assessments align with an introductory physics course that includes lab credit. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm lab credit, equipment expectations, and transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended Physics I with lab on Study.com — mechanics + hands-on measurement and inquiry. College Accelerator subscription. Verify lab credit at your school.',
  'https://study.com/academy/course/physics-111l-physics-i-with-lab.html',
  '/images/courses/study-com-physics-111l-physics-i-with-lab.jpg',
  'Self-paced',
  'Introductory',
  '$95/mo',
  95,
  true,
  'Typically 4 semester credits with lab (ACE/NCCRS; institution-dependent)',
  false,
  'Physics I with Lab',
  $OUT$Perform measurements and propagate uncertainty using consistent SI units and appropriate precision.
Design or follow experimental procedures to test mechanics concepts and compare with predictions.
Analyze datasets graphically and statistically at the level expected in introductory physics labs.
Communicate methods, results, and limitations in structured lab-style reporting.
Apply safety and instrumentation literacy common to undergraduate physics laboratories.$OUT$,
  $NOTE$Programs requiring a separate on-campus lab may not accept online lab credit — confirm gen-ed and major rules and whether Physics 111 lecture alone satisfies your requirement.$NOTE$
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
