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
	/** Accessible description when the thumbnail is illustrative or stock photography. */
	imageAlt?: string;
	sourceUrl: string;
	location?: string;
	format?: string;
	creditNotes?: string[];
	/** Used on the certificate programs hub to group cards (paralegal / health / IT). */
	hubGroup: 'paralegal' | 'health' | 'it';
};

export const certificatePrograms: CertificateProgram[] = [
	{
		slug: 'ucla-extension-ucla-health-medical-assistant',
		hubGroup: 'health',
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
		hubGroup: 'health',
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
	{
		slug: 'csulb-cpace-cls-paralegal-certificate-course',
		hubGroup: 'paralegal',
		title: 'Paralegal Certificate Course (CSULB / Center for Legal Studies)',
		providerName: 'Center for Legal Studies',
		providerSlug: 'center-for-legal-studies',
		categoryLabel: 'Legal studies',
		shortDescription:
			'A professional paralegal certificate offered through CSULB’s College of Professional and Continuing Education (CPaCE), delivered via the Center for Legal Studies Paralegal Certificate Course—covering core litigation support skills, legal research fundamentals, ethics, and practical workflows used in law offices and legal departments.',
		overview:
			'The Paralegal Certificate Course is a continuing education program designed to build job-ready paralegal competencies: understanding the U.S. judicial system, supporting trial teams, interviewing and investigation basics, legal research, and case preparation. Multiple study formats may be available depending on the partner offer and term (see the official CLS product page for current options, schedules, and pricing).',
		highlights: [
			'Offered in partnership with California State University, Long Beach CPaCE (per Center for Legal Studies program page).',
			'Popular online format is described as two instructor-led 7-week segments (Paralegal I and Paralegal II) within a 14-week window; the published fee covers both segments (per CLS).',
			'Additional formats (self-study, live lecture, text-only) may be available through select partners (per CLS).',
			'California paralegals may need additional Advanced Paralegal coursework to meet requirements under California Business and Professions Code §6450 (per CLS).',
			'New Mexico paralegals may have additional education requirements under Rule 20-115 NMRA (per CLS).',
		],
		whatYoullLearn: [
			'Foundations of the American judicial system and civil procedure concepts used in litigation support.',
			'Practical skills for assisting attorneys with fact development, witness interviews, and case organization.',
			'Legal research and writing fundamentals for paralegal work product.',
			'Ethics and professionalism expectations common to law-office environments.',
		],
		outcomes: [
			'Designed to support entry-level paralegal/legal assistant roles across a range of practice settings (verify employer requirements in your state).',
			'CLS notes career-center access for students who meet stated progress requirements (see official page for details).',
		],
		accreditation:
			'This listing describes a professional certificate program delivered by the Center for Legal Studies in partnership with a university continuing education unit. It is not a substitute for state-specific paralegal regulation guidance—confirm requirements with the State Bar or applicable regulatory authority in your jurisdiction.',
		occupationalCategory: 'Paralegal and Legal Assistant',
		image: '/images/certificates/csulb-cpace-cls-paralegal-certificate-course.jpg',
		imageAlt:
			'Two professionals in a formal legal office reviewing documents together, with a U.S. flag and law-library shelving in the background.',
		sourceUrl:
			'https://www.legalstudies.com/product/california-state-university-long-beach-paralegal-certificate-course/',
		location: 'California (CSULB CPaCE partner offering; online and other formats per CLS)',
		format: 'Online (two 7-week segments) and other formats may be available (see official CLS page)',
		creditNotes: [
			'Continuing education / professional certificate programs often do not qualify for traditional federal financial aid (Pell, Stafford, etc.); confirm payment options on the official provider page.',
			'Textbooks and materials are commonly sold separately; confirm total cost before enrolling (per CLS FAQ pattern).',
			'Transfer of credit or employer tuition assistance depends on your school or employer; get written confirmation before enrolling.',
		],
		externalLinks: [
			{
				label: 'Center for Legal Studies — Paralegal Certificate Course (CSULB partner page)',
				url: 'https://www.legalstudies.com/product/california-state-university-long-beach-paralegal-certificate-course/',
			},
			{ label: 'Center for Legal Studies (CLS) — home', url: 'https://www.legalstudies.com/' },
			{ label: 'California State University, Long Beach', url: 'https://www.csulb.edu/' },
			{
				label: 'California BPC §6450 (paralegal qualification — read with counsel / official guidance)',
				url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=6450.',
			},
			{
				label: 'BLS Occupational Outlook Handbook — Paralegals and Legal Assistants',
				url: 'https://www.bls.gov/ooh/legal/paralegals-and-legal-assistants.htm',
			},
			{
				label: 'Card image — Pexels photo #4427547 (August de Richelieu)',
				url: 'https://www.pexels.com/photo/4427547/',
			},
		],
	},
	{
		slug: 'purdue-global-pathway-to-paralegal-postbaccalaureate-certificate',
		hubGroup: 'paralegal',
		title: 'Pathway to Paralegal Postbaccalaureate Certificate',
		providerName: 'Purdue Global',
		providerSlug: 'purdue-global',
		categoryLabel: 'Legal studies',
		shortDescription:
			'An online postbaccalaureate paralegal certificate from Purdue Global for students who already hold a bachelor’s degree—covering civil litigation, legal research and writing, ethics, law office management, and elective depth in areas such as family law or estate planning (per official program page).',
		overview:
			'This certificate is designed for career changers with an undergraduate degree who want paralegal-focused coursework in an online format. The curriculum emphasizes communication, ethics, critical thinking, legal research, and applying concepts to realistic legal scenarios. Elective options listed on the program page include Wills, Trusts, and Estate Planning; Family Law; Bankruptcy and Debtor-Creditor Law; and Real Estate Law.',
		highlights: [
			'Offered 100% online (per Purdue Global program page).',
			'Designed for students who already have a bachelor’s degree (postbaccalaureate certificate; per Purdue Global).',
			'Listed as 7 major courses / 7 total courses and approximately 36–37 quarter credits on the official page.',
			'Institutionally accredited by the Higher Learning Commission (per Purdue Global).',
			'Optional 3-week undergraduate trial may be available for qualifying new students—see catalog for conditions (per Purdue Global).',
		],
		whatYoullLearn: [
			'Foundations of the paralegal role and the U.S. legal system.',
			'Civil litigation workflows and structured legal analysis.',
			'Legal ethics and professional communication in legal environments.',
			'Legal research, writing, and law-office management concepts.',
		],
		outcomes: [
			'Prepares for paralegal/legal assistant career tracks; paralegals are not lawyers and cannot practice law or give legal advice (per Purdue Global program disclaimers).',
		],
		accreditation:
			'Purdue University Global is accredited by the Higher Learning Commission (HLC), an institutional accreditor recognized by the U.S. Department of Education (per Purdue Global). Program-specific licensure or certification requirements vary by state.',
		occupationalCategory: 'Paralegal and Legal Assistant',
		image: '/images/certificates/purdue-global-pathway-paralegal-postbaccalaureate.png',
		imageAlt:
			'Professional woman in glasses and blazer reviewing documents at a desk in a bright office with plants and shelving.',
		sourceUrl:
			'https://www.purdueglobal.edu/degree-programs/legal-studies/pathway-to-paralegal-certificate/',
		location: 'United States (Purdue Global; online)',
		format: '100% online',
		creditNotes: [
			'Postbaccalaureate certificate: a completed bachelor’s degree is required (confirm with Purdue Global admissions).',
			'Quarter credits are used (Purdue Global lists 36–37 quarter credits on the program page); compare to semester credit if you transfer.',
			'Federal financial aid may be available for eligible students in qualifying programs—verify current rules with Purdue Global.',
			'Paralegal regulation and employer requirements vary by state; confirm with your jurisdiction and target employer.',
		],
		externalLinks: [
			{
				label: 'Purdue Global — Pathway to Paralegal Postbaccalaureate Certificate',
				url: 'https://www.purdueglobal.edu/degree-programs/legal-studies/pathway-to-paralegal-certificate/',
			},
			{ label: 'Higher Learning Commission (HLC)', url: 'https://www.hlcommission.org/' },
			{
				label: 'BLS Occupational Outlook: Paralegals and Legal Assistants',
				url: 'https://www.bls.gov/ooh/legal/paralegals-and-legal-assistants.htm',
			},
			{
				label: 'Card image — Pexels photo #7654446 (Pavel Danilyuk)',
				url: 'https://www.pexels.com/photo/7654446/',
			},
		],
	},
];

