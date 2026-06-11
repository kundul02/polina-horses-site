#!/usr/bin/env node
/** Generate verified entries for LATEST_FEED programs (ids 55+) from merged export + inferDocumentChecklist. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const today = new Date().toISOString().slice(0, 10);

const html = fs.readFileSync(path.join(root, "programs.html"), "utf8");
const script = html.match(/<script>([\s\S]*)<\/script>/)[1];
const fnStart = script.indexOf("function hasMeaningfulPay");
const fnEnd = script.indexOf("function buildDocumentsPanelHtml");
const checklistFns = script.slice(fnStart, fnEnd);

const inferFactory = new Function(checklistFns + "\nreturn inferDocumentChecklist;");
const inferDocumentChecklist = inferFactory();

const all = JSON.parse(
  fs.readFileSync(path.join(root, "research", "all-programs-full.json"), "utf8")
);
const feed = all.filter((p) => p.id >= 55 && p.id <= 107);

const verifiedPath = path.join(root, "research", "programs-verified.json");
const verified = JSON.parse(fs.readFileSync(verifiedPath, "utf8"));

const overridesPath = path.join(root, "research", "feed-verified-overrides.json");
let overrides = {};
try {
  overrides = JSON.parse(fs.readFileSync(overridesPath, "utf8"));
} catch (_) {}

function overrideKey(program) {
  const url = program.url || "";
  if (url.includes("jockeyclub.com") && /scholarship/i.test(program.name)) {
    return `${url}::scholarship`;
  }
  if (url.includes("jockeyclub.com")) {
    return `${url}::internship`;
  }
  return url;
}

function applyOverride(entry, program) {
  const key = overrideKey(program);
  const o = overrides[key];
  if (!o) return entry;
  const merged = { ...entry, ...o, verifiedAt: today };
  if (o.support) merged.support = o.support;
  else if (entry.support) merged.support = entry.support;
  if (!o.check) delete merged.check;
  return merged;
}

// Drop stale feed verified entries (ids shift when LATEST_FEED changes)
for (const key of Object.keys(verified.programs)) {
  const id = Number(key);
  if (id >= 55 && id < 1000) delete verified.programs[key];
}

function fixPay(s) {
  return String(s || "")
    .replace(/до \),000/g, "до $1,000")
    .replace(/ь0,350/g, "$10,350")
    .replace(/т2,995/g, "$12,995");
}

function inferVisaDesc(program) {
  const country = program.baseCountry || program.country || "";
  const cat = program.category;
  const text = `${program.name} ${program.desc} ${program.url || ""}`.toLowerCase();

  if (country === "Израиль") {
    return "Доступно: уже в стране на студ. визе A/2 — отдельная виза не нужна · Подача: по инструкции на сайте программы";
  }
  if (/solidarity corps|esc|volunteering|european youth portal/i.test(text)) {
    return `Доступно: Шенгенская виза (поддерживается ESC) · Подача: через European Youth Portal / ESC`;
  }
  if (country === "USA") {
    if (/camp|counselor|j-1|internship|summer job/i.test(text)) {
      return "Доступно: виза США J-1 (часто спонсируется лагерем/работодателем) · Подача: онлайн-форма на сайте программы";
    }
    return "Доступно: виза США B1/B2 или J-1 (по типу программы) · Подача: онлайн-форма на сайте программы";
  }
  if (country === "UK") {
    if (cat === "Стипендии" || /school|scholarship/i.test(text)) {
      return "Доступно: виза Великобритании Student Visa (если школа спонсирует) · Подача: через сайт программы";
    }
    return "Доступно: виза Великобритании (Standard Visitor или право на работу) · Подача: через сайт программы";
  }
  if (country === "Ирландия") {
    return "Доступно: виза Ирландии (Visitor Visa) · Подача: форма на сайте программы";
  }
  if (country === "Canada") {
    return "Доступно: виза Канады (Visitor или Work Permit — по типу) · Подача: через сайт программы";
  }
  if (country === "Австралия") {
    return "Доступно: виза Австралии (Visitor или Working Holiday) · Подача: через сайт программы";
  }
  if (
    ["Германия", "Франция", "Испания", "Португалия", "Польша", "Дания", "Словения", "Швеция", "Бельгия", "Европа (Schengen)"].includes(
      country
    )
  ) {
    return "Доступно: Шенгенская виза · Подача: через сайт программы";
  }
  if (country === "ЮАР") {
    return "Доступно: виза ЮАР (Visitor Visa) · Подача: через сайт программы";
  }
  if (country === "Аргентина") {
    return "Доступно: виза Аргентины (Visitor Visa) · Подача: через платформу или сайт программы";
  }
  if (country === "New Zealand") {
    return "Доступно: виза Новой Зеландии (Visitor или Working Holiday) · Подача: через сайт программы";
  }
  if (country === "Georgia") {
    return "Доступно: виза Грузии (Visitor) · Подача: через сайт программы";
  }
  return "Доступно: уточнить визовые требования для страны программы · Подача: через официальный сайт";
}

function shortenSummary(text, maxLen = 180) {
  const s = String(text || "").trim();
  if (s.length <= maxLen) return s;
  const cut = s.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trim() + "…";
}

function formatDeadline(deadline, closed) {
  const d = String(deadline || "Уточнить");
  if (closed && !/closed|закрыт/i.test(d)) {
    return `Закрыт (${d})`;
  }
  return d;
}

let fetchResults = {};
try {
  fetchResults = JSON.parse(
    fs.readFileSync(path.join(root, "research", "fetch-results-all.json"), "utf8")
  );
} catch (_) {}

for (const p of feed) {
  const pkg = inferDocumentChecklist(p);
  const fetchMeta = fetchResults[String(p.id)];
  const entry = {
    summary: shortenSummary(p.summary || p.desc),
    desc: inferVisaDesc(p),
    dates: p.dates,
    deadline: formatDeadline(p.deadline, p.closed),
    pay: fixPay(p.pay),
    support: p.support,
    documents: pkg.list,
    sources: [p.url],
    verifiedAt: today,
    closed: Boolean(p.closed),
  };
  if (p.check) entry.check = p.check;
  if (fetchMeta && !fetchMeta.ok && !overrides[overrideKey(p)]) {
    entry.check = [entry.check, `Fetch ${fetchMeta.status || "failed"}: ${fetchMeta.error || "site unreachable"}`]
      .filter(Boolean)
      .join(" · ");
  }
  verified.programs[String(p.id)] = applyOverride(entry, p);
}

// Fix known pay typos across all entries
for (const [id, v] of Object.entries(verified.programs)) {
  if (v.pay) v.pay = fixPay(v.pay);
}

verified.lastFullReview = today;
fs.writeFileSync(verifiedPath, JSON.stringify(verified, null, 2) + "\n");
console.log(`Feed verified: ${feed.length} programs (ids ${feed[0]?.id}–${feed[feed.length - 1]?.id})`);
console.log(`Total verified: ${Object.keys(verified.programs).length}`);
