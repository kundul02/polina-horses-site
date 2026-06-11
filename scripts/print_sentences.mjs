import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const resultsPath = path.join(root, "research", "fetch-results.json");
const results = JSON.parse(fs.readFileSync(resultsPath, "utf8"));

function printDetails(id) {
  const p = results.find(r => r.id === id);
  if (!p || !p.ok) {
    console.log(`[ID ${id}] Not found or failed`);
    return;
  }
  console.log(`\n=================== ID ${id} ===================`);
  console.log(`URL: ${p.url}`);
  const text = p.text;
  // Print sentences containing key terms
  const sentences = text.split(/[.!?\n]/);
  const matched = sentences.filter(s => 
    /apply|form|document|deadline|date|fee|audition|visa|passport|cv|resume|reference|closed|june|july|august/i.test(s)
  );
  console.log("Matched sentences:");
  for (const s of matched.slice(0, 30)) {
    console.log(`- ${s.trim()}`);
  }
}

const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15, 16, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29, 30, 31, 32];
for (const id of ids) {
  printDetails(id);
}
