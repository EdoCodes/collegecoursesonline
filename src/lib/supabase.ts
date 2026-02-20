import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type College = {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo_url: string | null;
  website_url: string | null;
  accreditation: string;
  country: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type CourseCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  created_at: string;
};

export type Course = {
  id: string;
  college_id: string;
  category_id: string | null;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  course_url: string | null;
  image_url: string | null;
  duration: string;
  level: string;
  price: string;
  certificate_available: boolean;
  credits: string | null;
  featured: boolean;
  views_count: number;
  created_at: string;
  updated_at: string;
  colleges?: College;
  course_categories?: CourseCategory;
};
