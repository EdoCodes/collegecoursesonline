-- Study.com Biology 106: Pathophysiology — https://study.com/academy/course/biology-106-pathophysiology.html
-- Category: Science (Natural Sciences). Card image: /images/courses/study-com-biology-106-pathophysiology.png

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
  'Biology 106: Pathophysiology',
  'study-com-biology-106-pathophysiology',
  $DESC$Study.com Biology 106: Pathophysiology explores how disease disrupts normal physiology across body systems — cellular injury and adaptation, inflammation and immunity, fluid and electrolyte balance, hemodynamics, genetic and neoplastic processes, and common disorders of cardiovascular, respiratory, renal, gastrointestinal, endocrine, nervous, musculoskeletal, and reproductive systems. Video lessons, practice, and assessments align with an introductory college pathophysiology survey. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended Pathophysiology on Study.com — disease mechanisms and body systems. College Accelerator subscription. Verify transfer at your school.',
  'https://study.com/academy/course/biology-106-pathophysiology.html',
  '/images/courses/study-com-biology-106-pathophysiology.png',
  'Self-paced',
  'Introductory',
  '$95/mo',
  95,
  true,
  'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'Pathophysiology',
  $OUT$Explain how cellular injury, inflammation, and healing relate to disease presentation.
Apply concepts of altered immunity, genetics, and neoplasia to clinical examples.
Describe pathophysiologic changes in major organ systems and common disorders.
Interpret relationships between normal physiology and disrupted homeostasis in illness.
Use course frameworks to reason through signs, symptoms, and disease progression.$OUT$,
  $NOTE$Commonly taken by nursing, ASN/BSN pathways, allied health, pre-health, medical laboratory science, healthcare administration, and biology-focused majors needing pathophysiology or science elective credit — degree plans vary; confirm prerequisite and gen-ed rules at your college.$NOTE$
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
