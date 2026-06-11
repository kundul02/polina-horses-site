import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const resultsPath = path.join(root, "research", "fetch-results.json");
const results = JSON.parse(fs.readFileSync(resultsPath, "utf8"));

const keywords = ["deadline", "document", "apply", "form", "fee", "date", "closed", "audition", "visa", "passport", "cv", "resume", "reference"];

function extractKeywords(text) {
  const lines = text.split(/[.!?\n]/);
  const found = {};
  for (const kw of keywords) {
    const matchingLines = lines.filter(l => l.toLowerCase().includes(kw)).map(l => l.trim());
    if (matchingLines.length > 0) {
      found[kw] = matchingLines.slice(0, 5); // top 5 lines per keyword
    }
  }
  return found;
}

console.log("Extracting details...");
const extracted = {};
for (const r of results) {
  if (r.ok) {
    extracted[r.id] = {
      id: r.id,
      url: r.url,
      keywords: extractKeywords(r.text)
    };
  }
}

fs.writeFileSync(path.join(root, "research", "extracted-keywords.json"), JSON.stringify(extracted, null, 2));
console.log("Extracted details saved to research/extracted-keywords.json");
