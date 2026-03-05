-- ============================================================
-- SAFE COMBINED MIGRATION - Run this in Supabase SQL Editor
-- Uses IF NOT EXISTS and DROP ... IF EXISTS throughout
-- Safe to run even if tables/triggers already exist
-- ============================================================

-- ============================================================
-- MIGRATION 1: Core Schema
-- ============================================================

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

CREATE TABLE IF NOT EXISTS course_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  icon text DEFAULT '📚',
  created_at timestamptz DEFAULT now()
);

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

CREATE INDEX IF NOT EXISTS idx_courses_college_id ON courses(college_id);
CREATE INDEX IF NOT EXISTS idx_courses_category_id ON courses(category_id);
CREATE INDEX IF NOT EXISTS idx_courses_featured ON courses(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_colleges_slug ON colleges(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON course_categories(slug);
CREATE INDEX IF NOT EXISTS idx_courses_search ON courses USING gin(to_tsvector('english', title || ' ' || description));

ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'colleges' AND policyname = 'Public read access for colleges') THEN
    CREATE POLICY "Public read access for colleges" ON colleges FOR SELECT TO anon, authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'course_categories' AND policyname = 'Public read access for categories') THEN
    CREATE POLICY "Public read access for categories" ON course_categories FOR SELECT TO anon, authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'courses' AND policyname = 'Public read access for courses') THEN
    CREATE POLICY "Public read access for courses" ON courses FOR SELECT TO anon, authenticated USING (true);
  END IF;
END $$;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_colleges_updated_at ON colleges;
CREATE TRIGGER update_colleges_updated_at
  BEFORE UPDATE ON colleges
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_courses_updated_at ON courses;
CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- MIGRATION 2: Search and Rating Features
-- ============================================================

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'colleges' AND column_name = 'popularity_score') THEN
    ALTER TABLE colleges ADD COLUMN popularity_score integer DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'colleges' AND column_name = 'average_cost') THEN
    ALTER TABLE colleges ADD COLUMN average_cost numeric(10,2) DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'colleges' AND column_name = 'ease_of_access_score') THEN
    ALTER TABLE colleges ADD COLUMN ease_of_access_score integer DEFAULT 3;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'colleges' AND column_name = 'accreditation_level') THEN
    ALTER TABLE colleges ADD COLUMN accreditation_level text DEFAULT 'Regional';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'colleges' AND column_name = 'total_courses') THEN
    ALTER TABLE colleges ADD COLUMN total_courses integer DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'course_categories' AND column_name = 'course_count') THEN
    ALTER TABLE course_categories ADD COLUMN course_count integer DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'courses' AND column_name = 'price_numeric') THEN
    ALTER TABLE courses ADD COLUMN price_numeric numeric(10,2) DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'courses' AND column_name = 'enrollment_difficulty') THEN
    ALTER TABLE courses ADD COLUMN enrollment_difficulty integer DEFAULT 3;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_colleges_popularity ON colleges(popularity_score DESC);
CREATE INDEX IF NOT EXISTS idx_colleges_cost ON colleges(average_cost);
CREATE INDEX IF NOT EXISTS idx_colleges_ease_of_access ON colleges(ease_of_access_score DESC);
CREATE INDEX IF NOT EXISTS idx_colleges_accreditation ON colleges(accreditation_level);
CREATE INDEX IF NOT EXISTS idx_colleges_name_search ON colleges USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_courses_price_numeric ON courses(price_numeric);
CREATE INDEX IF NOT EXISTS idx_courses_enrollment_difficulty ON courses(enrollment_difficulty);
CREATE INDEX IF NOT EXISTS idx_courses_views ON courses(views_count DESC);
CREATE INDEX IF NOT EXISTS idx_categories_course_count ON course_categories(course_count DESC);

CREATE OR REPLACE FUNCTION update_college_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE colleges
  SET 
    total_courses = (SELECT COUNT(*) FROM courses WHERE college_id = NEW.college_id),
    average_cost = (SELECT AVG(price_numeric) FROM courses WHERE college_id = NEW.college_id AND price_numeric > 0)
  WHERE id = NEW.college_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_college_stats_trigger ON courses;
CREATE TRIGGER update_college_stats_trigger
  AFTER INSERT OR UPDATE OR DELETE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_college_stats();

CREATE OR REPLACE FUNCTION update_category_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    UPDATE course_categories SET course_count = (SELECT COUNT(*) FROM courses WHERE category_id = OLD.category_id) WHERE id = OLD.category_id;
    RETURN OLD;
  ELSE
    UPDATE course_categories SET course_count = (SELECT COUNT(*) FROM courses WHERE category_id = NEW.category_id) WHERE id = NEW.category_id;
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_category_stats_trigger ON courses;
CREATE TRIGGER update_category_stats_trigger
  AFTER INSERT OR UPDATE OR DELETE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_category_stats();

