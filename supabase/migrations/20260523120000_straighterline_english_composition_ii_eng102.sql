-- StraighterLine English Composition II (ENG102) — https://www.straighterline.com/online-college-courses/english-composition-ii/
-- ACE code OOSL-0006 (2025). Category: Humanities. Card image: /images/courses/straighterline-english-composition-ii.jpg (desk study — Tima Miroshnichenko Pexels 6549600)

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
  'English Composition II (ENG102)',
  'straighterline-english-composition-ii',
  $DESC$StraighterLine English Composition II (ENG102) is ACE Credit–recommended (course code OOSL-0006) for 3 semester credits and emphasizes academic argumentation and researched writing. You will formulate clear, contestable claims; locate and critically evaluate scholarly and credible popular sources; synthesize multiple perspectives into coherent positions; design outlines that marshal reasons and evidence; compose extended argumentative essays with appropriate tone and style for academic audiences; document sources with Modern Language Association (MLA) in-text citations and works-cited conventions; build annotated bibliographies; and craft counterarguments and rebuttals that engage opposing views fairly. Progressive capstone-style assignments refine focus and revision across the term; one checkpoint supports skill-building. While no formal prerequisite is listed, completing English Composition I (ENG101) first is strongly recommended. Membership required; passing typically 70% or higher; transcript delivery included. Taught by Dr. Melanie Glennon. Confirm transfer with your registrar.$DESC$,
  'ACE-recommended English Comp II — 3 credits, research argument & synthesis, MLA. $79/course + membership (StraighterLine). Usually after Comp I; verify transfer.',
  'https://www.straighterline.com/online-college-courses/english-composition-ii/',
  '/images/courses/straighterline-english-composition-ii.jpg',
  'Self-paced (~24 days avg)',
  'Intermediate',
  '$79',
  79,
  true,
  '3 credits (ACE-recommended)',
  false,
  'English Composition II',
  $OUT$Construct thesis-driven arguments that integrate logical structure with appropriately qualified claims.
Locate, vet, and synthesize sources to support extended research-based essays and annotated bibliographies.
Apply MLA documentation consistently for quotations, paraphrases, and references.
Respond to objections with structured counterargument and rebuttal appropriate to discipline norms.
Reflect on drafting and revision strategies to strengthen clarity, cohesion, and academic tone.$OUT$,
  $NOTE$Often fulfills second-semester composition or upper-level writing requirements; schools differ on whether online Comp II substitutes for campus “writing-intensive” requirements — confirm your degree plan.$NOTE$
FROM colleges c
CROSS JOIN course_categories cat
WHERE c.slug = 'straighterline' AND cat.slug = 'humanities'
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
