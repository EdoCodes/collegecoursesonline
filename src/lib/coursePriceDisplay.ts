/** College slug for StraighterLine in `colleges.slug`. */
export const STRAIGHTERLINE_COLLEGE_SLUG = 'straighterline';

export function isStraighterLineCollege(collegeSlug: string | null | undefined): boolean {
	return collegeSlug?.toLowerCase() === STRAIGHTERLINE_COLLEGE_SLUG;
}

/**
 * Supabase/PostgREST sometimes returns `colleges` as an object or a one-element array.
 */
export function resolveCollegeSlug(colleges: unknown): string | undefined {
	if (colleges == null) return undefined;
	if (Array.isArray(colleges)) {
		const first = colleges[0] as { slug?: string } | undefined;
		return first?.slug ?? undefined;
	}
	if (typeof colleges === 'object' && 'slug' in colleges) {
		const s = (colleges as { slug?: string | null }).slug;
		return s ?? undefined;
	}
	return undefined;
}

/**
 * Paid StraighterLine pricing: per-course fee plus membership.
 * Uses college slug when present; falls back to course slug prefix if the relation is missing or odd-shaped.
 */
export function shouldShowStraighterLineMembership(
	price: string,
	collegeSlug: string | null | undefined,
	courseSlug: string | null | undefined,
): boolean {
	if (price === 'Free' || !price) return false;
	if (isStraighterLineCollege(collegeSlug)) return true;
	const cs = courseSlug?.toLowerCase() ?? '';
	if (cs.startsWith('straighterline-')) return true;
	return false;
}
