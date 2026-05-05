export type CertificateProgram = {
	slug: string;
	title: string;
	providerName: string;
	providerSlug: string;
	categoryLabel: string;
	shortDescription: string;
	image: string;
	sourceUrl: string;
	location?: string;
	format?: string;
	creditNotes?: string[];
};

export const certificatePrograms: CertificateProgram[] = [
	{
		slug: 'ucla-extension-pre-medical-and-general-science',
		title: 'Pre-Medical and General Science Studies (Certificate)',
		providerName: 'UCLA Extension',
		providerSlug: 'ucla-extension',
		categoryLabel: 'Pre-health',
		shortDescription:
			'Rigorous post-baccalaureate science coursework designed for pre-health pathways (medicine, dentistry, nursing, PA, pharmacy, PT). UCLA Extension notes earned credits in this program are transferable to UC and Cal State campuses (limitations may apply). This certificate program can be earned by attending the classroom or auditing it fully online. It’s a strong fit for students completing science prerequisites and labs on campus while completing the theory portion online. A rigorous, accredited certificate program that prepares students for careers in healthcare.',
		image: '/images/certificates/ucla-pre-medical-and-general-science.png',
		sourceUrl:
			'https://www.uclaextension.edu/health-care-counseling/health-care-counseling-general/certificate/pre-medical-and-general-science',
		location: 'California (UCLA Extension)',
		format: 'Flexible schedules (part-time / evenings)',
		creditNotes: [
			'UCLA-equivalent XL courses (per UCLA Extension program page)',
			'Transferability varies by receiving school; confirm in writing before enrolling',
			'Federal financial aid: available (per UCLA Extension program page)',
		],
	},
];

