-- Study.com Introduction to Business — https://study.com/academy/course/intro-to-business.html
-- Category: Business. Card image: /images/courses/study-com-intro-to-business.jpg (business desk/workspace — Darina Belonogova Pexels 8373993)

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
  'Introduction to Business',
  'study-com-intro-to-business',
  $DESC$Study.com Introduction to Business surveys the foundations of commerce and organizations: economic systems and business ethics, entrepreneurship and small business basics, forms of ownership, management functions (planning, organizing, leading, controlling), operations and quality, human resources themes, marketing fundamentals (segmentation, targeting, positioning, promotion), accounting and finance literacy for managers, financial markets and investing orientation, international business introduction, information systems and analytics awareness, legal and regulatory context, and career-ready communication of business concepts. Video lessons, practice, and assessments align with an introductory undergraduate business overview. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended Intro to Business on Study.com — management, marketing, finance literacy, entrepreneurship. College Accelerator subscription. Verify transfer at your school.',
  'https://study.com/academy/course/intro-to-business.html',
  '/images/courses/study-com-intro-to-business.jpg',
  'Self-paced',
  'Introductory',
  '$95/mo',
  95,
  true,
  'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'Introduction to Business',
  $OUT$Explain core business concepts across functional areas using appropriate vocabulary.
Describe tradeoffs among ownership structures, ethical lenses, and stakeholder expectations.
Identify how marketing, operations, HR, accounting, finance, and IT interconnect in organizations.
Interpret introductory financial statements and basic metrics used in managerial decisions.
Apply frameworks from the course to simple business scenarios and cases.$OUT$,
  $NOTE$Common first course for business minors and majors and often satisfies breadth or exploratory requirements — accounting/finance-heavy programs may sequence specialized courses afterward; confirm articulation.$NOTE$
FROM colleges c
CROSS JOIN course_categories cat
WHERE c.slug = 'study-com' AND cat.slug = 'business'
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
