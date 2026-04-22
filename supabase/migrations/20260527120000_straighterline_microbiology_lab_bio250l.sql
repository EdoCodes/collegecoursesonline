-- StraighterLine Microbiology Lab (BIO250L) — https://www.straighterline.com/online-college-courses/microbiology-lab/
-- ACE code OOSL-0086 (2025). Category: Natural Sciences. Card image: /images/courses/straighterline-microbiology-lab.jpg (microscope slide — Pixabay 256262)

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
  'Microbiology Lab (BIO250L)',
  'straighterline-microbiology-lab',
  $DESC$StraighterLine Microbiology Lab (BIO250L) is ACE Credit–recommended (course code OOSL-0086) for 1 semester credit as a standalone lab paired with StraighterLine’s lecture Microbiology (BIO250)—concurrent enrollment strongly encouraged. Delivered through Science Interactive (formerly eScience Labs), you complete at-home experiments using kit SI-11070-MB-01 (sold separately through Science Interactive; typically about $265 plus shipping—confirm current pricing after enrollment). Modules cover laboratory safety and virtual microscopy orientation, microbiology preparation and incubation practices, quantitative reasoning about microbial populations, culture and selective media concepts, microbial growth control, fermented-food themes, biochemical identification approaches, staining and morphology of bacteria, selective and differential media interpretation, environmental/fomite transmission reasoning, and food-safety considerations. Four checkpoints and nine capstone-style lab activities plus recording and analysis assignments; passing typically requires 70% or higher. Suggested preparation: introductory biology lecture and lab; membership required alongside course tuition. Taught by Jenilyn Mulkey (MS, MLS). Confirm transfer with your registrar.$DESC$,
  'ACE-recommended Microbiology Lab — 1 credit, at-home kit (sold separately ~$265+shipping). $69 course + membership (StraighterLine). Pair with BIO250 lecture; verify nursing/lab acceptance.',
  'https://www.straighterline.com/online-college-courses/microbiology-lab/',
  '/images/courses/straighterline-microbiology-lab.jpg',
  'Self-paced (~30 days avg)',
  'Intermediate',
  '$69',
  69,
  true,
  '1 credit (ACE-recommended)',
  false,
  'Microbiology Lab',
  $OUT$Describe major groups of microorganisms and explain how samples can be enumerated or compared quantitatively.
Perform safe culturing, isolation, and basic identification workflows appropriate to home-lab exercises.
Interpret selective and differential media results and relate them to microbial metabolism and ecology.
Apply aseptic technique, staining, and morphology observations to distinguish common bacterial patterns.
Communicate experimental design, controls, and results using accurate microbiology vocabulary.$OUT$,
  $NOTE$Commonly bundled with microbiology lecture for nursing and allied-health prerequisites; programs differ on accepting online/at-home labs—confirm with your school before purchasing the kit.$NOTE$
FROM colleges c
CROSS JOIN course_categories cat
WHERE c.slug = 'straighterline' AND cat.slug = 'science'
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
