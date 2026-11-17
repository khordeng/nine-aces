// Fails (exit 1) while any owner placeholder remains in src/ or public/.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const MARK = "TODO(owner)";
const ROOTS = ["src", "public"];
const TEXT_EXT = /\.(astro|ts|js|mjs|json|css|md|html|svg|txt)$/i;
const root = process.cwd();
const hits = [];

function walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const name of entries) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (TEXT_EXT.test(name)) {
      readFileSync(full, "utf8")
        .split(/\r?\n/)
        .forEach((line, i) => {
          if (line.includes(MARK)) hits.push(`${relative(root, full)}:${i + 1}: ${line.trim()}`);
        });
    }
  }
}

ROOTS.forEach((r) => walk(join(root, r)));

if (hits.length) {
  console.error(`check:todo FAILED: ${hits.length} owner placeholder(s) left:\n`);
  for (const h of hits) console.error(`  ${h}`);
  process.exit(1);
}
console.log("check:todo passed: no owner placeholders left.");