-- ============================================================
-- MIGRATION 3: Reviews System
-- ============================================================

CREATE TABLE IF NOT EXISTS course_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  user_name text NOT NULL,
  user_email text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_title text DEFAULT '',
  review_text text NOT NULL CHECK (char_length(review_text) >= 100),
  verified_enrollment boolean DEFAULT false,
  enrollment_date date,
  helpful_count integer DEFAULT 0,
  not_helpful_count integer DEFAULT 0,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'spam')),
  moderated_by uuid,
  moderated_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS review_helpful_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id uuid REFERENCES course_reviews(id) ON DELETE CASCADE NOT NULL,
  user_identifier text NOT NULL,
  vote_type text NOT NULL CHECK (vote_type IN ('helpful', 'not_helpful')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(review_id, user_identifier)
);

CREATE INDEX IF NOT EXISTS idx_reviews_course_id ON course_reviews(course_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON course_reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON course_reviews(rating DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_created ON course_reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_helpful ON course_reviews(helpful_count DESC);
CREATE INDEX IF NOT EXISTS idx_helpful_votes_review ON review_helpful_votes(review_id);

ALTER TABLE course_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_helpful_votes ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'course_reviews' AND policyname = 'Public read access for approved reviews') THEN
    CREATE POLICY "Public read access for approved reviews" ON course_reviews FOR SELECT TO anon, authenticated USING (status = 'approved');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'course_reviews' AND policyname = 'Public can submit reviews') THEN
    CREATE POLICY "Public can submit reviews" ON course_reviews FOR INSERT TO anon, authenticated WITH CHECK (status = 'pending');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'course_reviews' AND policyname = 'Admins can moderate reviews') THEN
    CREATE POLICY "Admins can moderate reviews" ON course_reviews FOR UPDATE TO authenticated
      USING (EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid() AND auth.users.raw_user_meta_data->>'role' = 'admin'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'review_helpful_votes' AND policyname = 'Public read access for votes') THEN
    CREATE POLICY "Public read access for votes" ON review_helpful_votes FOR SELECT TO anon, authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'review_helpful_votes' AND policyname = 'Public can vote on reviews') THEN
    CREATE POLICY "Public can vote on reviews" ON review_helpful_votes FOR INSERT TO anon, authenticated WITH CHECK (true);
  END IF;
END $$;

CREATE OR REPLACE VIEW course_ratings_summary AS
SELECT 
  course_id,
  COUNT(*) as review_count,
  AVG(rating)::numeric(3,2) as average_rating,
  COUNT(CASE WHEN rating = 5 THEN 1 END) as five_star_count,
  COUNT(CASE WHEN rating = 4 THEN 1 END) as four_star_count,
  COUNT(CASE WHEN rating = 3 THEN 1 END) as three_star_count,
  COUNT(CASE WHEN rating = 2 THEN 1 END) as two_star_count,
  COUNT(CASE WHEN rating = 1 THEN 1 END) as one_star_count
FROM course_reviews
WHERE status = 'approved'
GROUP BY course_id;

CREATE OR REPLACE FUNCTION update_review_helpful_counts()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE course_reviews
  SET 
    helpful_count = (SELECT COUNT(*) FROM review_helpful_votes WHERE review_id = NEW.review_id AND vote_type = 'helpful'),
    not_helpful_count = (SELECT COUNT(*) FROM review_helpful_votes WHERE review_id = NEW.review_id AND vote_type = 'not_helpful')
  WHERE id = NEW.review_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_helpful_counts_trigger ON review_helpful_votes;
CREATE TRIGGER update_helpful_counts_trigger
  AFTER INSERT OR DELETE ON review_helpful_votes
  FOR EACH ROW
  EXECUTE FUNCTION update_review_helpful_counts();

DROP TRIGGER IF EXISTS update_reviews_updated_at ON course_reviews;
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON course_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE FUNCTION get_course_average_rating(course_uuid uuid)
RETURNS numeric AS $$
  SELECT COALESCE(AVG(rating)::numeric(3,2), 0)
  FROM course_reviews
  WHERE course_id = course_uuid AND status = 'approved';
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION get_course_review_count(course_uuid uuid)
RETURNS integer AS $$
  SELECT COUNT(*)::integer
  FROM course_reviews
  WHERE course_id = course_uuid AND status = 'approved';
$$ LANGUAGE sql STABLE;
