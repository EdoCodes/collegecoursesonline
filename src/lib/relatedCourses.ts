import type { Course } from './supabase';

/** Cross-provider equivalents (shown first): stats ↔ stats, not generic “same category”. */
export const RELATED_ALTERNATIVE_FIRST: Record<string, string[]> = {
	'straighterline-introduction-to-statistics': ['study-com-statistics'],
	'study-com-statistics': ['straighterline-introduction-to-statistics'],
};

/** When DB `subcategory` is missing, infer for related-course matching only. */
export function inferredSubcategory(
	slug: string | undefined,
	course: Pick<Course, 'slug'> & { subcategory?: string | null },
): string | null {
	if (course.subcategory?.trim()) return course.subcategory.trim();
	if (slug === 'straighterline-introduction-to-statistics') return 'Statistics';
	return null;
}
