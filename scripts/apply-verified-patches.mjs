#!/usr/bin/env node
/** Apply research/verified-patches.json → programs-verified.json + programs.html check/url fields */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const patchesPath = path.join(root, "research", "verified-patches.json");
const verifiedPath = path.join(root, "research", "programs-verified.json");
const htmlPath = path.join(root, "programs.html");
const today = new Date().toISOString().slice(0, 10);

const { programs: patches, html: htmlPatches = {} } = JSON.parse(fs.readFileSync(patchesPath, "utf8"));
const verified = JSON.parse(fs.readFileSync(verifiedPath, "utf8"));
let html = fs.readFileSync(htmlPath, "utf8");

for (const [id, patch] of Object.entries(patches)) {
  const { clearCheck, htmlCheck, htmlProfileFit, htmlUrl, ...verifiedFields } = patch;
  const prev = verified.programs[id] || {};
  verified.programs[id] = {
    ...prev,
    ...verifiedFields,
    verifiedAt: today,
  };
  if (clearCheck) {
    verified.programs[id].check = null;
  }

  if (htmlCheck !== undefined || htmlProfileFit !== undefined || htmlUrl) {
    const blockRe = new RegExp(
      `(\\{\\s*id:\\s*${id},[\\s\\S]*?)(check:\\s*(?:null|"[^"]*"))`,
      "m"
    );
    const m = html.match(blockRe);
    if (m) {
      let replacement = m[1];
      if (htmlCheck !== undefined) {
        replacement += htmlCheck === null ? "check: null" : `check: ${JSON.stringify(htmlCheck)}`;
      } else if (clearCheck) {
        replacement += "check: null";
      } else {
        replacement += m[2];
      }
      if (htmlProfileFit !== undefined) {
        replacement = replacement.replace(/,?\s*profileFit:\s*[^,\n]+/, "");
        if (htmlProfileFit) replacement += `, profileFit: ${JSON.stringify(htmlProfileFit)}`;
      }
      html = html.replace(blockRe, () => replacement);
    }
    if (htmlUrl) {
      const urlRe = new RegExp(`(id:\\s*${id},[\\s\\S]*?url:\\s*)"[^"]+"`);
      html = html.replace(urlRe, (_, prefix) => `${prefix}${JSON.stringify(htmlUrl)}`);
    }
  }
}

verified.lastFullReview = today;
fs.writeFileSync(verifiedPath, JSON.stringify(verified, null, 2) + "\n");
fs.writeFileSync(htmlPath, html);
fs.copyFileSync(htmlPath, path.join(root, "index.html"));
console.log(`Applied ${Object.keys(patches).length} verified patches.`);
