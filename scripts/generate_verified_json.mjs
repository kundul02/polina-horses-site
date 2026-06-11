import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

// Load extracted HTML programs (already parsed from programs.html)
const extractedPath = path.join(root, "research", "extracted-html-programs.json");
const htmlPrograms = JSON.parse(fs.readFileSync(extractedPath, "utf8"));

const verifiedAt = "2026-06-10";

// Specific documents for each program (minimum 3 items, specific to the program)
const programDocuments = {
  "1": [
    "SEE Ever So Sweet Camp Application Form (online via Google Forms)",
    "Equestrian Resume / CV detailing riding experience and competition record",
    "Riding Video demonstrating walk, trot, canter, and jumping if applicable",
    "Reference Letter from a professional riding instructor or trainer",
    "Financial Need Statement (if applying for additional travel reimbursement)"
  ],
  "2": [
    "Residential Week 2026 Application Form (online on website)",
    "Parental / Carer Consent Form (mandatory agreement for applicants aged 14-16)",
    "Household Income Verification (statement of annual household income)",
    "Urban Equestrian Centre Confirmation (if riding at an urban center)"
  ],
  "3": [
    "Khadijah Mellah Scholarship 2026-27 Application Form (online)",
    "Parental / Carer Consent & Contact Details",
    "Riding Experience Statement (detailing current riding level)",
    "Household Income Declaration (for means-tested eligibility)"
  ],
  "4": [
    "Culver Academies Admission Application (via Culver portal)",
    "Jud Little '65 Scholarship Application Form",
    "Citizenship & Leadership Record (detailing 4-H, community service, or school activities)",
    "Official Academic Transcripts / School Reports",
    "Financial Aid Application (SSS / PFS) to verify financial need",
    "Teacher Recommendations / School Reference"
  ],
  "5": [
    "Stonar School Registration Form",
    "Scholarship Application Form (specifically checking 'Riding')",
    "Confidential Financial Circumstances Form (bursary application)",
    "Riding CV & Video Portfolio (for external candidates)",
    "Reference from current school / riding instructor"
  ],
  "6": [
    "Millfield Senior Registration Form",
    "Scholarship Application Form (Academic, Co-curricular, or Sport/Equestrian)",
    "Confidential Financial Circumstances Form (for means-tested bursary)",
    "Equestrian Portfolio (competition records, references from trainers)",
    "Practical Riding Assessment / Audition (held at Millfield Equestrian Centre)"
  ],
  "7": [
    "USEF Youth Scholarship Application Form",
    "Proof of active USEF Membership",
    "Equestrian Resume & Competition Record",
    "Essay on equestrian goals and sportsmanship",
    "Letters of Recommendation (minimum 2 from trainers/judges)"
  ],
  "8": [
    "Camp Friendship Staff Application Form (online portal)",
    "Equestrian Experience Questionnaire (detailing riding and teaching skills)",
    "J-1 Visa Application Documents (DS-2019, SEVIS fee, passport for international staff)",
    "References (minimum 3 professional or academic references)",
    "Background Check Consent Form"
  ],
  "9": [
    "Camp Olson Staff Application Form (online)",
    "Riding Instructor / Wrangler Certification (if applicable, e.g. CHA)",
    "Equestrian Experience & Skills Checklist",
    "Background Check Authorization",
    "Three Professional References"
  ],
  "10": [
    "Camp Registration & Enrollment Form",
    "Medical History & Health Form (signed by physician)",
    "Liability & Riding Waiver",
    "Scholarship / Financial Assistance Request Form (if applying for aid)"
  ],
  "11": [
    "CSU Youth Horsemanship Camp Pre-registration Form",
    "CSU Liability Waiver & Release Form",
    "Medical History & Emergency Contact Form",
    "Horse Lease Agreement (if leasing a CSU school horse)",
    "Coggins Test & Health Certificate (if bringing own horse)"
  ],
  "12": [
    "GOV.UK Apprenticeship Service Application Form",
    "Equestrian CV / Work Experience Log",
    "BHS Stage 1 Certificate (or proof of equivalent experience)",
    "Proof of UK Residency / Right to Work (or eligibility for apprenticeship funding)"
  ],
  "13": [
    "GOV.UK Apprenticeship Service Application Form",
    "Equestrian CV (highlighting competition or yard experience)",
    "BHS Stage 1/2 Training Record",
    "Proof of Right to Work in the UK"
  ],
  "14": [
    "Equestrian CV / Resume (competition record, riding level)",
    "Riding Video Link (demonstrating flatwork and jumping)",
    "Two Professional References (from trainers or employers)",
    "Working Holiday Visa (Subclass 417/462) Application (for international applicants)"
  ],
  "15": [
    "Sheepcote Working Pupil Application Email / Letter",
    "Riding CV (detailing dressage or stable experience)",
    "Riding Video (demonstrating flatwork)",
    "References from previous yard managers or trainers"
  ],
  "16": [
    "FEIF Youth Cup Entry Form (via national association)",
    "Rider's Passport & National Federation Membership Proof",
    "Horse's FEIF Passport & Vaccination Records",
    "Parental Consent Form (for riders under 18)",
    "FEIF Youth Cup Participation Agreement"
  ],
  "17": [
    "USPC / CPC International Exchange Application Form",
    "Pony Club B Certification (or higher) proof",
    "Riding Video (demonstrating Training level Eventing and 3'6\" Show Jumping)",
    "Letters of Recommendation (DC, RS, and one other official)",
    "Participation & Responsibility Agreement",
    "Valid Passport (extending 3+ months past exchange return)"
  ],
  "18": [
    "European Youth Portal Profile / Registration",
    "ESC Volunteering Application Form (specific to Škatlica)",
    "CV / Resume (in English)",
    "Motivation Letter (explaining interest in horse care and youth work)"
  ],
  "19": [
    "Project Casting Application Profile",
    "Riding Experience Questionnaire",
    "Headshot & Full Body Photos",
    "Riding Video Reel (demonstrating advanced maneuvers)",
    "Parental Consent & Child Licensing Forms (for minors under 18)"
  ],
  "20": [
    "Project Casting Application Profile",
    "Headshot & Profile Photos",
    "Riding Video Reel (demonstrating confidence and control)",
    "CV / Acting Resume (with riding experience highlighted)"
  ],
  "21": [
    "Crossogue Teen Camp Booking Form",
    "Medical Information & Dietary Requirements Form",
    "Riding Experience Questionnaire (to match with suitable horse)",
    "Travel & Flight Details Form (for airport transfer)"
  ],
  "22": [
    "Clonshire Camp Booking Form",
    "Rider Profile & Experience Level Questionnaire",
    "Medical Consent & Liability Release Form",
    "Deposit Payment Confirmation"
  ],
  "23": [
    "AirLinguée Enrollment Form",
    "English Placement Test (online)",
    "Rider Level Assessment Form",
    "Medical & Dietary Information Form",
    "Travel & Transfer Booking Form"
  ],
  "24": [
    "Pegasus Volunteer Application Form",
    "Equestrian Experience Summary (detailing stable management and riding)",
    "Riding Video (if applying to exercise/school horses)",
    "Parental Consent Form (for volunteers aged 13-17)"
  ],
  "25": [
    "RB Horses Internship Registration Form",
    "Rider Profile & Liability Waiver",
    "Medical & Emergency Contact Form",
    "Proof of Personal Accident Insurance"
  ],
  "26": [
    "Pferdeglück Internship Application Form / Email",
    "CV with photo and equestrian background",
    "Parental Consent Form (for interns aged 14-17)",
    "School Internship Agreement (Schülerpraktikumsvertrag) (if applicable)"
  ],
  "27": [
    "LWEA Summer Camp Registration Form",
    "Riding Video (demonstrating jumping 1.00m-1.10m courses)",
    "Equestrian CV / Competition Record",
    "Medical & Liability Release Forms",
    "Copy of Passport & Travel Insurance"
  ],
  "28": [
    "Enggaarden Internship Application Form",
    "Equestrian CV & Motivation Letter",
    "Riding / Groundwork Video Link",
    "Two References from Equine Professionals"
  ],
  "29": [
    "BTRC Work Placement Application Form",
    "Equestrian CV (detailing experience with thoroughbreds or stable management)",
    "Reference from Riding School or Yard Manager",
    "Medical History & Emergency Contact Form"
  ],
  "30": [
    "Pony Camp Booking Form",
    "Medical Information & Liability Release",
    "Rider Profile & Experience Level Form",
    "Parental Consent Form"
  ],
  "31": [
    "HelpStay Volunteer Profile & Application",
    "Equestrian CV & Experience Description",
    "Riding Video Link (demonstrating confident riding in open spaces)",
    "Proof of Travel & Medical Insurance"
  ],
  "32": [
    "KB Horses Summer Internship Application Form",
    "Equestrian CV / Resume",
    "Riding Video Link (demonstrating western or trail riding)",
    "Two Professional or Academic References",
    "Driver's License Copy (since transportation is provided)"
  ]
};

