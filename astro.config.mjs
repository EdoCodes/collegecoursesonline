// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://yoursite.com', // Replace with your actual domain
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/admin'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    })
  ],
});
