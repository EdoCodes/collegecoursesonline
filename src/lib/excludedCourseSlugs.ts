import { filterAllowedProviderCourses, isAllowedCourseProvider } from './allowedCourseProviders';

/**
 * Slugs removed from the directory but possibly still present in DB until migration runs.
 */
export const EXCLUDED_COURSE_SLUGS = new Set<string>([
	// Duplicate of sophia-anatomy-physiology-1 (canonical)
	'sophia-anatomy-and-physiology-1',
]);

export function filterCourses<T extends { slug: string }>(courses: T[] | null | undefined): T[] {
	if (!courses?.length) return [];
	return courses.filter((c) => !EXCLUDED_COURSE_SLUGS.has(c.slug));
}

/** Listings + static paths: exclude removed slugs; allowed providers in `allowedCourseProviders`. */
export function filterDirectoryCourses<
	T extends { slug: string; colleges?: { slug?: string | null } | null },
>(courses: T[] | null | undefined): T[] {
	return filterAllowedProviderCourses(filterCourses(courses));
}

export { isAllowedCourseProvider };
