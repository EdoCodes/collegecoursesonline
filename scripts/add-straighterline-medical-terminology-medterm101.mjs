/**
 * Upsert StraighterLine Medical Terminology MEDTERM101 (Health). Matches migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-straighterline-medical-terminology-medterm101.mjs
 */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	process.env.SUPABASE_URL || 'https://dlxyjoaxyektgqraayfl.supabase.co',
	process.env.SUPABASE_SERVICE_KEY || '',
);

if (!process.env.SUPABASE_SERVICE_KEY) {
	console.error('Missing SUPABASE_SERVICE_KEY');
	process.exit(1);
}

const { data: college, error: cErr } = await supabase.from('colleges').select('id').eq('slug', 'straighterline').single();
const { data: cat, error: gErr } = await supabase.from('course_categories').select('id').eq('slug', 'health').single();

if (cErr || gErr || !college || !cat) {
	console.error('Lookup failed:', cErr?.message || gErr?.message);
	process.exit(1);
}

const slug = 'straighterline-medical-terminology';

const learning_outcomes = `Break down unfamiliar medical terms using prefixes, suffixes, and combining forms.
Associate terminology with organ systems and describe relative positions using standard anatomical language.
Summarize common pathologies, procedures, and diagnostics using appropriate clinical vocabulary.
Apply terms in context through case-style prompts and short interpretive exercises.
Prepare for downstream anatomy, physiology, and clinical coursework with a consistent naming framework.`;

const general_education_note =
	'Widely required or recommended early in nursing, medical assisting, radiography, therapy, and other allied-health programs; some schools accept a single terminology course while others embed vocabulary in A&P — confirm your catalog.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Medical Terminology (MEDTERM101)',
			slug,
			description:
				"StraighterLine Medical Terminology (MEDTERM101) is ACE Credit–recommended (course code OOSL-0022) for 3 semester credits. You will learn word parts—prefixes, suffixes, roots—and correct spelling and pronunciation orientation as presented; directional, regional, and planar anatomical language; terminology mapped to major organ systems from integumentary through reproductive and obstetrics themes; common diseases, disorders, and procedures by system; diagnostic vocabulary spanning imaging and laboratory contexts; and practice interpreting brief clinical-style passages and scenarios using consistent nomenclature. Adapted readings are integrated (Pressbooks adaptation from Carter & Rutherford and Betts et al.). Seventeen checkpoints plus benchmarks and capstones with an open-book final; calculators not used. No prerequisites. Membership required; transcript delivery included. Taught by Dr. L. Confirm transfer with your registrar.",
			short_description:
				'ACE-recommended Medical Terminology — 3 credits, word parts & body systems, clinical vocabulary. $79/course + membership (StraighterLine). Common nursing/allied-health prereq; verify transfer.',
			course_url: 'https://www.straighterline.com/online-college-courses/medical-terminology/',
			image_url: '/images/courses/straighterline-medical-terminology.png',
			duration: 'Self-paced (~22 days avg)',
			level: 'Introductory',
			price: '$79',
			price_numeric: 79,
			certificate_available: true,
			credits: '3 credits (ACE-recommended)',
			featured: false,
			subcategory: 'Medical Terminology',
			learning_outcomes,
			general_education_note,
		},
		{ onConflict: 'slug' },
	)
	.select('id, title')
	.single();

if (error) {
	console.error(error.message);
	process.exit(1);
}

console.log('✅ Upserted:', data.title);
console.log('Course page: /courses/' + slug);
