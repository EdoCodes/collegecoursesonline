-- Apply if production shows: Could not find the table 'public.course_reviews' in the schema cache
-- Safe to re-run: uses IF NOT EXISTS / DROP IF EXISTS where needed.
-- Requires: public.courses(id uuid) already exists.

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

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

DROP POLICY IF EXISTS "Public read access for approved reviews" ON course_reviews;
CREATE POLICY "Public read access for approved reviews"
  ON course_reviews FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

DROP POLICY IF EXISTS "Public can submit reviews" ON course_reviews;
CREATE POLICY "Public can submit reviews"
  ON course_reviews FOR INSERT
  TO anon, authenticated
  WITH CHECK (status = 'pending');

DROP POLICY IF EXISTS "Admins can moderate reviews" ON course_reviews;
CREATE POLICY "Admins can moderate reviews"
  ON course_reviews FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

DROP POLICY IF EXISTS "Public read access for votes" ON review_helpful_votes;
CREATE POLICY "Public read access for votes"
  ON review_helpful_votes FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Public can vote on reviews" ON review_helpful_votes;
CREATE POLICY "Public can vote on reviews"
  ON review_helpful_votes FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE OR REPLACE VIEW course_ratings_summary AS
SELECT
  course_id,
  COUNT(*) AS review_count,
  AVG(rating)::numeric(3,2) AS average_rating,
  COUNT(*) FILTER (WHERE rating = 5) AS five_star_count,
  COUNT(*) FILTER (WHERE rating = 4) AS four_star_count,
  COUNT(*) FILTER (WHERE rating = 3) AS three_star_count,
  COUNT(*) FILTER (WHERE rating = 2) AS two_star_count,
  COUNT(*) FILTER (WHERE rating = 1) AS one_star_count
FROM course_reviews
WHERE status = 'approved'
GROUP BY course_id;

CREATE OR REPLACE FUNCTION update_review_helpful_counts()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE course_reviews
  SET
    helpful_count = (
      SELECT COUNT(*) FROM review_helpful_votes
      WHERE review_id = COALESCE(NEW.review_id, OLD.review_id) AND vote_type = 'helpful'
    ),
    not_helpful_count = (
      SELECT COUNT(*) FROM review_helpful_votes
      WHERE review_id = COALESCE(NEW.review_id, OLD.review_id) AND vote_type = 'not_helpful'
    )
  WHERE id = COALESCE(NEW.review_id, OLD.review_id);

  RETURN COALESCE(NEW, OLD);
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

GRANT SELECT, INSERT, UPDATE, DELETE ON course_reviews TO postgres, service_role;
GRANT SELECT, INSERT ON course_reviews TO anon, authenticated;
GRANT UPDATE ON course_reviews TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON review_helpful_votes TO postgres, service_role;
GRANT SELECT, INSERT ON review_helpful_votes TO anon, authenticated;

GRANT SELECT ON course_ratings_summary TO anon, authenticated, service_role;

COMMENT ON TABLE course_reviews IS 'User reviews and ratings for online courses';
COMMENT ON TABLE review_helpful_votes IS 'Tracks helpful votes on reviews to prevent duplicates';

-- Hint PostgREST to reload (hosted Supabase usually picks this up automatically)
NOTIFY pgrst, 'reload schema';
