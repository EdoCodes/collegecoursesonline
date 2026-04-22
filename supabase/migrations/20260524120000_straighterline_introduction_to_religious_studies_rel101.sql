-- StraighterLine Introduction to Religious Studies (REL101) — https://www.straighterline.com/online-college-courses/introduction-to-religious-studies/
-- ACE code OOSL-0066 (2025). Category: Humanities. Card image: /images/courses/straighterline-introduction-to-religious-studies.jpg (scholar with text — Daneswara Eka Pexels 36451956)

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
  'Introduction to Religious Studies (REL101)',
  'straighterline-introduction-to-religious-studies',
  $DESC$StraighterLine Introduction to Religious Studies (REL101) is ACE Credit–recommended (course code OOSL-0066) for 3 semester credits. Using Molloy, Experiencing the World’s Religions (8th ed., McGraw-Hill, 2021), you will survey major traditions—including indigenous themes, Hinduism, Buddhism, Jainism and Sikhism, Daoism and Confucianism, Shinto, Judaism, Christianity, and Islam—alongside foundational concepts in the academic study of religion: definitions of religion, comparative method and vocabulary, creation and cosmic-order themes, salvation and ethical orientations, ritual, sacred space and symbol, and social and political influence across cultures and history. Ten checkpoints, capstones, and a benchmark build understanding from descriptive overview toward critical comparison; passing typically requires 70% or higher. No prerequisites. Membership required; transcript delivery included. Taught by Michelle Mueller. Confirm transfer with your registrar.$DESC$,
  'ACE-recommended Religious Studies — 3 credits, world traditions & academic methods. $79/course + membership (StraighterLine). Humanities gen-ed; verify transfer.',
  'https://www.straighterline.com/online-college-courses/introduction-to-religious-studies/',
  '/images/courses/straighterline-introduction-to-religious-studies.jpg',
  'Self-paced (~28 days avg)',
  'Introductory',
  '$79',
  79,
  true,
  '3 credits (ACE-recommended)',
  false,
  'Religious Studies',
  $OUT$Define religion in academic terms and contrast major world traditions using appropriate comparative vocabulary.
Interpret central beliefs, practices, and historical developments for the traditions covered in the course.
Analyze rituals, sacred sites, and symbols as expressions of religious identity and community life.
Evaluate scholarly approaches to studying religion and apply them to examples of diversity and change.
Discuss religion’s roles in social, political, and cultural contexts with descriptive accuracy and analytical care.$OUT$,
  $NOTE$Often satisfies humanities, global studies, or “world religions” breadth requirements; seminary-bound or theology majors should confirm whether a survey course meets denominational prerequisites.$NOTE$
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
