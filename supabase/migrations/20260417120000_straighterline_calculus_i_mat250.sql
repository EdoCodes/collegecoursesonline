-- StraighterLine Calculus I (MAT250) — directory listing aligned with official course page.
-- https://www.straighterline.com/online-college-courses/calculus-i/
-- Card image: local asset /images/courses/straighterline-calculus-1.png

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
  'Calculus I (MAT250)',
  'straighterline-calculus-1',
  $DESC$StraighterLine Calculus I (MAT250) is ACE Credit–recommended for 4 semester credits. You will work through limits, continuity, derivatives (including implicit differentiation and L’Hôpital’s Rule), curve sketching, definite and indefinite integrals, the Fundamental Theorem of Calculus, and applications such as area between curves and vertical motion. The course is self-paced with digital materials, checkpoints, and human-graded work; passing typically requires 70% or higher. Official transcripts can be sent to your school after you complete the course. Prerequisite: Precalculus (assumed if you enroll). Verify transfer with your registrar—acceptance depends on your institution.$DESC$,
  'ACE-recommended Calculus I — 4 credits, self-paced. Limits, derivatives, integrals, and curve sketching. Transcript delivery to your school. $79 per course (StraighterLine membership required).',
  'https://www.straighterline.com/online-college-courses/calculus-i/',
  '/images/courses/straighterline-calculus-1.png',
  'Self-paced (~29 days avg)',
  'Intermediate',
  '$79',
  79,
  true,
  '4 credits (ACE-recommended)',
  false,
  'Calculus'
FROM colleges c
CROSS JOIN course_categories cat
WHERE c.slug = 'straighterline' AND cat.slug = 'mathematics'
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
