-- StraighterLine English Composition I (ENG101) — https://www.straighterline.com/online-college-courses/english-composition-i/
-- ACE code OOSL-0005. Category: Humanities. Card image: /images/courses/straighterline-english-composition-i.jpg (writing at desk — Tima Miroshnichenko Pexels 6549594)

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
  'English Composition I (ENG101)',
  'straighterline-english-composition-i',
  $DESC$StraighterLine English Composition I (ENG101) is ACE Credit–recommended (course code OOSL-0005) for 3 semester credits. You will move through the writing process in multiple rhetorical modes: a personal narrative; a persuasive letter; a source-based compare-and-contrast essay; and an argumentative essay with counterargument and rebuttal, with attention to audience, purpose, and organization. Instruction stresses thesis clarity, paragraph development, integration and documentation of credible sources using Modern Language Association (MLA) style, analysis of model texts, and revision for clarity, coherence, and correctness. Readings are built from Jeffrey, About Writing: A Guide (rev. ed., Open Oregon). Two graded exercises support skills between major papers. No prerequisites. Membership required; passing typically 70% or higher; free transcript delivery. Taught by Dr. Melanie Glennon. Confirm transfer with your registrar.$DESC$,
  'ACE-recommended English Comp I — 3 credits, narrative through argument, MLA sources. $79/course + membership (StraighterLine). Gen-ed writing; compare to other providers; verify transfer.',
  'https://www.straighterline.com/online-college-courses/english-composition-i/',
  '/images/courses/straighterline-english-composition-i.jpg',
  'Self-paced (~20 days avg)',
  'Introductory',
  '$79',
  79,
  true,
  '3 credits (ACE-recommended)',
  false,
  'English Composition',
  $OUT$Plan, draft, and revise multi-paragraph essays with clear theses and evidence-based support.
Select rhetorical strategies and tone appropriate to audience, purpose, and assignment genre.
Find, evaluate, and integrate sources with in-text citations and a works-cited list in MLA style.
Build effective arguments using claims, reasons, evidence, and response to counterarguments.
Reflect on revision habits to improve clarity, organization, and surface correctness in final drafts.$OUT$,
  $NOTE$Commonly satisfies first-year college writing or general-education English for business, health sciences, education, liberal arts, and STEM pathways; some schools require a specific “second sequence” comp or writing placement — confirm articulation.$NOTE$
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
