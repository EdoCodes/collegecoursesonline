-- Study.com US History I — https://study.com/academy/course/us-history-i.html
-- Category: Humanities. Card image: /images/courses/study-com-us-history-i.png

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
  'US History I',
  'study-com-us-history-i',
  $DESC$Study.com US History I surveys major themes from early North American societies and European colonization through the American Revolution, Constitution and early republic, territorial expansion, sectional conflict, Civil War and Reconstruction, industrialization and the Gilded Age, and into the Progressive era and United States emergence on the world stage — political, economic, social, and cultural developments that shaped the nation. Video lessons, readings, practice, and assessments align with a first-semester college U.S. history survey. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended US History I on Study.com — colonial era through early 20th century themes. College Accelerator subscription. Verify transfer at your school.',
  'https://study.com/academy/course/us-history-i.html',
  '/images/courses/study-com-us-history-i.png',
  'Self-paced',
  'Introductory',
  '$95/mo',
  95,
  true,
  'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'US History I',
  $OUT$Explain European contact, colonial societies, and the road to independence.
Analyze the Constitution, early republic politics, and territorial expansion.
Interpret sectionalism, Civil War, and Reconstruction causes and consequences.
Describe industrialization, labor, immigration, and reform movements in context.
Trace political, economic, and cultural shifts from the Gilded Age into the Progressive era.$OUT$,
  $NOTE$Almost always satisfies U.S. history or social-science general-education requirements and is standard for history minors, political science, education licensure pathways, liberal arts transfer plans, and many business or social-science majors — compare your transfer matrix and catalog year.$NOTE$
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
