/**
 * Local image overrides for course cards / detail heroes when DB `image_url` should be
 * replaced (e.g. custom art) without a Supabase migration.
 */
const DEFAULT_FALLBACK =
	'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800';

export const COURSE_IMAGE_OVERRIDES: Record<string, string> = {
	'straighterline-anatomy-physiology-1-lab':
		'/images/courses/straighterline-anatomy-physiology-1-lab.png',
	'sophia-anatomy-physiology-1':
		'/images/courses/sophia-anatomy-physiology-1.png',
	'straighterline-introductory-algebra':
		'/images/courses/straighterline-introductory-algebra.png',
	'straighterline-microbiology':
		'/images/courses/straighterline-microbiology.jpg',
	'straighterline-calculus-1': '/images/courses/straighterline-calculus-1.png',
	'study-com-algebra': '/images/courses/study-com-algebra.png',
	'study-com-statistics': '/images/courses/study-com-statistics.png',
	'study-com-sociology': '/images/courses/study-com-sociology.png',
	'study-com-psychology-101': '/images/courses/study-com-psychology-101.png',
	'study-com-general-chemistry': '/images/courses/study-com-general-chemistry.png',
	'study-com-western-civilization': '/images/courses/study-com-western-civilization.png',
	'study-com-college-composition': '/images/courses/study-com-college-composition.jpg',
	'study-com-english-literature': '/images/courses/study-com-english-literature.png',
	'study-com-public-speaking': '/images/courses/study-com-public-speaking.png',
	'study-com-analyzing-and-interpreting-literature':
		'/images/courses/study-com-analyzing-and-interpreting-literature.png',
	'study-com-biology-106-pathophysiology': '/images/courses/study-com-biology-106-pathophysiology.png',
};

export function resolveCourseImageUrl(
	slug: string | undefined | null,
	imageUrl: string | null | undefined,
	fallback: string = DEFAULT_FALLBACK,
): string {
	if (slug && COURSE_IMAGE_OVERRIDES[slug]) {
		return COURSE_IMAGE_OVERRIDES[slug];
	}
	return imageUrl || fallback;
}
