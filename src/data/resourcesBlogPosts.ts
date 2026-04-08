/**
 * Resources blog (/resources/blog/*) — single source for listing + homepage "Featured education articles".
 */
export type ResourcesBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  label: string;
  date: string;
  readingTime: string;
  image: string;
  tags: string[];
  imageObjectFit?: 'contain';
  imageContainVariant?: 'blue' | 'white';
};

export const resourcesBlogPosts: ResourcesBlogPost[] = [
  {
    slug: 'campus-edu-review',
    title:
      'Campus.edu Review: Accreditation, Programs, Tuition, Student Support, and Everything You Need to Know',
    excerpt:
      'An in-depth look at Campus.edu — the ACCJC-accredited online community college with live classes, personal coaching, free tutoring, and tuition capped at $7,320/year.',
    label: 'College Review',
    date: 'Mar 26, 2026',
    readingTime: '13 min read',
    image: '/images/cards/blog/campus-edu-review-card.png',
    imageObjectFit: 'contain',
    imageContainVariant: 'white',
    tags: ['Campus.edu', 'College Review', 'Online Community College', 'Accredited'],
  },
  {
    slug: 'fafsa-financial-aid-online-college-degrees',
    title: 'FAFSA and State Financial Aid for Online College Degrees: A Complete Guide',
    excerpt:
      'Learn how FAFSA, state grants, scholarships, and institutional aid work for accredited online degrees. Explore eligibility rules, state examples, and a step-by-step funding strategy.',
    label: 'Financial Aid Guide',
    date: 'Mar 26, 2026',
    readingTime: '12 min read',
    image: '/images/cards/blog/fafsa-financial-aid-card.png',
    imageObjectFit: 'contain',
    imageContainVariant: 'blue',
    tags: ['FAFSA', 'Financial Aid', 'Online Degrees', 'State Grants'],
  },
  {
    slug: 'international-students-online-us-colleges',
    title: 'Can International Students Study Online at U.S. Colleges? A Complete Guide',
    excerpt:
      'Students living abroad can earn an accredited U.S. online degree without relocating. Learn about visa rules, English requirements, top schools, and how to apply from your home country.',
    label: 'International Students',
    date: 'Mar 26, 2026',
    readingTime: '14 min read',
    image: 'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['International Students', 'Online Degrees', 'Visa Rules', 'U.S. Colleges'],
  },
  {
    slug: 'most-affordable-online-bachelors-degrees-2026',
    title: "The Advantages of Pursuing an Online Bachelor's Degree",
    excerpt:
      "A timeless, research-backed guide to the benefits, top programs, and career outcomes of accredited online bachelor's degrees—for working adults, career changers, and lifelong learners.",
    label: 'Online Education Guide',
    date: 'Mar 24, 2026',
    readingTime: '16 min read',
    image: 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ["Online Bachelor's", 'Accredited Programs', 'Career Resources', 'Nursing BSN'],
  },
  {
    slug: 'how-to-choose-right-online-college',
    title: 'How to Choose the Right Online College: The Complete Guide (2025–2026)',
    excerpt:
      'Everything you need to know before you enroll—accreditation, true costs, transfer credits, diploma mill warnings, a 9-step decision framework, and comprehensive FAQs.',
    label: 'Complete Guide',
    date: 'Mar 5, 2026',
    readingTime: '28 min read',
    image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Accreditation', 'Transfer Credits', 'Costs', '2025–2026'],
  },
];
