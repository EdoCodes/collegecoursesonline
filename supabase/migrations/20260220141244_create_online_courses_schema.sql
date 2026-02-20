/*
  # Online College Courses Directory Schema

  ## Overview
  Creates the database schema for an online college courses directory platform.
  This schema supports listing courses from multiple colleges and institutions.

  ## New Tables
  
  ### 1. `colleges`
  Stores information about educational institutions offering online courses.
  - `id` (uuid, primary key) - Unique identifier for each college
  - `name` (text) - College/institution name
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - About the institution
  - `logo_url` (text) - URL to college logo
  - `website_url` (text) - Official website
  - `accreditation` (text) - Accreditation information
  - `country` (text) - Country where institution is located
  - `featured` (boolean) - Whether to feature prominently
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `course_categories`
  Organizes courses into subject areas.
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Category name (e.g., "Computer Science")
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Category description
  - `icon` (text) - Icon identifier or emoji
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. `courses`
  Stores individual online course listings.
  - `id` (uuid, primary key) - Unique identifier
  - `college_id` (uuid, foreign key) - Reference to college
  - `category_id` (uuid, foreign key) - Reference to category
  - `title` (text) - Course title
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Course description
  - `short_description` (text) - Brief summary for cards
  - `course_url` (text) - Link to course page
  - `image_url` (text) - Course thumbnail/cover image
  - `duration` (text) - Course duration (e.g., "8 weeks")
  - `level` (text) - Difficulty level (Beginner, Intermediate, Advanced)
  - `price` (text) - Price information (can be "Free" or dollar amount)
  - `certificate_available` (boolean) - Whether certificate is offered
  - `credits` (text) - Academic credits if applicable
  - `featured` (boolean) - Whether to feature prominently
  - `views_count` (integer) - Number of views for popularity
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for all course data (directory is public)
  - No public write access (data managed by admin only)

  ## Indexes
  - Course title and description for full-text search
  - Slug fields for fast lookups
  - Foreign keys for joins
*/

-- Create colleges table
CREATE TABLE IF NOT EXISTS colleges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  logo_url text,
  website_url text,
  accreditation text DEFAULT '',
  country text DEFAULT 'USA',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create course_categories table
CREATE TABLE IF NOT EXISTS course_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  icon text DEFAULT '📚',
  created_at timestamptz DEFAULT now()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id uuid REFERENCES colleges(id) ON DELETE CASCADE,
  category_id uuid REFERENCES course_categories(id) ON DELETE SET NULL,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  short_description text DEFAULT '',
  course_url text,
  image_url text,
  duration text DEFAULT '',
  level text DEFAULT 'Beginner',
  price text DEFAULT 'Free',
  certificate_available boolean DEFAULT false,
  credits text,
  featured boolean DEFAULT false,
  views_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_courses_college_id ON courses(college_id);
CREATE INDEX IF NOT EXISTS idx_courses_category_id ON courses(category_id);
CREATE INDEX IF NOT EXISTS idx_courses_featured ON courses(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_colleges_slug ON colleges(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON course_categories(slug);

-- Enable full-text search on courses
CREATE INDEX IF NOT EXISTS idx_courses_search ON courses USING gin(to_tsvector('english', title || ' ' || description));

-- Enable Row Level Security
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (this is a public directory)
CREATE POLICY "Public read access for colleges"
  ON colleges FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access for categories"
  ON course_categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access for courses"
  ON courses FOR SELECT
  TO anon, authenticated
  USING (true);

-- Update trigger for updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_colleges_updated_at
  BEFORE UPDATE ON colleges
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();