/** Sophia Learning uses a flat monthly membership; listings show $99 (not “Free trial”). */
export const SOPHIA_LEARNING_COLLEGE_SLUG = 'sophia-learning';
export const SOPHIA_LISTED_PRICE = '$99';

/**
 * Normalize DB `price` for display and schema. Sophia courses should not show “Free trial” on cards.
 */
export function displayPriceForCourse(
	price: string | null | undefined,
	collegeSlug: string | null | undefined,
): string {
	const p = (price ?? '').trim();
	if (collegeSlug?.toLowerCase() !== SOPHIA_LEARNING_COLLEGE_SLUG) {
		return p;
	}
	const lower = p.toLowerCase();
	if (!p || lower === 'free' || lower.includes('free trial')) {
		return SOPHIA_LISTED_PRICE;
	}
	return p;
}

/**
 * StraighterLine per-course + membership display logic.
 * Used by `CoursePrice.astro` everywhere course price appears in the directory.
 * New courses qualify if `colleges.slug` is straighterline or `course.slug` starts with `straighterline-`.
 *
 * College slug for StraighterLine in `colleges.slug`.
 */
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
	const display = displayPriceForCourse(price, collegeSlug);
	if (display === 'Free' || !display) return false;
	if (isStraighterLineCollege(collegeSlug)) return true;
	const cs = courseSlug?.toLowerCase() ?? '';
	if (cs.startsWith('straighterline-')) return true;
	return false;
}
