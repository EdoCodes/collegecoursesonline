// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  site: 'https://www.collegecourses.online',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/admin'),
      changefreq: 'weekly',
      priority: 0.7,
    })
  ],
});
