#!/usr/bin/env node
/**
 * One-off (rerunnable): close every program whose deadline or season is in the past.
 * - deadline is a fixed past date -> "Закрыт (истёк …)"
 * - dates field shows a 2026 season fully in the past (no 2027 mention) -> "Закрыт (сезон 2026 завершён)"
 * Updates: BASE blocks + VERIFIED_REGISTRY in programs.html, programs-verified.json, copies to index.html.
 *
 * Usage: node scripts/close-stale-programs.mjs [--dry-run]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  formatClosedDeadline,
  isExpired,
  isRollingDeadline,
  parseDeadlineDate,
} from "./lib/casting-deadline.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dryRun = process.argv.includes("--dry-run");
const today = new Date();

const MONTHS = {
  янв: 1, фев: 2, мар: 3, апр: 4, ма: 5, июн: 6, июл: 7,
  авг: 8, сен: 9, окт: 10, ноя: 11, дек: 12,
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7,
  aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
};

function lastSeasonEndDate(text) {
  if (!text || typeof text !== "string") return null;
  if (/20(2[7-9]|3\d)/.test(text)) return null; // future cycle mentioned -> do not close
  let last = null;
  const re = /\b(\d{1,2})[\s\u00a0]+([a-zA-Zа-яА-ЯёЁ]+)\.?\s+(20\d{2})/gu;
  for (const m of text.matchAll(re)) {
    const day = Number(m[1]);
    const token = m[2].toLowerCase().slice(0, 3);
    const month = MONTHS[token];
    const year = Number(m[3]);
    if (month) {
      const d = new Date(year, month - 1, day);
      if (!isNaN(d) && (!last || d > last)) last = d;
    }
  }
  return last;
}

function loadPrograms(html) {
  const script = html.match(/<script>([\s\S]*)<\/script>/)[1];
  const start = script.indexOf("const ACTING_BASE_PROGRAMS = [");
  const end = script.indexOf("let activeDomain");
  const factory = new Function(script.slice(start, end) + "\nreturn PROGRAMS;"); // trusted local file
  return factory();
}

function findProgramBlock(html, id) {
  const marker = `id: ${id},`;
  const markerIdx = html.indexOf(marker);
  if (markerIdx === -1) return null;
  let braceStart = html.lastIndexOf("{", markerIdx);
  let depth = 0;
  for (let i = braceStart; i < html.length; i++) {
    if (html[i] === "{") depth++;
    if (html[i] === "}") {
      depth--;
      if (depth === 0) return { start: braceStart, end: i + 1, block: html.slice(braceStart, i + 1) };
    }
  }
  return null;
}

function setFieldInBlock(block, field, value) {
  const formatted =
    typeof value === "boolean" ? String(value) : `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  const re = new RegExp(`(\\b${field}:\\s*)(?:true|false|null|"[^"]*")`);
  if (re.test(block)) return block.replace(re, `$1${formatted}`);
  return block.replace(/(\n\s*)(closed:|urgent:|url:)/, `$1${field}: ${formatted},\n$2`);
}

function patchProgramInHtml(html, id, fields) {
  const found = findProgramBlock(html, id);
  if (!found) return html;
  let block = found.block;
  for (const [field, value] of Object.entries(fields)) {
    block = setFieldInBlock(block, field, value);
  }
  return html.slice(0, found.start) + block + html.slice(found.end);
}

function main() {
  const htmlPath = path.join(root, "programs.html");
  let html = fs.readFileSync(htmlPath, "utf8");
  const programs = loadPrograms(html);

  const verifiedPath = path.join(root, "research/programs-verified.json");
  const verified = JSON.parse(fs.readFileSync(verifiedPath, "utf8"));

  // VERIFIED_REGISTRY embedded in html
  const vrStart = html.indexOf("const VERIFIED_REGISTRY = {");
  const vrEnd = html.indexOf("// VERIFIED_REGISTRY_END");
  if (vrStart === -1 || vrEnd === -1) {
    console.error("VERIFIED_REGISTRY markers not found");
    process.exit(1);
  }
  const vrJsonStart = html.indexOf("{", vrStart);
  // balanced-brace scan: object may contain "};" inside string values
  let depth = 0, vrJsonEnd = -1;
  for (let i = vrJsonStart; i < vrEnd; i++) {
    if (html[i] === "{") depth++;
    else if (html[i] === "}") {
      depth--;
      if (depth === 0) { vrJsonEnd = i + 1; break; }
    }
  }
  const vrObj = JSON.parse(html.slice(vrJsonStart, vrJsonEnd));

  const report = [];

  for (const p of programs) {
    if (p.closed) continue;
    if (p.domain !== "castings" && !["Кастинги", "Кастинги в актёрском мастерстве", "Кастинги в актёрском мастерстве "].includes(p.category) && isRollingDeadline(p.deadline)) {
      // rolling non-casting programs (platform monitors, agency pools) stay open
    }
    let newDeadline = null;
    const fixed = parseDeadlineDate(p.deadline);
    if (fixed && isExpired(fixed, today)) {
      newDeadline = formatClosedDeadline(fixed);
    } else if (!fixed && !isRollingDeadline(p.deadline)) {
      // unparseable non-rolling deadline -> check dates
    }
    if (!newDeadline) {
      const seasonEnd = lastSeasonEndDate(p.dates);
      if (seasonEnd && isExpired(seasonEnd, today)) {
        newDeadline = "Закрыт (сезон 2026 завершён)";
      }
    }
    if (!newDeadline) continue;

    const patch = { deadline: newDeadline, closed: true, urgent: false, tone: "neutral" };
    report.push({ id: p.id, name: p.name, was: p.deadline, now: newDeadline });

    if (!dryRun) {
      html = patchProgramInHtml(html, p.id, patch);
      if (vrObj[String(p.id)]) {
        Object.assign(vrObj[String(p.id)], {
          deadline: newDeadline,
          closed: true,
          urgent: false,
          tone: "neutral",
        });
      }
      if (verified.programs?.[String(p.id)]) {
        Object.assign(verified.programs[String(p.id)], {
          deadline: newDeadline,
          closed: true,
          urgent: false,
          tone: "neutral",
        });
      }
    }
  }

  if (!dryRun) {
    // recompute markers AFTER program patches (indices shifted)
    const vrStart = html.indexOf("const VERIFIED_REGISTRY = {");
    const vrEnd = html.indexOf("// VERIFIED_REGISTRY_END");
    const vrJsonStart = html.indexOf("{", vrStart);
    let depth = 0, vrJsonEnd = -1;
    for (let i = vrJsonStart; i < vrEnd; i++) {
      if (html[i] === "{") depth++;
      else if (html[i] === "}") {
        depth--;
        if (depth === 0) { vrJsonEnd = i + 1; break; }
      }
    }
    const vrSerialized = `const VERIFIED_REGISTRY = ${JSON.stringify(vrObj, null, 2)};`;
    html = html.slice(0, vrStart) + vrSerialized + html.slice(vrJsonEnd + 1);
    fs.writeFileSync(htmlPath, html);
    fs.copyFileSync(htmlPath, path.join(root, "index.html"));
    fs.writeFileSync(verifiedPath, JSON.stringify(verified, null, 2) + "\n");
  }

  console.log(JSON.stringify(report, null, 2));
  console.error(`${dryRun ? "Dry run: would close" : "Closed"} ${report.length} program(s).`);
}

main();
