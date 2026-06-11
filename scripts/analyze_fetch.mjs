import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const resultsPath = path.join(root, "research", "fetch-results.json");
const results = JSON.parse(fs.readFileSync(resultsPath, "utf8"));

console.log("Fetch Summary:");
for (const r of results) {
  if (r.ok) {
    console.log(`[ID ${r.id}] OK - Length: ${r.htmlLength} - Snippet: ${r.text.slice(0, 150)}...`);
  } else {
    console.log(`[ID ${r.id}] FAILED - Error: ${r.error}`);
  }
}
