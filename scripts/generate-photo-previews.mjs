// Local evidence derivatives only. Originals and enlarged evidence stay unchanged.
// Requires ImageMagick 7 (`magick`); no image service or runtime dependency.
import { execFile } from "node:child_process";
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const run = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = join(root, "public");
const outputRoot = join(publicRoot, "images/previews");
const manifest = {};

async function filesIn(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) throw new Error(`Unexpected symbolic link: ${entry.name}`);
    if (entry.name === "overview") continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesIn(path));
    else if (/\.(?:jpe?g|png)$/i.test(entry.name) && !/^(?:cert|cv)[-_]/i.test(entry.name)) files.push(path);
  }
  return files;
}

const electrical = await filesIn(join(publicRoot, "images/electrical"));
const repair = (await filesIn(join(publicRoot, "images/repair"))).filter(path => /^repair-photo-\d+\.jpg$/i.test(path.split(sep).at(-1)));
const portfolio = (await readdir(join(publicRoot, "media/portfolio")))
  .filter(name => /^(?:float-switch-practice|residential-|ceiling-light-|two-ceiling-lights-).+\.png$/.test(name))
  .map(name => join(publicRoot, "media/portfolio", name));
const inputs = [...electrical, ...repair, ...portfolio].sort();
let originalBytes = 0;
const derivativeBytes = { 320: 0, 768: 0 };

for (const input of inputs) {
  const source = `/${relative(publicRoot, input).split(sep).join("/")}`;
  const stem = relative(publicRoot, input).replace(/\.[^.]+$/, "");
  const destination = join(outputRoot, stem);
  await mkdir(dirname(destination), { recursive: true });
  const { stdout } = await run("magick", [input, "-auto-orient", "-format", "%w %h", "info:"]);
  const [width, height] = stdout.trim().split(/\s+/).map(Number);
  const candidates = [];
  for (const edge of [320, 768]) {
    const output = `${destination}-${edge}.webp`;
    await run("magick", [input, "-auto-orient", "-resize", `${edge}x${edge}>`, "-strip", "-quality", "90", output]);
    const { stdout: size } = await run("magick", [output, "-format", "%w", "info:"]);
    const url = `/${relative(publicRoot, output).split(sep).join("/")}`;
    candidates.push({ src: url, width: Number(size.trim()) });
    derivativeBytes[edge] += (await stat(output)).size;
  }
  // Width descriptors reflect actual pixels, including portrait photos; never upscale.
  const unique = candidates.filter((candidate, index) => index === 0 || candidate.width !== candidates[index - 1].width);
  manifest[source] = {
    srcSet: unique.map(candidate => `${candidate.src} ${candidate.width}w`).join(", "),
    width,
    height,
  };
  originalBytes += (await stat(input)).size;
}

await writeFile(join(root, "src/data/photoPreviews.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({ photographs: inputs.length, originalBytes, derivativeBytes }, null, 2));
