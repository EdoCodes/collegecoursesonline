-- StraighterLine Business Communication (BUS105) — https://www.straighterline.com/online-college-courses/business-communication/
-- ACE code OOSL-0014. Category: Business / Business Communication. Card image: /images/courses/straighterline-business-communication.png (Pexels Pavel Danilyuk 8761327)

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
  'Business Communication (BUS105)',
  'straighterline-business-communication',
  $DESC$StraighterLine Business Communication (BUS105) is ACE Credit–recommended (course code OOSL-0014) for 3 semester credits. Using Business Communication for Success (LibreTexts, open.lib.umn.edu), you will practice workplace communication across written, verbal, and multimodal channels—including email, memos, résumés, cover letters, and video pitches—with attention to audience, tone, ethics, and intercultural context. Four checkpoints and six capstones cover effective messaging, audience analysis, writing and revision, and professional presentation; passing typically requires 70% or higher. No prerequisites. Membership required; digital textbook included; free transcript delivery. StraighterLine reports strong completion and pass rates for its courses; confirm transfer with your registrar.$DESC$,
  'ACE-recommended Business Communication — 3 credits, professional writing & presentations. $79/course + membership (StraighterLine). Business core or elective; verify transfer.',
  'https://www.straighterline.com/online-college-courses/business-communication/',
  '/images/courses/straighterline-business-communication.png',
  'Self-paced (~30 days avg)',
  'Introductory',
  '$79',
  79,
  true,
  '3 credits (ACE-recommended)',
  false,
  'Business Communication',
  $OUT$Communicate effectively in a 21st-century workplace across a variety of business contexts.
Design common business documents—including email, persuasive memos, résumé, cover letter, and a video pitch with reflection.
Choose tone, style, audience, and form appropriately and implement them across business communications.
Create compelling multimodal content across traditional and new media.
Write with clarity, concision, and correctness; integrate credible research into business messages.
Recognize ethical dimensions of communication and apply strategies for intercultural and intergenerational contexts.
Use professional formatting (headings, documentation, multimodal elements) and reflect on strengths and growth areas.$OUT$,
  $NOTE$Often satisfies business communication, professional writing, or related elective requirements; confirm whether BUS105 meets a specific program rule versus a general elective at your institution.$NOTE$
FROM colleges c
CROSS JOIN course_categories cat
WHERE c.slug = 'straighterline' AND cat.slug = 'business'
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
