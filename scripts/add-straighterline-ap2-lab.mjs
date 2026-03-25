import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  'https://dlxyjoaxyektgqraayfl.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || ''
);

const STRAIGHTERLINE_ID = 'e0909f3b-4211-454e-96e9-f7a3ad431513';
const HEALTH_ID         = '9b73d8df-47ee-4199-8806-636c0dc4c39e';

const { data, error } = await supabase.from('courses').upsert({
  college_id:   STRAIGHTERLINE_ID,
  category_id:  HEALTH_ID,
  title:        'Anatomy & Physiology II Lab (BIO202L)',
  slug:         'straighterline-anatomy-physiology-2-lab',
  description:  "StraighterLine's ACE-recommended Anatomy & Physiology II Lab (BIO202L) is a 1-credit hands-on companion to the A&P II lecture course. Students complete at-home laboratory experiments using a Science Interactive lab kit (sold separately, ~$220), record results, and submit graded lab reports across 12 Capstones and 3 Checkpoints. Topics include the respiratory system, heart and blood vessels, blood typing and acid-base balance, nutrition, digestive system, lymphatic system, reproductive system, urinary system, and urinalysis. Taught by Jenilyn Mulkey (MS, MLS). 99% pass rate, 29-day average completion, transferred 4,500+ times, saving students $1.6 million in tuition. Transfers to 3,000+ colleges nationwide. Recommended concurrent enrollment in Anatomy & Physiology II.",
  short_description: 'ACE-recommended A&P II Lab — 1 credit, 99% pass rate, 29-day avg completion. Hands-on experiments covering circulatory, respiratory, digestive & urinary systems. $69 + lab kit.',
  course_url:   'https://www.straighterline.com/online-college-courses/anatomy-physiology-ii-lab/',
  image_url:    'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=800',
  duration:     'Self-paced (29 days avg)',
  level:        'Introductory',
  price:        '$69',
  price_numeric: 69,
  certificate_available: true,
  credits:      '1 credit (ACE-recommended)',
  featured:     false,
}, { onConflict: 'slug' }).select('id, title').single();

if (error) { console.error(error.message); process.exit(1); }
console.log('✅ Added:', data.title);
console.log('Course page: /courses/straighterline-anatomy-physiology-2-lab');
