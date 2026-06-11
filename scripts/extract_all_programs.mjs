#!/usr/bin/env node
/** Extract all programs from programs.html (equestrian + acting base arrays). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "programs.html"), "utf8");
const script = html.match(/<script>([\s\S]*)<\/script>/)[1];
const start = script.indexOf("const ACTING_BASE_PROGRAMS = [");
const end = script.indexOf("function normalizeKey(value)");
const factory = new Function(script.slice(start, end) + "; return { BASE_PROGRAMS, ACTING_BASE_PROGRAMS };");
const { BASE_PROGRAMS, ACTING_BASE_PROGRAMS } = factory();

const all = [...BASE_PROGRAMS, ...ACTING_BASE_PROGRAMS].map((p) => ({
  id: p.id,
  domain: p.domain || (p.id >= 1000 ? "acting" : "equestrian"),
  name: p.name,
  org: p.org,
  category: p.category,
  baseCountry: p.baseCountry,
  country: p.country,
  age: p.age,
  minAge: p.minAge,
  deadline: p.deadline,
  dates: p.dates,
  pay: p.pay,
  support: p.support,
  summary: p.summary,
  desc: p.desc,
  url: p.url,
  closed: p.closed,
  urgent: p.urgent,
  check: p.check,
  documents: p.documents,
}));

const out = path.join(root, "research", "all-programs.json");
fs.writeFileSync(out, JSON.stringify(all, null, 2) + "\n");
console.log(`Extracted ${all.length} programs → ${out}`);
