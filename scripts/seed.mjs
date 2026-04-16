/**
 * Seed script — inserts all colleges, categories, and courses into Supabase.
 * Run with: node scripts/seed.mjs
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dlxyjoaxyektgqraayfl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRseHlqb2F4eWVrdGdxcmFheWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzODk0OTAsImV4cCI6MjA4OTk2NTQ5MH0.RViY-bBv5GVya-Z1JVpjEDIqttJWXZ4MP48vkXotLvk';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── 1. COLLEGES ────────────────────────────────────────────────────────────────
const colleges = [
  { name: 'Harvard University (via edX)',         slug: 'harvard-edx',          description: 'World-renowned Ivy League university offering free online courses via edX.',           accreditation: 'Regional Accreditation', accreditation_level: 'Regional',      country: 'USA', featured: true,  popularity_score: 99, ease_of_access_score: 95 },
  { name: 'Harvard Business School Online',        slug: 'harvard-business',     description: 'HBS Online delivers the world-class HBS experience in an online format.',              accreditation: 'Regional Accreditation', accreditation_level: 'Regional',      country: 'USA', featured: true,  popularity_score: 97, ease_of_access_score: 88 },
  { name: 'Stanford University (via Coursera)',    slug: 'stanford-coursera',    description: 'Stanford offers cutting-edge courses in technology and science via Coursera.',          accreditation: 'Regional Accreditation', accreditation_level: 'Regional',      country: 'USA', featured: true,  popularity_score: 98, ease_of_access_score: 90 },
  { name: 'MIT (via edX)',                         slug: 'mit-edx',              description: 'Massachusetts Institute of Technology — world leader in science and engineering.',       accreditation: 'Regional Accreditation', accreditation_level: 'Regional',      country: 'USA', featured: true,  popularity_score: 97, ease_of_access_score: 80 },
  { name: 'Yale University (via Coursera)',        slug: 'yale-coursera',        description: 'Yale brings its celebrated liberal arts education online through Coursera.',             accreditation: 'Regional Accreditation', accreditation_level: 'Regional',      country: 'USA', featured: false, popularity_score: 95, ease_of_access_score: 93 },
  { name: 'Johns Hopkins University (via Coursera)',slug: 'jhu-coursera',        description: 'JHU is a global leader in public health and medical research.',                         accreditation: 'Regional Accreditation', accreditation_level: 'Regional',      country: 'USA', featured: false, popularity_score: 90, ease_of_access_score: 91 },
  { name: 'University of Michigan (via Coursera)', slug: 'umich-coursera',       description: 'UMich offers highly rated data science and engineering courses online.',                accreditation: 'Regional Accreditation', accreditation_level: 'Regional',      country: 'USA', featured: false, popularity_score: 91, ease_of_access_score: 89 },
  { name: 'University of Virginia (via Coursera)', slug: 'uva-coursera',         description: 'UVA brings its distinguished humanities and business programs online.',                 accreditation: 'Regional Accreditation', accreditation_level: 'Regional',      country: 'USA', featured: false, popularity_score: 80, ease_of_access_score: 90 },
  { name: 'UC San Diego (via Coursera)',           slug: 'ucsd-coursera',        description: 'UCSD is known for world-class research and highly accessible online courses.',          accreditation: 'Regional Accreditation', accreditation_level: 'Regional',      country: 'USA', featured: false, popularity_score: 96, ease_of_access_score: 97 },
  { name: 'Rochester Institute of Technology',    slug: 'rit',                  description: 'RIT offers career-focused technology and cybersecurity programs online.',               accreditation: 'Regional Accreditation', accreditation_level: 'Regional',      country: 'USA', featured: false, popularity_score: 88, ease_of_access_score: 85 },
  { name: 'Copenhagen Business School',           slug: 'cbs',                  description: 'CBS is one of Europe\'s largest business schools with a strong global reputation.',    accreditation: 'International',          accreditation_level: 'International', country: 'Denmark', featured: false, popularity_score: 85, ease_of_access_score: 87 },
  { name: 'Meta (via Coursera)',                  slug: 'meta-coursera',        description: 'Meta\'s professional certificate programs teach in-demand tech skills.',               accreditation: 'National',               accreditation_level: 'National',      country: 'USA', featured: false, popularity_score: 94, ease_of_access_score: 92 },
  { name: 'Google Career Certificates',           slug: 'google-certificates',  description: 'Google\'s certificate programs prepare learners for high-demand careers in tech.',    accreditation: 'National',               accreditation_level: 'National',      country: 'USA', featured: false, popularity_score: 93, ease_of_access_score: 96 },
  { name: 'Udacity',                              slug: 'udacity',              description: 'Udacity offers industry-relevant nanodegrees and free courses in tech.',                accreditation: 'National',               accreditation_level: 'National',      country: 'USA', featured: false, popularity_score: 82, ease_of_access_score: 94 },
  { name: 'Khan Academy',                         slug: 'khan-academy',         description: 'Khan Academy provides free, world-class education for anyone, anywhere.',              accreditation: 'National',               accreditation_level: 'National',      country: 'USA', featured: false, popularity_score: 89, ease_of_access_score: 99 },
];

// ── 2. CATEGORIES ──────────────────────────────────────────────────────────────
const categories = [
  { name: 'Business',          slug: 'business',         description: 'Finance, management, marketing, and entrepreneurship courses.',    icon: '💼' },
  { name: 'Computer Science',  slug: 'computer-science', description: 'Programming, algorithms, software engineering, and AI.',           icon: '💻' },
  { name: 'Data Science',      slug: 'data-science',     description: 'Data analysis, machine learning, statistics, and visualization.',  icon: '📊' },
  { name: 'Education',         slug: 'education',        description: 'Teaching, learning science, and educational leadership.',          icon: '🎓' },
  { name: 'Engineering',       slug: 'engineering',      description: 'Electrical, mechanical, civil, and software engineering.',         icon: '⚙️' },
  { name: 'Health & Medicine', slug: 'health',           description: 'Public health, anatomy, nursing, and medical sciences.',           icon: '🏥' },
  { name: 'Humanities',        slug: 'humanities',       description: 'History, philosophy, literature, and cultural studies.',           icon: '📚' },
  { name: 'Mathematics',       slug: 'mathematics',      description: 'Calculus, statistics, linear algebra, and discrete math.',         icon: '➗' },
  { name: 'Psychology',        slug: 'psychology',       description: 'Cognitive science, behavioral psychology, and mental health.',     icon: '🧠' },
  { name: 'Natural Sciences',  slug: 'science',          description: 'Biology, chemistry, physics, and environmental science.',          icon: '🔬' },
];

// ── 3. COURSES (keyed by college slug + category slug) ─────────────────────────
const courseDefs = [
  {
    college: 'harvard-edx', category: 'computer-science', featured: true,
    title: 'Introduction to Computer Science',
    slug: 'intro-to-computer-science',
    description: 'Harvard\'s legendary CS50 is the most popular computer science course in the world. It teaches students how to think algorithmically and solve problems efficiently. Topics include abstraction, algorithms, data structures, encapsulation, resource management, security, software engineering, and web development.',
    short_description: 'A broad, project-based introduction to programming, algorithms, and the fundamentals of computer science used by professionals worldwide.',
    course_url: 'https://www.edx.org/course/introduction-computer-science-harvardx-cs50x',
    image_url: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '12 weeks', level: 'Beginner', price: 'Free', price_numeric: 0, certificate_available: true, credits: '4 credits',
  },
  {
    college: 'harvard-business', category: 'business', featured: true,
    title: 'Financial Accounting',
    slug: 'financial-accounting',
    description: 'Financial Accounting is designed to help you understand the role of financial reporting in the business environment. You will learn to read and interpret financial statements, understand GAAP principles, and analyze company performance through real-world case studies.',
    short_description: 'Master the language of business. Learn to read financial statements, understand GAAP principles, and analyze company performance.',
    course_url: 'https://online.hbs.edu/courses/financial-accounting/',
    image_url: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '8 weeks', level: 'Beginner', price: '$1,750', price_numeric: 1750, certificate_available: true, credits: '3 credits',
  },
  {
    college: 'stanford-coursera', category: 'data-science', featured: true,
    title: 'Machine Learning Specialization',
    slug: 'machine-learning',
    description: 'The Machine Learning Specialization is a foundational online program created in collaboration between DeepLearning.AI and Stanford Online. This beginner-friendly program teaches the fundamentals of machine learning and how to use these techniques to build real-world AI applications.',
    short_description: 'Build ML models with Python and TensorFlow. Covers supervised learning, neural networks, and best practices from a leading AI researcher.',
    course_url: 'https://www.coursera.org/specializations/machine-learning-introduction',
    image_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '3 months', level: 'Intermediate', price: 'Free', price_numeric: 0, certificate_available: true, credits: null,
  },
  {
    college: 'meta-coursera', category: 'computer-science', featured: false,
    title: 'Full-Stack Web Development',
    slug: 'web-development-full-stack',
    description: 'Launch your career as a full-stack developer. Build job-ready skills for an in-demand career and earn a credential from Meta. Learn HTML, CSS, JavaScript, React, Node.js, and databases through hands-on projects.',
    short_description: 'Learn HTML, CSS, JavaScript, React, Node.js, and databases to build complete web applications from front to back.',
    course_url: 'https://www.coursera.org/professional-certificates/meta-full-stack-developer',
    image_url: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '9 months', level: 'Beginner', price: 'Free', price_numeric: 0, certificate_available: true, credits: null,
  },
  {
    college: 'rit', category: 'computer-science', featured: false,
    title: 'Cybersecurity Fundamentals',
    slug: 'cybersecurity-fundamentals',
    description: 'This professional certificate program covers the fundamentals of cybersecurity including network security, cryptography, incident response, and security policy. Ideal for those looking to start or advance a career in information security.',
    short_description: 'Understand threats, vulnerabilities, and defenses. Covers network security, cryptography, and incident response for modern organizations.',
    course_url: 'https://www.edx.org/professional-certificate/ritx-cybersecurity',
    image_url: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '6 months', level: 'Beginner', price: '$267', price_numeric: 267, certificate_available: true, credits: '3 credits',
  },
  {
    college: 'cbs', category: 'business', featured: false,
    title: 'Strategic Management & Innovation',
    slug: 'strategic-management',
    description: 'Develop the skills to formulate and implement strategies that create competitive advantage. This specialization covers strategic analysis, business model innovation, and execution through real-world case studies from global companies.',
    short_description: 'Develop skills to formulate and implement strategies that create competitive advantage. Includes real-world case studies from global companies.',
    course_url: 'https://www.coursera.org/specializations/strategic-management',
    image_url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '5 months', level: 'Intermediate', price: 'Free', price_numeric: 0, certificate_available: true, credits: null,
  },
  {
    college: 'google-certificates', category: 'business', featured: false,
    title: 'Digital Marketing Certificate',
    slug: 'digital-marketing',
    description: 'Prepare for a career in digital marketing and e-commerce. Learn from Google experts and gain job-ready skills in SEO, SEM, email marketing, social media, and analytics. No experience required.',
    short_description: 'Master SEO, social media, email marketing, and paid advertising. Build campaigns that drive measurable results for any business.',
    course_url: 'https://grow.google/certificates/digital-marketing-ecommerce/',
    image_url: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '6 months', level: 'Beginner', price: 'Free', price_numeric: 0, certificate_available: true, credits: null,
  },
  {
    college: 'umich-coursera', category: 'data-science', featured: false,
    title: 'Applied Data Science with Python',
    slug: 'data-science-python',
    description: 'This specialization introduces data science through the python programming language. You will learn to use Python, Pandas, Matplotlib, Scikit-learn, and NLTK to analyze real datasets and build predictive models.',
    short_description: 'Use Python, Pandas, NumPy, and Matplotlib to analyze real datasets. Includes text mining, social network analysis, and applied machine learning.',
    course_url: 'https://www.coursera.org/specializations/data-science-python',
    image_url: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '5 months', level: 'Intermediate', price: 'Free', price_numeric: 0, certificate_available: true, credits: null,
  },
  {
    college: 'udacity', category: 'data-science', featured: false,
    title: 'SQL for Data Analysis',
    slug: 'sql-for-data-analysis',
    description: 'Learn to use Structured Query Language (SQL) to extract and analyze data stored in databases. This course covers basic SQL syntax, aggregations, subqueries, window functions, and how to use SQL to answer real business questions.',
    short_description: 'Write complex queries, optimize databases, and extract business insights from large datasets using SQL — the most in-demand data skill.',
    course_url: 'https://www.udacity.com/course/sql-for-data-analysis--ud198',
    image_url: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '4 weeks', level: 'Beginner', price: 'Free', price_numeric: 0, certificate_available: false, credits: null,
  },
  {
    college: 'umich-coursera', category: 'health', featured: false,
    title: 'Human Anatomy & Physiology',
    slug: 'anatomy-physiology',
    description: 'A college-level survey of the structure and function of the human body. Covers cells and tissues, the skeletal, muscular, nervous, cardiovascular, respiratory, and digestive systems. Ideal preparation for nursing, pre-med, and allied health careers.',
    short_description: 'A college-level survey of the human body — from cells and tissues to organ systems. Ideal preparation for nursing, pre-med, and health careers.',
    course_url: 'https://www.edx.org/course/human-anatomy',
    image_url: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '10 weeks', level: 'Beginner', price: '$199', price_numeric: 199, certificate_available: true, credits: '4 credits',
  },
  {
    college: 'mit-edx', category: 'mathematics', featured: false,
    title: 'Calculus 1: Limits & Derivatives',
    slug: 'calculus-1',
    description: 'This course is the first in a series covering single-variable calculus. Topics include limits, continuity, differentiation, and applications of derivatives. Part of MIT\'s acclaimed 18.01x series on the edX platform.',
    short_description: 'Build a solid foundation in differential calculus. Covers limits, continuity, derivatives, and their applications in science and engineering.',
    course_url: 'https://www.edx.org/course/calculus-1a-differentiation',
    image_url: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '13 weeks', level: 'Intermediate', price: 'Free', price_numeric: 0, certificate_available: true, credits: '4 credits',
  },
  {
    college: 'khan-academy', category: 'mathematics', featured: false,
    title: 'Statistics & Probability',
    slug: 'statistics-and-probability',
    description: 'A comprehensive introduction to statistics and probability. Covers descriptive statistics, probability theory, random variables, sampling distributions, confidence intervals, and hypothesis testing. Essential for data science, research, and business analytics.',
    short_description: 'From descriptive stats to hypothesis testing and regression. Essential for data science, research, business analytics, and everyday decision-making.',
    course_url: 'https://www.khanacademy.org/math/statistics-probability',
    image_url: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: 'Self-paced', level: 'Beginner', price: 'Free', price_numeric: 0, certificate_available: false, credits: null,
  },
  {
    college: 'yale-coursera', category: 'psychology', featured: false,
    title: 'Introduction to Psychology',
    slug: 'intro-psychology',
    description: 'What are people most likely to lie about? How do we form our self-image? What is the unconscious, and how does it affect us? This course surveys the science of mind and behavior, from perception and memory to development, personality, and social influence.',
    short_description: 'Survey the science of mind and behavior — from perception and memory to development, personality, and social influence. No prior knowledge needed.',
    course_url: 'https://www.coursera.org/learn/introduction-psychology',
    image_url: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '6 weeks', level: 'Beginner', price: 'Free', price_numeric: 0, certificate_available: true, credits: '3 credits',
  },
  {
    college: 'mit-edx', category: 'engineering', featured: false,
    title: 'Circuits & Electronics',
    slug: 'circuits-electronics',
    description: 'Learn to analyze and design electrical circuits. This three-part series covers resistive circuits, transient circuits, amplifiers, and digital logic. The foundation for all electrical engineering and embedded systems work.',
    short_description: 'Learn to analyze and design electrical circuits. Covers resistors, capacitors, amplifiers, and digital logic — the building blocks of all electronics.',
    course_url: 'https://www.edx.org/course/circuits-and-electronics-1-basic-circuit-analysis',
    image_url: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '16 weeks', level: 'Intermediate', price: 'Free', price_numeric: 0, certificate_available: true, credits: '12 credits',
  },
  {
    college: 'uva-coursera', category: 'humanities', featured: false,
    title: 'The Modern World: Global History',
    slug: 'modern-world-history',
    description: 'This course presents a big picture view of modern history from 1760 to the present. It covers the forces that transformed the world — industrialization, empire, revolution, and globalization — and how they shaped the societies we live in today.',
    short_description: 'Trace the forces that shaped the modern world from 1760 to the present — industrialization, empire, revolution, and globalization.',
    course_url: 'https://www.coursera.org/learn/modern-world',
    image_url: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '8 weeks', level: 'Beginner', price: 'Free', price_numeric: 0, certificate_available: true, credits: null,
  },
  {
    college: 'mit-edx', category: 'science', featured: false,
    title: 'Introduction to Biology: The Secret of Life',
    slug: 'introduction-to-biology',
    description: 'Explore the molecular basis of life with MIT\'s acclaimed introductory biology curriculum. Topics include biochemistry, genetics, molecular biology, recombinant DNA, genomics, and rational medicine. Taught by MIT Professor Eric Lander.',
    short_description: 'Explore the molecular basis of life — DNA, genetics, evolution, and cell biology — through MIT\'s acclaimed introductory biology curriculum.',
    course_url: 'https://www.edx.org/course/introduction-to-biology-the-secret-of-life-3',
    image_url: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '16 weeks', level: 'Beginner', price: 'Free', price_numeric: 0, certificate_available: true, credits: '4 credits',
  },
  {
    college: 'ucsd-coursera', category: 'education', featured: false,
    title: 'Learning How to Learn',
    slug: 'learning-how-to-learn',
    description: 'This course gives you easy access to the invaluable learning techniques used by experts in art, music, literature, math, science, sports, and many other disciplines. Based on neuroscience and cognitive psychology research.',
    short_description: 'The world\'s most popular online course. Science-backed techniques to master any subject faster — memory, focus, procrastination, and more.',
    course_url: 'https://www.coursera.org/learn/learning-how-to-learn',
    image_url: 'https://images.pexels.com/photos/4144179/pexels-photo-4144179.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '4 weeks', level: 'Beginner', price: 'Free', price_numeric: 0, certificate_available: true, credits: null,
  },
];

async function seed() {
  console.log('🌱 Starting seed...\n');

  // ── Insert colleges ──────────────────────────────────────────────────────────
  console.log('📚 Inserting colleges...');
  const { data: insertedColleges, error: collegeError } = await supabase
    .from('colleges')
    .upsert(colleges, { onConflict: 'slug' })
    .select('id, slug');

  if (collegeError) {
    console.error('❌ College insert error:', collegeError.message);
    process.exit(1);
  }
  console.log(`   ✅ ${insertedColleges.length} colleges inserted`);

  const collegeMap = Object.fromEntries(insertedColleges.map(c => [c.slug, c.id]));

  // ── Insert categories ────────────────────────────────────────────────────────
  console.log('🏷️  Inserting categories...');
  const { data: insertedCats, error: catError } = await supabase
    .from('course_categories')
    .upsert(categories, { onConflict: 'slug' })
    .select('id, slug');

  if (catError) {
    console.error('❌ Category insert error:', catError.message);
    process.exit(1);
  }
  console.log(`   ✅ ${insertedCats.length} categories inserted`);

  const catMap = Object.fromEntries(insertedCats.map(c => [c.slug, c.id]));

  // ── Insert courses ───────────────────────────────────────────────────────────
  console.log('🎓 Inserting courses...');
  const courses = courseDefs.map(({ college, category, ...rest }) => ({
    ...rest,
    college_id: collegeMap[college],
    category_id: catMap[category],
  }));

  const { data: insertedCourses, error: courseError } = await supabase
    .from('courses')
    .upsert(courses, { onConflict: 'slug' })
    .select('id, title');

  if (courseError) {
    console.error('❌ Course insert error:', courseError.message);
    process.exit(1);
  }
  console.log(`   ✅ ${insertedCourses.length} courses inserted`);

  console.log('\n🎉 Seed complete! Your Supabase database is ready.');
  console.log('\nCourses added:');
  insertedCourses.forEach(c => console.log(`   • ${c.title}`));
}

seed().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
