import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const html = fs.readFileSync(path.join(__dirname, "../programs.html"), "utf8");
const script = html.match(/<script>([\s\S]*)<\/script>/)[1];

const start = script.indexOf("const ACTING_BASE_PROGRAMS = [");
const progEnd = script.indexOf("let activeDomain");
const runtimeCode = script.slice(start, progEnd);

const factory = new Function(runtimeCode + "\nreturn PROGRAMS;");
const all = factory();

const results = all.map((p) => {
  const list = Array.isArray(p.documents) ? p.documents : [];
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    country: p.baseCountry,
    domain: p.domain,
    explicit: list.length > 0,
    count: list.length,
    key: list.join(" | "),
    list,
    hasCheck: Boolean(p.check),
  };
});

const groups = {};
for (const r of results) {
  groups[r.key] = groups[r.key] || [];
  groups[r.key].push(r);
}

const dupGroups = Object.values(groups).filter((g) => g.length > 1).sort((a, b) => b.length - a.length);

console.log(
  JSON.stringify(
    {
      total: all.length,
      explicitDocuments: results.filter((r) => r.explicit).length,
      withCheckFlag: results.filter((r) => r.hasCheck).length,
      uniqueChecklists: Object.keys(groups).length,
      duplicateGroups: dupGroups.length,
      byCategory: Object.fromEntries(
        [...new Set(results.map((r) => r.category))].map((cat) => [
          cat,
          {
            programs: results.filter((r) => r.category === cat).length,
            uniqueLists: new Set(results.filter((r) => r.category === cat).map((r) => r.key)).size,
          },
        ])
      ),
      topDuplicates: dupGroups.slice(0, 10).map((g) => ({
        count: g.length,
        category: g[0].category,
        country: g[0].country,
        items: g[0].count,
        examples: g.slice(0, 5).map((x) => ({ id: x.id, name: x.name })),
      })),
      needsCheck: results.filter((r) => r.hasCheck).map((r) => ({ id: r.id, name: r.name })),
    },
    null,
    2
  )
);
