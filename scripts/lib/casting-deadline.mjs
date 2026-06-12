/** Parse casting deadline strings (RU/EN) → Date at local midnight, or null if not fixed. */

const MONTH_PREFIXES = [
  ["январ", 1],
  ["феврал", 2],
  ["март", 3],
  ["апрел", 4],
  ["ма", 5],
  ["июн", 6],
  ["июл", 7],
  ["август", 8],
  ["сентябр", 9],
  ["октябр", 10],
  ["ноябр", 11],
  ["декабр", 12],
  ["jan", 1],
  ["feb", 2],
  ["mar", 3],
  ["apr", 4],
  ["may", 5],
  ["jun", 6],
  ["jul", 7],
  ["aug", 8],
  ["sep", 9],
  ["oct", 10],
  ["nov", 11],
  ["dec", 12],
];

const ROLLING_PATTERNS = [
  /rolling/i,
  /мониторинг/i,
  /agency\s*pool/i,
  /ежедневн/i,
  /еженед/i,
  /без\s+публичного/i,
  /^открыт\b/i,
  /круглый\s+год/i,
  /при\s+наличии\s+мест/i,
  /до\s+заполнения/i,
];

const CLOSED_PATTERNS = [/^закрыт/i, /истёк/i, /истек/i, /expired/i];

/** @param {string|null|undefined} text */
export function isRollingDeadline(text) {
  if (!text || typeof text !== "string") return true;
  if (CLOSED_PATTERNS.some((re) => re.test(text))) return false;
  return ROLLING_PATTERNS.some((re) => re.test(text));
}

/** @param {string|null|undefined} text */
export function parseDeadlineDate(text) {
  if (!text || typeof text !== "string") return null;
  if (isRollingDeadline(text)) return null;

  const iso = text.match(/\b(20\d{2})-(\d{2})-(\d{2})\b/);
  if (iso) {
    return localDate(Number(iso[1]), Number(iso[2]), Number(iso[3]));
  }

  const dmy = text.match(/\b(\d{1,2})\s+([a-zA-Zа-яА-ЯёЁ.]+)\.?\s+(20\d{2})\b/u);
  if (dmy) {
    const day = Number(dmy[1]);
    const month = monthFromToken(dmy[2]);
    const year = Number(dmy[3]);
    if (month) return localDate(year, month, day);
  }

  return null;
}

/** @param {Date} date */
export function formatClosedDeadline(date) {
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  return `Закрыт (истёк ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()})`;
}

/** Deadline day D is valid through end of D; archive starting D+1. */
export function isExpired(deadlineDate, today) {
  const end = new Date(deadlineDate.getFullYear(), deadlineDate.getMonth(), deadlineDate.getDate(), 23, 59, 59, 999);
  const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return end < startToday;
}

function localDate(year, month, day) {
  const d = new Date(year, month - 1, day);
  if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) return null;
  return d;
}

function monthFromToken(token) {
  const t = token.toLowerCase().replace(/\./g, "");
  for (const [prefix, month] of MONTH_PREFIXES) {
    if (t.startsWith(prefix)) return month;
  }
  return null;
}
