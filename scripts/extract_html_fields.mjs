import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const htmlPath = path.join(root, "programs.html");
const html = fs.readFileSync(htmlPath, "utf8");

// Extract the script block containing BASE_PROGRAMS
const scriptMatch = html.match(/const BASE_PROGRAMS = (\[[\s\S]*?\]);/);
if (!scriptMatch) {
  console.error("Could not find BASE_PROGRAMS in programs.html");
  process.exit(1);
}

// We can evaluate it using a safe Function constructor since it's local code
const factory = new Function(`return ${scriptMatch[1]};`);
const basePrograms = factory();

const filtered = basePrograms.filter(p => p.id >= 1 && p.id <= 32);
console.log(`Extracted ${filtered.length} programs from HTML.`);
fs.writeFileSync(path.join(root, "research", "extracted-html-programs.json"), JSON.stringify(filtered, null, 2));
