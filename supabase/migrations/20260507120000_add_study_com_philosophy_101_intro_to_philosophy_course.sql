-- Study.com Philosophy 101: Intro to Philosophy — https://study.com/academy/course/philosophy-101-intro-to-philosophy.html
-- Category: Humanities. Card image: /images/courses/study-com-philosophy-101-intro-to-philosophy.jpg (library / Socrates — pincalo Pexels 31429461)

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
  'Philosophy 101: Intro to Philosophy',
  'study-com-philosophy-101-intro-to-philosophy',
  $DESC$Study.com Intro to Philosophy surveys major questions and methods in Western and comparative traditions as presented in the course: logic and argument reconstruction; metaphysics and philosophy of mind (identity, free will, personal identity); epistemology (knowledge, skepticism, justification); ethics and social philosophy (theories of value, rights, distributive justice); political philosophy at an introductory level; and selected classic texts and thinkers (e.g., Socrates, Plato, Aristotle, and modern authors as covered). Video lessons, practice, and assessments align with a first college-level philosophy survey. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended Intro to Philosophy on Study.com — ethics, knowledge, being, and classic texts. College Accelerator subscription. Verify transfer at your school.',
  'https://study.com/academy/course/philosophy-101-intro-to-philosophy.html',
  '/images/courses/study-com-philosophy-101-intro-to-philosophy.jpg',
  'Self-paced',
  'Introductory',
  '$95/mo',
  95,
  true,
  'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'Philosophy',
  $OUT$Reconstruct and evaluate arguments using clear logical structure and standard philosophical vocabulary.
Compare major ethical theories and apply them to concrete moral scenarios at an introductory level.
Explain core problems in epistemology and metaphysics as they appear in assigned readings and lectures.
Engage primary texts and secondary commentary with accurate paraphrase and critical analysis.
Write short philosophy responses that state a thesis, support it with reasons, and address objections.$OUT$,
  $NOTE$Often satisfies humanities, arts, or “ways of knowing” general-education requirements; pre-law, political science, and liberal arts students frequently take it early — confirm your catalog for philosophy vs. religious studies credit.$NOTE$
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
  learning_outcomes = EXCLUDED.learning_outcomes,
  general_education_note = EXCLUDED.general_education_note,
  updated_at = now();
