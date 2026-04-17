-- List price for all Sophia Learning courses: $99/month membership (not “Free trial”).

UPDATE courses c
SET
  price = '$99',
  price_numeric = 99,
  updated_at = now()
FROM colleges col
WHERE c.college_id = col.id
  AND col.slug = 'sophia-learning';
