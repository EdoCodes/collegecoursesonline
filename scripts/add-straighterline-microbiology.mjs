/**
 * Adds StraighterLine Microbiology (BIO250) to Supabase.
 * Run with: SUPABASE_SERVICE_KEY=... node scripts/add-straighterline-microbiology.mjs
 */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	'https://dlxyjoaxyektgqraayfl.supabase.co',
	process.env.SUPABASE_SERVICE_KEY || '',
);

async function run() {
	if (!process.env.SUPABASE_SERVICE_KEY) {
		console.error('Missing SUPABASE_SERVICE_KEY');
		process.exit(1);
	}

	const { data: college, error: ce } = await supabase.from('colleges').select('id').eq('slug', 'straighterline').single();
	if (ce || !college) {
		console.error('StraighterLine college not found:', ce?.message);
		process.exit(1);
	}

	const { data: cat, error: catErr } = await supabase
		.from('course_categories')
		.select('id')
		.eq('slug', 'science')
		.single();
	if (catErr || !cat) {
		console.error('Natural Sciences category not found:', catErr?.message);
		process.exit(1);
	}

	const description = `StraighterLine's ACE-recommended Microbiology (BIO250) is a 3-credit course focused on microbiology for healthcare: pathogenic microorganisms and human disease, immunology, symptoms and treatment of infection, and prevention. Includes OpenStax eTextbook (Nina Parker et al., Microbiology, 2024) at no extra cost. Fourteen checkpoints cover prokaryotes, eukaryotes, viruses, metabolism, genetics, antimicrobial control, epidemiology, host defenses, and infectious diseases of skin, respiratory, GI, and genitourinary systems. Assignments include 4 Benchmarks, 1 Midterm Benchmark, 1 Cumulative Benchmark, and a closed-book final exam (scientific/graphing calculator allowed). Taught by Jenilyn Mulkey (MS, MLS). No prerequisites. 99% average pass rate, ~28-day average completion, transferred 6,800+ times with $7.5M+ in tuition savings. ACE Credit recommended (OOSL-0047); credits transfer to 3,000+ colleges.`;

	const short_description =
		'ACE-recommended Microbiology (BIO250) — 3 credits. Pathogens, immunity, infection & prevention for healthcare careers. OpenStax eText included. 99% pass rate, self-paced. $79.';

	const { data: course, error } = await supabase
		.from('courses')
		.upsert(
			{
				college_id: college.id,
				category_id: cat.id,
				title: 'Microbiology (BIO250)',
				slug: 'straighterline-microbiology',
				description,
				short_description,
				course_url: 'https://www.straighterline.com/online-college-courses/microbiology/',
				image_url:
					'https://images.pexels.com/photos/25626587/pexels-photo-25626587.jpeg?auto=compress&cs=tinysrgb&w=800',
				duration: 'Self-paced (28 days avg)',
				level: 'Introductory',
				price: '$79',
				price_numeric: 79,
				certificate_available: true,
				credits: '3 credits (ACE-recommended)',
				featured: false,
				subcategory: 'Biology',
			},
			{ onConflict: 'slug' },
		)
		.select('id, title, slug')
		.single();

	if (error) {
		console.error('Course error:', error.message);
		process.exit(1);
	}

	console.log('✅ Added:', course.title);
	console.log('Course page: /courses/' + course.slug);
}

run().catch((err) => {
	console.error(err);
	process.exit(1);
});
