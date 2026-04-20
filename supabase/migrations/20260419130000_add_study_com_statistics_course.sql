-- Study.com Statistics — https://study.com/academy/course/statistics-course.html
-- Card image: /images/courses/study-com-statistics.png

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
  'Statistics',
  'study-com-statistics',
  $DESC$Study.com Statistics covers descriptive and inferential methods: data collection, probability, distributions, hypothesis testing, confidence intervals, correlation, and regression. Video lessons, practice, and assessments align with a first college-level statistics course. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended statistics on Study.com — self-paced lessons and proctored exams. College Accelerator subscription. Verify transfer at your school.',
  'https://study.com/academy/course/statistics-course.html',
  '/images/courses/study-com-statistics.png',
  'Self-paced',
  'Introductory',
  '$95/mo',
  95,
  true,
  'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'Statistics'
FROM colleges c
CROSS JOIN course_categories cat
WHERE c.slug = 'study-com' AND cat.slug = 'mathematics'
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
