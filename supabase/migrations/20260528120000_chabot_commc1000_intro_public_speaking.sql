-- Chabot College COMMC1000 — Intro to Public Speaking (C-ID COMM110)
-- CVC Exchange — https://search.cvc.edu/courses/15905698
-- Card image: /images/courses/chabot-commc1000-intro-public-speaking.png (speaker — Pexels Henri Mathieu 8348462)

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
  'Chabot College',
  'chabot-college',
  'Chabot College is an ACCJC-accredited California community college offering online and hybrid courses. Many sections are searchable and enrollable through the California Virtual Campus (CVC) Exchange alongside local enrollment paths.',
  'https://www.chabotcollege.edu/',
  'ACCJC-accredited California Community College',
  'USA',
  false,
  72,
  78,
  'Regional'
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
  'Intro to Public Speaking (COMMC1000)',
  'chabot-commc1000-intro-public-speaking',
  $DESC$Chabot College COMMC1000 introduces foundational rhetorical theory and public-speaking practice in a multicultural democratic society. You discover, develop, and critically analyze ideas through research, reasoning, organization, composition, delivery to a live audience, and evaluation of speeches—including informative and persuasive formats (formerly COMM 1). The course carries C-ID COMM110 and is commonly used toward CSU GE Area A1 (Oral Communication), Cal-GETC Area 1C (Oral Communication), and comparable IGETC oral-communication expectations—articulation varies by receiving institution; confirm with a counselor. Strongly recommended preparation: ENGL C1000 (College Composition). Listed on the California Virtual Campus (CVC) Exchange with online synchronous sections; schedules, seat counts, fees, and meeting patterns change each term—verify current section details and California residency tuition at enrollment. Many sections carry Zero Textbook Cost (ZTC); materials fees may apply on some offerings. Tuition and mandatory fees shown on CVC listings (example: $138 for tuition line item on sample listings) exclude nonresident surcharges and campus-specific charges—confirm your total cost before registering.$DESC$,
  'California CC public speaking (C-ID COMM110) — often CSU GE oral comm / Cal-GETC 1C. Online synchronous via CVC; ~$138 tuition line (verify). ZTC sections common.',
  'https://search.cvc.edu/courses/15905698',
  '/images/courses/chabot-commc1000-intro-public-speaking.png',
  'Semester (scheduled online meetings; varies by section)',
  'Introductory',
  '$138',
  138,
  true,
  '3 semester units (C-ID COMM110)',
  false,
  'Public Speaking',
  $OUT$Apply foundational rhetorical concepts to speech purpose, audience, and context in a diverse society.
Research topics, evaluate evidence, and organize speeches with clear structure and reasoning.
Deliver informative and persuasive speeches with intentional vocal and physical delivery.
Analyze public discourse and provide constructive peer feedback on presentations.
Meet live-audience speaking expectations typical of transfer-level oral communication courses.$OUT$,
  $NOTE$Aligns with common California transfer patterns for oral communication (e.g., CSU GE A1, Cal-GETC 1C); confirm your home college’s articulation and whether online synchronous delivery satisfies your program. If you need a fully async option, compare other providers.$NOTE$
FROM colleges c
CROSS JOIN course_categories cat
WHERE c.slug = 'chabot-college' AND cat.slug = 'humanities'
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
