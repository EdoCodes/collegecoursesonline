import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  'https://dlxyjoaxyektgqraayfl.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || ''
);

const SOPHIA_ID  = 'cfe5f828-1d28-46ae-8f10-b35228ea06eb'; // Sophia Learning
const SCIENCE_ID = '734130e9-ff0e-4396-a30d-6a6b4cf38f84'; // Natural Sciences

const { data, error } = await supabase.from('courses').upsert({
  college_id: SOPHIA_ID,
  category_id: SCIENCE_ID,
  title: 'Anatomy and Physiology I',
  slug: 'sophia-anatomy-physiology-1',
  description: "Sophia Learning's Anatomy and Physiology I introduces students to the human body across chemical, cellular, and tissue levels of organization. Topics include the integumentary, skeletal, and muscular systems, plus an overview of nervous system regulation. The course consists of 17 Challenges (formative assessments) and 5 Milestones (summative assessments) — a passing score of 70% or higher earns 3.0 ACE- and DEAC-recommended semester credits, accepted by 75+ partner institutions and transferable to 3,000+ colleges. Self-paced, fully online, no textbook required. 36,500+ students have successfully completed this course.",
  short_description: 'ACE & DEAC-recommended A&P I — 3 credits, self-paced. Covers body organization, muscular & nervous systems. Transfers to 75+ partner schools. $99.',
  course_url: 'https://www.sophia.org/online-courses/science/anatomy-and-physiology-i/',
  image_url: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
  duration: 'Self-paced',
  level: 'Introductory',
  price: '$99',
  price_numeric: 99,
  certificate_available: true,
  credits: '3 credits (ACE & DEAC-recommended)',
  featured: false,
}, { onConflict: 'slug' }).select('id, title').single();

if (error) { console.error(error.message); process.exit(1); }
console.log('✅ Added:', data.title);
console.log('Course page: /courses/sophia-anatomy-physiology-1');
