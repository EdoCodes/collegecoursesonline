/**
 * Upsert Study.com College Composition & Writing (Humanities). Matches supabase migration.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-study-com-college-composition.mjs
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

const slug = 'study-com-college-composition';

const { data, error } = await supabase
	.from('courses')
	.upsert(
		{
			college_id: college.id,
			category_id: cat.id,
			title: 'College Composition & Writing',
			slug,
			description:
				'Study.com College Composition & Writing develops academic writing practices: drafting and revising essays, thesis-driven arguments, citation and synthesis, rhetoric and audience, grammar and style, research basics, and common college writing formats. Video lessons, prompts, practice, and feedback-oriented assessments fit a freshman composition–style course. Credit is earned through the College Accelerator plan; courses carry ACE and NCCRS recommendations. Always confirm transfer with your receiving institution.',
			short_description:
				'ACE/NCCRS-recommended college composition on Study.com — drafting, rhetoric, research, and revision. College Accelerator subscription. Verify transfer at your school.',
			course_url: 'https://study.com/academy/course/college-composition-writing-course.html',
			image_url: '/images/courses/study-com-college-composition.jpg',
			duration: 'Self-paced',
			level: 'Introductory',
			price: '$95/mo',
			price_numeric: 95,
			certificate_available: true,
			credits: 'Typically 3 semester credits (ACE/NCCRS; institution-dependent)',
			featured: false,
			subcategory: 'College Composition',
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
