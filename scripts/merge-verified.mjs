#!/usr/bin/env node
/**
 * Merge research/programs-verified.json into programs.html fields.
 * Usage: node scripts/merge-verified.mjs [--dry-run]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const htmlPath = path.join(root, "programs.html");
const verifiedPath = path.join(root, "research", "programs-verified.json");

const dryRun = process.argv.includes("--dry-run");
const verified = JSON.parse(fs.readFileSync(verifiedPath, "utf8"));
const programs = verified.programs || {};

const MERGE_FIELDS = [
  "summary",
  "desc",
  "dates",
  "deadline",
  "pay",
  "support",
  "documents",
  "check",
  "closed",
  "urgent",
  "tone",
  "profileFit",
];

function escapeJsString(s) {
  return String(s)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n");
}

function formatDocuments(docs) {
  if (!Array.isArray(docs) || docs.length === 0) return null;
  const items = docs.map((d) => `"${escapeJsString(d)}"`).join(", ");
  return `documents: [${items}]`;
}

function patchProgramBlock(block, id, data) {
  let out = block;
  for (const field of MERGE_FIELDS) {
    if (data[field] === undefined) continue;
    const val = data[field];
    if (field === "documents") {
      const docStr = formatDocuments(val);
      if (!docStr) continue;
      if (/documents:\s*\[/.test(out)) {
        out = out.replace(/documents:\s*\[[^\]]*\]/, docStr);
      } else {
        out = out.replace(/\n(\s*)(urgent:|check:|closed:|isNew:|profileFit:|url:)/, `\n$1${docStr},\n$1$2`);
      }
      continue;
    }
    if (field === "support" && Array.isArray(val)) {
      const sup = `[${val.map((s) => `"${escapeJsString(s)}"`).join(", ")}]`;
      out = out.replace(/support:\s*\[[^\]]*\]/, `support: ${sup}`);
      continue;
    }
    if (typeof val === "boolean") {
      const re = new RegExp(`${field}:\\s*(true|false)`);
      if (re.test(out)) out = out.replace(re, `${field}: ${val}`);
      else out = out.replace(/\n(\s*)(url:)/, `\n$1${field}: ${val},\n$1$2`);
      continue;
    }
    const re = new RegExp(`${field}:\\s*"([^"\\\\]|\\\\.)*"`);
    if (re.test(out)) {
      out = out.replace(re, () => `${field}: "${escapeJsString(val)}"`);
    }
  }
  return out;
}

let html = fs.readFileSync(htmlPath, "utf8");
let merged = 0;
const missing = [];

for (const [idStr, data] of Object.entries(programs)) {
  const id = Number(idStr);
  if (!Number.isFinite(id)) continue;
  const re = new RegExp(`(\\{\\s*\\n\\s*id:\\s*${id},[\\s\\S]*?\\n\\s*\\})(?=,\\n|\\n\\])`, "m");
  const match = html.match(re);
  if (!match) {
    missing.push(id);
    continue;
  }
  const patched = patchProgramBlock(match[0], id, data);
  if (patched !== match[0]) {
    html = html.replace(match[0], patched);
    merged++;
  }
}

verified.lastFullReview = verified.lastFullReview || new Date().toISOString().slice(0, 10);
verified.lastMerge = new Date().toISOString().slice(0, 10);

console.log(`Verified entries: ${Object.keys(programs).length}`);
console.log(`Merged into HTML: ${merged}`);
if (missing.length) console.log(`IDs not found in HTML: ${missing.join(", ")}`);

if (!dryRun) {
  fs.writeFileSync(htmlPath, html);
  fs.writeFileSync(verifiedPath, JSON.stringify(verified, null, 2) + "\n");
  fs.copyFileSync(htmlPath, path.join(root, "index.html"));
  console.log("Updated programs.html and index.html");
} else {
  console.log("Dry run — no files written");
}