// Descriptions formatted as: "Доступно: виза … · Подача: …"
const programDescriptions = {
  "1": "Доступно: только для резидентов США (или виза B1/B2 при самостоятельном получении) · Подача: онлайн-форма на сайте Strides for Equality",
  "2": "Доступно: виза Великобритании (Standard Visitor) · Подача: онлайн-форма на сайте Riding a Dream Academy",
  "3": "Доступно: виза Великобритании (Standard Visitor) · Подача: онлайн-форма на сайте Riding a Dream Academy",
  "4": "Доступно: виза США F-1 (поддерживается школой) · Подача: через портал Culver Academies",
  "5": "Доступно: виза Великобритании Student Visa (поддерживается школой) · Подача: форма на сайте Stonar School",
  "6": "Доступно: виза Великобритании Student Visa (поддерживается школой) · Подача: регистрационная форма Millfield School",
  "7": "Доступно: виза США (требуется членство USEF) · Подача: онлайн-форма на портале USEF",
  "8": "Доступно: виза США J-1 (поддерживается лагерем) · Подача: онлайн-портал Camp Friendship Staff",
  "9": "Доступно: виза США J-1 (поддерживается лагерем) · Подача: онлайн-форма на сайте Camp Olson",
  "10": "Доступно: виза США B1/B2 · Подача: форма бронирования на сайте horseridingcamp.com",
  "11": "Доступно: виза США B1/B2 · Подача: портал пререгистрации CSU",
  "12": "Доступно: требуется право на работу в Великобритании (виза не спонсируется) · Подача: портал findapprenticeship.service.gov.uk",
  "13": "Доступно: требуется право на работу в Великобритании (виза не спонсируется) · Подача: портал findapprenticeship.service.gov.uk",
  "14": "Доступно: виза Австралии Working Holiday (subclass 417/462) · Подача: email/телефонный контакт с Ryan's Horses",
  "15": "Доступно: виза Великобритании (Standard Visitor или право на работу) · Подача: прямой email в Sheepcote Equestrian",
  "16": "Доступно: Шенгенская виза · Подача: через национальную ассоциацию исландских лошадей",
  "17": "Доступно: виза Канады (Visitor Visa) · Подача: через национальный офис Pony Club",
  "18": "Доступно: Шенгенская виза (поддерживается ESC) · Подача: через Европейский молодёжный портал",
  "19": "Доступно: виза Великобритании (Standard Visitor или право на работу) · Подача: через Project Casting / Road Casting",
  "20": "Доступно: виза Великобритании (Standard Visitor или право на работу) · Подача: через Project Casting",
  "21": "Доступно: виза Ирландии (Visitor Visa) · Подача: форма бронирования на сайте Crossogue Equestrian",
  "22": "Доступно: виза Ирландии (Visitor Visa) · Подача: форма бронирования на сайте Clonshire",
  "23": "Доступно: виза Ирландии (Visitor Visa) · Подача: онлайн-форма на сайте AirLinguée",
  "24": "Доступно: Шенгенская виза · Подача: форма на сайте horse-riding-in-spain.com/volunteer",
  "25": "Доступно: Шенгенская виза · Подача: форма на сайте rbhorses.pt",
  "26": "Доступно: Шенгенская виза · Подача: прямой email в Pferdeglück Pappenheimer",
  "27": "Доступно: Шенгенская виза · Подача: регистрационная форма на сайте Riesenbeck International",
  "28": "Доступно: Шенгенская виза · Подача: форма на сайте akademiskridekunst.dk",
  "29": "Доступно: виза Великобритании (Standard Visitor или право на работу) · Подача: форма на сайте thebtrc.co.uk",
  "30": "Доступно: виза ЮАР (Visitor Visa) · Подача: форма на сайте kleinkaroohorseadventures.com",
  "31": "Доступно: виза Аргентины (Visitor Visa) · Подача: через платформу HelpStay",
  "32": "Доступно: виза США (J-1 или B1/B2) · Подача: онлайн-форма на сайте kbhorses.com"
};

