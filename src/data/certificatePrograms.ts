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
	{
		slug: 'nu-paralegal-specialist-certificate-criminal-law',
		hubGroup: 'paralegal',
		title: 'Paralegal Specialist Certificate in Criminal Law',
		providerName: 'National University',
		providerSlug: 'national-university',
		categoryLabel: 'Legal studies',
		shortDescription:
			'An American Bar Association–approved paralegal specialist certificate focused on criminal law practice skills—case analysis, legal research, drafting pleadings and discovery, evidence, and trial preparation—offered online and in class-based formats, with onsite and hybrid options at the Los Angeles campus (per National University).',
		overview:
			'National University describes this certificate as combining academic and practical preparation for paralegal work in criminal law settings. The Criminal Law specialization emphasizes litigation support competencies alongside the broader paralegal foundations covered in the specialty course sequence. NU notes the program is not intended to qualify students to practice law, and that paralegals may not provide legal services directly to the public except as permitted by law.',
		highlights: [
			'Approved by the American Bar Association (ABA) (per National University program page).',
			'Eight legal specialty courses totaling 36 quarter units; NU states the full ABA-compliant option requires 90 quarter units of coursework overall, including a minimum of 27 quarter units of general education across at least three disciplines (per National University).',
			'Listed modalities include online delivery plus onsite and hybrid study at the Los Angeles campus (per National University).',
			'NU publishes an average completion time of about eight months and year-round enrollment with a $0 application fee (per National University).',
			'Students must complete at least nine semester credits (or the equivalent) of legal specialty courses through synchronous instruction (per National University).',
		],
		whatYoullLearn: [
			'Foundational legal analysis across core areas such as torts, contracts, and real property, with emphasis on terminology and principles.',
			'Legal research using manual and computer-assisted methods and development of legal writing work product.',
			'Ethical and professional expectations for paralegals in criminal law practice.',
			'Criminal law and procedure topics relevant to supporting attorneys in litigation and case preparation.',
		],
		outcomes: [
			'Designed to support paralegal and legal assistant career paths; requirements and permissible scope of work vary by state (verify with official guidance and employers).',
		],
		accreditation:
			'National University is institutionally accredited by the WASC Senior College and University Commission (WSCUC). The Paralegal Specialist Certificate in Criminal Law is approved by the American Bar Association (per National University program page).',
		occupationalCategory: 'Paralegal and Legal Assistant',
		image: '/images/certificates/nu-paralegal-specialist-certificate-criminal-law.png',
		imageAlt:
			'Gold scales of justice in sharp focus on a desk; a professional in business attire works with papers in the softly blurred background.',
		sourceUrl:
			'https://www.nu.edu/ourprograms/college-of-professional-studies/professionalstudies/programs/paralegal-specialist-certificate-criminal-law-specialization/',
		location: 'United States (National University; online and Los Angeles campus options per NU)',
		format: 'Online; onsite and hybrid at Los Angeles campus (per National University)',
		creditNotes: [
			'NU states this program option may require up to 90 quarter units total to meet ABA requirements, including general education—confirm your transfer credit and remaining requirements with admissions before enrolling.',
			'Coursework is not described as transferable to law school and does not satisfy requirements to sit for the California Bar exam (per National University).',
			'Financial aid eligibility depends on your enrollment status and program rules; confirm current policies with National University.',
		],
		externalLinks: [
			{
				label: 'National University — Criminal Justice / Law (program information)',
				url: 'https://info.nu.edu/criminal-justice/law/',
			},
			{
				label: 'WASC Senior College and University Commission (WSCUC)',
				url: 'https://www.wscuc.org/',
			},
			{
				label: 'American Bar Association — paralegal education overview',
				url: 'https://www.americanbar.org/groups/paralegals/',
			},
			{
				label: 'BLS Occupational Outlook: Paralegals and Legal Assistants',
				url: 'https://www.bls.gov/ooh/legal/paralegals-and-legal-assistants.htm',
			},
			{
				label: 'Card image — Pexels photo #6077588 (Katrin Bolovtsova)',
				url: 'https://www.pexels.com/photo/6077588/',
			},
		],
	},
	{
		slug: 'npc-certificate-in-paralegal-studies',
		hubGroup: 'paralegal',
		title: 'Certificate in Paralegal Studies',
		providerName: 'National Paralegal College',
		providerSlug: 'national-paralegal-college',
		categoryLabel: 'Legal studies',
		shortDescription:
			'An online paralegal certificate designed for students who want to finish training and enter the workforce quickly—or who already hold a degree in another field. The program requires 24 semester credits: four core paralegal courses plus four legal-studies electives, with optional introductory coursework (per National Paralegal College).',
		overview:
			'National Paralegal College describes the certificate as combining core legal subjects—torts, contracts, legal research and writing with civil litigation, and professional responsibility—with elective depth across areas such as criminal law, real property, business law, estate planning, and more. Many courses use online courseware with no textbook purchase required (per NPC program page). NPC lists published completion timelines based on course load (for example, about seven months when taking three courses at a time).',
		highlights: [
			'24 credits total: four paralegal core courses (12 credits) plus four elective legal studies courses (12 credits); optional zero-credit Introduction to the Law (per National Paralegal College).',
			'Published pacing examples on the program page include about 7 months (three courses at a time), 9 months (two courses), or 17 months (one course)—actual pace varies by student schedule.',
			'Institutionally accredited by the Distance Education Accrediting Commission (DEAC), listed by the U.S. Department of Education as a recognized accrediting agency (per NPC program page).',
			'NPC states participation in Title IV federal financial aid for qualifying students and licensing by the Arizona Board for Private Postsecondary Education (per NPC program page).',
			'Program learning outcomes include ethical practice, legal research and drafting skills, and preparation relevant to the Certified Paralegal exam offered by NALA (per NPC program page).',
		],
		whatYoullLearn: [
			'Locate and apply relevant statutes and research case law using major legal databases.',
			'Draft foundational litigation and transactional documents and communicate professionally under attorney supervision.',
			'Apply ethics frameworks aligned with the Model Rules of Professional Conduct and avoid unauthorized practice of law.',
			'Support civil litigation workflows including discovery-related tasks and attorney-directed assignments.',
		],
		outcomes: [
			'Designed to prepare for paralegal/legal assistant roles; certification and employer requirements vary by state—confirm with NPC and your jurisdiction.',
		],
		accreditation:
			'National Paralegal College is accredited by the Distance Education Accrediting Commission (DEAC). DEAC is listed by the U.S. Department of Education as a recognized accrediting agency and is recognized by the Council for Higher Education Accreditation (CHEA) (per NPC program page).',
		occupationalCategory: 'Paralegal and Legal Assistant',
		image: '/images/certificates/npc-certificate-paralegal-studies.png',
		imageAlt:
			'Professional reviewing documents at a white desk with a laptop; a Lady Justice statue and an open law book sit in the foreground.',
		sourceUrl: 'https://www.nationalparalegal.edu/Certificate.aspx',
		location: 'United States (National Paralegal College; online)',
		format: 'Online',
		creditNotes: [
			'Elective courses may have prerequisites; confirm sequencing with NPC before registering.',
			'Financial aid eligibility and licensure/certification rules depend on your situation and state—verify with NPC and official sources.',
		],
		externalLinks: [
			{
				label: 'National Paralegal College — Certificate in Paralegal Studies',
				url: 'https://www.nationalparalegal.edu/Certificate.aspx',
			},
			{ label: 'Distance Education Accrediting Commission (DEAC)', url: 'https://www.deac.org/' },
			{
				label: 'BLS Occupational Outlook: Paralegals and Legal Assistants',
				url: 'https://www.bls.gov/ooh/legal/paralegals-and-legal-assistants.htm',
			},
			{ label: 'NALA — The Paralegal Association (Certified Paralegal credential)', url: 'https://www.nala.org/' },
			{
				label: 'Card image — Pexels photo #7875863 (Karola G)',
				url: 'https://www.pexels.com/photo/7875863/',
			},
		],
	},
	{
		slug: 'post-university-certificate-paralegal-studies',
		hubGroup: 'paralegal',
		title: 'Certificate in Paralegal Studies',
		providerName: 'Post University',
		providerSlug: 'post-university',
		categoryLabel: 'Legal studies',
		shortDescription:
			'A 30-credit undergraduate paralegal certificate from Post University covering law, civil litigation, and legal research—designed to build skills for working on a legal team under attorney supervision, with online or on-campus options and a published ~12-month timeline (per Post University).',
		overview:
			'Post University describes the Certificate in Paralegal Studies as coursework that can support exploration of legal services careers while emphasizing communication and practical tasks such as summarizing depositions, interrogatories, and testimony. The institution notes the certificate may also serve as a starting point toward an associate or bachelor’s degree. Post embeds micro-credential opportunities within programs for resume-ready skill badges (per Post University program page).',
		highlights: [
			'Listed as a 30-semester-credit-hour program with an approximate 12-month timeline and online or on-campus availability (per Post University program page).',
			'Institutionally accredited by the New England Commission of Higher Education (NECHE) (per Post University program page).',
			'Course themes cited by Post include law, civil litigation, and legal research, with emphasis on supervised legal support work and professional communication.',
			'Post states the certificate is not designed to fulfill educational requirements for a state law license or paralegal certification—confirm state and employer expectations separately.',
		],
		whatYoullLearn: [
			'Support litigation-related workflows under attorney direction, including summarizing depositions and testimony.',
			'Apply foundational legal studies concepts relevant to paralegal and legal assistant roles.',
			'Communicate clearly and professionally in legal office environments.',
		],
		outcomes: [
			'Intended to prepare students for paralegal-style support roles; scope of practice and credential rules vary by state—verify with Post and official guidance.',
		],
		accreditation:
			'Post University is accredited by the New England Commission of Higher Education (NECHE), an institutional accreditor recognized by the U.S. Department of Education (per Post University program page).',
		occupationalCategory: 'Paralegal and Legal Assistant',
		image: '/images/certificates/post-university-certificate-paralegal-studies.png',
		imageAlt:
			'Two professionals collaborating over documents at a wooden desk with law books, including a volume titled “THE LAW” on the spine.',
		sourceUrl: 'https://degrees.post.edu/programs/public-service/paralegal-studies/',
		location: 'United States (Post University; online or Waterbury, CT campus per Post)',
		format: 'Online or on campus',
		creditNotes: [
			'Confirm current credit totals, term schedules, and modality availability with Post admissions—marketing summaries can change.',
			'Financial aid eligibility depends on enrollment status and federal rules; verify with Post’s financial aid office.',
		],
		externalLinks: [
			{
				label: 'Post University — Paralegal Studies (certificate overview)',
				url: 'https://degrees.post.edu/programs/public-service/paralegal-studies/',
			},
			{ label: 'New England Commission of Higher Education (NECHE)', url: 'https://www.neche.org/' },
			{
				label: 'BLS Occupational Outlook: Paralegals and Legal Assistants',
				url: 'https://www.bls.gov/ooh/legal/paralegals-and-legal-assistants.htm',
			},
			{
				label: 'Card image — Pexels photo #8730785 (Mikhail Nilov)',
				url: 'https://www.pexels.com/photo/8730785/',
			},
		],
	},
	{
		slug: 'coastline-college-paralegal-studies-certificate-of-achievement',
		hubGroup: 'paralegal',
		title: 'Paralegal Studies — Certificate of Achievement',
		providerName: 'Coastline College',
		providerSlug: 'coastline-college',
		categoryLabel: 'Legal studies',
		shortDescription:
			'An American Bar Association–approved Certificate of Achievement in Paralegal Studies offered fully online through Coastline College—built for students who already hold a transferable associate or bachelor’s degree from a regionally accredited school and need the 27-unit paralegal specialty stack (per Coastline program materials).',
		overview:
			'Coastline describes its ABA-approved paralegal program as preparing students for supervised legal support work between legal secretary and attorney roles, including research, writing, organization, and client interaction where appropriate. The Certificate of Achievement pathway awards the ABA-approved certificate after completion of required paralegal coursework when prior college transcripts are on file; students without a qualifying prior degree must follow the full associate-degree plan to meet ABA guidelines (per Coastline). Coastline emphasizes finding and enrolling in paralegal classes through its online schedules.',
		highlights: [
			'ABA-approved Paralegal Studies program (per Coastline program page).',
			'Certificate of Achievement track: 27 semester units of required paralegal courses for students with a transferable AA or bachelor’s from a regionally accredited institution and official transcripts on file (per Coastline).',
			'Fully online course options—students search and register for paralegal sections through Coastline’s online class schedule workflow (confirm each term’s modality in the schedule and catalog).',
			'Institutionally accredited by the Accrediting Commission for Community and Junior Colleges (ACCJC), WASC (per Coastline).',
			'Paralegal specialty transfer limits apply: up to six units from another ABA-approved program with department approval, and 21 units of paralegal coursework must be completed at Coastline (per Coastline program page).',
		],
		whatYoullLearn: [
			'Analyze facts and communicate legal conclusions orally and in writing under attorney supervision.',
			'Apply legal concepts and ethics to realistic client and case scenarios.',
			'Support litigation and transactional workflows common to California paralegal practice.',
		],
		outcomes: [
			'Prepares for paralegal/legal assistant roles; California restricts unauthorized practice of law—confirm scope with employers and the State Bar (per Coastline and BPC §6450 family).',
		],
		accreditation:
			'Coastline College is accredited by the Accrediting Commission for Community and Junior Colleges (ACCJC) of the Western Association of Schools and Colleges, an institutional accreditor recognized by CHEA and the U.S. Department of Education (per Coastline). The Paralegal Studies Certificate of Achievement is approved by the American Bar Association (per Coastline program page).',
		occupationalCategory: 'Paralegal and Legal Assistant',
		image: '/images/certificates/coastline-paralegal-studies-certificate-of-achievement.png',
		imageAlt:
			'Professional in a blazer writing in a notebook at a desk with a Lady Justice statue, legal papers, a magnifying glass, and a laptop.',
		sourceUrl: 'https://www.coastline.edu/programs/paralegal-studies.php',
		location: 'California (Coastline College; online delivery)',
		format: 'Fully online (verify sections each term in Coastline’s class schedule)',
		creditNotes: [
			'If you do not already have a qualifying transferable associate or bachelor’s degree, Coastline requires completing the full Paralegal Studies AA as specified to satisfy ABA guidelines—read the academic plan carefully before enrolling.',
			'Orientation or counseling is required; minimum GPA and computer proficiency rules apply (per Coastline).',
			'Paralegal regulation and transfer credit rules are state- and school-specific—get written confirmation from Coastline’s paralegal department and any receiving institution.',
		],
		externalLinks: [
			{
				label: 'Coastline College — Paralegal Studies',
				url: 'https://www.coastline.edu/programs/paralegal-studies.php',
			},
			{ label: 'ACCJC accreditation (community colleges)', url: 'https://www.accjc.org/' },
			{
				label: 'American Bar Association — Standing Committee on Paralegals',
				url: 'https://www.americanbar.org/groups/paralegals/',
			},
			{
				label: 'California BPC §6450 (paralegal qualifications — read with official guidance)',
				url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=6450.',
			},
			{
				label: 'BLS Occupational Outlook: Paralegals and Legal Assistants',
				url: 'https://www.bls.gov/ooh/legal/paralegals-and-legal-assistants.htm',
			},
			{
				label: 'Card image — Pexels photo #8112121 (Pavel Danilyuk)',
				url: 'https://www.pexels.com/photo/8112121/',
			},
		],
	},
	{
		slug: 'college-of-the-canyons-paralegal-studies-certificate',
		hubGroup: 'paralegal',
		title: 'Paralegal Studies — Certificate',
		providerName: 'College of the Canyons',
		providerSlug: 'college-of-the-canyons',
		categoryLabel: 'Legal studies',
		shortDescription:
			'An American Bar Association–approved paralegal certificate pathway at College of the Canyons delivered fully online through Zoom and Canvas—31 semester units across 11 courses, with a required internship and live (synchronous) instruction to meet ABA standards (per College of the Canyons).',
		overview:
			'College of the Canyons describes its paralegal program as preparing students for California’s legal workforce with coursework taught by experienced attorneys and paralegals, flexible pacing, and evening options for working students. The program is marketed as fully online while noting that the ABA requires at least nine semester credits through synchronous instruction (for example via Zoom or in the classroom). Students should expect a paralegal internship as part of the program. The college also stresses that paralegals may not provide legal services directly to the public except as permitted by law.',
		highlights: [
			'ABA-approved Paralegal Studies program (per College of the Canyons program page).',
			'Listed as 31 semester units in 11 classes for the paralegal studies certificate (and associate pathway—confirm general education requirements separately in the catalog).',
			'Fully online delivery using Zoom and Canvas, with synchronous/live components to satisfy the ABA’s minimum synchronous credit rule (per College of the Canyons).',
			'Includes a required paralegal internship to support job readiness (per College of the Canyons).',
			'California community college tuition is cited on the program page (for example $46/unit—verify current rates and fees in the official schedule).',
		],
		whatYoullLearn: [
			'Legal research, writing, and case organization skills aligned with supervised paralegal practice.',
			'Professional communication and client-service fundamentals in law-office settings.',
			'Ethical boundaries and unauthorized-practice-of-law awareness under California expectations.',
		],
		outcomes: [
			'Designed to meet California’s education expectations for paralegals (statute references at least 24 semester units of qualifying coursework—confirm your pathway with COC counseling).',
		],
		accreditation:
			'College of the Canyons is a California community college accredited by the Accrediting Commission for Community and Junior Colleges (ACCJC) of the Western Association of Schools and Colleges. The Paralegal Studies program is approved by the American Bar Association (per College of the Canyons program page).',
		occupationalCategory: 'Paralegal and Legal Assistant',
		image: '/images/certificates/college-canyons-paralegal-studies-certificate.png',
		imageAlt:
			'Two professionals shaking hands in a formal setting: one in an academic robe, one in a business suit holding papers, with law-library shelving in the background.',
		sourceUrl: 'https://www.canyons.edu/academics/paralegal/',
		location: 'California (College of the Canyons; Santa Clarita area campuses / online)',
		format: 'Fully online (Zoom + Canvas; includes required synchronous instruction per ABA)',
		creditNotes: [
			'Compare the Certificate vs Associate of Arts plans in the official catalog—total units and general education differ.',
			'ABA synchronous requirements and internship details can change; confirm sequencing with the Paralegal Studies department before enrolling.',
			'Published tuition is subject to board action; use the college schedule of classes for the amount you will actually pay.',
		],
		externalLinks: [
			{
				label: 'College of the Canyons — Paralegal Studies',
				url: 'https://www.canyons.edu/academics/paralegal/',
			},
			{ label: 'ACCJC accreditation (community colleges)', url: 'https://www.accjc.org/' },
			{
				label: 'American Bar Association — Standing Committee on Paralegals',
				url: 'https://www.americanbar.org/groups/paralegals/',
			},
			{
				label: 'California BPC §6450 (paralegal qualifications — read with official guidance)',
				url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=6450.',
			},
			{
				label: 'BLS Occupational Outlook: Paralegals and Legal Assistants',
				url: 'https://www.bls.gov/ooh/legal/paralegals-and-legal-assistants.htm',
			},
			{
				label: 'Card image — Pexels photo #6077423 (Katrin Bolovtsova)',
				url: 'https://www.pexels.com/photo/6077423/',
			},
		],
	},
];

