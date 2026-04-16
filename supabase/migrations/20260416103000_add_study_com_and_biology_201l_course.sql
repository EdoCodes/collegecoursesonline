-- Add Study.com as a directory provider and Biology 201L (A&P I with Lab) course.
-- See: https://study.com/academy/course/biology-201l-anatomy-physiology-i-with-lab.html

INSERT INTO colleges (
  name,
  slug,
  description,
  website_url,
  accreditation,
  country,
  featured,
  popularity_score,
  ease_of_access_score,
  accreditation_level
)
VALUES (
  'Study.com',
  'study-com',
  'Study.com offers 220+ online college courses with ACE and NCCRS credit recommendations. College Accelerator plans include video lessons, quizzes, and proctored exams for transferable credit.',
  'https://www.study.com',
  'ACE- and NCCRS-recommended courses',
  'USA',
  false,
  90,
  92,
  'National'
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  website_url = EXCLUDED.website_url,
  accreditation = EXCLUDED.accreditation,
  popularity_score = EXCLUDED.popularity_score,
  ease_of_access_score = EXCLUDED.ease_of_access_score,
  accreditation_level = EXCLUDED.accreditation_level,
  updated_at = now();

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
  'Biology 201L: Anatomy & Physiology I with Lab',
  'study-com-biology-201l-anatomy-physiology-i-with-lab',
  $DESC$Study.com Biology 201L covers human anatomy and physiology with an integrated lab sequence: body organization, tissues, skeletal and muscular systems, and nervous system basics. Video lessons, assessments, and lab-style activities align with a first-semester A&P I with lab. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended A&P I with lab on Study.com — self-paced video courses and proctored exams. College Accelerator subscription. Verify transfer at your school.',
  'https://study.com/academy/course/biology-201l-anatomy-physiology-i-with-lab.html',
  'https://images.pexels.com/photos/3825539/pexels-photo-3825539.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Self-paced',
  'Introductory',
  '$95/mo',
  95,
  true,
  'Typically 4 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'Anatomy & Physiology'
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
