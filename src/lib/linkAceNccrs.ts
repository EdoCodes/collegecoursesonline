/** Study.com article explaining ACE / NCCRS credit recommendations */
export const ACE_NCCRS_ARTICLE_URL =
	'https://study.com/support/solutions/articles/11000033564-what-are-ace-and-nccrs-credit-recommendations-and-how-do-they-apply-to-study-com-courses-';

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

function anchor(label: string): string {
	return `<a href="${ACE_NCCRS_ARTICLE_URL}" target="_blank" rel="noopener noreferrer" class="ace-nccrs-credit-link">${label}</a>`;
}

/**
 * Plain text → HTML with ACE and NCCRS linked (blue via global CSS).
 * Escape first, then replace whole words only.
 */
export function linkAceNccrsHtml(plainText: string | null | undefined): string {
	if (plainText == null || plainText === '') return '';
	let s = escapeHtml(plainText);
	s = s.replace(/\bNCCRS\b/g, anchor('NCCRS'));
	s = s.replace(/\bACE\b/g, anchor('ACE'));
	return s;
}
