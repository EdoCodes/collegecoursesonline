/**
 * Upsert StraighterLine English Composition II ENG102 (Humanities). Matches migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-straighterline-english-composition-ii-eng102.mjs
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
const { data: cat, error: gErr } = await supabase
	.from('course_categories')
	.select('id')
	.eq('slug', 'humanities')
	.single();

if (cErr || gErr || !college || !cat) {
	console.error('Lookup failed:', cErr?.message || gErr?.message);
	process.exit(1);
}

const slug = 'straighterline-english-composition-ii';

const learning_outcomes = `Construct thesis-driven arguments that integrate logical structure with appropriately qualified claims.
Locate, vet, and synthesize sources to support extended research-based essays and annotated bibliographies.
Apply MLA documentation consistently for quotations, paraphrases, and references.
Respond to objections with structured counterargument and rebuttal appropriate to discipline norms.
Reflect on drafting and revision strategies to strengthen clarity, cohesion, and academic tone.`;

const general_education_note =
	'Often fulfills second-semester composition or upper-level writing requirements; schools differ on whether online Comp II substitutes for campus “writing-intensive” requirements — confirm your degree plan.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'English Composition II (ENG102)',
			slug,
			description:
				"StraighterLine English Composition II (ENG102) is ACE Credit–recommended (course code OOSL-0006) for 3 semester credits and emphasizes academic argumentation and researched writing. You will formulate clear, contestable claims; locate and critically evaluate scholarly and credible popular sources; synthesize multiple perspectives into coherent positions; design outlines that marshal reasons and evidence; compose extended argumentative essays with appropriate tone and style for academic audiences; document sources with Modern Language Association (MLA) in-text citations and works-cited conventions; build annotated bibliographies; and craft counterarguments and rebuttals that engage opposing views fairly. Progressive capstone-style assignments refine focus and revision across the term; one checkpoint supports skill-building. While no formal prerequisite is listed, completing English Composition I (ENG101) first is strongly recommended. Membership required; passing typically 70% or higher; transcript delivery included. Taught by Dr. Melanie Glennon. Confirm transfer with your registrar.",
			short_description:
				'ACE-recommended English Comp II — 3 credits, research argument & synthesis, MLA. $79/course + membership (StraighterLine). Usually after Comp I; verify transfer.',
			course_url: 'https://www.straighterline.com/online-college-courses/english-composition-ii/',
			image_url: '/images/courses/straighterline-english-composition-ii.jpg',
			duration: 'Self-paced (~24 days avg)',
			level: 'Intermediate',
			price: '$79',
			price_numeric: 79,
			certificate_available: true,
			credits: '3 credits (ACE-recommended)',
			featured: false,
			subcategory: 'English Composition II',
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
