-- Directory policy: only StraighterLine and Sophia Learning course listings.
-- Reviews cascade via course_reviews ON DELETE CASCADE.
DELETE FROM courses
WHERE college_id NOT IN (
  SELECT id FROM colleges WHERE slug IN ('straighterline', 'sophia-learning')
);
