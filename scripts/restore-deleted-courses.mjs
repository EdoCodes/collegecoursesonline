import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  'https://dlxyjoaxyektgqraayfl.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || ''
);

// IDs from existing colleges/categories
const UMICH_ID   = 'def3048a-984e-4c05-a118-6f7a2d787cfd'; // University of Michigan (via Coursera)
const SOPHIA_ID  = 'cfe5f828-1d28-46ae-8f10-b35228ea06eb'; // Sophia Learning
const HEALTH_ID  = '9b73d8df-47ee-4199-8806-636c0dc4c39e'; // Health & Medicine

const courses = [
  {
    college_id: UMICH_ID,
    category_id: HEALTH_ID,
    title: 'Human Anatomy & Physiology',
    slug: 'anatomy-physiology',
    description: "The University of Michigan's Human Anatomy & Physiology course via Coursera provides a comprehensive college-level survey of the human body — from the chemical and cellular foundations through tissues, organ systems, and their integrated functions. Topics span the integumentary, skeletal, muscular, nervous, endocrine, cardiovascular, lymphatic, respiratory, digestive, urinary, and reproductive systems. Ideal preparation for nursing, pre-med, allied health, and life science degree programs. Delivered online and self-paced with graded assessments and a shareable certificate upon completion.",
    short_description: 'A college-level survey of the human body — from cells and tissues to organ systems. Ideal preparation for nursing, pre-med, and health careers.',
    course_url: 'https://www.coursera.org/learn/anatomy',
    image_url: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: 'Self-paced',
    level: 'Introductory',
    price: '$199',
    price_numeric: 199,
    certificate_available: true,
    credits: 'Certificate of completion',
    featured: false,
  },
  {
    college_id: SOPHIA_ID,
    category_id: HEALTH_ID,
    title: 'Anatomy and Physiology I',
    slug: 'sophia-anatomy-physiology-1',
    description: "Sophia Learning's Anatomy and Physiology I introduces students to the human body across chemical, cellular, and tissue levels of organization. Topics include the integumentary, skeletal, and muscular systems, plus an overview of nervous system regulation. The course consists of 17 Challenges (formative assessments) and 5 Milestones (summative assessments) — a passing score of 70% or higher earns 3.0 ACE- and DEAC-recommended semester credits, accepted by 75+ partner institutions and transferable to 3,000+ colleges. Self-paced, fully online, no textbook required. 36,500+ students have successfully completed this course. A free trial is available — no credit card required.",
    short_description: 'ACE & DEAC-recommended A&P I — 3 semester credits, 36,500+ completions, accepted at 75+ colleges. Self-paced, pass/fail. Free trial, no credit card.',
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
  if (error) { console.error('Error restoring', course.title, ':', error.message); }
  else console.log('✅ Restored:', data.title, '→ /courses/' + data.slug);
}
