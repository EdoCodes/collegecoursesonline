/** Newline-separated learning outcomes stored in courses.learning_outcomes */

export const DEFAULT_LEARNING_OUTCOMES: string[] = [
	'Build a coherent understanding of core topics through structured lessons',
	'Apply concepts to realistic scenarios you may see on exams or on the job',
	'Practice with feedback-oriented assessments aligned to college-level rigor',
	'Access multimedia lessons and materials suitable for flexible online study',
];

export function parseLearningOutcomes(raw: string | null | undefined): string[] {
	if (!raw?.trim()) return [];
	return raw
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter(Boolean);
}
