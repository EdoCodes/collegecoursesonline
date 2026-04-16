/** Only these college slugs appear in course listings and detail pages. */
export const ALLOWED_COURSE_COLLEGE_SLUGS = new Set<string>([
	'straighterline',
	'sophia-learning',
	'study-com',
]);

export function isAllowedCourseProvider(course: {
	colleges?: { slug?: string | null } | null;
}): boolean {
	const slug = course.colleges?.slug;
	return !!slug && ALLOWED_COURSE_COLLEGE_SLUGS.has(slug);
}

export function filterAllowedProviderCourses<T extends { colleges?: { slug?: string | null } | null }>(
	courses: T[] | null | undefined,
): T[] {
	if (!courses?.length) return [];
	return courses.filter(isAllowedCourseProvider);
}
