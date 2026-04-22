-- StraighterLine Microeconomics (ECON102) — https://www.straighterline.com/online-college-courses/microeconomics/
-- ACE code OOSL-0008 (2025). Category: Business. Card image: /images/courses/straighterline-microeconomics.png (notes — competitive pricing — Pixabay 262470)

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
  'Microeconomics (ECON102)',
  'straighterline-microeconomics',
  $DESC$StraighterLine Microeconomics (ECON102) is ACE Credit–recommended (course code OOSL-0008) for 3 semester credits. You will apply the economic way of thinking—scarcity, opportunity cost, marginal analysis, specialization, and production possibilities; build and interpret supply-and-demand models; study elasticity, utility, and consumer choice; analyze production, costs, and perfectly competitive supply; evaluate market efficiency and exchange; compare market structures including pure competition, monopoly, oligopoly, and monopolistic competition with attention to strategic behavior and game theory; examine market failures, externalities, and behavioral-economics themes as presented; and connect price elasticity to firm profitability across structures. Includes digital textbook (Frank et al., Principles of Microeconomics, 2024 Release, McGraw-Hill). Eleven checkpoints, benchmarks, capstones, and an open-book final; passing typically requires 70% or higher; scientific or graphing calculator allowed. No prerequisites listed. Membership required; free transcript delivery to your school. Taught by Marlo Chavarria. Confirm transfer with your registrar.$DESC$,
  'ACE-recommended Microeconomics — 3 credits, supply & demand, elasticity, market structure, strategic behavior. $79/course + membership (StraighterLine). Pair with macro; verify transfer.',
  'https://www.straighterline.com/online-college-courses/microeconomics/',
  '/images/courses/straighterline-microeconomics.png',
  'Self-paced (~31 days avg)',
  'Introductory',
  '$79',
  79,
  true,
  '3 credits (ACE-recommended)',
  false,
  'Microeconomics',
  $OUT$Explain scarcity-driven tradeoffs using opportunity cost, marginal reasoning, and basic market models.
Predict price and quantity effects using supply-and-demand shifts and elasticity intuition.
Describe firm-level production, cost curves, and competitive versus imperfect market outcomes.
Analyze efficiency, externalities, and introductory strategic interaction in oligopoly-style settings.
Interpret course graphs and quantitative prompts typical of introductory microeconomics assessments.$OUT$,
  $NOTE$Often fulfills social-science or economics breadth for business, finance, policy, and liberal arts majors; sequencing with macroeconomics varies — confirm whether your program requires micro first.$NOTE$
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
