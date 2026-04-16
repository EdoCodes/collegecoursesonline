/**
 * Adds University of Phoenix + College Algebra course to Supabase.
 * Run with: node scripts/add-phoenix-algebra.mjs
 *
 * Deprecated for site policy: the directory only lists StraighterLine and Sophia courses.
 */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://dlxyjoaxyektgqraayfl.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || ''
);

async function run() {
  // 1. Insert University of Phoenix as a college
  console.log('Adding University of Phoenix...');
  const { data: college, error: collegeErr } = await supabase
    .from('colleges')
    .upsert({
      name: 'University of Phoenix',
      slug: 'university-of-phoenix',
      description: 'University of Phoenix is a regionally accredited university (Higher Learning Commission) serving working adults for over 45 years. Offers flexible online degrees, certificates, and individual courses with rolling start dates every 5 weeks.',
      website_url: 'https://www.phoenix.edu',
      logo_url: null,
      accreditation: 'Regional Accreditation (Higher Learning Commission)',
      accreditation_level: 'Regional',
      country: 'USA',
      featured: false,
      popularity_score: 88,
      ease_of_access_score: 92,
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

  // 3. Insert College Algebra course
  console.log('Adding College Algebra (MTH/220T)...');
  const { data: course, error: courseErr } = await supabase
    .from('courses')
    .upsert({
      college_id: college.id,
      category_id: cat.id,
      title: 'College Algebra (MTH/220T)',
      slug: 'phoenix-college-algebra-mth220t',
      description: 'This undergraduate course presents traditional concepts in college algebra. Topics include linear, polynomial, rational, radical, exponential and logarithmic functions, systems of equations, sequences, and series. Taught by instructors with an average of 25 years of real-world experience. Accredited by the Higher Learning Commission (HLC) — one of the most recognized accrediting bodies in the US. Credits may be eligible for transfer to other institutions.',
      short_description: 'Undergraduate College Algebra covering functions, equations, sequences & series. 3 credits, 5-week online format. Accredited by HLC. New sessions start every 5 weeks.',
      course_url: 'https://www.phoenix.edu/online-courses/mth220t.html',
      image_url: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '5 weeks',
      level: 'Beginner',
      price: '$1,364',
      price_numeric: 1364,
      certificate_available: true,
      credits: '3 credits',
      featured: true,
    }, { onConflict: 'slug' })
    .select('id, title')
    .single();

  if (courseErr) { console.error('Course error:', courseErr.message); process.exit(1); }
  console.log('✅ Course added:', course.title);
  console.log('\n🎉 Done!');
  console.log('Course page on your site: /courses/phoenix-college-algebra-mth220t');
  console.log('College page on your site: /colleges/university-of-phoenix');
}

run().catch(err => { console.error(err); process.exit(1); });
