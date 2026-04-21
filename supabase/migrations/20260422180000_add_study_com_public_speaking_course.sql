-- Study.com Public Speaking — https://study.com/academy/course/public-speaking-course.html
-- Category: Humanities. Card image: /images/courses/study-com-public-speaking.png

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
  'Public Speaking',
  'study-com-public-speaking',
  $DESC$Study.com Public Speaking covers speech preparation and organization, audience analysis, delivery skills, managing speech anxiety, persuasion, informative and special-occasion speaking, and using visual aids effectively. Video lessons, practice, and assessments fit an introductory college-level communication course. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended Public Speaking on Study.com — preparation, delivery, persuasion, and presentation skills. College Accelerator subscription. Verify transfer at your school.',
  'https://study.com/academy/course/public-speaking-course.html',
  '/images/courses/study-com-public-speaking.png',
  'Self-paced',
  'Introductory',
  '$95/mo',
  95,
  true,
  'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'Public Speaking'
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
