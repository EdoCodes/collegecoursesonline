/** Used when Supabase is unavailable at build time or returns no directory rows for the mega-menu. */
export const FALLBACK_COURSE_CATEGORIES: { slug: string; name: string; icon: string }[] = [
	{ slug: 'business', name: 'Business', icon: '💼' },
	{ slug: 'computer-science', name: 'Computer Science', icon: '💻' },
	{ slug: 'data-science', name: 'Data Science', icon: '📊' },
	{ slug: 'education', name: 'Education', icon: '🎓' },
	{ slug: 'engineering', name: 'Engineering', icon: '⚙️' },
	{ slug: 'health', name: 'Health & Medicine', icon: '🏥' },
	{ slug: 'humanities', name: 'Humanities', icon: '📚' },
	{ slug: 'mathematics', name: 'Mathematics', icon: '➗' },
	{ slug: 'psychology', name: 'Psychology', icon: '🧠' },
	{ slug: 'science', name: 'Natural Sciences', icon: '🔬' },
];
