import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  'https://dlxyjoaxyektgqraayfl.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || ''
);

const { data: college } = await supabase.from('colleges').select('id').eq('slug', 'straighterline').single();
const { data: cat }     = await supabase.from('course_categories').select('id').eq('slug', 'mathematics').single();

const { data, error } = await supabase.from('courses').upsert({
  college_id: college.id,
  category_id: cat.id,
  title: 'Calculus I (MAT250)',
  slug: 'straighterline-calculus-1',
  description: 'StraighterLine\'s ACE-recommended Calculus I (MAT250) covers limits, derivatives, computational techniques, implicit differentiation, L\'Hôpital\'s Rule, curve sketching, integrals, and applications of integration across 12 checkpoints. Taught by Ms. Sayali Deshpande. 97% pass rate, 24-day average completion, transferred 2,300+ times, saving students $2.6 million in tuition. Prerequisite: Precalculus. No textbook required. Open-book final benchmark. Credits transfer to 3,000+ colleges nationwide.',
  short_description: 'ACE-recommended Calculus I — 4 credits, 97% pass rate, 24-day avg completion. Covers limits, derivatives, integrals & curve sketching. Transfers to 3,000+ schools. $79.',
  course_url: 'https://www.straighterline.com/online-college-courses/calculus-i/',
  image_url: '/images/courses/straighterline-calculus-1.png',
  duration: 'Self-paced (24 days avg)',
  level: 'Intermediate',
  price: '$79',
  price_numeric: 79,
  certificate_available: true,
  credits: '4 credits (ACE-recommended)',
  featured: false,
  subcategory: 'Calculus',
}, { onConflict: 'slug' }).select('id, title').single();

if (error) { console.error(error.message); process.exit(1); }
console.log('✅ Added:', data.title);
console.log('Course page: /courses/straighterline-calculus-1');
