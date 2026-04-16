import { createClient } from '@supabase/supabase-js';
const sb = createClient(
  'https://dlxyjoaxyektgqraayfl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRseHlqb2F4eWVrdGdxcmFheWZsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDM4OTQ5MCwiZXhwIjoyMDg5OTY1NDkwfQ.8ELESHosJ88A-XGL-Vbyqnlch9jTZYNbqkTVqF-l6t4'
);

// StraighterLine + Sophia Learning courses only
const tags = [
  { slug: 'sophia-anatomy-physiology-1',      subcategory: 'Anatomy & Physiology',  subcategory_slug: 'anatomy-physiology' },
  { slug: 'sophia-anatomy-and-physiology-1',  subcategory: 'Anatomy & Physiology',  subcategory_slug: 'anatomy-physiology' },
  { slug: 'straighterline-anatomy-physiology-1',     subcategory: 'Anatomy & Physiology', subcategory_slug: 'anatomy-physiology' },
  { slug: 'straighterline-anatomy-physiology-1-lab', subcategory: 'Anatomy & Physiology', subcategory_slug: 'anatomy-physiology' },
  { slug: 'straighterline-anatomy-physiology-2-lab', subcategory: 'Anatomy & Physiology', subcategory_slug: 'anatomy-physiology' },
  { slug: 'straighterline-introductory-algebra',     subcategory: 'Algebra',        subcategory_slug: 'algebra' },
  { slug: 'straighterline-introduction-to-statistics', subcategory: 'Statistics',   subcategory_slug: 'statistics' },
  { slug: 'straighterline-calculus-1',        subcategory: 'Calculus',              subcategory_slug: 'calculus' },
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
