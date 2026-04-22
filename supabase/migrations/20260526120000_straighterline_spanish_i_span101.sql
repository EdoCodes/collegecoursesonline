-- StraighterLine Spanish I (SPAN101) — https://www.straighterline.com/online-college-courses/spanish-i/
-- ACE code OOSL-0068 (2025). Category: Humanities. Card image: /images/courses/straighterline-spanish-i.jpg (Madrid / Cibeles region — Diego F. Parra Pexels 15461018)

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
  'Spanish I (SPAN101)',
  'straighterline-spanish-i',
  $DESC$StraighterLine Spanish I (SPAN101) is ACE Credit–recommended (course code OOSL-0068) for 3 semester credits. Through Rosetta Stone–integrated activities aligned to Units 1–4 (language basics through shopping themes as presented), you will develop novice-level listening, speaking, reading, and writing in Spanish—grammar awareness for nouns and articles; present-tense verbs and agreement; vocabulary for introductions, daily life, school and work contexts, shopping, colors, numbers, family, clothing, food, body, household, time, preferences, seasons, routines, and simple interpersonal scenarios. Checkpoint themes frame cultural contexts across Spanish-speaking regions. Policies discourage inappropriate use of machine translation outside instructor guidance; confirm system requirements for Rosetta Stone (Chromebooks before 2019 unsupported). Five checkpoints, six capstones, and an open-book benchmark; passing typically requires 70% or higher. No prerequisites. Membership required plus course fee; transcript delivery included. Confirm transfer with your registrar.$DESC$,
  'ACE-recommended Spanish I — 3 credits, novice Spanish with Rosetta Stone pathways. $249/course + membership (StraighterLine). World-language gen-ed; verify transfer.',
  'https://www.straighterline.com/online-college-courses/spanish-i/',
  '/images/courses/straighterline-spanish-i.jpg',
  'Self-paced (~30 days avg)',
  'Introductory',
  '$249',
  249,
  true,
  '3 credits (ACE-recommended)',
  false,
  'Spanish',
  $OUT$Recognize and produce foundational Spanish vocabulary and structures for introductions, routines, preferences, and daily interactions.
Apply present-tense patterns with attention to noun–adjective agreement and basic subject–verb alignment.
Demonstrate novice listening and reading comprehension using course-supported authentic-style tasks.
Compose short paragraphs and guided dialogues appropriate to assigned scenarios and cultural prompts.
Discuss cross-cultural themes introduced through checkpoint contexts with accurate, respectful terminology.$OUT$,
  $NOTE$Often fulfills first-semester Spanish or foreign-language breadth; placement exams and sequence rules (Spanish II prerequisites) vary — confirm equivalency at your receiving school.$NOTE$
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
