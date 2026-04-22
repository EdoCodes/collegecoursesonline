-- Study.com Science of Nutrition — https://study.com/academy/course/science-of-nutrition-course.html
-- Category: Science (Natural Sciences). Card image: /images/courses/study-com-science-of-nutrition.png (produce/fitness/meal planning — Gustavo Fring Pexels 5622211)

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
  'Science of Nutrition',
  'study-com-science-of-nutrition',
  $DESC$Study.com Science of Nutrition explores how food supports health and performance: macronutrients and micronutrients, digestion and absorption, energy balance and metabolism, dietary guidelines and planning, lifecycle and population nutrition themes, relationships between diet and chronic disease risk, sports and exercise nutrition basics, food safety and labeling literacy, and applying evidence-informed reasoning to everyday eating decisions. Video lessons, practice, and assessments align with a college-level introductory nutrition science course. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended Science of Nutrition on Study.com — macros/micros, metabolism, dietary planning, health links. College Accelerator subscription. Verify transfer at your school.',
  'https://study.com/academy/course/science-of-nutrition-course.html',
  '/images/courses/study-com-science-of-nutrition.png',
  'Self-paced',
  'Introductory',
  '$95/mo',
  95,
  true,
  'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'Nutrition',
  $OUT$Classify major nutrient groups, their functions, and common dietary sources at an introductory level.
Describe digestion, absorption, and energy balance using standard nutrition-science framing.
Interpret Dietary Guidelines and label information to compare foods and plan balanced meals.
Explain links between dietary patterns and selected health outcomes discussed in the course.
Apply course concepts to lifestyle, lifecycle, or activity contexts typical of introductory assessments.$OUT$,
  $NOTE$Often satisfies natural-science or health-related general-education requirements and supports nursing, allied health, kinesiology, public health, and wellness pathways — clinical dietetics programs may require additional coursework; confirm articulation.$NOTE$
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
  learning_outcomes = EXCLUDED.learning_outcomes,
  general_education_note = EXCLUDED.general_education_note,
  updated_at = now();
