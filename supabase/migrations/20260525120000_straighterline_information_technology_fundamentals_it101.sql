-- StraighterLine Information Technology Fundamentals (IT101) — https://www.straighterline.com/online-college-courses/information-technology-fundamentals/
-- ACE code OOSL-0090 (2025). Category: Computer Science. Card image: /images/courses/straighterline-information-technology-fundamentals.jpg (server room — Cookiecutter / Pexels 17489155)

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
  'Information Technology Fundamentals (IT101)',
  'straighterline-information-technology-fundamentals',
  $DESC$StraighterLine Information Technology Fundamentals (IT101) is ACE Credit–recommended (course code OOSL-0090) for 3 semester credits. Delivered via zyBooks in an interactive format, you will survey computing history and basics; hardware and software layers; Internet and web fundamentals including introductory HTML, CSS, and JavaScript themes; operating systems and applications (productivity suites, databases, SQL orientation); web and mobile-app contexts; privacy and digital footprints; security threats, defenses, and cryptography concepts; information systems and cloud-oriented career paths; societal impacts including e‑commerce and the digital divide; computational thinking such as abstraction and data visualization; and introductory artificial intelligence—including generative AI and ethics—as presented. Twelve integrated checkpoints span these topics without a separate purchased textbook. No prerequisites. Membership required; passing typically 70% or higher; transcript delivery included. Confirm transfer with your registrar.$DESC$,
  'ACE-recommended IT fundamentals — 3 credits, hardware/software, web, privacy, security, cloud & AI literacy. $79/course + membership (StraighterLine). Verify transfer.',
  'https://www.straighterline.com/online-college-courses/information-technology-fundamentals/',
  '/images/courses/straighterline-information-technology-fundamentals.jpg',
  'Self-paced (~23 days avg)',
  'Introductory',
  '$79',
  79,
  true,
  '3 credits (ACE-recommended)',
  false,
  'Information Technology',
  $OUT$Explain core hardware and software concepts and how computers represent and process information.
Navigate Internet, web, operating-system, and common application environments at an introductory level.
Identify privacy and security risks and apply baseline practices for safer personal and organizational computing.
Describe information systems and cloud contexts relevant to careers in IT-related fields.
Discuss societal and ethical implications of computing, including emerging AI themes from the course.$OUT$,
  $NOTE$Satisfies introductory IT or literacy electives for many business and STEM pathways; ABET-style CS majors may substitute a deeper programming prerequisite — confirm your catalog.$NOTE$
FROM colleges c
CROSS JOIN course_categories cat
WHERE c.slug = 'straighterline' AND cat.slug = 'computer-science'
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
