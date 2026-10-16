import { readFile, mkdir, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { resolve, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import { renderCv, cvDesigns } from "./cv-layout.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(await readFile(resolve(root, "src/data/resumes.json"), "utf8"));
const only = process.argv.find(value => value.startsWith("--only="))?.slice(7).split(",");
if (only?.some(id => !data.resumes.some(resume => resume.id === id))) throw new Error("Unknown CV profile in --only");
const selected = data.resumes.filter(resume => !only || only.includes(resume.id));
const mascotAtlas = (await readFile(resolve(root, "src/assets/culichi-athletic-body-atlas.webp"))).toString("base64");
const codeFont = (await readFile(resolve(root, "public/fonts/JetBrainsMono-Regular.woff2"))).toString("base64");
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
    for (const lang of ["en", "es"]) {
      const expectedPages = resume.id === "general" ? 2 : 1;
      await page.setContent(renderCv({ data, resume, lang, background, mascotAtlas, codeFont }));
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.locator("[data-sheet]").evaluateAll(sheets => sheets.flatMap(sheet => {
        const content = sheet.querySelector("[data-page-content]").getBoundingClientRect();
        const footer = sheet.querySelector(".footer").getBoundingClientRect();
        return content.bottom > footer.top - 8 ? [{ page: sheet.dataset.sheet, overflow: content.bottom - footer.top + 8 }] : [];
      }));
      if (overflow.length) throw new Error(`${resume.id} ${lang}: content overlaps footer: ${JSON.stringify(overflow)}`);
      const stem = `christian-velasco-${resume.id}-${lang}`;
      const pdf = resolve(out, `${stem}.pdf`);
      await page.pdf({ path: pdf, printBackground: true, preferCSSPageSize: true, tagged: true });
      const info = execFileSync("pdfinfo", [pdf], { encoding: "utf8" });
      const count = Number(info.match(/^Pages:\s+(\d+)/m)?.[1]);
      if (count !== expectedPages) throw new Error(`${stem}: expected ${expectedPages} page(s), got ${count}`);
      const text = execFileSync("pdftotext", [pdf, "-"], { encoding: "utf8" });
      for (const section of resume[lang].sections) if (!text.includes(section.title)) throw new Error(`${stem}: missing selectable section ${section.title}`);
      execFileSync("pdftoppm", ["-f", "1", "-singlefile", "-scale-to", "1600", "-png", pdf, resolve(out, "previews", stem)]);
      for (let number = 2; number <= count; number++) execFileSync("pdftoppm", ["-f", String(number), "-singlefile", "-scale-to", "1600", "-png", pdf, resolve(out, "previews", `${stem}-page-${number}`)]);
      console.log(`${resume.id} ${lang}: ${count} page(s), footer clearance, selectable text and faithful previews verified`);
    }
  }
  await writeFile(resolve(root, "src/data/cvManifest.json"), JSON.stringify(data.resumes.map(resume => ({ id: resume.id, profile: resume.profile, summary: resume.en.summary, pageCount: resume.id === "general" ? 2 : 1 })), null, 2) + "\n");
  await writeFile(resolve(out, "README.md"), "One general two-page CV and six single-page role-specific CVs, each in ES/EN. Generated from src/data/resumes.json by scripts/generate-profile-cvs.mjs and scripts/cv-layout.mjs. Original area backgrounds and Culichi artwork are embedded offline. Preview PNGs are rasterizations of every actual PDF page. Uploaded electrical originals and their archived mascot copy are preserved. No qualifications, employment dates or performance metrics are inferred.\n");
} finally { await browser.close(); }
