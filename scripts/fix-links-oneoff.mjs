#!/usr/bin/env node
/**
 * One-off link fixes (2026-10-22):
 * - 1032: dead backstage /teens-acting-jobs/ -> working /kids/ page
 * - 23:   airlinguee 301 -> final ?lang=en URL
 * - 26:   pferdeglueck Praktikum 2026 page removed (404) -> close card
 * - 14:   ryanshorses site down (502) -> update check note
 * Syncs index.html.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
let html = fs.readFileSync(path.join(root, "programs.html"), "utf8");

html = html.replaceAll(
  "https://www.backstage.com/casting/open-casting-calls/teens-acting-jobs/",
  "https://www.backstage.com/casting/open-casting-calls/kids/"
);
html = html.replaceAll(
  "https://airlinguee.com/teenage-equestrian-camps-in-ireland/english-and-equestrian-horse-riding-camp-ireland/",
  "https://airlinguee.com/teenage-equestrian-camps-in-ireland/english-and-equestrian-horse-riding-camp-ireland/?lang=en"
);

function patchBlock(html, id, patchFn) {
  const marker = `id: ${id},`;
  const mi = html.indexOf(marker);
  if (mi === -1) return html;
  const start = html.lastIndexOf("{", mi);
  let depth = 0;
  let end = -1;
  for (let i = start; i < html.length; i++) {
    if (html[i] === "{") depth++;
    else if (html[i] === "}") {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  const block = patchFn(html.slice(start, end));
  return html.slice(0, start) + block + html.slice(end);
}

html = patchBlock(html, 26, (block) =>
  block
    .replace(
      /\bdeadline:\s*"[^"]*"/,
      'deadline: "Закрыт (листинг Praktikanten 2026 удалён с сайта; наборы 2027 — на pferdeglueck-pappenheimer.de)"'
    )
    .replace(/\bclosed:\s*false/, "closed: true")
    .replace(/\btone:\s*"green"/, 'tone: "neutral"')
    .replace(/\burgent:\s*false/, "urgent: false")
);

html = patchBlock(html, 14, (block) =>
  block.replace(
    /\bcheck:\s*"[^"]*"/,
    'check: "Сайт Ryan\'s Horses недоступен (проверено 22.10.2026, 502). Мониторить восстановление."'
  )
);

fs.writeFileSync(path.join(root, "programs.html"), html);
fs.copyFileSync(path.join(root, "programs.html"), path.join(root, "index.html"));
console.log("links fixed");
