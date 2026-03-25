/**
 * Adds Sophia Learning + Anatomy & Physiology I course to Supabase.
 * Run with: node scripts/add-sophia-ap1.mjs
 */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://dlxyjoaxyektgqraayfl.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || ''
);

async function run() {
  // 1. Insert Sophia Learning as a college
  console.log('Adding Sophia Learning...');
  const { data: college, error: collegeErr } = await supabase
    .from('colleges')
    .upsert({
      name: 'Sophia Learning',
      slug: 'sophia-learning',
      description: 'Sophia Learning offers 50+ ACE- and DEAC-recommended online courses accepted at 75+ partner colleges. Self-paced, low-cost membership model with no credit card required for free trial. Ideal for completing general education requirements affordably.',
      website_url: 'https://www.sophia.org',
      logo_url: null,
      accreditation: 'ACE- and DEAC-Recommended',
      accreditation_level: 'National',
      country: 'USA',
      featured: false,
      popularity_score: 86,
      ease_of_access_score: 97,
    }, { onConflict: 'slug' })
    .select('id, slug')
    .single();

  if (collegeErr) { console.error('College error:', collegeErr.message); process.exit(1); }
  console.log('✅ College added:', college.slug);

  // 2. Get Health category id
  const { data: cat } = await supabase
    .from('course_categories')
    .select('id')
    .eq('slug', 'health')
    .single();

  // 3. Insert Anatomy & Physiology I
  console.log('Adding Anatomy and Physiology I...');
  const { data: course, error: courseErr } = await supabase
    .from('courses')
    .upsert({
      college_id: college.id,
      category_id: cat.id,
      title: 'Anatomy and Physiology I',
      slug: 'sophia-anatomy-physiology-1',
      description: 'Sophia Learning\'s Anatomy and Physiology I introduces students to the human body at the chemical, cellular, and tissue levels of organization. Topics include the integumentary, skeletal, muscular, and nervous systems. The course is ACE- and DEAC-recommended for 3.0 semester credits, accepted at 75+ partner colleges, and has been successfully completed by over 36,500 students. Pass/fail format: complete 17 Challenges and 5 Milestones with a 70% or better. Free trial available — no credit card required.',
      short_description: 'ACE & DEAC-recommended A&P I — 3 semester credits, 36,500+ completions, accepted at 75+ colleges. Self-paced, pass/fail. Free trial, no credit card needed.',
      course_url: 'https://www.sophia.org/online-courses/science/anatomy-and-physiology-i/',
      image_url: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: 'Self-paced',
      level: 'Beginner',
      price: 'Free',
      price_numeric: 0,
      certificate_available: true,
      credits: '3.0 semester credits',
      featured: true,
    }, { onConflict: 'slug' })
    .select('id, title')
    .single();

  if (courseErr) { console.error('Course error:', courseErr.message); process.exit(1); }
  console.log('✅ Course added:', course.title);
  console.log('\n🎉 Done!');
  console.log('Course page: /courses/sophia-anatomy-physiology-1');
  console.log('College page: /colleges/sophia-learning');
}

run().catch(err => { console.error(err); process.exit(1); });
