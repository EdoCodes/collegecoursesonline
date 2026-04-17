-- Remove duplicate Sophia A&P I listing (canonical slug: sophia-anatomy-physiology-1).
-- Reviews cascade-delete with the course.

DELETE FROM courses
WHERE slug = 'sophia-anatomy-and-physiology-1';
