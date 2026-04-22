-- StraighterLine Early Childhood Development (ECE102) — https://www.straighterline.com/online-college-courses/early-childhood-development/
-- ACE code OOSL-0117 (2025). Category: Education. Card image: /images/courses/straighterline-early-childhood-development.png (toddler play — cottonbro studio Pexels 3661339)

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
  'Early Childhood Development (ECE102)',
  'straighterline-early-childhood-development',
  $DESC$StraighterLine Early Childhood Development (ECE102) is ACE Credit–recommended (course code OOSL-0117) for 3 semester credits. Framed through educational psychology, you will trace biological, cognitive, and socioemotional changes from conception through early childhood; compare theories of development and language acquisition; examine families, peers, and schools as contexts for learning; connect classical and operant conditioning and behavior-analytic ideas to classroom practice; study attention, memory, and information-processing perspectives; explore social constructivist teaching and collaborative learning; analyze literacy, mathematics, and content-area instruction developmentally; contrast teacher-centered and learner-centered models and responsible uses of instructional technology; and discuss motivation and sociocultural supports for achievement. Uses Santrock, Educational Psychology (7th ed., McGraw-Hill, 2021), included digitally. Nine checkpoints, benchmarks, capstones, and an open-book cumulative benchmark; passing typically requires 70% or higher. No prerequisites. Membership required; transcript delivery included. Confirm transfer with your registrar.$DESC$,
  'ACE-recommended Early Childhood Development — 3 credits, development theories & PreK–elem teaching implications. $79/course + membership (StraighterLine). Education majors; verify transfer.',
  'https://www.straighterline.com/online-college-courses/early-childhood-development/',
  '/images/courses/straighterline-early-childhood-development.png',
  'Self-paced (~25 days avg)',
  'Introductory',
  '$79',
  79,
  true,
  '3 credits (ACE-recommended)',
  false,
  'Early Childhood Education',
  $OUT$Explain patterns of cognitive, language, and socioemotional growth using major developmental frameworks from the course.
Relate learning science concepts—including attention, memory, and motivation—to age-appropriate instructional choices.
Compare behavioral, social constructivist, and information-processing perspectives on how young children learn.
Evaluate developmentally appropriate strategies for literacy, mathematics, and broader elementary curriculum themes.
Apply course ideas to scenarios involving families, peers, classroom management, and educational technology.$OUT$,
  $NOTE$Common for elementary education, early childhood education, and child-development minors; licensure programs may require additional field experiences — confirm how this credit maps to your teacher-prep checklist.$NOTE$
FROM colleges c
CROSS JOIN course_categories cat
WHERE c.slug = 'straighterline' AND cat.slug = 'education'
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
