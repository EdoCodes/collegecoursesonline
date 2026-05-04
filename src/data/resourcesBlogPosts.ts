/**
 * Resource guides: articles live at `/resources/blog/{slug}`; the index grid is `/resources/guides`.
 * Single source for listing + homepage "Featured education articles".
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
  /** Optional; defaults to `title`. Use for logos or when `title` is too long for `alt`. */
  imageAlt?: string;
  imageObjectFit?: 'contain';
  imageContainVariant?: 'blue' | 'white';
  /** If set, cards link here (e.g. MDX article at `/blog/...`). Otherwise `/resources/blog/{slug}`. */
  hrefOverride?: string;
  /** When true, hide from `/resources/guides` grid (e.g. college guides hosted under `/colleges/*`). */
  omitFromResourcesBlogIndex?: boolean;
};

/** Canonical listing URL for all resource guides (card grid). */
export const resourcesGuidesIndexPath = '/resources/guides';

/** Resolved URL for a Resources blog card or homepage link. */
export function getResourcesBlogPostHref(post: ResourcesBlogPost): string {
  return post.hrefOverride ?? `/resources/blog/${post.slug}`;
}

export const resourcesBlogPosts: ResourcesBlogPost[] = [
  {
    slug: 'how-to-become-physician-assistant',
    title: 'How to Become a Physician Assistant: Required Courses, PA School Steps, and Online Options',
    excerpt:
      'Learn how to become a physician assistant, including required college classes, PA school prerequisites, patient care experience requirements, and whether online or hybrid coursework is accepted.',
    label: 'Health careers',
    date: 'Apr 26, 2026',
    readingTime: '14 min read',
    image: '/images/how-to-become-physician-assistant.jpg',
    tags: ['Physician assistant', 'PA school', 'Health careers', 'Prerequisites', '2026'],
  },
  {
    slug: 'prerequisite-college-courses-by-major',
    title: 'Most Common Prerequisite College Courses for Science, Humanities, and Nursing Majors',
    excerpt:
      'The most common prerequisite college courses for science, humanities, and nursing majors — plus how community colleges, online college classes, and hybrid college classes fit into transfer and degree planning.',
    label: 'College planning',
    date: 'Apr 26, 2026',
    readingTime: '14 min read',
    image: '/images/prerequisite-college-courses-by-major.jpg',
    tags: ['Prerequisite courses', 'Science majors', 'Nursing', 'Humanities', 'Community college', '2026'],
  },
  {
    slug: 'enrollment-decline-college-closures-hybrid-campus',
    title: 'Enrollment Decline, College Closures, and the Rise of the Hybrid Campus',
    excerpt:
      'Enrollment decline is forcing colleges to close, merge, and adapt. Learn why colleges are struggling, how the hybrid campus is rising, and why college classes online are becoming a core part of the future.',
    label: 'Higher education',
    date: 'Apr 26, 2026',
    readingTime: '13 min read',
    image:
      'https://images.pexels.com/photos/14753324/pexels-photo-14753324.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Enrollment cliff', 'College closures', 'Hybrid campus', 'College classes online', '2026'],
  },
  {
    slug: 'certificate-programs-college-credit',
    title:
      'Certificate Programs That Count for College Credit: Ultimate Guide for Nursing, IT, Paralegal & More',
    excerpt:
      'How certificate programs transferable to college credits work: community college certificates, UCLA Extension for-credit courses, ACE/NCCRS industry certs (Google, CompTIA, AWS), WGU/APUS/SNHU mappings, and pathway tips for RN-to-BSN, IT, paralegal, and AS-to-BS business.',
    label: 'Certificates & transfer',
    date: 'Apr 30, 2026',
    readingTime: '24 min read',
    image:
      'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: [
      'Transfer credit',
      'Certificates',
      'RN-to-BSN',
      'IT certifications',
      'Paralegal',
      'ACE credit',
      '2026',
    ],
  },
  {
    slug: 'online-college-enrollment-after-pandemic',
    title:
      'Online College Enrollment After the Pandemic: Trends, Costs, Pros, Cons, and the Future',
    excerpt:
      'How online college enrollment changed since the pandemic, which online classes are in demand, whether students save money, tradeoffs of distance learning, and why hybrid models are the realistic baseline.',
    label: 'Blog',
    date: 'Apr 17, 2026',
    readingTime: '16 min read',
    image:
      'https://images.pexels.com/photos/5905448/pexels-photo-5905448.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: [
      'online college enrollment',
      'distance education',
      'online learning trends',
      '2026',
    ],
    hrefOverride: '/resources/blog/online-college-enrollment-after-pandemic',
  },
  {
    slug: 'academic-acronyms-glossary',
    title: 'Glossary of Academic Abbreviations',
    excerpt:
      'Degree, nursing, and IT shorthand plus accreditation terms—with links to official accrediting organizations where applicable.',
    label: 'Glossary',
    date: 'Apr 17, 2026',
    readingTime: '14 min read',
    image:
      'https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Glossary', 'Degrees', 'Nursing', 'IT', 'Accreditation', '2026'],
    hrefOverride: '/resources/glossary/academic-abbreviations/',
  },
  {
    slug: 'university-of-the-people-tuition-free-degrees',
    title:
      'University of the People: Tuition-Free Accredited Online Degrees, Programs, Transfer Credits, and FAQs',
    excerpt:
      'What UoPeople offers: tuition-free online degrees, accreditation, fees, transfer credit rules, who it fits—and what to verify before you enroll.',
    label: 'Colleges',
    date: 'Apr 15, 2026',
    readingTime: '16 min read',
    image: '/images/cards/schools/university-of-the-people-card.png',
    imageAlt:
      'University of the People branding: white shield logo and wordmark on a deep purple gradient banner.',
    tags: [
      'University of the People',
      'Tuition-free',
      'Online degrees',
      'Transfer credits',
      '2026',
    ],
    hrefOverride: '/colleges/university-of-the-people-tuition-free-degrees',
    omitFromResourcesBlogIndex: true,
  },
  {
    slug: 'bsc-respiratory-care-online-ecc',
    title:
      'Get Your BSc in Respiratory Care Online at ECC: El Camino College History, Programs, and Career Paths',
    excerpt:
      'Online B.S. in Respiratory Care at El Camino College (first bachelor’s at ECC), plus hybrid A.S. Radiologic Technology—admission, costs, South Bay history, Brian Wilson alumni, FAQs. Official ECC links.',
    label: 'Colleges',
    date: 'Apr 22, 2026',
    readingTime: '18 min read',
    image:
      'https://images.pexels.com/photos/7579834/pexels-photo-7579834.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt:
      'Health-care and respiratory care training context—clinical workspace (representative stock image).',
    tags: [
      'El Camino College',
      'Respiratory Care',
      'Online bachelor’s',
      'Radiologic Technology',
      'Torrance',
      '2026',
    ],
    hrefOverride: '/colleges/bsc-respiratory-care-online-ecc',
    omitFromResourcesBlogIndex: true,
  },
  {
    slug: 'student-integrity-online-proctored-exams',
    title:
      'Student Integrity in Online Proctored College Exams: Why It Matters More Than Ever',
    excerpt:
      'Why academic integrity matters for online proctored exams: research on cheating rates, how colleges enforce rules, ethics of monitoring, and what students should know before test day.',
    label: 'Academic integrity',
    date: 'Apr 14, 2026',
    readingTime: '14 min read',
    image:
      'https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: [
      'Online proctoring',
      'Academic integrity',
      'Online exams',
      'Higher education',
      '2026',
    ],
  },
  {
    slug: 'university-of-florida-online-2026-guide',
    title:
      'University of Florida Online (UF Online): 2026 Guide to Programs, Admissions & Tuition',
    excerpt:
      'UF Online for 2026: U.S. News rankings, 24 online majors, transfer and Florida A.A. rules, per-credit tuition, student support, and who the program fits best.',
    label: 'Colleges',
    date: 'Apr 17, 2026',
    readingTime: '14 min read',
    image:
      'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['UF Online', 'Florida', 'Online Bachelor’s', 'Transfer Students', '2026'],
  },
  {
    slug: 'prerequisite-courses-for-nursing-school',
    title:
      'Prerequisite Courses for Nursing School: Complete 2026 Guide for Future Nurses',
    excerpt:
      'Learn the most common prerequisite courses for nursing school, how to choose the right classes, GPA requirements, expiration dates, accredited online nursing programs, and how counselors can help you plan ahead.',
    label: 'Nursing',
    date: 'Apr 13, 2026',
    readingTime: '22 min read',
    image: '/images/prerequisite-courses-for-nursing-school.jpg',
    tags: [
      'Nursing',
      'Prerequisites',
      'BSN',
      'ADN',
      'Online Nursing',
      '2026',
    ],
  },
  {
    slug: 'study-com-vs-sophia-vs-straighterline',
    title:
      'Study.com vs Sophia vs StraighterLine: which online college credit platform wins in 2026?',
    excerpt:
      'Compare three major alternative credit platforms on price, catalogs, transfer partnerships, and learning format — with interactive cost calculators and charts.',
    label: 'Platform comparison',
    date: 'Apr 8, 2026',
    readingTime: '18 min read',
    image: 'https://images.pexels.com/photos/6239107/pexels-photo-6239107.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Study.com', 'Sophia Learning', 'StraighterLine', 'Transfer Credits', '2026'],
  },
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
