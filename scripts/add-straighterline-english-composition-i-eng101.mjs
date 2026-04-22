/**
 * Upsert StraighterLine English Composition I ENG101 (Humanities). Matches migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-straighterline-english-composition-i-eng101.mjs
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

const slug = 'straighterline-english-composition-i';

const learning_outcomes = `Plan, draft, and revise multi-paragraph essays with clear theses and evidence-based support.
Select rhetorical strategies and tone appropriate to audience, purpose, and assignment genre.
Find, evaluate, and integrate sources with in-text citations and a works-cited list in MLA style.
Build effective arguments using claims, reasons, evidence, and response to counterarguments.
Reflect on revision habits to improve clarity, organization, and surface correctness in final drafts.`;

const general_education_note =
	'Commonly satisfies first-year college writing or general-education English for business, health sciences, education, liberal arts, and STEM pathways; some schools require a specific “second sequence” comp or writing placement — confirm articulation.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'English Composition I (ENG101)',
			slug,
			description:
				"StraighterLine English Composition I (ENG101) is ACE Credit–recommended (course code OOSL-0005) for 3 semester credits. You will move through the writing process in multiple rhetorical modes: a personal narrative; a persuasive letter; a source-based compare-and-contrast essay; and an argumentative essay with counterargument and rebuttal, with attention to audience, purpose, and organization. Instruction stresses thesis clarity, paragraph development, integration and documentation of credible sources using Modern Language Association (MLA) style, analysis of model texts, and revision for clarity, coherence, and correctness. Readings are built from Jeffrey, About Writing: A Guide (rev. ed., Open Oregon). Two graded exercises support skills between major papers. No prerequisites. Membership required; passing typically 70% or higher; free transcript delivery. Taught by Dr. Melanie Glennon. Confirm transfer with your registrar.",
			short_description:
				'ACE-recommended English Comp I — 3 credits, narrative through argument, MLA sources. $79/course + membership (StraighterLine). Gen-ed writing; compare to other providers; verify transfer.',
			course_url: 'https://www.straighterline.com/online-college-courses/english-composition-i/',
			image_url: '/images/courses/straighterline-english-composition-i.jpg',
			duration: 'Self-paced (~20 days avg)',
			level: 'Introductory',
			price: '$79',
			price_numeric: 79,
			certificate_available: true,
			credits: '3 credits (ACE-recommended)',
			featured: false,
			subcategory: 'English Composition',
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
