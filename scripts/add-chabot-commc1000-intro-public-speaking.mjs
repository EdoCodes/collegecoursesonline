/**
 * Upsert Chabot COMMC1000 Intro to Public Speaking. Matches migration 20260528120000.
 * Run: SUPABASE_SERVICE_KEY=... node scripts/add-chabot-commc1000-intro-public-speaking.mjs
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

const { data: college, error: cErr } = await supabase
	.from('colleges')
	.select('id')
	.eq('slug', 'chabot-college')
	.single();
const { data: cat, error: gErr } = await supabase.from('course_categories').select('id').eq('slug', 'humanities').single();

if (cErr || gErr || !college || !cat) {
	console.error('Lookup failed:', cErr?.message || gErr?.message);
	process.exit(1);
}

const slug = 'chabot-commc1000-intro-public-speaking';

const learning_outcomes = `Apply foundational rhetorical concepts to speech purpose, audience, and context in a diverse society.
Research topics, evaluate evidence, and organize speeches with clear structure and reasoning.
Deliver informative and persuasive speeches with intentional vocal and physical delivery.
Analyze public discourse and provide constructive peer feedback on presentations.
Meet live-audience speaking expectations typical of transfer-level oral communication courses.`;

const general_education_note =
	'Aligns with common California transfer patterns for oral communication (e.g., CSU GE A1, Cal-GETC 1C); confirm your home college’s articulation and whether online synchronous delivery satisfies your program. If you need a fully async option, compare other providers.';

const { error } = await supabase.from('courses').upsert(
	{
		college_id: college.id,
		category_id: cat.id,
		title: 'Intro to Public Speaking (COMMC1000)',
		slug,
		description:
			'Chabot College COMMC1000 introduces foundational rhetorical theory and public-speaking practice in a multicultural democratic society. You discover, develop, and critically analyze ideas through research, reasoning, organization, composition, delivery to a live audience, and evaluation of speeches—including informative and persuasive formats (formerly COMM 1). The course carries C-ID COMM110 and is commonly used toward CSU GE Area A1 (Oral Communication), Cal-GETC Area 1C (Oral Communication), and comparable IGETC oral-communication expectations—articulation varies by receiving institution; confirm with a counselor. Strongly recommended preparation: ENGL C1000 (College Composition). Listed on the California Virtual Campus (CVC) Exchange with online synchronous sections; schedules, seat counts, fees, and meeting patterns change each term—verify current section details and California residency tuition at enrollment. Many sections carry Zero Textbook Cost (ZTC); materials fees may apply on some offerings. Tuition and mandatory fees shown on CVC listings (example: $138 for tuition line item on sample listings) exclude nonresident surcharges and campus-specific charges—confirm your total cost before registering.',
		short_description:
			'California CC public speaking (C-ID COMM110) — often CSU GE oral comm / Cal-GETC 1C. Online synchronous via CVC; ~$138 tuition line (verify). ZTC sections common.',
		course_url: 'https://search.cvc.edu/courses/15905698',
		image_url: '/images/courses/chabot-commc1000-intro-public-speaking.png',
		duration: 'Semester (scheduled online meetings; varies by section)',
		level: 'Introductory',
		price: '$138',
		price_numeric: 138,
		certificate_available: true,
		credits: '3 semester units (C-ID COMM110)',
		featured: false,
		subcategory: 'Public Speaking',
		learning_outcomes,
		general_education_note,
	},
	{ onConflict: 'slug' },
);

if (error) {
	console.error(error);
	process.exit(1);
}
console.log('OK upsert', slug);
