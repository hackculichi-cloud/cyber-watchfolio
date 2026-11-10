import { readFile, mkdir, mkdtemp, rm } from "node:fs/promises";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { chromium } from "@playwright/test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const original = await readFile(resolve(root, "public/images/repair/cert-lidetec.jpg"));
const originalHash = "94adec42521bb27f89644d7696d705234528fb3ba363b8609047244130fc61b1";
if (createHash("sha256").update(original).digest("hex") !== originalHash) throw new Error("The supplied photograph changed; review its paper boundaries before generating a scan.");

// Map only the supplied paper to a flat page. No reconstructed text, signature,
// generative image or photographic retouching is included in the document.
const width = 1440;
const height = 845;
const paper = [[160, 0], [1498, 0], [1363, 738], [328, 738]];
const destination = [[width, height], [0, height], [0, 0], [width, 0]];
const equations = paper.flatMap(([x, y], index) => {
  const [u, v] = destination[index];
  return [[x, y, 1, 0, 0, 0, -u * x, -u * y, u], [0, 0, 0, x, y, 1, -v * x, -v * y, v]];
});
for (let column = 0; column < 8; column++) {
  let pivot = column;
  for (let row = column + 1; row < 8; row++) if (Math.abs(equations[row][column]) > Math.abs(equations[pivot][column])) pivot = row;
  [equations[column], equations[pivot]] = [equations[pivot], equations[column]];
  const divisor = equations[column][column];
  if (Math.abs(divisor) < 1e-10) throw new Error("Invalid paper geometry");
  equations[column] = equations[column].map(value => value / divisor);
  for (let row = 0; row < 8; row++) {
    if (row === column) continue;
    const factor = equations[row][column];
    equations[row] = equations[row].map((value, index) => value - factor * equations[column][index]);
  }
}
const [a, b, c, d, e, f, g, h] = equations.map(row => row[8]);
const matrix = [a, d, 0, g, b, e, 0, h, 0, 0, 1, 0, c, f, 0, 1].join(",");
const out = resolve(root, "public/certificates/lidetec-reparacion-celulares");
await mkdir(dirname(out), { recursive: true });
const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {}) });
const temporary = await mkdtemp(resolve(tmpdir(), "lidetec-scan-"));
try {
  const context = await browser.newContext({ offline: true });
  const page = await context.newPage();
  await page.setContent(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>LIDETEC — constancia digitalizada de reparación de celulares</title><style>@page{size:${width}px ${height}px;margin:0}html,body{margin:0;width:${width}px;height:${height}px;background:white}.sheet{position:relative;width:${width}px;height:${height}px;overflow:hidden}img{position:absolute;left:0;top:0;width:1600px;height:738px;max-width:none;transform-origin:0 0;transform:matrix3d(${matrix})}</style></head><body><main class="sheet"><img src="data:image/jpeg;base64,${original.toString("base64")}" alt="Constancia de participación LIDETEC de Christian Armando Velasco Estrada, 1 de agosto de 2026. Copia digitalizada de la fotografía proporcionada."></main></body></html>`);
  await page.locator("img").evaluate(image => image.decode());
  await page.pdf({ path: `${out}.pdf`, preferCSSPageSize: true, printBackground: true, tagged: true });
  const info = execFileSync("pdfinfo", [`${out}.pdf`], { encoding: "utf8" });
  if (!/^Pages:\s+1$/m.test(info)) throw new Error("The certificate scan must have one page");
  const preview = resolve(temporary, "preview");
  execFileSync("pdftoppm", ["-f", "1", "-singlefile", "-scale-to", "1600", "-png", `${out}.pdf`, preview]);
  execFileSync("magick", [`${preview}.png`, "-define", "webp:lossless=true", `${out}.webp`]);
  console.log("LIDETEC: one-page photographic PDF and faithful preview generated; original photograph preserved.");
} finally { await browser.close(); await rm(temporary, { recursive: true, force: true }); }
