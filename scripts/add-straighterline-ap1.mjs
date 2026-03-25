/**
 * Adds StraighterLine Anatomy & Physiology I course to Supabase.
 * Run with: node scripts/add-straighterline-ap1.mjs
 */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://dlxyjoaxyektgqraayfl.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || ''
);

async function run() {
  const { data: college } = await supabase
    .from('colleges').select('id').eq('slug', 'straighterline').single();
  if (!college) { console.error('StraighterLine not found'); process.exit(1); }

  const { data: cat } = await supabase
    .from('course_categories').select('id').eq('slug', 'health').single();

  console.log('Adding Anatomy & Physiology I (BIO201)...');
  const { data: course, error } = await supabase
    .from('courses')
    .upsert({
      college_id: college.id,
      category_id: cat.id,
      title: 'Anatomy & Physiology I (BIO201)',
      slug: 'straighterline-anatomy-physiology-1',
      description: 'StraighterLine\'s ACE-recommended Anatomy & Physiology I (BIO201) covers the structure and function of the human body across 12 in-depth checkpoints — from basic chemistry and cell biology to the integumentary, skeletal, muscular, nervous, sensory, and endocrine systems. Taught by Jenilyn Mulkey (MS, MLS). 98% pass rate, 20-day average completion, transferred 7,000+ times, saving students $7.8 million in tuition. No prerequisites. Digital OpenStax textbook included at no extra cost. Credits transfer to 3,000+ colleges nationwide. Closed-book final exam.',
      short_description: 'ACE-recommended A&P I — 3 credits, 98% pass rate, 20-day avg completion, transferred 7,000+ times. Covers body systems from cells to endocrine. No prerequisites. $79.',
      course_url: 'https://www.straighterline.com/online-college-courses/anatomy-physiology-i/',
      image_url: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: 'Self-paced (20 days avg)',
      level: 'Beginner',
      price: '$79',
      price_numeric: 79,
      certificate_available: true,
      credits: '3 credits (ACE-recommended)',
      featured: true,
    }, { onConflict: 'slug' })
    .select('id, title').single();

  if (error) { console.error('Course error:', error.message); process.exit(1); }
  console.log('✅ Course added:', course.title);
  console.log('\n🎉 Done!');
  console.log('Course page: /courses/straighterline-anatomy-physiology-1');
}

run().catch(err => { console.error(err); process.exit(1); });
