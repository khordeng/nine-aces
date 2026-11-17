// Informational: lists every photo slot with its status. Never fails the build.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const manifest = readFileSync(join(root, "src/config/images.ts"), "utf8");
const EXTS = ["webp", "jpg", "jpeg", "png"];

// Parse { id: "...", folder: "...", ..., enabled: true|false } entries from the manifest.
const slots = [];
const re = /\{\s*id:\s*"([^"]+)",\s*folder:\s*"([^"]+)"[\s\S]*?enabled:\s*(true|false)/g;
let m;
while ((m = re.exec(manifest))) slots.push({ id: m[1], folder: m[2], enabled: m[3] === "true" });

const rows = slots.map((s) => {
  const found = EXTS.map((e) => `src/assets/images/${s.folder}/${s.id}.${e}`).find((p) => existsSync(join(root, p)));
  const status = !s.enabled ? "disabled" : found ? "filled" : "empty";
  return { slot: s.id, status, path: found ?? `src/assets/images/${s.folder}/${s.id}.{webp|jpg|jpeg|png}` };
});

const w = Math.max(...rows.map((r) => r.slot.length), 4);
console.log(`${"slot".padEnd(w)}  ${"status".padEnd(8)}  path`);
for (const r of rows) console.log(`${r.slot.padEnd(w)}  ${r.status.padEnd(8)}  ${r.path}`);
const c = (s) => rows.filter((r) => r.status === s).length;
console.log(`\n${c("filled")} filled, ${c("empty")} empty, ${c("disabled")} disabled.`);
