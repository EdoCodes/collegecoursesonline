-- Study.com Analyzing and Interpreting Literature — https://study.com/academy/course/analyzing-and-interpreting-literature.html
-- Category: Humanities. Requires migration 20260423120000 (learning_outcomes columns) applied first.

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
  'Analyzing and Interpreting Literature',
  'study-com-analyzing-and-interpreting-literature',
  $DESC$Study.com Analyzing & Interpreting Literature develops close-reading skills across poetry, drama, fiction, and nonfiction: figurative language, symbolism, imagery, tone, characterization, narrative structure, conflict, theme, historical and cultural context, and introductory critical approaches to texts from multiple periods and traditions. Video lessons, readings, practice, and assessments align with a college-level literature survey emphasizing interpretation and evidence-based analysis. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended literature analysis course on Study.com — close reading, genres, themes, and critical interpretation. College Accelerator subscription. Verify transfer at your school.',
  'https://study.com/academy/course/analyzing-and-interpreting-literature.html',
  '/images/courses/study-com-analyzing-and-interpreting-literature.png',
  'Self-paced',
  'Introductory',
  '$95/mo',
  95,
  true,
  'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'Analyzing and Interpreting Literature',
  $OUT$Interpret poetry, prose, drama, and excerpts using close-reading strategies.
Identify figurative language, symbolism, imagery, tone, voice, and point of view.
Analyze character, conflict, plot structure, setting, and theme within context.
Situate readings within genre conventions and broader literary traditions.
Develop evidence-based interpretations supported by quotations and analysis.$OUT$,
  $NOTE$Often fulfills humanities or literature breadth general-education requirements and is commonly taken alongside English majors, liberal arts pathways, journalism and communications minors, secondary-education English tracks, and transfer students needing introductory literature analysis — verify your articulation agreement.$NOTE$
FROM colleges c
CROSS JOIN course_categories cat
WHERE c.slug = 'study-com' AND cat.slug = 'humanities'
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
