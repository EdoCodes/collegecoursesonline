-- Study.com American Literature — https://study.com/academy/course/american-literature-course.html
-- Category: Humanities. Card image: /images/courses/study-com-american-literature.png

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
  'American Literature',
  'study-com-american-literature',
  $DESC$Study.com American Literature surveys major U.S. authors, movements, and themes from the colonial period through the modern era: early American writing, Romanticism, Transcendentalism, Realism, Naturalism, Modernism, Harlem Renaissance, and contemporary voices. You will read and interpret fiction, poetry, drama, and essays; place works in historical and cultural context; and build skills in close reading, analysis, and written argument. Video lessons, readings, practice, and assessments fit a college-level American literature survey. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.$DESC$,
  'ACE/NCCRS-recommended American Literature on Study.com — U.S. authors, periods, and critical reading. College Accelerator subscription. Verify transfer at your school.',
  'https://study.com/academy/course/american-literature-course.html',
  '/images/courses/study-com-american-literature.png',
  'Self-paced',
  'Introductory',
  '$95/mo',
  95,
  true,
  'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'American Literature',
  $OUT$Trace key periods, authors, and movements in U.S. literary history.
Explore major works in fiction, poetry, drama, and nonfiction with close reading.
Connect texts to cultural, social, and historical contexts in American life.
Support interpretive claims with evidence and clear academic writing.
Compare themes, styles, and perspectives across authors and eras.$OUT$,
  $NOTE$Often fulfills humanities or literature breadth requirements and is widely taken by English majors, liberal arts transfer paths, secondary-education English tracks, journalism and communications minors, and students satisfying arts & humanities gen-ed — confirm each school’s catalog and transfer rules.$NOTE$
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
