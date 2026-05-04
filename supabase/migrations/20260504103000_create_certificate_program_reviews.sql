/*
 # Certificate Program Reviews System
 Parallel to `course_reviews`, but keyed by `program_slug` (static directory entries).
*/

CREATE TABLE IF NOT EXISTS certificate_program_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_slug text NOT NULL,
  program_title text NOT NULL,
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

CREATE TABLE IF NOT EXISTS certificate_program_review_helpful_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id uuid REFERENCES certificate_program_reviews(id) ON DELETE CASCADE NOT NULL,
  user_identifier text NOT NULL,
  vote_type text NOT NULL CHECK (vote_type IN ('helpful', 'not_helpful')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(review_id, user_identifier)
);

CREATE INDEX IF NOT EXISTS idx_program_reviews_slug ON certificate_program_reviews(program_slug);
CREATE INDEX IF NOT EXISTS idx_program_reviews_status ON certificate_program_reviews(status);
CREATE INDEX IF NOT EXISTS idx_program_reviews_created ON certificate_program_reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_program_reviews_helpful ON certificate_program_reviews(helpful_count DESC);
CREATE INDEX IF NOT EXISTS idx_program_votes_review ON certificate_program_review_helpful_votes(review_id);

ALTER TABLE certificate_program_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificate_program_review_helpful_votes ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'certificate_program_reviews' AND policyname = 'Public read access for approved program reviews'
  ) THEN
    CREATE POLICY "Public read access for approved program reviews"
      ON certificate_program_reviews FOR SELECT
      TO anon, authenticated
      USING (status = 'approved');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'certificate_program_reviews' AND policyname = 'Public can submit program reviews'
  ) THEN
    CREATE POLICY "Public can submit program reviews"
      ON certificate_program_reviews FOR INSERT
      TO anon, authenticated
      WITH CHECK (status = 'pending');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'certificate_program_reviews' AND policyname = 'Admins can moderate program reviews'
  ) THEN
    CREATE POLICY "Admins can moderate program reviews"
      ON certificate_program_reviews FOR UPDATE
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM auth.users
          WHERE auth.users.id = auth.uid()
          AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'certificate_program_review_helpful_votes' AND policyname = 'Public read access for program review votes'
  ) THEN
    CREATE POLICY "Public read access for program review votes"
      ON certificate_program_review_helpful_votes FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'certificate_program_review_helpful_votes' AND policyname = 'Public can vote on program reviews'
  ) THEN
    CREATE POLICY "Public can vote on program reviews"
      ON certificate_program_review_helpful_votes FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
  END IF;
END $$;

