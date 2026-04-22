-- Study.com Philosophy 103: Ethics — Theory & Practice — https://study.com/academy/course/philosophy-103-ethics-theory-practice.html
-- Category: Humanities. Card image: /images/courses/study-com-philosophy-103-ethics-theory-practice.jpg (contemplative statue — Ali Bensoula Pexels 29517732)

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
  'Philosophy 103: Ethics — Theory & Practice',
  'study-com-philosophy-103-ethics-theory-practice',
  $DESC$Study.com Ethics explores normative theories and moral reasoning applied to concrete cases: major frameworks such as consequentialism (utilitarianism), deontology (duty and rights approaches), virtue ethics, and feminist or care ethics where covered; moral status and personal identity themes as introduced; applied topics such as biomedical ethics, professional responsibility, environmental and digital ethics, justice and inequality, and global health or social policy debates at an introductory-to-intermediate survey level. Video lessons, practice, and assessments emphasize argument reconstruction, objection-and-reply reasoning, and written analysis of scenarios. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm prerequisites and transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended Ethics on Study.com — utilitarianism, duty, virtue, applied cases. College Accelerator subscription. Often after intro philosophy; verify transfer.',
  'https://study.com/academy/course/philosophy-103-ethics-theory-practice.html',
  '/images/courses/study-com-philosophy-103-ethics-theory-practice.jpg',
  'Self-paced',
  'Intermediate',
  '$95/mo',
  95,
  true,
  'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'Ethics',
  $OUT$Articulate consequentialist, deontological, and virtue-based perspectives and relate them to moral problems.
Analyze case studies using consistent principles while recognizing tradeoffs between competing moral claims.
Respond to objections and revise positions using philosophical argument structure (premises, inference, critique).
Interpret professional codes and institutional policies against broader ethical frameworks presented in the course.
Write ethically informed essays that cite course concepts accurately and acknowledge counterarguments.$OUT$,
  $NOTE$Often fulfills humanities ethics or upper-level breadth requirements for nursing, business, criminal justice, public policy, pre-health, and liberal arts majors — verify whether your school prefers a standalone ethics vs. embedded professional-ethics course.$NOTE$
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
