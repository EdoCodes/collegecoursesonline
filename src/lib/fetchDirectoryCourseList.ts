import type { SupabaseClient } from '@supabase/supabase-js';
import type { Course } from './supabase';
import { ALLOWED_COURSE_COLLEGE_SLUGS } from './allowedCourseProviders';
import { filterDirectoryCourses } from './excludedCourseSlugs';

const ALLOWED_SLUGS = Array.from(ALLOWED_COURSE_COLLEGE_SLUGS);

/**
 * Lists directory courses only (allowed providers), then applies excluded-slug filters.
 * Without this, `.limit(50)` on all courses can hide newer rows when many other DB rows sort first.
 */
export async function fetchDirectoryCourseList(
	supabase: SupabaseClient,
	limit = 50,
): Promise<Course[]> {
	const { data: colleges } = await supabase.from('colleges').select('id').in('slug', ALLOWED_SLUGS);

	const ids = colleges?.map((c) => c.id) ?? [];
	if (ids.length === 0) return [];

	const { data: courses } = await supabase
		.from('courses')
		.select(`*, colleges (*), course_categories (*)`)
		.in('college_id', ids)
		.order('featured', { ascending: false })
		.order('created_at', { ascending: false })
		.limit(limit);

	return filterDirectoryCourses(courses || []);
}
