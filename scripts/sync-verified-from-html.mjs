#!/usr/bin/env node
/** Sync verified fields from all-programs.json into programs-verified.json */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const all = JSON.parse(fs.readFileSync(path.join(root, "research/all-programs.json"), "utf8"));
const verifiedPath = path.join(root, "research", "programs-verified.json");
const verified = JSON.parse(fs.readFileSync(verifiedPath, "utf8"));
const today = new Date().toISOString().slice(0, 10);

function fixPay(s) {
  return String(s || "")
    .replace(/до \),000/g, "до $1,000")
    .replace(/ь0,350/g, "$10,350")
    .replace(/т2,995/g, "$12,995");
}

for (const p of all) {
  const hasRich =
    (p.documents && p.documents.length >= 3) ||
    (p.summary && p.desc && p.desc.startsWith("Доступно:"));
  if (!hasRich) continue;

  verified.programs[String(p.id)] = {
    summary: p.summary || p.desc?.slice(0, 200),
    desc: p.desc,
    dates: p.dates,
    deadline: p.deadline,
    pay: fixPay(p.pay),
    support: p.support,
    documents: p.documents || verified.programs[String(p.id)]?.documents || [],
    sources: [p.url],
    verifiedAt: today,
    closed: Boolean(p.closed),
    ...(p.check ? { check: p.check } : {}),
    ...(p.urgent ? { urgent: p.urgent } : {}),
    ...(p.profileFit ? { profileFit: p.profileFit } : {}),
  };
}

verified.lastFullReview = today;
fs.writeFileSync(verifiedPath, JSON.stringify(verified, null, 2) + "\n");
console.log("Verified count:", Object.keys(verified.programs).length);
