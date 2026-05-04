import type { SupabaseClient } from '@supabase/supabase-js';
import type { Course } from './supabase';
import type { CuratedDirectoryCourse } from './curatedDirectoryCourses';
import { CURATED_DIRECTORY_COURSES } from './curatedDirectoryCourses';
import { fetchCertificateTranscriptCourses } from './fetchCertificateTranscriptCourses';
import { resolveCollegeSlug } from './coursePriceDisplay';

export type CertificateDirectoryRow = {
	id: string;
	slug: string;
	title: string;
	short_description: string;
	description: string;
	image_url: string | null;
	level: string;
	price: string;
	featured: boolean;
	created_at: string;
	certificate_available: boolean;
	colleges: {
		name: string;
		slug: string;
		accr: string;
		popularity_score: number;
		ease_of_access_score: number;
	};
	course_categories: { slug: string; name: string; icon: string } | null;
};

type CollegeLike = Course['colleges'] & {
	accreditation_level?: string;
	popularity_score?: number;
	ease_of_access_score?: number;
};

function courseToRow(c: Course): CertificateDirectoryRow {
	const col = c.colleges as CollegeLike | null | undefined;
	const slug = resolveCollegeSlug(col) ?? '';
	return {
		id: c.id,
		slug: c.slug,
		title: c.title,
		short_description: c.short_description || '',
		description: c.description || '',
		image_url: c.image_url,
		level: c.level || '',
		price: c.price || '',
		featured: Boolean(c.featured),
		created_at: c.created_at,
		certificate_available: Boolean(c.certificate_available),
		colleges: {
			name: col?.name ?? '',
			slug,
			accr: col?.accreditation_level ?? (col as { accreditation?: string })?.accreditation ?? '',
			popularity_score: Number(col?.popularity_score) || 0,
			ease_of_access_score: Number(col?.ease_of_access_score) || 0,
		},
		course_categories: c.course_categories
			? {
					slug: c.course_categories.slug,
					name: c.course_categories.name,
					icon: c.course_categories.icon ?? '',
				}
			: null,
	};
}

function curatedToRow(c: CuratedDirectoryCourse): CertificateDirectoryRow {
	return {
		id: c.id,
		slug: c.slug,
		title: c.title,
		short_description: c.short_description,
		description: c.description,
		image_url: c.image_url,
		level: c.level,
		price: c.price,
		featured: c.featured,
		created_at: c.created_at,
		certificate_available: c.certificate_available,
		colleges: {
			name: c.colleges.name,
			slug: c.colleges.slug,
			accr: c.colleges.accreditation_level,
			popularity_score: c.colleges.popularity_score,
			ease_of_access_score: c.colleges.ease_of_access_score,
		},
		course_categories: c.course_categories
			? {
					slug: c.course_categories.slug,
					name: c.course_categories.name,
					icon: c.course_categories.icon,
				}
			: null,
	};
}

/**
 * Merges Supabase rows (transcript/certificate flagged) with curated static rows not yet in DB.
 */
export async function buildCertificateTranscriptCourseList(
	supabase: SupabaseClient | null,
	isConfigured: boolean,
): Promise<CertificateDirectoryRow[]> {
	let db: Course[] = [];
	if (isConfigured && supabase) {
		db = await fetchCertificateTranscriptCourses(supabase);
	}

	const bySlug = new Map<string, CertificateDirectoryRow>();
	for (const c of db) {
		bySlug.set(c.slug, courseToRow(c));
	}
	for (const c of CURATED_DIRECTORY_COURSES) {
		if (!c.certificate_available) continue;
		if (!bySlug.has(c.slug)) bySlug.set(c.slug, curatedToRow(c));
	}

	return Array.from(bySlug.values()).sort((a, b) => {
		if (b.featured !== a.featured) return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
		return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
	});
}

export function uniqueCategoriesFromRows(
	rows: CertificateDirectoryRow[],
): { slug: string; name: string; icon: string }[] {
	const m = new Map<string, { slug: string; name: string; icon: string }>();
	for (const r of rows) {
		const c = r.course_categories;
		if (!c?.slug) continue;
		if (!m.has(c.slug)) m.set(c.slug, { slug: c.slug, name: c.name, icon: c.icon || '' });
	}
	return Array.from(m.values()).sort((a, b) => a.name.localeCompare(b.name));
}
