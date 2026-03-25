-- Add subcategory column to courses table
ALTER TABLE courses ADD COLUMN IF NOT EXISTS subcategory text;

-- Add index for fast filtering
CREATE INDEX IF NOT EXISTS idx_courses_subcategory ON courses(subcategory);
