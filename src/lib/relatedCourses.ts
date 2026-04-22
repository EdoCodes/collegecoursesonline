import type { Course } from './supabase';

/** Cross-provider equivalents (shown first): stats ↔ stats, not generic “same category”. */
export const RELATED_ALTERNATIVE_FIRST: Record<string, string[]> = {
	'straighterline-introduction-to-statistics': ['study-com-statistics'],
	'study-com-statistics': [
		'straighterline-introduction-to-statistics',
		'study-com-business-114-business-statistics',
	],
	'study-com-business-114-business-statistics': ['study-com-statistics'],
	'study-com-biology-201l-anatomy-physiology-i-with-lab': [
		'study-com-biology-202l-anatomy-physiology-ii-with-lab',
	],
	'study-com-biology-202l-anatomy-physiology-ii-with-lab': [
		'study-com-biology-201l-anatomy-physiology-i-with-lab',
	],
	'study-com-macroeconomics': ['study-com-microeconomics'],
	'study-com-microeconomics': [
		'study-com-macroeconomics',
		'study-com-economics-201-intermediate-microeconomics',
	],
	'study-com-economics-201-intermediate-microeconomics': ['study-com-microeconomics'],
	'study-com-intro-to-physics': ['study-com-physics-111-physics-i'],
	'study-com-physics-111-physics-i': [
		'study-com-physics-111l-physics-i-with-lab',
		'study-com-physics-112-physics-ii',
		'study-com-intro-to-physics',
	],
	'study-com-physics-111l-physics-i-with-lab': ['study-com-physics-111-physics-i'],
	'study-com-physics-112-physics-ii': ['study-com-physics-111-physics-i'],
	'study-com-algebra': ['study-com-precalculus'],
	'study-com-precalculus': ['study-com-calculus', 'study-com-algebra'],
	'study-com-calculus': ['study-com-precalculus'],
	'study-com-philosophy-101-intro-to-philosophy': [
		'study-com-philosophy-103-ethics-theory-practice',
	],
	'study-com-philosophy-103-ethics-theory-practice': [
		'study-com-philosophy-101-intro-to-philosophy',
	],
	'study-com-intro-to-business': ['study-com-financial-accounting'],
	'study-com-financial-accounting': ['study-com-intro-to-business'],
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
