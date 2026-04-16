/**
 * Seed script — colleges + categories for Supabase. Course rows are added via scripts in /scripts (StraighterLine, Sophia, Study.com).
 * Run with: node scripts/seed.mjs
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dlxyjoaxyektgqraayfl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRseHlqb2F4eWVrdGdxcmFheWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzODk0OTAsImV4cCI6MjA4OTk2NTQ5MH0.RViY-bBv5GVya-Z1JVpjEDIqttJWXZ4MP48vkXotLvk';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const colleges = [
	{
		name: 'StraighterLine',
		slug: 'straighterline',
		description:
			'StraighterLine offers ACE-recommended online college courses starting at $79. Credits transfer to 3,000+ colleges and universities nationwide, with guaranteed transfer to 180+ partner schools. Self-paced with 24/7 tutoring and free transcript delivery.',
		website_url: 'https://www.straighterline.com',
		accreditation: 'ACE-Recommended (American Council on Education)',
		accreditation_level: 'National',
		country: 'USA',
		featured: false,
		popularity_score: 87,
		ease_of_access_score: 98,
	},
	{
		name: 'Sophia Learning',
		slug: 'sophia-learning',
		description:
			'Sophia Learning offers 50+ ACE- and DEAC-recommended online courses accepted at 75+ partner colleges. Self-paced, low-cost membership model with no credit card required for free trial.',
		website_url: 'https://www.sophia.org',
		accreditation: 'ACE- and DEAC-Recommended',
		accreditation_level: 'National',
		country: 'USA',
		featured: false,
		popularity_score: 88,
		ease_of_access_score: 97,
	},
	{
		name: 'Study.com',
		slug: 'study-com',
		description:
			'Study.com offers 220+ online college courses with ACE and NCCRS credit recommendations. College Accelerator plans include video lessons, quizzes, and proctored exams for transferable credit.',
		website_url: 'https://www.study.com',
		accreditation: 'ACE- and NCCRS-recommended courses',
		accreditation_level: 'National',
		country: 'USA',
		featured: false,
		popularity_score: 90,
		ease_of_access_score: 92,
	},
];

const categories = [
	{ name: 'Business', slug: 'business', description: 'Finance, management, marketing, and entrepreneurship courses.', icon: '💼' },
	{ name: 'Computer Science', slug: 'computer-science', description: 'Programming, algorithms, software engineering, and AI.', icon: '💻' },
	{ name: 'Data Science', slug: 'data-science', description: 'Data analysis, machine learning, statistics, and visualization.', icon: '📊' },
	{ name: 'Education', slug: 'education', description: 'Teaching, learning science, and educational leadership.', icon: '🎓' },
	{ name: 'Engineering', slug: 'engineering', description: 'Electrical, mechanical, civil, and software engineering.', icon: '⚙️' },
	{ name: 'Health & Medicine', slug: 'health', description: 'Public health, anatomy, nursing, and medical sciences.', icon: '🏥' },
	{ name: 'Humanities', slug: 'humanities', description: 'History, philosophy, literature, and cultural studies.', icon: '📚' },
	{ name: 'Mathematics', slug: 'mathematics', description: 'Calculus, statistics, linear algebra, and discrete math.', icon: '➗' },
	{ name: 'Psychology', slug: 'psychology', description: 'Cognitive science, behavioral psychology, and mental health.', icon: '🧠' },
	{ name: 'Natural Sciences', slug: 'science', description: 'Biology, chemistry, physics, and environmental science.', icon: '🔬' },
];

/** No bulk seed courses — use add-straighterline-*.mjs, add-sophia-*.mjs, add-study-com-*.mjs */
const courseDefs = [];

async function seed() {
	console.log('🌱 Starting seed...\n');

	console.log('📚 Upserting colleges (StraighterLine, Sophia, Study.com)...');
	const { data: insertedColleges, error: collegeError } = await supabase
		.from('colleges')
		.upsert(colleges, { onConflict: 'slug' })
		.select('id, slug');

	if (collegeError) {
		console.error('❌ College insert error:', collegeError.message);
		process.exit(1);
	}
	console.log(`   ✅ ${insertedColleges.length} colleges`);

	console.log('🏷️  Upserting categories...');
	const { data: insertedCats, error: catError } = await supabase
		.from('course_categories')
		.upsert(categories, { onConflict: 'slug' })
		.select('id, slug');

	if (catError) {
		console.error('❌ Category insert error:', catError.message);
		process.exit(1);
	}
	console.log(`   ✅ ${insertedCats.length} categories`);

	if (courseDefs.length === 0) {
		console.log('🎓 No bulk courses in seed — add courses via scripts in /scripts');
	} else {
		const collegeMap = Object.fromEntries(insertedColleges.map((c) => [c.slug, c.id]));
		const catMap = Object.fromEntries(insertedCats.map((c) => [c.slug, c.id]));
		const courses = courseDefs.map(({ college, category, ...rest }) => ({
			...rest,
			college_id: collegeMap[college],
			category_id: catMap[category],
		}));
		const { error: courseError } = await supabase.from('courses').upsert(courses, { onConflict: 'slug' });
		if (courseError) {
			console.error('❌ Course insert error:', courseError.message);
			process.exit(1);
		}
		console.log(`   ✅ ${courses.length} courses`);
	}

	console.log('\n🎉 Seed complete.');
}

seed().catch((err) => {
	console.error('Fatal error:', err);
	process.exit(1);
});
