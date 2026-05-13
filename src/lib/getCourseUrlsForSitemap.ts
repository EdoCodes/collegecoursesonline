import { createClient } from '@supabase/supabase-js';
import { loadEnv } from 'vite';
import { filterDirectoryCourses } from './excludedCourseSlugs';

/**
 * Course slugs that have a dedicated `src/pages/courses/<slug>.astro` file.
 * Those routes are already in the auto-generated sitemap; skip them in `customPages`.
 */
const DEDICATED_COURSE_PAGE_SLUGS = new Set<string>([
	'bio-100-general-biological-science-prereqcourses',
	'bio-210-microbiology-w-lab-prereqcourses',
	'bio-282-genetics-prereqcourses',
	'sophia-introduction-anatomy-and-physiology',
	'straighterline-business-communication',
	'straighterline-cultural-anthropology',
	'straighterline-introduction-to-ethics',
	'straighterline-introduction-to-marketing',
	'straighterline-pharmacology',
	'straighterline-principles-of-genetics',
]);

type CourseSlugRow = { slug: string; colleges: { slug: string | null } | null };

function resolveSupabaseEnv(): { url: string; key: string } {
	const mode =
		process.env.NETLIFY === 'true' || process.env.CI === 'true'
			? 'production'
			: process.env.NODE_ENV === 'production'
				? 'production'
				: 'development';
	const fileEnv = loadEnv(mode, process.cwd(), '');
	const url =
		process.env.PUBLIC_SUPABASE_URL ||
		process.env.VITE_SUPABASE_URL ||
		fileEnv.PUBLIC_SUPABASE_URL ||
		fileEnv.VITE_SUPABASE_URL ||
		'';
	const key =
		process.env.PUBLIC_SUPABASE_ANON_KEY ||
		process.env.VITE_SUPABASE_ANON_KEY ||
		fileEnv.PUBLIC_SUPABASE_ANON_KEY ||
		fileEnv.VITE_SUPABASE_ANON_KEY ||
		'';
	return { url, key };
}

/**
 * Full canonical URLs for `/courses/[slug]/` pages backed by Supabase, for `@astrojs/sitemap` `customPages`.
 * Called at build time only.
 */
export async function getCourseUrlsForSitemap(siteOrigin: string): Promise<string[]> {
	const { url, key } = resolveSupabaseEnv();
	if (!url || !key) {
		console.warn(
			'[sitemap] Skipping Supabase course URLs: set PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY (or VITE_*) for builds.',
		);
		return [];
	}

	const supabase = createClient(url, key);
	const { data, error } = await supabase
		.from('courses')
		.select('slug, colleges (slug)')
		.order('slug')
		.limit(10000);

	if (error) {
		console.warn('[sitemap] Supabase courses query failed:', error.message);
		return [];
	}

	const rows = filterDirectoryCourses((data ?? []) as CourseSlugRow[]);
	const origin = siteOrigin.replace(/\/$/, '');
	const urls: string[] = [];

	for (const row of rows) {
		if (!row.slug || DEDICATED_COURSE_PAGE_SLUGS.has(row.slug)) continue;
		urls.push(`${origin}/courses/${row.slug}/`);
	}

	return urls;
}
