import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const batchPath = path.join(root, "research", "program-batches.json");
const batchData = JSON.parse(fs.readFileSync(batchPath, "utf8"));
const programs = batchData[0]; // first array, IDs 1 to 32

console.log(`Loaded ${programs.length} programs to research.`);

// We will fetch each program's URL and check its status and content.
async function fetchWithTimeout(url, options = {}, timeout = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        ...options.headers,
      }
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

async function researchProgram(p) {
  console.log(`[ID ${p.id}] Fetching ${p.url}...`);
  try {
    const res = await fetchWithTimeout(p.url);
    if (!res.ok) {
      return { id: p.id, url: p.url, status: res.status, ok: false, error: `HTTP ${res.status}` };
    }
    const html = await res.text();
    // Save HTML snippet or full text for manual/automated inspection
    const textSnippet = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 10000); // first 10k chars of text
    
    return { id: p.id, url: p.url, status: res.status, ok: true, text: textSnippet, htmlLength: html.length };
  } catch (err) {
    return { id: p.id, url: p.url, ok: false, error: err.message };
  }
}

// Run in parallel with concurrency limit of 5
async function run() {
  const results = [];
  const concurrencyLimit = 5;
  for (let i = 0; i < programs.length; i += concurrencyLimit) {
    const chunk = programs.slice(i, i + concurrencyLimit);
    const chunkPromises = chunk.map(p => researchProgram(p));
    const chunkResults = await Promise.all(chunkPromises);
    results.push(...chunkResults);
  }
  
  fs.writeFileSync(path.join(root, "research", "fetch-results.json"), JSON.stringify(results, null, 2));
  console.log("Research complete. Results written to research/fetch-results.json");
}

run();
