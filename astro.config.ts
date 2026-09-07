import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { getCourseUrlsForSitemap } from './src/lib/getCourseUrlsForSitemap';

const site = 'https://collegecourses.online';

const courseUrls = await getCourseUrlsForSitemap(site);
if (courseUrls.length) {
	console.log(`[sitemap] Adding ${courseUrls.length} Supabase course URLs to customPages`);
}

// https://astro.build/config
export default defineConfig({
	adapter: netlify(),
	site,
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => !page.includes('/admin'),
			changefreq: 'weekly',
			priority: 0.7,
			customPages: courseUrls,
		}),
	],
});
