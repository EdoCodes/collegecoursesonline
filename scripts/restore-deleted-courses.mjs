import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  'https://dlxyjoaxyektgqraayfl.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || ''
);

const SOPHIA_ID  = 'cfe5f828-1d28-46ae-8f10-b35228ea06eb';
const SCIENCE_ID = '734130e9-ff0e-4396-a30d-6a6b4cf38f84';

const courses = [
  {
    college_id: SOPHIA_ID,
    category_id: SCIENCE_ID,
    title: 'Anatomy and Physiology I',
    slug: 'sophia-anatomy-physiology-1',
    description: "Sophia Learning's Anatomy and Physiology I introduces students to the human body across chemical, cellular, and tissue levels of organization.",
    short_description: 'ACE & DEAC-recommended A&P I — self-paced, transferable credits.',
    course_url: 'https://www.sophia.org/online-courses/science/anatomy-and-physiology-i/',
    image_url: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: 'Self-paced',
    level: 'Introductory',
    price: 'Free trial',
    price_numeric: 0,
    certificate_available: true,
    credits: '3 credits (ACE & DEAC-recommended)',
    featured: false,
  },
];

for (const course of courses) {
  const { data, error } = await supabase.from('courses').upsert(course, { onConflict: 'slug' }).select('id, title, slug').single();
  if (error) console.error(error.message);
  else console.log('✅', data.slug);
}
