-- Align College Composition card with bundled site asset (same Pexels photo ID 29242209 as Cursor attachment).
UPDATE courses
SET image_url = '/images/courses/study-com-college-composition.jpg',
    updated_at = now()
WHERE slug = 'study-com-college-composition';
