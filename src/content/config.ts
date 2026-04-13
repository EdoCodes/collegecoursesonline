import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Staff Writer'),
    /** Shown under author name in Resources blog layout (e.g. campus-edu-review). */
    authorTitle: z.string().optional(),
    /** Hero badge above the title (e.g. College Review). */
    categoryLabel: z.string().optional(),
    /** Short crumb label; full `title` is used if omitted. */
    breadcrumbTitle: z.string().optional(),
    /** Optional override; otherwise derived from word count in the page layout. */
    readTime: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
