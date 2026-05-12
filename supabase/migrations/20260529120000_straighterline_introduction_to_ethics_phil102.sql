-- StraighterLine Introduction to Ethics (PHIL102) — https://www.straighterline.com/online-college-courses/introduction-to-ethics/
-- ACE code OOSL-0123 (2025). Category: Humanities / Ethics. Card image: /images/courses/straighterline-introduction-to-ethics.jpg (Pexels James Frid 8482449)

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
  'Introduction to Ethics (PHIL102)',
  'straighterline-introduction-to-ethics',
  $DESC$StraighterLine Introduction to Ethics (PHIL102) is ACE Credit–recommended (course code OOSL-0123) for 3 semester credits. Using Rosenstand, The Moral of the Story: An Introduction to Ethics (2024 Release, McGraw-Hill), you will explore major ethical theories—relativism, egoism, utilitarianism, deontology, virtue ethics, and feminist perspectives—and apply them to contemporary case studies spanning personhood and rights, justice, media, business, war, animals, the environment, and more. Eleven checkpoints, benchmarks, and capstones build from values and storytelling through classical and non-Western virtue traditions toward applied ethics; passing typically requires 70% or higher. No prerequisites. Membership required; digital eTextbook included; free transcript delivery. StraighterLine reports a 98% average pass rate and ~28-day average completion for this course. Confirm transfer with your registrar.$DESC$,
  'ACE-recommended Intro to Ethics — 3 credits, theories & applied cases. $79/course + membership (StraighterLine). Humanities / philosophy breadth; verify transfer.',
  'https://www.straighterline.com/online-college-courses/introduction-to-ethics/',
  '/images/courses/straighterline-introduction-to-ethics.jpg',
  'Self-paced (~28 days avg)',
  'Introductory',
  '$79',
  79,
  true,
  '3 credits (ACE-recommended)',
  false,
  'Ethics',
  $OUT$Demonstrate awareness of ethical thinking and recognize ethical questions in context.
Explain core philosophical doctrines and frameworks used in the study of ethics.
Meet academic standards for reading, writing, and argumentation in the humanities.
Participate thoughtfully in discussions of global citizenship and diverse moral traditions.
Compare global philosophical models and their implications for moral judgment.
Apply academic integrity standards to written work in philosophy and ethics.
Develop original ethical analyses that engage theories with real-world dilemmas.$OUT$,
  $NOTE$Often satisfies humanities, philosophy, or “values / ethics” breadth requirements; pre-law, business ethics, nursing, and public-service programs should confirm whether PHIL102 meets a specific program requirement versus a general elective.$NOTE$
FROM colleges c
CROSS JOIN course_categories cat
WHERE c.slug = 'straighterline' AND cat.slug = 'humanities'
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
