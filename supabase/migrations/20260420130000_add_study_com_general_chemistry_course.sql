-- Study.com General Chemistry — https://study.com/academy/course/general-chemistry-course.html
-- Category: Natural Sciences (science). Card image: /images/courses/study-com-general-chemistry.png

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
  'General Chemistry',
  'study-com-general-chemistry',
  $DESC$Study.com General Chemistry surveys atomic structure and bonding, stoichiometry, gases, liquids and solids, solutions, thermodynamics, equilibrium, acids and bases, electrochemistry, and introductory organic highlights. Laboratory-style concepts complement video lessons and assessments for a college-level Gen Chem survey. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended General Chemistry on Study.com — self-paced lessons and proctored exams. College Accelerator subscription. Verify transfer at your school.',
  'https://study.com/academy/course/general-chemistry-course.html',
  '/images/courses/study-com-general-chemistry.png',
  'Self-paced',
  'Introductory',
  '$95/mo',
  95,
  true,
  'Typically 4 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'General Chemistry'
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
  updated_at = now();
