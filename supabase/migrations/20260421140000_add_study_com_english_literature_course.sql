-- Study.com English Literature — https://study.com/academy/course/english-literature.html
-- Category: Humanities. Card image: /images/courses/study-com-english-literature.jpg

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
  'English Literature',
  'study-com-english-literature',
  $DESC$Study.com English Literature surveys major British and American authors, poetic and narrative forms, drama, rhetoric, literary movements, close reading, and contextual interpretation from early periods through the modern era. Video lessons, readings, practice, and assessments suit a college-level introductory literature survey. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended English Literature survey on Study.com — poetry, prose, drama, and critical reading. College Accelerator subscription. Verify transfer at your school.',
  'https://study.com/academy/course/english-literature.html',
  '/images/courses/study-com-english-literature.jpg',
  'Self-paced',
  'Introductory',
  '$95/mo',
  95,
  true,
  'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'English Literature'
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
