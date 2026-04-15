-- =============================================================================
-- Supabase Storage: image buckets for College Courses Online
-- Use paths inside each bucket like: blog/hero.webp, colleges/snhu-logo.png
-- Public URLs: /storage/v1/object/public/<bucket-id>/<path>
-- =============================================================================

-- Buckets (public = readable without auth via public URL)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  (
    'card-images',
    'card-images',
    true,
    5242880, -- 5 MB
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']::text[]
  ),
  (
    'blog-images',
    'blog-images',
    true,
    5242880,
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']::text[]
  ),
  (
    'college-logos',
    'college-logos',
    true,
    2097152, -- 2 MB
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']::text[]
  )
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Drop policies if re-applying migration
DROP POLICY IF EXISTS "Public read card-images" ON storage.objects;
DROP POLICY IF EXISTS "Public read blog-images" ON storage.objects;
DROP POLICY IF EXISTS "Public read college-logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload card-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload blog-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload college-logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated update card-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated update blog-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated update college-logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete card-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete blog-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete college-logos" ON storage.objects;

-- Anyone can read objects in these buckets (required for <img> on the public site)
CREATE POLICY "Public read card-images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'card-images');

CREATE POLICY "Public read blog-images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'blog-images');

CREATE POLICY "Public read college-logos"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'college-logos');

-- Logged-in users can manage files (e.g. future admin). Service role bypasses RLS for dashboard/API.
CREATE POLICY "Authenticated upload card-images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'card-images');

CREATE POLICY "Authenticated upload blog-images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "Authenticated upload college-logos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'college-logos');

CREATE POLICY "Authenticated update card-images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'card-images');

CREATE POLICY "Authenticated update blog-images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated update college-logos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'college-logos');

CREATE POLICY "Authenticated delete card-images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'card-images');

CREATE POLICY "Authenticated delete blog-images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated delete college-logos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'college-logos');
