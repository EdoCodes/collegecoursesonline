/**
 * Adds StraighterLine Introduction to Statistics course to Supabase.
 * Run with: node scripts/add-straighterline-stats.mjs
 */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://dlxyjoaxyektgqraayfl.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || ''
);

async function run() {
  // Get StraighterLine college id
  const { data: college } = await supabase
    .from('colleges')
    .select('id')
    .eq('slug', 'straighterline')
    .single();

  if (!college) { console.error('StraighterLine college not found'); process.exit(1); }

  // Get Mathematics category id
  const { data: cat } = await supabase
    .from('course_categories')
    .select('id')
    .eq('slug', 'mathematics')
    .single();

  console.log('Adding Introduction to Statistics (MAT202)...');
  const { data: course, error } = await supabase
    .from('courses')
    .upsert({
      college_id: college.id,
      category_id: cat.id,
      title: 'Introduction to Statistics (MAT202)',
      slug: 'straighterline-introduction-to-statistics',
      description: 'ACE-recommended Introduction to Statistics (MAT202) covering probability, descriptive statistics, hypothesis testing, confidence intervals, regression, and ANOVA. Taught by Ms. Amita Sane (M.S. Statistics). 97% pass rate, 20-day average completion, transferred 5,000+ times, saving students $5.6 million in tuition. No prerequisites. Digital textbook (OpenStax) included at no extra cost. Credits transfer to 3,000+ colleges nationwide. Self-paced with 24/7 tutoring support.',
      short_description: 'ACE-recommended Statistics — 3 credits, 97% pass rate, 20-day avg completion. Covers probability, hypothesis testing & regression. Transfers to 3,000+ schools. No prerequisites.',
      course_url: 'https://www.straighterline.com/online-college-courses/introduction-to-statistics/',
      image_url: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: 'Self-paced (20 days avg)',
      level: 'Beginner',
      price: '$79',
      price_numeric: 79,
      certificate_available: true,
      credits: '3 credits (ACE-recommended)',
      featured: true,
    }, { onConflict: 'slug' })
    .select('id, title')
    .single();

  if (error) { console.error('Course error:', error.message); process.exit(1); }
  console.log('✅ Course added:', course.title);
  console.log('\n🎉 Done!');
  console.log('Course page: /courses/straighterline-introduction-to-statistics');
}

run().catch(err => { console.error(err); process.exit(1); });
