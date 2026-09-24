#!/usr/bin/env node
// Writes the committed fallback snapshots for the GrowthOS Map and the live
// platform figures. These files are generated only by this script: never edit
// them by hand.
//
//   node scripts/snapshot-growthos-map.mjs
//
// Reads NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY from
// the environment, falling back to the repo's .env file.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function loadDotEnv() {
  const file = resolve(root, ".env");
  if (!existsSync(file)) return {};
  const out = {};
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
    if (m) out[m[1]] = m[2];
  }
  return out;
}

const env = { ...loadDotEnv(), ...process.env };
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.");
  process.exit(1);
}

async function rpc(fn) {
  const res = await fetch(`${url}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: "{}",
  });
  if (!res.ok) throw new Error(`${fn} failed: ${res.status} ${await res.text()}`);
  return res.json();
}

const targets = [
  ["get_public_platform_map", "src/content/growthos-map.snapshot.json", (d) => Array.isArray(d?.stages) && d.stages.length > 0],
  ["get_public_platform_stats", "src/content/platform-stats.snapshot.json", (d) => typeof d?.median_first_reply_seconds === "number"],
];

for (const [fn, path, valid] of targets) {
  const data = await rpc(fn);
  if (!valid(data)) {
    console.error(`${fn} returned an unexpected shape; snapshot not written.`);
    process.exit(1);
  }
  writeFileSync(resolve(root, path), JSON.stringify(data, null, 2) + "\n");
  console.log(`Wrote ${path}`);
}
