import { createClient } from '@supabase/supabase-js';
const sb = createClient(
  'https://dlxyjoaxyektgqraayfl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRseHlqb2F4eWVrdGdxcmFheWZsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDM4OTQ5MCwiZXhwIjoyMDg5OTY1NDkwfQ.8ELESHosJ88A-XGL-Vbyqnlch9jTZYNbqkTVqF-l6t4'
);

// StraighterLine + Sophia Learning courses only
const tags = [
  { slug: 'sophia-anatomy-physiology-1',      subcategory: 'Anatomy & Physiology',  subcategory_slug: 'anatomy-physiology' },
  { slug: 'straighterline-anatomy-physiology-1',     subcategory: 'Anatomy & Physiology', subcategory_slug: 'anatomy-physiology' },
  { slug: 'straighterline-anatomy-physiology-1-lab', subcategory: 'Anatomy & Physiology', subcategory_slug: 'anatomy-physiology' },
  { slug: 'straighterline-anatomy-physiology-2-lab', subcategory: 'Anatomy & Physiology', subcategory_slug: 'anatomy-physiology' },
  { slug: 'straighterline-introductory-algebra',     subcategory: 'Algebra',        subcategory_slug: 'algebra' },
  { slug: 'straighterline-introduction-to-statistics', subcategory: 'Statistics',   subcategory_slug: 'statistics' },
  { slug: 'straighterline-calculus-1',        subcategory: 'Calculus',              subcategory_slug: 'calculus' },
  { slug: 'straighterline-microbiology',      subcategory: 'Biology',               subcategory_slug: 'biology' },
  { slug: 'study-com-biology-201l-anatomy-physiology-i-with-lab', subcategory: 'Anatomy & Physiology', subcategory_slug: 'anatomy-physiology' },
  { slug: 'study-com-algebra', subcategory: 'Algebra', subcategory_slug: 'algebra' },
  { slug: 'study-com-statistics', subcategory: 'Statistics', subcategory_slug: 'statistics' },
  { slug: 'study-com-sociology', subcategory: 'Sociology', subcategory_slug: 'sociology' },
  { slug: 'study-com-psychology-101', subcategory: 'Psychology 101', subcategory_slug: 'psychology-101' },
  { slug: 'study-com-general-chemistry', subcategory: 'General Chemistry', subcategory_slug: 'general-chemistry' },
  { slug: 'study-com-western-civilization', subcategory: 'Western Civilization', subcategory_slug: 'western-civilization' },
  { slug: 'study-com-college-composition', subcategory: 'College Composition', subcategory_slug: 'college-composition' },
  { slug: 'study-com-english-literature', subcategory: 'English Literature', subcategory_slug: 'english-literature' },
  { slug: 'study-com-public-speaking', subcategory: 'Public Speaking', subcategory_slug: 'public-speaking' },
  { slug: 'study-com-analyzing-and-interpreting-literature', subcategory: 'Analyzing and Interpreting Literature', subcategory_slug: 'analyzing-and-interpreting-literature' },
  { slug: 'study-com-biology-106-pathophysiology', subcategory: 'Pathophysiology', subcategory_slug: 'pathophysiology' },
  { slug: 'study-com-american-literature', subcategory: 'American Literature', subcategory_slug: 'american-literature' },
  { slug: 'study-com-us-history-i', subcategory: 'US History I', subcategory_slug: 'us-history-i' },
];

let ok = 0, fail = 0;
for (const t of tags) {
  const { error } = await sb.from('courses')
    .update({ subcategory: t.subcategory, subcategory_slug: t.subcategory_slug })
    .eq('slug', t.slug);
  if (error) {
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
