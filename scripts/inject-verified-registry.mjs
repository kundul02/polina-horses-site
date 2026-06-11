#!/usr/bin/env node
/** Inject research/programs-verified.json into programs.html as VERIFIED_REGISTRY. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const htmlPath = path.join(root, "programs.html");
const verified = JSON.parse(
  fs.readFileSync(path.join(root, "research", "programs-verified.json"), "utf8")
);

const registryJson = JSON.stringify(verified.programs || {}, null, 2);
const block = `const VERIFIED_REGISTRY = ${registryJson};\n\nfunction applyVerifiedProgram(program) {
  const v = VERIFIED_REGISTRY[String(program.id)];
  if (!v) return program;
  const out = { ...program };
  for (const key of ["summary", "desc", "dates", "deadline", "pay", "support", "documents", "check", "closed", "urgent", "tone", "profileFit"]) {
    if (v[key] !== undefined) out[key] = v[key];
  }
  return out;
}\n`;

let html = fs.readFileSync(htmlPath, "utf8");
const start = "// VERIFIED_REGISTRY_START";
const end = "// VERIFIED_REGISTRY_END";

if (!html.includes(start)) {
  html = html.replace(
    "const PROGRAMS = [",
    `${start}\n${block}${end}\n\nconst PROGRAMS = [`
  );
} else {
  html = html.replace(
    new RegExp(`${start}[\\s\\S]*?${end}`),
    `${start}\n${block}${end}`
  );
}

html = html.replace(
  /const PROGRAMS = \[\s*\n\s*\.\.\.mergePrograms\(BASE_PROGRAMS[\s\S]*?\n\];/,
  `const PROGRAMS = [
  ...mergePrograms(BASE_PROGRAMS, LATEST_FEED, "equestrian"),
  ...mergePrograms(ACTING_BASE_PROGRAMS, ACTING_LATEST_FEED, "acting")
].map(applyVerifiedProgram);`
);

fs.writeFileSync(htmlPath, html);
fs.copyFileSync(htmlPath, path.join(root, "index.html"));
console.log(`Injected ${Object.keys(verified.programs || {}).length} verified entries into HTML.`);
