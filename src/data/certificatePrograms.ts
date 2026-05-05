export type CertificateProgram = {
	slug: string;
	title: string;
	providerName: string;
	providerSlug: string;
	categoryLabel: string;
	shortDescription: string;
	overview?: string;
	highlights?: string[];
	whatYoullLearn?: string[];
	outcomes?: string[];
	accreditation?: string;
	occupationalCategory?: string;
	externalLinks?: Array<{ label: string; url: string }>;
	image: string;
	sourceUrl: string;
	location?: string;
	format?: string;
	creditNotes?: string[];
};

export const certificatePrograms: CertificateProgram[] = [
	{
		slug: 'ucla-extension-ucla-health-medical-assistant',
		title: 'UCLA Health Medical Assistant Program (Certificate)',
		providerName: 'UCLA Extension',
		providerSlug: 'ucla-extension',
		categoryLabel: 'Allied health',
		shortDescription:
			'The UCLA Medical Assistant Program (MAP), offered through a partnership between UCLA Health and UCLA Extension, combines classroom instruction with practical experience to prepare students for clinical and administrative medical assistant roles.',
		overview:
			'Medical assistants support patient care by taking vital signs, assisting with clinical procedures, and handling front-office workflows. UCLA’s program emphasizes hands-on skill development alongside medical terminology, anatomy, pharmacology, and professional readiness.',
		highlights: [
			'Four-quarter program with 68 units of coursework and 200 hours of clinical internship experience (per UCLA Extension).',
			'Prepares students for the NCCT National Certified Medical Assistant (NCMA) exam.',
			'Instructors include working nurses, physicians, and healthcare professionals.',
			'No college degree required to enter the program (per UCLA Extension).',
		],
		whatYoullLearn: [
			'Perform basic clinical tasks such as taking vital signs, administering medications, and collecting samples for testing.',
			'Perform administrative tasks in a medical office and use health information system technologies.',
			'Use medical equipment safely and follow legal, ethical, and professional standards.',
			'Build readiness for common medical assistant certification exams and job placement.',
		],
		outcomes: [
			'2019–2023 five-year average exam passage rate: 100% (MAERB 2024 Annual Report Form; per UCLA Extension).',
			'2019–2023 five-year average retention rate: 86.61% (per UCLA Extension).',
			'2019–2023 five-year average job placement rate: 90.80% (per UCLA Extension).',
		],
		accreditation:
			'Accredited by the Commission on Accreditation of Allied Health Education Programs (CAAHEP) upon the recommendation of the Medical Assisting Education Review Board (MAERB) (per UCLA Extension).',
		occupationalCategory: 'Medical Assistant',
		image: '/images/certificates/ucla-health-medical-assistant.png',
		sourceUrl:
			'https://www.uclaextension.edu/health-care-counseling/health-care-counseling-general/certificate/ucla-health-medical-assistant',
		location: 'California (UCLA Extension / UCLA Health)',
		format: 'Hybrid: classroom + clinical internship (see official page)',
		creditNotes: [
			'Program includes clinical internship requirements; confirm scheduling and placement details before enrolling.',
			'Federal financial aid is not available (per UCLA Extension).',
			'Confirm transfer/credit applicability with your target registrar in writing before enrollment.',
		],
		externalLinks: [
			{ label: 'CAAHEP accreditation body', url: 'https://www.caahep.org/' },
			{ label: 'NCCT NCMA certification', url: 'https://www.ncctinc.com/certifications/medical-assistant' },
			{
				label: 'UCLA Alumni Association benefits (UCLA Extension)',
				url: 'https://www.uclaextension.edu/alumni/benefits',
			},
			{ label: 'UCLA Health careers', url: 'https://www.uclahealthcareers.org/#/welcome' },
			{
				label: 'BLS Occupational Outlook: Medical Assistants',
				url: 'https://www.bls.gov/ooh/healthcare/medical-assistants.htm',
			},
		],
	},
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

