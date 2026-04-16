import { createClient } from '@supabase/supabase-js';
const sb = createClient(
  'https://dlxyjoaxyektgqraayfl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRseHlqb2F4eWVrdGdxcmFheWZsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDM4OTQ5MCwiZXhwIjoyMDg5OTY1NDkwfQ.8ELESHosJ88A-XGL-Vbyqnlch9jTZYNbqkTVqF-l6t4'
);

// slug -> subcategory (display name) + subcategory_slug (url-safe)
const tags = [
  // Computer Science
  { slug: 'web-development-full-stack',       subcategory: 'Web Development',       subcategory_slug: 'web-development' },
  { slug: 'intro-to-computer-science',        subcategory: 'Computer Science',      subcategory_slug: 'computer-science' },
  { slug: 'cybersecurity-fundamentals',       subcategory: 'Cybersecurity',         subcategory_slug: 'cybersecurity' },
  // Business
  { slug: 'financial-accounting',             subcategory: 'Accounting',            subcategory_slug: 'accounting' },
  { slug: 'strategic-management',             subcategory: 'Management',            subcategory_slug: 'management' },
  { slug: 'digital-marketing',                subcategory: 'Marketing',             subcategory_slug: 'marketing' },
  // Data Science
  { slug: 'machine-learning',                 subcategory: 'Machine Learning',      subcategory_slug: 'machine-learning' },
  { slug: 'data-science-python',              subcategory: 'Data Analysis',         subcategory_slug: 'data-analysis' },
  { slug: 'sql-for-data-analysis',            subcategory: 'Data Analysis',         subcategory_slug: 'data-analysis' },
  // Health & Medicine
  { slug: 'anatomy-physiology',               subcategory: 'Anatomy & Physiology',  subcategory_slug: 'anatomy-physiology' },
  { slug: 'sophia-anatomy-physiology-1',      subcategory: 'Anatomy & Physiology',  subcategory_slug: 'anatomy-physiology' },
  { slug: 'sophia-anatomy-and-physiology-1',  subcategory: 'Anatomy & Physiology',  subcategory_slug: 'anatomy-physiology' },
  { slug: 'straighterline-anatomy-physiology-1',     subcategory: 'Anatomy & Physiology', subcategory_slug: 'anatomy-physiology' },
  { slug: 'straighterline-anatomy-physiology-1-lab', subcategory: 'Anatomy & Physiology', subcategory_slug: 'anatomy-physiology' },
  { slug: 'straighterline-anatomy-physiology-2-lab', subcategory: 'Anatomy & Physiology', subcategory_slug: 'anatomy-physiology' },
  // Mathematics
  { slug: 'calculus-1',                       subcategory: 'Calculus',              subcategory_slug: 'calculus' },
  { slug: 'statistics-and-probability',       subcategory: 'Statistics',            subcategory_slug: 'statistics' },
  { slug: 'westcott-online-college-math',     subcategory: 'College Math',          subcategory_slug: 'college-math' },
  { slug: 'phoenix-college-algebra-mth220t',  subcategory: 'Algebra',               subcategory_slug: 'algebra' },
  { slug: 'straighterline-introductory-algebra',     subcategory: 'Algebra',        subcategory_slug: 'algebra' },
  { slug: 'straighterline-introduction-to-statistics', subcategory: 'Statistics',   subcategory_slug: 'statistics' },
  { slug: 'straighterline-calculus-1',        subcategory: 'Calculus',              subcategory_slug: 'calculus' },
  // Psychology
  { slug: 'intro-psychology',                 subcategory: 'General Psychology',    subcategory_slug: 'general-psychology' },
  // Engineering
  { slug: 'circuits-electronics',             subcategory: 'Electrical Engineering', subcategory_slug: 'electrical-engineering' },
  // Humanities
  { slug: 'modern-world-history',             subcategory: 'History',               subcategory_slug: 'history' },
  // Natural Sciences
  { slug: 'introduction-to-biology',          subcategory: 'Biology',               subcategory_slug: 'biology' },
  // Education
  { slug: 'learning-how-to-learn',            subcategory: 'Learning Skills',       subcategory_slug: 'learning-skills' },
];

let ok = 0, fail = 0;
for (const t of tags) {
  const { error } = await sb.from('courses')
    .update({ subcategory: t.subcategory, subcategory_slug: t.subcategory_slug })
    .eq('slug', t.slug);
  if (error) {
    // subcategory_slug column may not exist yet — fall back to just subcategory
    const { error: e2 } = await sb.from('courses')
      .update({ subcategory: t.subcategory })
      .eq('slug', t.slug);
    if (e2) { console.error('FAIL', t.slug, e2.message); fail++; }
    else { console.log('✅', t.slug, '→', t.subcategory); ok++; }
  } else {
    console.log('✅', t.slug, '→', t.subcategory);
    ok++;
  }
}
console.log(`\nDone: ${ok} tagged, ${fail} failed`);
