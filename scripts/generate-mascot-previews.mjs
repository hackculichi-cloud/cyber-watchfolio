import { mkdirSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

// Resize only: approved illustrations and atlas-cell coordinates remain unchanged.
// Requires ImageMagick 7 (`magick`); original WebP files are never overwritten.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const destination = resolve(root, "src/assets/mascot-previews");
const sources = [
  ["culichi-action-scenes.webp", 768],
  ["culichi-practice-scenes.webp", 768],
  ["culichi-closing-scenes.webp", 768],
  ["mascot-scenes/cybersecurity-hanging.webp", 384],
  ["mascot-scenes/electronics-back.webp", 384],
  ["mascot-scenes/repair-peeking.webp", 384],
  ["mascot-scenes/service-leaning.webp", 384],
];

mkdirSync(destination, { recursive: true });
const report = sources.map(([name, width]) => {
  const source = resolve(root, "src/assets", name);
  const filename = `${name.split("/").at(-1).replace(/\.webp$/, "")}-${width}.webp`;
  const output = resolve(destination, filename);
  execFileSync("magick", [source, "-resize", `${width}x`, "-strip", "-define", "webp:method=6", "-define", "webp:alpha-quality=100", "-quality", "88", output]);
  return { source: name, preview: filename, originalBytes: statSync(source).size, previewBytes: statSync(output).size };
});
console.log(JSON.stringify(report, null, 2));
