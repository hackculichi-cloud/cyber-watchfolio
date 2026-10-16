import { readFile, mkdir, writeFile, readdir, unlink } from "node:fs/promises";
import { execFile, execFileSync } from "node:child_process";
import { promisify } from "node:util";
import { resolve, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import { renderCv, cvDesigns, cvSections, paginateCv } from "./cv-layout.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const runFile = promisify(execFile);
const data = JSON.parse(await readFile(resolve(root, "src/data/resumes.json"), "utf8"));
const only = process.argv.find(value => value.startsWith("--only="))?.slice(7).split(",");
if (only?.some(id => !data.resumes.some(resume => resume.id === id))) throw new Error("Unknown CV profile in --only");
const selected = data.resumes.filter(resume => !only || only.includes(resume.id));
const mascotAtlas = (await readFile(resolve(root, "src/assets/culichi-athletic-body-atlas.webp"))).toString("base64");
const codeFont = (await readFile(resolve(root, "public/fonts/JetBrainsMono-Regular.woff2"))).toString("base64");
const providerLogos = Object.fromEntries(await Promise.all(["udemy", "linkedin"].map(async name => [`/images/providers/${name}.svg`, `data:image/svg+xml;base64,${(await readFile(resolve(root, `public/images/providers/${name}.svg`))).toString("base64")}`])));
const manifest = JSON.parse(await readFile(resolve(root, "src/data/cvManifest.json"), "utf8"));
const out = resolve(root, "public/cv");
await mkdir(resolve(out, "previews"), { recursive: true });
const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {}) });
try {
  const context = await browser.newContext({ offline: true });
  const page = await context.newPage();
  for (const resume of selected) {
    const path = resolve(root, "src/assets", cvDesigns[resume.id].image);
    const mime = { ".jpg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml" }[extname(path)];
    const background = `data:${mime};base64,${(await readFile(path)).toString("base64")}`;
    const pageCounts = {};
    for (const lang of ["en", "es"]) {
      await page.setContent(renderCv({ data, resume, lang, background, mascotAtlas, codeFont, providerLogos }));
      await page.evaluate(() => document.fonts.ready);
      const expectedPages = await page.evaluate(paginateCv, { lang });
      pageCounts[lang] = expectedPages;
      const overflow = await page.locator("[data-sheet]").evaluateAll(sheets => sheets.flatMap(sheet => {
        const content = sheet.querySelector("[data-page-content]").getBoundingClientRect();
        const footer = sheet.querySelector(".footer").getBoundingClientRect();
        return content.bottom > footer.top - 8 ? [{ page: sheet.dataset.sheet, overflow: content.bottom - footer.top + 8 }] : [];
      }));
      if (overflow.length) throw new Error(`${resume.id} ${lang}: content overlaps footer: ${JSON.stringify(overflow)}`);
      const stem = `christian-velasco-${resume.id}-${lang}`;
      const pdf = resolve(out, `${stem}.pdf`);
      await page.pdf({ path: pdf, printBackground: true, preferCSSPageSize: true, tagged: true, outline: true });
      const info = execFileSync("pdfinfo", [pdf], { encoding: "utf8" });
      const count = Number(info.match(/^Pages:\s+(\d+)/m)?.[1]);
      if (count !== expectedPages) throw new Error(`${stem}: expected ${expectedPages} page(s), got ${count}`);
      const normalize = value => value.replace(/-\s+/g, "-").replace(/\s+/g, " ").trim();
      const text = normalize(execFileSync("pdftotext", ["-raw", pdf, "-"], { encoding: "utf8" }));
      for (const section of cvSections(data, resume, lang)) {
        for (const content of [section.title, ...section.entries.flatMap(entry => [entry.title, entry.body, entry.status].filter(Boolean))]) {
          if (!text.includes(normalize(content))) throw new Error(`${stem}: missing selectable content: ${content}`);
        }
      }
      for (const filename of await readdir(resolve(out, "previews"))) {
        if (filename.startsWith(`${stem}-page-`) && filename.endsWith(".png")) await unlink(resolve(out, "previews", filename));
      }
      // Raster pages independently, with at most two processes at a time.
      for (let number = 1; number <= count; number += 2) {
        await Promise.all(Array.from({ length: Math.min(2, count - number + 1) }, (_, index) => {
          const current = number + index;
          return runFile("pdftoppm", ["-f", String(current), "-singlefile", "-scale-to", "1600", "-png", pdf, resolve(out, "previews", current === 1 ? stem : `${stem}-page-${current}`)]);
        }));
      }
      console.log(`${resume.id} ${lang}: ${count} page(s), footer clearance, selectable text and faithful previews verified`);
    }
    const record = { id: resume.id, profile: resume.profile, summary: resume.en.summary, pageCount: Math.max(...Object.values(pageCounts)), pageCounts };
    const index = manifest.findIndex(item => item.id === resume.id);
    if (index < 0) manifest.push(record); else manifest[index] = record;
  }
  await writeFile(resolve(root, "src/data/cvManifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  await writeFile(resolve(out, "README.md"), "One general CV and six role-specific CVs, each in ES/EN with measured multi-page layouts. Page counts are recorded per language in cvManifest.json. Generated from src/data/resumes.json by scripts/generate-profile-cvs.mjs and scripts/cv-layout.mjs. Original area backgrounds and Culichi artwork are embedded offline. Preview PNGs are rasterizations of every actual PDF page. Uploaded electrical originals and their archived mascot copy are preserved. No qualifications, employment dates or performance metrics are inferred.\n");
} finally { await browser.close(); }
