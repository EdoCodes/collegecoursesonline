-- StraighterLine Introduction to Marketing (BUS102) — https://www.straighterline.com/online-college-courses/introduction-to-marketing/
-- ACE code OOSL-0124 (2025). Category: Business / Marketing. Card image: /images/courses/straighterline-introduction-to-marketing.png (Pexels Kindel Media 7688102)

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
  'Introduction to Marketing (BUS102)',
  'straighterline-introduction-to-marketing',
  $DESC$StraighterLine Introduction to Marketing (BUS102) is ACE Credit–recommended (course code OOSL-0124) for 3 semester credits. Using Hunt et al., Marketing, 4th ed. (McGraw-Hill, 2024), you will explore core marketing principles, consumer behavior, branding, digital and social media, segmentation and targeting, pricing, retailing, personal selling, CRM, and sustainable marketing—with real-world cases and simulations. Twelve checkpoints, four benchmarks, and two capstones build from “why marketing matters” through strategic planning, product life cycle, STP, promotion mix, pricing, retailing, digital marketing, branding, CRM, and CSR; passing typically requires 70% or higher. No prerequisites. Membership required; digital textbook included; free transcript delivery. StraighterLine reports a 98% average pass rate and ~28-day average completion for courses; confirm transfer with your registrar.$DESC$,
  'ACE-recommended Intro to Marketing — 3 credits, strategy through digital & CRM. $79/course + membership (StraighterLine). Business core or elective; verify transfer.',
  'https://www.straighterline.com/online-college-courses/introduction-to-marketing/',
  '/images/courses/straighterline-introduction-to-marketing.png',
  'Self-paced (~28 days avg)',
  'Introductory',
  '$79',
  79,
  true,
  '3 credits (ACE-recommended)',
  false,
  'Marketing',
  $OUT$Define marketing and explain its role in creating value for customers and society.
Discuss strategic planning, the marketing plan, and basic tools for situation analysis and strategy.
Understand the product life cycle and implications for marketing strategy.
Identify segmentation criteria and targeting approaches; analyze promotional tools and pricing strategies.
Analyze benefits and challenges of digital and social media marketing; explain CRM and customer loyalty.
Describe sustainable marketing practices and corporate social responsibility in a global context.$OUT$,
  $NOTE$Often satisfies introductory marketing, business core, or elective requirements; confirm whether BUS102 meets a specific program rule versus a general elective at your institution.$NOTE$
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
