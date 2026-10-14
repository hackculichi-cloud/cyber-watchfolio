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
    const themes = { cybersecurity: ["#0891b2", "SOC / BLUE TEAM"], software: ["#15803d", "SOFTWARE"], electrical: ["#ca8a04", "ELECTRICAL"], electronics: ["#c2410c", "ELECTRONICS"], repair: ["#7c3aed", "TECHNICAL REPAIR"], "customer-service": ["#0f766e", "CUSTOMER SERVICE"] };
    const [accent, englishBadge] = themes[resume.id];
    const spanishBadges = { cybersecurity: "SOC / BLUE TEAM", software: "SOFTWARE", electrical: "ELECTRICIDAD", electronics: "ELECTRÓNICA", repair: "REPARACIÓN TÉCNICA", "customer-service": "ATENCIÓN AL CLIENTE" };
    const badge = lang === "es" ? spanishBadges[resume.id] : englishBadge;
    const html = `<!doctype html><html lang="${lang}"><meta charset="utf-8"><title>${escape(data.name)} — ${escape(cv.role)}</title><style>
      @page { size:A4; margin:12mm 14mm; } *{box-sizing:border-box} body{font:10pt/1.35 Arial,sans-serif;color:#152332;margin:0} header{background:#101827;color:white;border-left:6px solid ${accent};border-radius:7px;padding:16pt 17pt;margin-bottom:13pt} .badge{display:inline-block;background:${accent};color:white;font-size:8pt;font-weight:bold;letter-spacing:.1em;padding:4pt 7pt;border-radius:3px;margin-bottom:9pt} h1{font-size:22pt;line-height:1.12;margin:0 0 7pt} .role{font-size:12pt;font-weight:bold;color:white;margin:0 0 10pt} .contact{border-top:1px solid #64748b;padding-top:7pt;font-size:8.5pt;margin:0;line-height:1.6} a{color:inherit;text-decoration:none} h2{font-size:10.5pt;text-transform:uppercase;letter-spacing:.04em;color:#101827;border-bottom:2px solid ${accent};padding-bottom:4pt;margin:0 0 7pt} p{margin:0 0 9pt} ul{padding-left:14pt;margin:0} li{margin:0 0 4pt} li::marker{color:${accent}} section{break-inside:avoid;background:#f8fafc;border:1px solid #e2e8f0;border-left:3px solid ${accent};border-radius:5px;padding:9pt 11pt;margin-top:10pt}.footer{font-size:9pt;color:#334155;margin-top:12pt;border-top:1px solid #cbd5e1;padding-top:7pt}
      </style><body><header><div class="badge">${escape(badge)}</div><h1>${escape(data.name)}</h1><p class="role">${escape(cv.role)}</p><p class="contact"><a href="mailto:${escape(data.email)}">${escape(data.email)}</a> · <a href="${escape(data.website)}">culichi.lat</a><br><a href="${escape(data.github)}">github.com/ByCulichi</a> · <a href="${escape(data.linkedin)}">linkedin.com/in/culichi</a></p></header><main><p>${escape(cv.summary)}</p>${cv.sections.map(section => `<section><h2>${escape(section.title)}</h2><ul>${section.items.map(item => `<li>${escape(item)}</li>`).join("")}</ul></section>`).join("")}<p class="footer"><strong>${lang === "es" ? "Idiomas" : "Languages"}:</strong> ${escape(data.languages[lang])}</p></main></body></html>`;
    await page.setContent(html);
    await page.evaluate(() => document.fonts.ready);
    const stem = `christian-velasco-${resume.id}-${lang}`;
    const pdf = resolve(out, `${stem}.pdf`);
    await page.pdf({ path: pdf, printBackground: true, preferCSSPageSize: true, tagged: true });
    const info = execFileSync("pdfinfo", [pdf], { encoding: "utf8" });
    if (!/^Pages:\s+1\s*$/m.test(info)) throw new Error(`${stem} must fit one page`);
    execFileSync("pdftoppm", ["-f", "1", "-singlefile", "-scale-to", "1600", "-png", pdf, resolve(out, "previews", stem)]);
    console.log(`${resume.id} ${lang}: PDF, 1 page, first-page preview`);
  }
  await writeFile(resolve(root, "src/data/cvManifest.json"), JSON.stringify(data.resumes.map(resume => ({ id: resume.id, profile: resume.profile, summary: resume.en.summary })), null, 2) + "\n");
  await writeFile(resolve(out, "README.md"), "Six role-specific CVs, each in ES/EN. Generated from src/data/resumes.json with scripts/generate-profile-cvs.mjs. Preview PNGs are rasterizations of the actual PDF first page. No employers, dates of employment, degrees or performance metrics are inferred.\n");
} finally { await browser.close(); }
