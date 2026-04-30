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
    /** When true, omit the large hero image under the title; image still used for cards & social meta. */
    hideHeroImage: z.boolean().optional().default(false),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    /** Optional FAQ entries — emits FAQPage JSON-LD on `/blog/[slug]` when set. */
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .optional(),
  }),
});

export const collections = { blog };
