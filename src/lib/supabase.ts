import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// For static builds, allow missing env vars (client-side will handle errors)
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Create client only if configured (prevents build errors)
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any; // Allow build to complete, runtime will show empty state

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

export type CourseReview = {
  id: string;
  course_id: string;
  user_name: string;
  user_email: string;
  rating: number;
  review_title: string;
  review_text: string;
  verified_enrollment: boolean;
  enrollment_date: string | null;
  helpful_count: number;
  not_helpful_count: number;
  status: 'pending' | 'approved' | 'rejected' | 'spam';
  moderated_by: string | null;
  moderated_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ReviewHelpfulVote = {
  id: string;
  review_id: string;
  user_identifier: string;
  vote_type: 'helpful' | 'not_helpful';
  created_at: string;
};
