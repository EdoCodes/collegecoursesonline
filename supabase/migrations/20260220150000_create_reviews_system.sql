/*
 # Course Reviews System

 ## Overview
 Creates the database schema for user reviews and ratings of courses.
 Supports moderation, helpful voting, and aggregate rating calculations.

 ## New Tables

 ### 1. `course_reviews`
 Stores user reviews and ratings for courses.
 - `id` (uuid, primary key) - Unique identifier
 - `course_id` (uuid, foreign key) - Reference to course being reviewed
 - `user_name` (text) - Reviewer's name
 - `user_email` (text) - Reviewer's email (not displayed publicly)
 - `rating` (integer) - Star rating 1-5
 - `review_title` (text) - Short review headline
 - `review_text` (text) - Detailed review content
 - `verified_enrollment` (boolean) - Whether enrollment was verified
 - `enrollment_date` (date) - When they took the course
 - `helpful_count` (integer) - Number of helpful votes
 - `not_helpful_count` (integer) - Number of not-helpful votes
 - `status` (text) - pending, approved, rejected, spam
 - `moderated_by` (uuid) - Admin who moderated (if any)
 - `moderated_at` (timestamptz) - When it was moderated
 - `created_at` (timestamptz) - Submission timestamp
 - `updated_at` (timestamptz) - Last update timestamp

 ### 2. `review_helpful_votes`
 Tracks which users found reviews helpful (prevent duplicate votes).
 - `id` (uuid, primary key)
 - `review_id` (uuid, foreign key)
 - `user_identifier` (text) - IP hash or user ID
 - `vote_type` (text) - helpful or not_helpful
 - `created_at` (timestamptz)

 ## Views

 ### `course_ratings_summary`
 Aggregate view for course ratings statistics.

 ## Security
 - Enable RLS on all tables
 - Public can read approved reviews
 - Public can submit reviews (pending approval)
 - Only admins can moderate

 ## Indexes
 - Course ID for fast lookups
 - Status for moderation queue
 - Rating for sorting
 - Created date for chronological sorting
*/

-- Create course_reviews table
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

-- Create review_helpful_votes table
CREATE TABLE IF NOT EXISTS review_helpful_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id uuid REFERENCES course_reviews(id) ON DELETE CASCADE NOT NULL,
  user_identifier text NOT NULL,
  vote_type text NOT NULL CHECK (vote_type IN ('helpful', 'not_helpful')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(review_id, user_identifier)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_reviews_course_id ON course_reviews(course_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON course_reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON course_reviews(rating DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_created ON course_reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_helpful ON course_reviews(helpful_count DESC);
CREATE INDEX IF NOT EXISTS idx_helpful_votes_review ON review_helpful_votes(review_id);

-- Enable Row Level Security
ALTER TABLE course_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_helpful_votes ENABLE ROW LEVEL SECURITY;

-- Policies for course_reviews

-- Anyone can read approved reviews
CREATE POLICY "Public read access for approved reviews"
  ON course_reviews FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

-- Anyone can submit a review (will be pending)
CREATE POLICY "Public can submit reviews"
  ON course_reviews FOR INSERT
  TO anon, authenticated
  WITH CHECK (status = 'pending');

-- Only authenticated users with admin role can update reviews
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

-- Policies for review_helpful_votes

-- Anyone can read votes (for checking if they already voted)
CREATE POLICY "Public read access for votes"
  ON review_helpful_votes FOR SELECT
  TO anon, authenticated
  USING (true);

-- Anyone can submit a vote
CREATE POLICY "Public can vote on reviews"
  ON review_helpful_votes FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create view for course ratings summary
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

-- Function to update helpful counts when votes change
CREATE OR REPLACE FUNCTION update_review_helpful_counts()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE course_reviews
  SET 
    helpful_count = (
      SELECT COUNT(*) FROM review_helpful_votes 
      WHERE review_id = NEW.review_id AND vote_type = 'helpful'
    ),
    not_helpful_count = (
      SELECT COUNT(*) FROM review_helpful_votes 
      WHERE review_id = NEW.review_id AND vote_type = 'not_helpful'
    )
  WHERE id = NEW.review_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating helpful counts
DROP TRIGGER IF EXISTS update_helpful_counts_trigger ON review_helpful_votes;
CREATE TRIGGER update_helpful_counts_trigger
  AFTER INSERT OR DELETE ON review_helpful_votes
  FOR EACH ROW
  EXECUTE FUNCTION update_review_helpful_counts();

-- Update trigger for updated_at timestamp on reviews
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON course_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to get average rating for a course (useful for queries)
CREATE OR REPLACE FUNCTION get_course_average_rating(course_uuid uuid)
RETURNS numeric AS $$
  SELECT COALESCE(AVG(rating)::numeric(3,2), 0)
  FROM course_reviews
  WHERE course_id = course_uuid AND status = 'approved';
$$ LANGUAGE sql STABLE;

-- Function to get review count for a course
CREATE OR REPLACE FUNCTION get_course_review_count(course_uuid uuid)
RETURNS integer AS $$
  SELECT COUNT(*)::integer
  FROM course_reviews
  WHERE course_id = course_uuid AND status = 'approved';
$$ LANGUAGE sql STABLE;

-- Add helpful comments
COMMENT ON TABLE course_reviews IS 'User reviews and ratings for online courses';
COMMENT ON TABLE review_helpful_votes IS 'Tracks helpful votes on reviews to prevent duplicates';
COMMENT ON VIEW course_ratings_summary IS 'Aggregate statistics for course ratings';
