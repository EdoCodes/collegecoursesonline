-- Remove listing: JHU Coursera Public Health Fundamentals (reviews cascade via ON DELETE CASCADE)
DELETE FROM courses
WHERE slug = 'public-health-fundamentals';
