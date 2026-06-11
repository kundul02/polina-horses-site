import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const resultsPath = path.join(root, "research", "fetch-results.json");
const results = JSON.parse(fs.readFileSync(resultsPath, "utf8"));

function inspect(id) {
  const p = results.find(r => r.id === id);
  if (!p || !p.ok) {
    console.log(`[ID ${id}] failed or not found`);
    return;
  }
  console.log(`\n=================== ID ${id} ===================`);
  console.log(`URL: ${p.url}`);
  // Print some paragraphs or lists
  const text = p.text;
  const matches = [];
  // Find paragraphs containing "apply", "form", "document", "deadline", "date", "fee", "cost", "price", "requirements"
  const regex = /[^.!?\n]*?(apply|form|document|deadline|date|fee|cost|price|requirements|audition|eligibility|closed|open)[^.!?\n]*/gi;
  let match;
  while ((match = regex.exec(text)) !== null) {
    matches.push(match[0].trim());
    if (matches.length > 20) break;
  }
  console.log("Matches:");
  matches.forEach(m => console.log(`- ${m}`));
}

const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15, 16, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29, 30, 31, 32];
for (const id of ids) {
  inspect(id);
}
