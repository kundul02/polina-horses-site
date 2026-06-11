#!/usr/bin/env node
/** Fetch official URLs for programs in all-programs.json (or batch slice). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const allPath = process.argv[4]
  ? path.join(root, process.argv[4])
  : fs.existsSync(path.join(root, "research", "all-programs-full.json"))
    ? path.join(root, "research", "all-programs-full.json")
    : path.join(root, "research", "all-programs.json");
const outPath = path.join(root, "research", "fetch-results-all.json");

const minId = Number(process.argv[2] || 1);
const maxId = Number(process.argv[3] || 9999);

const programs = JSON.parse(fs.readFileSync(allPath, "utf8")).filter(
  (p) => p.id >= minId && p.id <= maxId && p.url
);

async function fetchWithTimeout(url, timeout = 15000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    });
    clearTimeout(id);
    const html = res.ok ? await res.text() : "";
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 12000);
    return { status: res.status, ok: res.ok, text, htmlLength: html.length };
  } catch (err) {
    clearTimeout(id);
    return { ok: false, error: err.message };
  }
}

const results = [];
const concurrency = 4;
for (let i = 0; i < programs.length; i += concurrency) {
  const chunk = programs.slice(i, i + concurrency);
  const chunkResults = await Promise.all(
    chunk.map(async (p) => {
      console.log(`[${p.id}] ${p.url}`);
      const r = await fetchWithTimeout(p.url);
      return { id: p.id, name: p.name, url: p.url, ...r };
    })
  );
  results.push(...chunkResults);
}

let merged = {};
try {
  merged = JSON.parse(fs.readFileSync(outPath, "utf8"));
} catch (_) {}
for (const r of results) merged[r.id] = r;
fs.writeFileSync(outPath, JSON.stringify(merged, null, 2) + "\n");
console.log(`Saved ${Object.keys(merged).length} fetch results → ${outPath}`);
