-- StraighterLine Medical Terminology (MEDTERM101) — https://www.straighterline.com/online-college-courses/medical-terminology/
-- ACE code OOSL-0022 (2025). Category: Health. Card image: /images/courses/straighterline-medical-terminology.png (student in scrubs — Konrad’s Photo Pexels 32336390)

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
  'Medical Terminology (MEDTERM101)',
  'straighterline-medical-terminology',
  $DESC$StraighterLine Medical Terminology (MEDTERM101) is ACE Credit–recommended (course code OOSL-0022) for 3 semester credits. You will learn word parts—prefixes, suffixes, roots—and correct spelling and pronunciation orientation as presented; directional, regional, and planar anatomical language; terminology mapped to major organ systems from integumentary through reproductive and obstetrics themes; common diseases, disorders, and procedures by system; diagnostic vocabulary spanning imaging and laboratory contexts; and practice interpreting brief clinical-style passages and scenarios using consistent nomenclature. Adapted readings are integrated (Pressbooks adaptation from Carter & Rutherford and Betts et al.). Seventeen checkpoints plus benchmarks and capstones with an open-book final; calculators not used. No prerequisites. Membership required; transcript delivery included. Taught by Dr. L. Confirm transfer with your registrar.$DESC$,
  'ACE-recommended Medical Terminology — 3 credits, word parts & body systems, clinical vocabulary. $79/course + membership (StraighterLine). Common nursing/allied-health prereq; verify transfer.',
  'https://www.straighterline.com/online-college-courses/medical-terminology/',
  '/images/courses/straighterline-medical-terminology.png',
  'Self-paced (~22 days avg)',
  'Introductory',
  '$79',
  79,
  true,
  '3 credits (ACE-recommended)',
  false,
  'Medical Terminology',
  $OUT$Break down unfamiliar medical terms using prefixes, suffixes, and combining forms.
Associate terminology with organ systems and describe relative positions using standard anatomical language.
Summarize common pathologies, procedures, and diagnostics using appropriate clinical vocabulary.
Apply terms in context through case-style prompts and short interpretive exercises.
Prepare for downstream anatomy, physiology, and clinical coursework with a consistent naming framework.$OUT$,
  $NOTE$Widely required or recommended early in nursing, medical assisting, radiography, therapy, and other allied-health programs; some schools accept a single terminology course while others embed vocabulary in A&P — confirm your catalog.$NOTE$
FROM colleges c
CROSS JOIN course_categories cat
WHERE c.slug = 'straighterline' AND cat.slug = 'health'
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
