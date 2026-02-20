/*
  # Add Search and Rating Features

  ## Overview
  Enhances the online courses directory with comprehensive search and rating capabilities.
  Adds fields for popularity metrics, cost analysis, ease of access, and accreditation ratings.

  ## Schema Changes

  ### 1. Colleges Table Additions
  - `popularity_score` (integer) - Calculated popularity score based on multiple factors
  - `average_cost` (numeric) - Average cost of courses in USD
  - `ease_of_access_score` (integer) - Rating 1-5 for enrollment ease
  - `accreditation_level` (text) - Type of accreditation (Regional, National, International)
  - `total_courses` (integer) - Count of courses offered

  ### 2. Course Categories Additions
  - `course_count` (integer) - Number of courses in this category

  ### 3. Courses Table Additions
  - `price_numeric` (numeric) - Numeric price value for sorting
  - `enrollment_difficulty` (integer) - Rating 1-5 (1=easiest, 5=hardest)

  ## New Indexes
  - Search optimization for course titles and college names
  - Sorting indexes for ratings and prices
  - Category-based search indexes

  ## Important Notes
  - All new fields have sensible defaults
  - Maintains backward compatibility with existing data
  - Indexes optimize common search and sort operations
*/

-- Add new columns to colleges table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'colleges' AND column_name = 'popularity_score'
  ) THEN
    ALTER TABLE colleges ADD COLUMN popularity_score integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'colleges' AND column_name = 'average_cost'
  ) THEN
    ALTER TABLE colleges ADD COLUMN average_cost numeric(10,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'colleges' AND column_name = 'ease_of_access_score'
  ) THEN
    ALTER TABLE colleges ADD COLUMN ease_of_access_score integer DEFAULT 3;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'colleges' AND column_name = 'accreditation_level'
  ) THEN
    ALTER TABLE colleges ADD COLUMN accreditation_level text DEFAULT 'Regional';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'colleges' AND column_name = 'total_courses'
  ) THEN
    ALTER TABLE colleges ADD COLUMN total_courses integer DEFAULT 0;
  END IF;
END $$;

-- Add new columns to course_categories table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'course_categories' AND column_name = 'course_count'
  ) THEN
    ALTER TABLE course_categories ADD COLUMN course_count integer DEFAULT 0;
  END IF;
END $$;

-- Add new columns to courses table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'courses' AND column_name = 'price_numeric'
  ) THEN
    ALTER TABLE courses ADD COLUMN price_numeric numeric(10,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'courses' AND column_name = 'enrollment_difficulty'
  ) THEN
    ALTER TABLE courses ADD COLUMN enrollment_difficulty integer DEFAULT 3;
  END IF;
END $$;

-- Create indexes for search and sorting
CREATE INDEX IF NOT EXISTS idx_colleges_popularity ON colleges(popularity_score DESC);
CREATE INDEX IF NOT EXISTS idx_colleges_cost ON colleges(average_cost);
CREATE INDEX IF NOT EXISTS idx_colleges_ease_of_access ON colleges(ease_of_access_score DESC);
CREATE INDEX IF NOT EXISTS idx_colleges_accreditation ON colleges(accreditation_level);
CREATE INDEX IF NOT EXISTS idx_colleges_name_search ON colleges USING gin(to_tsvector('english', name));

CREATE INDEX IF NOT EXISTS idx_courses_price_numeric ON courses(price_numeric);
CREATE INDEX IF NOT EXISTS idx_courses_enrollment_difficulty ON courses(enrollment_difficulty);
CREATE INDEX IF NOT EXISTS idx_courses_views ON courses(views_count DESC);

CREATE INDEX IF NOT EXISTS idx_categories_course_count ON course_categories(course_count DESC);

-- Create a function to update college statistics
CREATE OR REPLACE FUNCTION update_college_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE colleges
  SET 
    total_courses = (
      SELECT COUNT(*) FROM courses WHERE college_id = NEW.college_id
    ),
    average_cost = (
      SELECT AVG(price_numeric) FROM courses WHERE college_id = NEW.college_id AND price_numeric > 0
    )
  WHERE id = NEW.college_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update college stats when courses change
DROP TRIGGER IF EXISTS update_college_stats_trigger ON courses;
CREATE TRIGGER update_college_stats_trigger
  AFTER INSERT OR UPDATE OR DELETE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_college_stats();

-- Create a function to update category course counts
CREATE OR REPLACE FUNCTION update_category_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    UPDATE course_categories
    SET course_count = (
      SELECT COUNT(*) FROM courses WHERE category_id = OLD.category_id
    )
    WHERE id = OLD.category_id;
    RETURN OLD;
  ELSE
    UPDATE course_categories
    SET course_count = (
      SELECT COUNT(*) FROM courses WHERE category_id = NEW.category_id
    )
    WHERE id = NEW.category_id;
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update category stats when courses change
DROP TRIGGER IF EXISTS update_category_stats_trigger ON courses;
CREATE TRIGGER update_category_stats_trigger
  AFTER INSERT OR UPDATE OR DELETE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_category_stats();