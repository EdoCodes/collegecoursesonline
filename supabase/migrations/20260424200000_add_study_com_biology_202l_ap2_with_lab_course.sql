-- Study.com Biology 202L: Anatomy & Physiology II with Lab — https://study.com/academy/course/biology-202l-anatomy-physiology-ii-with-lab.html
-- Complements Biology 201L (A&P I with lab); not a duplicate.
-- Category: Science. Card image: /images/courses/study-com-biology-202l-anatomy-physiology-ii-with-lab.png

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
  'Biology 202L: Anatomy & Physiology II with Lab',
  'study-com-biology-202l-anatomy-physiology-ii-with-lab',
  $DESC$Study.com Biology 202L covers human anatomy and physiology with an integrated lab sequence focused on second-semester systems: blood and cardiovascular physiology, lymphatic and immune defenses, respiratory mechanics and gas exchange, digestive anatomy and metabolism, urinary system and fluid/electrolyte balance, endocrine integration, and reproductive anatomy and physiology — building on A&P I foundations. Video lessons, assessments, and lab-style activities align with a second-semester A&P II with lab. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended A&P II with lab on Study.com — integrated lecture and lab-style activities. College Accelerator subscription. Verify transfer at your school.',
  'https://study.com/academy/course/biology-202l-anatomy-physiology-ii-with-lab.html',
  '/images/courses/study-com-biology-202l-anatomy-physiology-ii-with-lab.png',
  'Self-paced',
  'Introductory',
  '$95/mo',
  95,
  true,
  'Typically 4 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'Anatomy & Physiology',
  $OUT$Relate structure to function across cardiovascular, lymphatic/immune, and respiratory systems.
Explain digestion, absorption, metabolism, and urinary regulation of fluids and wastes.
Interpret endocrine signaling and reproductive anatomy at an introductory survey level.
Complete lab-aligned activities reinforcing cadaver/book-style competencies where applicable.
Prepare for assessments that integrate systems thinking from A&P I through A&P II.$OUT$,
  $NOTE$Typically taken after A&P I; required or strongly recommended for nursing (RN/BSN), allied health, OT/PT pathways, exercise science, and many pre-health plans — verify whether your program accepts online lab components and matches credit hours.$NOTE$
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
