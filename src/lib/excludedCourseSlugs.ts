/**
 * Slugs removed from the directory but possibly still present in DB until migration runs.
 * Filter getStaticPaths and listing queries so pages and cards are not generated.
 */
export const EXCLUDED_COURSE_SLUGS = new Set<string>(['public-health-fundamentals']);

export function filterCourses<T extends { slug: string }>(courses: T[] | null | undefined): T[] {
	if (!courses?.length) return [];
	return courses.filter((c) => !EXCLUDED_COURSE_SLUGS.has(c.slug));
}