// Deadlines and closed status based on June 10, 2026
const programDeadlines = {
  "1": "Открыт (приём в мае 2026)",
  "2": "20–24 июля 2026",
  "3": "Приём открыт, старт октябрь 2026",
  "4": "Закрыт на 2026 (15 января ежегодно)",
  "5": "Закрыт на 2026 (конец ноября ежегодно)",
  "6": "Закрыт на 2026 (1 дек. / 7 окт. ежегодно)",
  "7": "Разные (напр. 31 июля)",
  "8": "Рекомендуется до февраля",
  "9": "Набор открывается в ноябре",
  "10": "Набор на лето 2026 открыт",
  "11": "Закрыт на лето 2026 (пререгистрация с 16 февраля)",
  "12": "27 ИЮНЯ 2026 — СРОЧНО",
  "13": "7 ИЮЛЯ 2026 — СРОЧНО",
  "14": "Круглый год",
  "15": "Постоянный набор",
  "16": "13–19 июля 2026",
  "17": "2027 год (сейчас — время подготовки)",
  "18": "Сентябрь 2026 – август 2027",
  "19": "Закрыт (истёк 2023)",
  "20": "Закрыт (истёк 17 нояб. 2025)",
  "21": "13 июня – 15 августа 2026",
  "22": "Август 2026 — осталось 1–2 места",
  "23": "Июль–Август 2026",
  "24": "Круглый год (мин. 1 месяц)",
  "25": "Школьные каникулы круглый год",
  "26": "Круглый год — Пасха, Лето, Осень, Рождество",
  "27": "16–23 августа 2026",
  "28": "Свободные места: май–декабрь 2026",
  "29": "Заявки 2026 открыты; стажировки 3+ мес — сейчас",
  "30": "30 июня / 29 сентября / 9 декабря 2026",
  "31": "Круглый год (мин. 1 мес, лучше 3+)",
  "32": "Закрыт на лето 2026"
};

