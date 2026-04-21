-- Study.com Introduction to Biology — https://study.com/academy/course/introduction-to-biology.html
-- Category: Science (Natural Sciences). Card image: /images/courses/study-com-introduction-to-biology.png

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
  'Introduction to Biology',
  'study-com-introduction-to-biology',
  $DESC$Study.com Introduction to Biology surveys core life-science foundations: chemistry of life, cells and organelles, metabolism and energy (photosynthesis and cellular respiration), genetics and molecular biology (DNA, RNA, inheritance), evolution and natural selection, taxonomy and diversity of life, ecology (populations, communities, ecosystems), and introductory human body systems themes as appropriate. Video lessons, practice, and assessments align with a college-level introductory biology survey suitable for majors and non-majors pathways. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended Introduction to Biology on Study.com — cells, genetics, evolution, ecology, and more. College Accelerator subscription. Verify transfer at your school.',
  'https://study.com/academy/course/introduction-to-biology.html',
  '/images/courses/study-com-introduction-to-biology.png',
  'Self-paced',
  'Introductory',
  '$95/mo',
  95,
  true,
  'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'Introduction to Biology',
  $OUT$Explain cell structure, membrane transport, and how cells obtain and use energy.
Describe DNA, gene expression, inheritance patterns, and sources of variation.
Summarize evolutionary mechanisms and evidence supporting common ancestry.
Outline major groups of organisms and ecological interactions at multiple scales.
Apply biological vocabulary and reasoning to introductory lab-style scenarios.$OUT$,
  $NOTE$Commonly satisfies natural-science or life-science general-education requirements and is standard for nursing prerequisites, allied health, pre-professional tracks, environmental studies, kinesiology, and STEM majors needing biology credit — lab requirements vary by program; confirm articulation.$NOTE$
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
