/**
 * Adds Westcott Courses college + featured math course to Supabase.
 * Run with: node scripts/add-westcott.mjs
 */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://dlxyjoaxyektgqraayfl.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || ''
);

async function run() {
  // 1. Insert Westcott Courses as a college
  console.log('Adding Westcott Courses college...');
  const { data: college, error: collegeErr } = await supabase
    .from('colleges')
    .upsert({
      name: 'Westcott Courses',
      slug: 'westcott-courses',
      description: 'Westcott Courses offers online transferable college-level math and science courses accredited through UMass Global (WSCUC). Students can enroll any day, work at their own pace, and transfer credits to their home university.',
      website_url: 'https://westcottcourses.com',
      logo_url: null,
      accreditation: 'Regional Accreditation (via UMass Global / WSCUC)',
      accreditation_level: 'Regional',
      country: 'USA',
      featured: true,
      popularity_score: 85,
      ease_of_access_score: 96,
    }, { onConflict: 'slug' })
    .select('id, slug')
    .single();

  if (collegeErr) { console.error('College error:', collegeErr.message); process.exit(1); }
  console.log('✅ College added:', college.slug, college.id);

  // 2. Get the Mathematics category id
  const { data: cat } = await supabase
    .from('course_categories')
    .select('id')
    .eq('slug', 'mathematics')
    .single();

  // 3. Insert the featured math course
  console.log('Adding Online College Math Courses...');
  const { data: course, error: courseErr } = await supabase
    .from('courses')
    .upsert({
      college_id: college.id,
      category_id: cat.id,
      title: 'Online College-Level Math Courses',
      slug: 'westcott-online-college-math',
      description: 'Westcott Courses offers a full ladder of transferable and remedial online math courses accredited through UMass Global (regionally accredited by WSCUC). Courses range from Basic Pre-Algebra all the way through Calculus III, Linear Algebra, and Abstract Algebra. Students enroll any day of the year, work at their own pace with 5 months of access, and only the final exam is proctored. Credits transfer to colleges and universities nationwide. 12 of 16 math courses are completely textbook-free.',
      short_description: 'Transferable college math from Pre-Algebra to Calculus III — accredited through UMass Global, self-paced, and mostly textbook-free. Credits transfer nationwide.',
      course_url: 'https://westcottcourses.com/math-courses/',
      image_url: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: 'Self-paced (5 months access)',
      level: 'Beginner',
      price: '$520',
      price_numeric: 520,
      certificate_available: true,
      credits: 'Transferable semester credits',
      featured: true,
    }, { onConflict: 'slug' })
    .select('id, title')
    .single();

  if (courseErr) { console.error('Course error:', courseErr.message); process.exit(1); }
  console.log('✅ Course added:', course.title);
  console.log('\n🎉 Done! Westcott math course is now in Supabase.');
  console.log('Course URL on your site: /courses/westcott-online-college-math');
}

run().catch(err => { console.error(err); process.exit(1); });
