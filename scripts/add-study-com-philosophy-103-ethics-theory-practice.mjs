/**
 * Upsert Study.com Philosophy 103: Ethics — Theory & Practice (Humanities). Matches migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-philosophy-103-ethics-theory-practice.mjs
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

const { data: college, error: cErr } = await supabase.from('colleges').select('id').eq('slug', 'study-com').single();
const { data: cat, error: gErr } = await supabase
	.from('course_categories')
	.select('id')
	.eq('slug', 'humanities')
	.single();

if (cErr || gErr || !college || !cat) {
	console.error('Lookup failed:', cErr?.message || gErr?.message);
	process.exit(1);
}

const slug = 'study-com-philosophy-103-ethics-theory-practice';

const learning_outcomes = `Articulate consequentialist, deontological, and virtue-based perspectives and relate them to moral problems.
Analyze case studies using consistent principles while recognizing tradeoffs between competing moral claims.
Respond to objections and revise positions using philosophical argument structure (premises, inference, critique).
Interpret professional codes and institutional policies against broader ethical frameworks presented in the course.
Write ethically informed essays that cite course concepts accurately and acknowledge counterarguments.`;

const general_education_note =
	'Often fulfills humanities ethics or upper-level breadth requirements for nursing, business, criminal justice, public policy, pre-health, and liberal arts majors — verify whether your school prefers a standalone ethics vs. embedded professional-ethics course.';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'Philosophy 103: Ethics — Theory & Practice',
			slug,
			description:
				'Study.com Ethics explores normative theories and moral reasoning applied to concrete cases: major frameworks such as consequentialism (utilitarianism), deontology (duty and rights approaches), virtue ethics, and feminist or care ethics where covered; moral status and personal identity themes as introduced; applied topics such as biomedical ethics, professional responsibility, environmental and digital ethics, justice and inequality, and global health or social policy debates at an introductory-to-intermediate survey level. Video lessons, practice, and assessments emphasize argument reconstruction, objection-and-reply reasoning, and written analysis of scenarios. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm prerequisites and transfer with your receiving institution.',
			short_description:
				'ACE/NCCRS-recommended Ethics on Study.com — utilitarianism, duty, virtue, applied cases. College Accelerator subscription. Often after intro philosophy; verify transfer.',
			course_url: 'https://study.com/academy/course/philosophy-103-ethics-theory-practice.html',
			image_url: '/images/courses/study-com-philosophy-103-ethics-theory-practice.jpg',
			duration: 'Self-paced',
			level: 'Intermediate',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'Ethics',
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
