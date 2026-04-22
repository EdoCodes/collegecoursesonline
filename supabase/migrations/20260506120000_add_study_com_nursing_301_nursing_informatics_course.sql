-- Study.com Nursing 301: Nursing Informatics — https://study.com/academy/course/nursing-301-nursing-informatics.html
-- Category: Health & Medicine. Card image: /images/courses/study-com-nursing-301-nursing-informatics.jpg (data/care — Ron Lach Pexels 9783364)

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
  'Nursing 301: Nursing Informatics',
  'study-com-nursing-301-nursing-informatics',
  $DESC$Study.com Nursing Informatics examines how information technology supports safe, efficient nursing practice and healthcare delivery: electronic health records (EHR), standardized terminologies (e.g., NANDA, NIC/NOC themes as introduced), clinical decision support, interoperability and health information exchange; privacy, security, HIPAA awareness, and ethical use of data; patient engagement technologies; telehealth and remote monitoring contexts; workflow, usability, and change management when adopting systems; basic data literacy and quality improvement uses of informatics for nursing-sensitive indicators. Video lessons, practice, and assessments align with upper-level undergraduate nursing informatics expectations. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm RN-to-BSN or program requirements and transfer with your institution.$DESC$,
  'ACE/NCCRS-recommended Nursing Informatics on Study.com — EHRs, data ethics, CDS, telehealth themes. College Accelerator subscription. Usually junior/senior nursing; verify transfer.',
  'https://study.com/academy/course/nursing-301-nursing-informatics.html',
  '/images/courses/study-com-nursing-301-nursing-informatics.jpg',
  'Self-paced',
  'Intermediate',
  '$95/mo',
  95,
  true,
  'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
  false,
  'Nursing Informatics',
  $OUT$Explain how clinical information systems support documentation, communication, and care coordination.
Describe privacy, security, and ethical obligations when handling patient-identifiable health information.
Identify opportunities for clinical decision support and quality measurement using standardized data.
Analyze workflow and usability considerations during informatics implementations relevant to nursing.
Apply informatics vocabulary and frameworks to scenarios typical of nursing leadership coursework.$OUT$,
  $NOTE$Common in RN-to-BSN and nursing leadership tracks; acute-care employers increasingly expect informatics literacy — confirm whether your program bundles informatics into capstone or requires a separate clinical practicum.$NOTE$
FROM colleges c
CROSS JOIN course_categories cat
WHERE c.slug = 'study-com' AND cat.slug = 'health'
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
