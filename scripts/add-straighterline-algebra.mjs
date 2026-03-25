/**
 * Adds StraighterLine + Introductory Algebra course to Supabase.
 * Run with: node scripts/add-straighterline-algebra.mjs
 */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://dlxyjoaxyektgqraayfl.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || ''
);

async function run() {
  // 1. Insert StraighterLine as a college
  console.log('Adding StraighterLine...');
  const { data: college, error: collegeErr } = await supabase
    .from('colleges')
    .upsert({
      name: 'StraighterLine',
      slug: 'straighterline',
      description: 'StraighterLine offers ACE-recommended online college courses starting at $79. Credits transfer to 3,000+ colleges and universities nationwide, with guaranteed transfer to 180+ partner schools. Self-paced with 24/7 tutoring and free transcript delivery.',
      website_url: 'https://www.straighterline.com',
      logo_url: null,
      accreditation: 'ACE-Recommended (American Council on Education)',
      accreditation_level: 'National',
      country: 'USA',
      featured: false,
      popularity_score: 87,
      ease_of_access_score: 98,
    }, { onConflict: 'slug' })
    .select('id, slug')
    .single();

  if (collegeErr) { console.error('College error:', collegeErr.message); process.exit(1); }
  console.log('✅ College added:', college.slug);

  // 2. Get Mathematics category id
  const { data: cat } = await supabase
    .from('course_categories')
    .select('id')
    .eq('slug', 'mathematics')
    .single();

  // 3. Insert Introductory Algebra course
  console.log('Adding Introductory Algebra (MAT099)...');
  const { data: course, error: courseErr } = await supabase
    .from('courses')
    .upsert({
      college_id: college.id,
      category_id: cat.id,
      title: 'Introductory Algebra (MAT099)',
      slug: 'straighterline-introductory-algebra',
      description: 'StraighterLine\'s Introductory Algebra is an ACE-recommended college prep course that prepares you for College Algebra — a common gen ed requirement for most degree programs. Topics include real numbers, linear equations and inequalities, polynomials, factoring, rational expressions, radicals, quadratic equations, systems of linear equations, and functions. The course is fully self-paced with a 29-day average completion time, 92% pass rate, and has been transferred over 10,600 times. Digital textbook included. Credits accepted at 3,000+ schools nationwide.',
      short_description: 'ACE-recommended Introductory Algebra prep course — self-paced, 29-day avg completion, 92% pass rate. Credits transfer to 3,000+ schools. Digital textbook included.',
      course_url: 'https://www.straighterline.com/online-college-courses/introductory-algebra/',
      image_url: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: 'Self-paced (29 days avg)',
      level: 'Beginner',
      price: '$79',
      price_numeric: 79,
      certificate_available: true,
      credits: 'ACE-recommended (non-credit prep)',
      featured: true,
    }, { onConflict: 'slug' })
    .select('id, title')
    .single();

  if (courseErr) { console.error('Course error:', courseErr.message); process.exit(1); }
  console.log('✅ Course added:', course.title);
  console.log('\n🎉 Done!');
  console.log('Course page: /courses/straighterline-introductory-algebra');
  console.log('College page: /colleges/straighterline');
}

run().catch(err => { console.error(err); process.exit(1); });
