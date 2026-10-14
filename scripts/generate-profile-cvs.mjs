import { readFile, mkdir, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(await readFile(resolve(root, "src/data/resumes.json"), "utf8"));
const escape = value => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const out = resolve(root, "public/cv");
await mkdir(resolve(out, "previews"), { recursive: true });
const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {}) });
try {
  const context = await browser.newContext({ offline: true });
  const page = await context.newPage();
  for (const resume of data.resumes) for (const lang of ["en", "es"]) {
    const cv = resume[lang];
    const html = `<!doctype html><html lang="${lang}"><meta charset="utf-8"><title>${escape(data.name)} — ${escape(cv.role)}</title><style>
      @page { size:A4; margin:14mm 15mm; } * {box-sizing:border-box} body{font:10.5pt/1.38 Arial,sans-serif;color:#152332;margin:0} h1{font-size:21pt;line-height:1.15;margin:0 0 5pt} .role{font-size:13pt;font-weight:bold;color:#076887;margin:0 0 9pt} .contact{font-size:9pt;margin:0 0 12pt;line-height:1.6} a{color:#076887;text-decoration:none} h2{font-size:11pt;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #b7cdd3;padding-bottom:3pt;margin:14pt 0 5pt} p{margin:0 0 7pt} ul{padding-left:15pt;margin:0} li{margin:0 0 4pt} section{break-inside:avoid} .footer{font-size:9pt;color:#334155;margin-top:12pt}
      </style><body><header><h1>${escape(data.name)}</h1><p class="role">${escape(cv.role)}</p><p class="contact"><a href="mailto:${escape(data.email)}">${escape(data.email)}</a> · <a href="${escape(data.website)}">culichi.lat</a><br><a href="${escape(data.github)}">github.com/ByCulichi</a> · <a href="${escape(data.linkedin)}">linkedin.com/in/culichi</a></p></header><main><p>${escape(cv.summary)}</p>${cv.sections.map(section => `<section><h2>${escape(section.title)}</h2><ul>${section.items.map(item => `<li>${escape(item)}</li>`).join("")}</ul></section>`).join("")}<p class="footer"><strong>${lang === "es" ? "Idiomas" : "Languages"}:</strong> ${escape(data.languages[lang])}</p></main></body></html>`;
    await page.setContent(html);
    await page.evaluate(() => document.fonts.ready);
    const stem = `christian-velasco-${resume.id}-${lang}`;
    const pdf = resolve(out, `${stem}.pdf`);
    await page.pdf({ path: pdf, printBackground: true, preferCSSPageSize: true, tagged: true });
    const info = execFileSync("pdfinfo", [pdf], { encoding: "utf8" });
    if (!/^Pages:\s+1\s*$/m.test(info)) throw new Error(`${stem} must fit one page`);
    execFileSync("pdftoppm", ["-f", "1", "-singlefile", "-scale-to", "1000", "-png", pdf, resolve(out, "previews", stem)]);
    console.log(`${resume.id} ${lang}: PDF, 1 page, first-page preview`);
  }
  await writeFile(resolve(root, "src/data/cvManifest.json"), JSON.stringify(data.resumes.map(resume => ({ id: resume.id, profile: resume.profile, summary: resume.en.summary })), null, 2) + "\n");
  await writeFile(resolve(out, "README.md"), "Six role-specific CVs, each in ES/EN. Generated from src/data/resumes.json with scripts/generate-profile-cvs.mjs. Preview PNGs are rasterizations of the actual PDF first page. No employers, dates of employment, degrees or performance metrics are inferred.\n");
} finally { await browser.close(); }
