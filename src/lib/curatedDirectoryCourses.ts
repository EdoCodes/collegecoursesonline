/**
 * Curated directory rows not (yet) synced from Supabase.
 * Pharmacology listed first so it surfaces in homepage “Featured” when capped.
 */
export type CuratedDirectoryCourse = {
	id: string;
	slug: string;
	title: string;
	short_description: string;
	description: string;
	course_url: string;
	image_url: string;
	duration: string;
	level: string;
	price: string;
	certificate_available: boolean;
	credits: string;
	featured: boolean;
	views_count: number;
	created_at: string;
	updated_at: string;
	colleges: {
		name: string;
		slug: string;
		accreditation_level: string;
		popularity_score: number;
		ease_of_access_score: number;
	};
	course_categories: { slug: string; name: string; icon: string };
};

export const CURATED_DIRECTORY_COURSES: CuratedDirectoryCourse[] = [
	{
		id: 'curated-straighterline-pharmacology',
		slug: 'straighterline-pharmacology',
		title: 'Pharmacology (PHARM103)',
		short_description:
			'StraighterLine Pharmacology: drug action, therapeutic effects, and adverse effects. 3 credits.',
		description:
			'Pharmacology is the study of drugs and all the therapeutic and adverse effects they can have on the body. Learn key concepts of pharmacokinetics, pharmacodynamics, mechanisms of action, and major drug classes.',
		course_url: 'https://www.straighterline.com/online-college-courses/pharmacology/',
		image_url: '/images/courses/straighterline-pharmacology.png',
		duration: 'Self-paced',
		level: 'Intermediate',
		price: '$79 + membership',
		certificate_available: true,
		credits: '3 Credits',
		featured: true,
		views_count: 0,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
		colleges: {
			name: 'StraighterLine',
			slug: 'straighterline',
			accreditation_level: 'ACE',
			popularity_score: 0,
			ease_of_access_score: 0,
		},
		course_categories: {
			slug: 'health',
			name: 'Health & Medicine',
			icon: '🏥',
		},
	},
	{
		id: 'curated-straighterline-principles-of-genetics',
		slug: 'straighterline-principles-of-genetics',
		title: 'Principles of Genetics (BIO210)',
		short_description:
			'StraighterLine genetics: heredity, DNA replication, gene expression, and inheritance—from molecules to organisms. 3 ACE-recommended credits.',
		description:
			'Principles of Genetics explores the fundamental principles of heredity, examining the flow of genetic information from the molecular to the organismal level. Delve into DNA replication, gene expression, and mechanisms of inheritance to build a foundation for healthcare or scientific careers.',
		course_url: 'https://www.straighterline.com/online-college-courses/principles-of-genetics/',
		image_url: '/images/courses/straighterline-principles-of-genetics.png',
		duration: 'Self-paced',
		level: 'Intermediate',
		price: '$79 + membership',
		certificate_available: true,
		credits: '3 Credits',
		featured: true,
		views_count: 0,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
		colleges: {
			name: 'StraighterLine',
			slug: 'straighterline',
			accreditation_level: 'ACE',
			popularity_score: 0,
			ease_of_access_score: 0,
		},
		course_categories: {
			slug: 'natural-sciences',
			name: 'Natural Sciences',
			icon: '🧪',
		},
	},
	{
		id: 'curated-straighterline-cultural-anthropology',
		slug: 'straighterline-cultural-anthropology',
		title: 'Cultural Anthropology (ANTH101)',
		short_description:
			'StraighterLine Cultural Anthropology: human diversity, kinship, belief systems, and ethnographic methods. 3 ACE-recommended credits.',
		description:
			'Cultural Anthropology offers a thoughtful introduction to human diversity across multiple spectrums—kinship and descent, anthropological theories, religion and belief systems, and more. Build skills in understanding cultures and critically evaluating how they are represented.',
		course_url: 'https://www.straighterline.com/online-college-courses/cultural-anthropology/',
		image_url: '/images/courses/straighterline-cultural-anthropology.png',
		duration: 'Self-paced',
		level: 'Beginner',
		price: '$79 + membership',
		certificate_available: true,
		credits: '3 Credits',
		featured: true,
		views_count: 0,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
		colleges: {
			name: 'StraighterLine',
			slug: 'straighterline',
			accreditation_level: 'ACE',
			popularity_score: 0,
			ease_of_access_score: 0,
		},
		course_categories: {
			slug: 'humanities',
			name: 'Humanities',
			icon: '📚',
		},
	},
	{
		id: 'curated-prereqcourses-bio-100',
		slug: 'bio-100-general-biological-science-prereqcourses',
		title: 'BIO 100 General Biological Science',
		short_description:
			'Self-paced, online biology course for non-science majors. 3 semester hours.',
		description:
			'This course presents the basic concepts of biology; it is intended for non-science majors. Recommended to satisfy the general education requirement for science.',
		course_url: 'https://www.prereqcourses.com/product/bio-100-general-biological-science/',
		image_url: '/images/courses/prereqcourses-bio-100.png',
		duration: 'Self-paced',
		level: 'Beginner',
		price: '$675',
		certificate_available: true,
		credits: '3 Semester hours',
		featured: true,
		views_count: 0,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
		colleges: {
			name: 'PrereqCourses',
			slug: 'prereqcourses',
			accreditation_level: 'Other',
			popularity_score: 0,
			ease_of_access_score: 0,
		},
		course_categories: {
			slug: 'natural-sciences',
			name: 'Natural Sciences',
			icon: '🧪',
		},
	},
	{
		id: 'curated-prereqcourses-bio-210',
		slug: 'bio-210-microbiology-w-lab-prereqcourses',
		title: 'BIO 210 Microbiology w/ Lab',
		short_description:
			'Self-paced, online microbiology lecture + lab. 4 semester hours.',
		description:
			'This course examines the basic structure, taxonomy, growth, genetics and control of microorganisms, with emphasis on pathogenic species. The course concentrates on bacteria; however, fungi, protists, helminths and viruses also are discussed. The laboratory emphasizes aseptic technique, as well as common staining and biochemical testing procedures used in the identification of bacterial species.',
		course_url: 'https://www.prereqcourses.com/product/bio-210-microbiology-w-lab/',
		image_url: '/images/courses/prereqcourses-bio-210.png',
		duration: 'Self-paced',
		level: 'Intermediate',
		price: '$695',
		certificate_available: true,
		credits: '4 Semester hours',
		featured: true,
		views_count: 0,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
		colleges: {
			name: 'PrereqCourses',
			slug: 'prereqcourses',
			accreditation_level: 'Other',
			popularity_score: 0,
			ease_of_access_score: 0,
		},
		course_categories: {
			slug: 'natural-sciences',
			name: 'Natural Sciences',
			icon: '🧪',
		},
	},
	{
		id: 'curated-prereqcourses-bio-282',
		slug: 'bio-282-genetics-prereqcourses',
		title: 'BIO 282 Genetics',
		short_description: 'Self-paced, online genetics course. 3 semester hours.',
		description:
			'This course presents fundamental principles of classical genetics as well as an introduction to modern molecular genetics; emphasis will be placed on Mendelian genetics, linkage, gene expression and regulation, mutation, recombination, gene manipulation and biotechnology.',
		course_url: 'https://www.prereqcourses.com/product/bio-282-genetics/',
		image_url: '/images/courses/prereqcourses-bio-282.png',
		duration: 'Self-paced',
		level: 'Intermediate',
		price: '$675',
		certificate_available: true,
		credits: '3 Semester hours',
		featured: true,
		views_count: 0,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
		colleges: {
			name: 'PrereqCourses',
			slug: 'prereqcourses',
			accreditation_level: 'Other',
			popularity_score: 0,
			ease_of_access_score: 0,
		},
		course_categories: {
			slug: 'natural-sciences',
			name: 'Natural Sciences',
			icon: '🧪',
		},
	},
];
