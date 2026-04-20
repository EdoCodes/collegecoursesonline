-- Study.com Western Civilization — https://study.com/academy/course/western-civilization-ancient-near-east-to-1648.html
-- Category: Humanities. Card image: /images/courses/study-com-western-civilization.png

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
  subcategory
)
SELECT
  c.id,
  cat.id,
  'Western Civilization: Ancient Near East to 1648',
  'study-com-western-civilization',
  $DESC$Study.com Western Civilization surveys major peoples and cultures from the ancient Near East through classical antiquity, medieval Europe, the Renaissance and Reformation, and early modern states to 1648 — political, religious, intellectual, and social themes that shaped the West. Video lessons, readings, practice, and assessments suit a college-level survey. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended Western Civilization survey on Study.com — Ancient Near East through 1648. Self-paced lessons and proctored exams. College Accelerator subscription. Verify transfer at your school.',
  'https://study.com/academy/course/western-civilization-ancient-near-east-to-1648.html',
  '/images/courses/study-com-western-civilization.png',
  'Self-paced',
  'Introductory',
  '$95/mo',
  95,
  true,
  'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'Western Civilization'
FROM colleges c
CROSS JOIN course_categories cat
WHERE c.slug = 'study-com' AND cat.slug = 'humanities'
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
  updated_at = now();
