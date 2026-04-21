-- Course detail: newline-separated learning outcomes + optional general-education context for majors.
ALTER TABLE courses
  ADD COLUMN IF NOT EXISTS learning_outcomes text,
  ADD COLUMN IF NOT EXISTS general_education_note text;

COMMENT ON COLUMN courses.learning_outcomes IS 'Newline-separated bullets for What You''ll Learn on course detail pages.';
COMMENT ON COLUMN courses.general_education_note IS 'Optional note on typical gen-ed fulfillment and majors; requirements vary by institution.';

-- Seed examples (edit anytime in Supabase); empty courses keep template fallbacks until filled.
UPDATE courses SET
  learning_outcomes = $OUT$Organize informative and persuasive speeches with clear introductions, bodies, and conclusions.
Analyze audiences and tailor message, tone, and evidence appropriately.
Deliver with vocal variety, pacing, eye contact, and confident body language.
Manage speech anxiety using structured practice and preparation routines.
Develop message clarity with outlines, storytelling, and visual aids when suitable.$OUT$,
  general_education_note = $NOTE$Often satisfies oral communication or public speaking general-education requirements. Commonly chosen by liberal arts, business, education, nursing and pre-health, criminal justice, hospitality, communications, and other majors that expect presentation skills — confirm your catalog and transfer pathway.$NOTE$
WHERE slug = 'study-com-public-speaking';

UPDATE courses SET
  learning_outcomes = $OUT$Read literary texts closely for theme, symbolism, imagery, tone, and structure.
Situate writers and movements within historical and cultural contexts.
Analyze poetry, prose, drama, and rhetoric across British and American traditions.
Support interpretations with textual evidence and clear academic writing.
Compare genres and perspectives across literary periods covered in the course.$OUT$,
  general_education_note = $NOTE$Typically aligns with humanities or literature general-education credits. Frequently taken by English, liberal studies, liberal arts transfer, journalism, communications, secondary-education pathways, and students satisfying arts & humanities breadth — verify your receiving institution.$NOTE$
WHERE slug = 'study-com-english-literature';

UPDATE courses SET
  learning_outcomes = $OUT$Plan, draft, and revise thesis-driven essays for college audiences.
Integrate sources with ethical citation practices and summarize others’ ideas accurately.
Adapt tone, organization, and evidence to assignment goals and disciplinary conventions.
Strengthen grammar, mechanics, clarity, and style through revision strategies.
Produce common academic formats expected in introductory college composition.$OUT$,
  general_education_note = $NOTE$College composition is commonly required general education English/writing coursework for nursing, allied health, business, psychology, STEM, liberal arts, and teacher-prep majors; exact equivalents depend on each school’s placement and gen-ed policy.$NOTE$
WHERE slug = 'study-com-college-composition';
