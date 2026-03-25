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
  title:        'Anatomy & Physiology I Lab (BIO201L)',
  slug:         'straighterline-anatomy-physiology-1-lab',
  description:  "StraighterLine's ACE-recommended Anatomy & Physiology I Lab (BIO201L) is a 1-credit hands-on companion to the A&P I lecture course. Students complete at-home laboratory experiments using a Science Interactive lab kit (sold separately, ~$220), record results, and submit graded lab reports across 16 Capstones and 3 Checkpoints. Topics include anatomical orientations, cell membrane transport, mitosis and meiosis, skeletal and muscular systems, joints, the nervous and endocrine systems, integumentary system, tissues and histology, and sensory organs. Taught by Jenilyn Mulkey (MS, MLS). 99% pass rate, 28-day average completion, transferred 4,300+ times, saving students $1.5 million in tuition. Transfers to 3,000+ colleges nationwide.",
  short_description: 'ACE-recommended A&P I Lab — 1 credit, 99% pass rate, 28-day avg completion. Hands-on at-home experiments covering anatomy, physiology & histology. $69 + lab kit.',
  course_url:   'https://www.straighterline.com/online-college-courses/anatomy-physiology-i-lab/',
  image_url:    'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
  duration:     'Self-paced (28 days avg)',
  level:        'Introductory',
  price:        '$69',
  price_numeric: 69,
  certificate_available: true,
  credits:      '1 credit (ACE-recommended)',
  featured:     false,
}, { onConflict: 'slug' }).select('id, title').single();

if (error) { console.error(error.message); process.exit(1); }
console.log('✅ Added:', data.title);
console.log('Course page: /courses/straighterline-anatomy-physiology-1-lab');