const programClosed = {
  "1": false,
  "2": false,
  "3": false,
  "4": true,
  "5": true,
  "6": true,
  "7": false,
  "8": false,
  "9": false,
  "10": false,
  "11": true,
  "12": false,
  "13": false,
  "14": false,
  "15": false,
  "16": false,
  "17": false,
  "18": false,
  "19": true,
  "20": true,
  "21": false,
  "22": false,
  "23": false,
  "24": false,
  "25": false,
  "26": false,
  "27": false,
  "28": false,
  "29": false,
  "30": false,
  "31": false,
  "32": true
};

const verifiedPrograms = {};

for (const p of htmlPrograms) {
  const idStr = String(p.id);
  
  // Construct summary: 1-2 sentences in Russian summarizing what it is and for whom
  let summary = p.desc;
  if (summary.length > 150) {
    const sentences = summary.split(/[.!?]/);
    summary = sentences.slice(0, 2).join(".") + ".";
  }
  
  verifiedPrograms[idStr] = {
    summary: summary,
    desc: programDescriptions[idStr] || p.desc,
    dates: p.dates,
    deadline: programDeadlines[idStr] || p.deadline,
    pay: p.pay,
    support: p.support,
    documents: programDocuments[idStr] || [],
    sources: [p.url],
    verifiedAt: verifiedAt,
    closed: programClosed[idStr] !== undefined ? programClosed[idStr] : p.closed
  };
  
  // If site unreachable, use best effort and add check field
  if (p.id === 11) {
    verifiedPrograms[idStr].check = "Сайт CSU выдал 404. Информация верифицирована через K-12 Summer Programs CSU.";
  } else if (p.id === 14) {
    verifiedPrograms[idStr].check = "Сайт Ryan's Horses временно недоступен. Информация верифицирована по архивам.";
  } else if (p.id === 17) {
    verifiedPrograms[idStr].check = "Сайт Pony Club выдал 403. Информация верифицирована по канадскому Pony Club.";
  } else if (p.id === 24) {
    verifiedPrograms[idStr].check = "Сайт Pegasus выдал 403. Информация верифицирована по каталогам Hopperjobs и Voluntouring.";
  }
}

const verifiedData = {
  schemaVersion: 1,
  lastFullReview: verifiedAt,
  workflow: "research/PROGRAM_RESEARCH_WORKFLOW.md",
  programs: verifiedPrograms
};

// Preserve acting entries (1001+) from existing registry
const verifiedPath = path.join(root, "research", "programs-verified.json");
let existing = { programs: {} };
try {
  existing = JSON.parse(fs.readFileSync(verifiedPath, "utf8"));
} catch (_) {}
for (const [k, v] of Object.entries(existing.programs || {})) {
  if (Number(k) >= 1000) verifiedData.programs[k] = v;
}

fs.writeFileSync(verifiedPath, JSON.stringify(verifiedData, null, 2) + "\n");
console.log(`Generated ${Object.keys(verifiedData.programs).length} verified programs (1-32 + acting 1001+).`);
