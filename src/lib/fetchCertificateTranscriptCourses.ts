import type { SupabaseClient } from '@supabase/supabase-js';
import type { Course } from './supabase';
import { ALLOWED_COURSE_COLLEGE_SLUGS } from './allowedCourseProviders';
import { filterDirectoryCourses } from './excludedCourseSlugs';

const ALLOWED_SLUGS = Array.from(ALLOWED_COURSE_COLLEGE_SLUGS);

/**
 * Directory courses where providers indicate a transcript / completion record is available.
 * Used by the certificate + college credit hub; not a guarantee of transfer credit.
 */
export async function fetchCertificateTranscriptCourses(
	supabase: SupabaseClient,
	limit = 500,
): Promise<Course[]> {
	const { data: colleges } = await supabase.from('colleges').select('id').in('slug', ALLOWED_SLUGS);
	const ids = colleges?.map((c) => c.id) ?? [];
	if (ids.length === 0) return [];

	const { data: courses } = await supabase
		.from('courses')
		.select(`*, colleges (*), course_categories (*)`)
		.in('college_id', ids)
		.eq('certificate_available', true)
		.order('featured', { ascending: false })
		.order('views_count', { ascending: false })
		.order('created_at', { ascending: false })
		.limit(limit);

	return filterDirectoryCourses(courses || []);
}
