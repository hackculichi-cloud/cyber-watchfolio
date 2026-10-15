import { readFile, mkdir, writeFile, mkdtemp, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { chromium } from "@playwright/test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(await readFile(resolve(root, "src/data/resumes.json"), "utf8"));
const mascotAtlas = (await readFile(resolve(root, "src/assets/culichi-athletic-body-atlas.webp"))).toString("base64");
const actionAtlas = (await readFile(resolve(root, "src/assets/culichi-action-scenes.webp"))).toString("base64");
const scenes = JSON.parse(await readFile(resolve(root, "src/data/mascotScenes.json"), "utf8"));
const mascotCells = { cybersecurity: 1, software: 2, electrical: 3, electronics: 4, repair: 5, "customer-service": 6 };
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
    const institution = resume.id === "software" ? { name: "Academlo", url: "https://www.academlo.com/" } : resume.id === "electronics" ? { name: "Escuela Tecnológica de Occidente", url: "https://www.eto-edu.mx/" } : null;
    const cell = mascotCells[resume.id];
    const patterns = {
      cybersecurity: `radial-gradient(circle,${accent}25 1px,transparent 2px)`,
      software: `repeating-linear-gradient(0deg,transparent 0 18px,${accent}13 18px 19px)`,
      electrical: `repeating-linear-gradient(115deg,transparent 0 32px,${accent}16 32px 33px)`,
      electronics: `linear-gradient(${accent}13 1px,transparent 1px),linear-gradient(90deg,${accent}13 1px,transparent 1px)`,
      repair: `radial-gradient(circle,transparent 9px,${accent}12 10px,transparent 11px)`,
      "customer-service": `repeating-linear-gradient(45deg,transparent 0 24px,${accent}10 24px 25px)`,
    };
    const [artX, artY, artWidth, artHeight] = scenes.action.regions[resume.profile];
    const paperArt = `.page-art{position:fixed;left:0;top:0;width:210mm;height:297mm;z-index:-1;background-color:${accent}0a;background-image:${patterns[resume.id]};background-size:14mm 14mm;border-top:5mm solid ${accent};border-bottom:3mm solid ${accent}} .page-art:after{content:"";position:absolute;right:0;top:42mm;width:5mm;height:210mm;background:linear-gradient(180deg,${accent}50,${accent}05)} .page-art:before{content:"";position:absolute;right:10mm;bottom:10mm;width:53mm;height:${53 * artHeight / artWidth}mm;opacity:.1;background-image:url(data:image/webp;base64,${actionAtlas});background-size:${scenes.action.width / artWidth * 100}% ${scenes.action.height / artHeight * 100}%;background-position:${artX / (scenes.action.width - artWidth) * 100}% ${artY / (scenes.action.height - artHeight) * 100}%} header,main{position:relative} main>p:first-child{padding:9pt 11pt;background:#ffffffd9;border-radius:5px;border:1px solid ${accent}30} section{background:#fffffff2!important}`;
    const html = `<!doctype html><html lang="${lang}"><meta charset="utf-8"><title>${escape(data.name)} — ${escape(cv.role)}</title><style>
      ${paperArt}
      @page { size:A4; margin:0; } *{box-sizing:border-box} body{font:10pt/1.35 Arial,sans-serif;color:#152332;margin:0;padding:12mm 14mm;min-height:297mm} header{position:relative;background:#101827;color:white;border-left:6px solid ${accent};border-radius:7px;padding:16pt 17pt;margin-bottom:13pt} .badge{display:inline-block;background:${accent};color:white;font-size:8pt;font-weight:bold;letter-spacing:.1em;padding:4pt 7pt;border-radius:3px;margin-bottom:9pt} h1{max-width:calc(100% - 82pt);font-size:20pt;line-height:1.12;margin:0 0 7pt} .mascot{position:absolute;right:14pt;top:17pt;width:70pt;height:70pt;background-image:url(data:image/webp;base64,${mascotAtlas});background-size:300% 300%;background-position:${(cell % 3) * 50}% ${Math.floor(cell / 3) * 50}%} .role{max-width:calc(100% - 82pt);font-size:12pt;font-weight:bold;color:white;margin:0 0 10pt} .contact{border-top:1px solid #64748b;padding-top:7pt;font-size:8.5pt;margin:0;line-height:1.6} a{color:inherit;text-decoration:none} h2{font-size:10.5pt;text-transform:uppercase;letter-spacing:.04em;color:#101827;border-bottom:2px solid ${accent};padding-bottom:4pt;margin:0 0 7pt} p{margin:0 0 9pt} ul{padding-left:14pt;margin:0} li{margin:0 0 4pt} li::marker{color:${accent}} section{break-inside:avoid;background:#f8fafc;border:1px solid #e2e8f0;border-left:3px solid ${accent};border-radius:5px;padding:9pt 11pt;margin-top:10pt}.footer{font-size:9pt;color:#334155;margin-top:12pt;border-top:1px solid #cbd5e1;padding-top:7pt}
      </style><body><div class="page-art" aria-hidden="true"></div><header><div class="mascot" aria-hidden="true"></div><div class="badge">${escape(badge)}</div><h1>${escape(data.name)}</h1><p class="role">${escape(cv.role)}</p><p class="contact"><a href="mailto:${escape(data.email)}">${escape(data.email)}</a> · <a href="${escape(data.website)}">culichi.lat</a><br><a href="${escape(data.github)}">github.com/ByCulichi</a> · <a href="${escape(data.linkedin)}">linkedin.com/in/culichi</a></p></header><main><p>${escape(cv.summary)}</p>${institution ? `<p><a href="${institution.url}">${escape(institution.name)} · ${escape(institution.url)}</a></p>` : ""}${cv.sections.map(section => `<section><h2>${escape(section.title)}</h2><ul>${section.items.map(item => `<li>${escape(item)}</li>`).join("")}</ul></section>`).join("")}<p class="footer"><strong>${lang === "es" ? "Idiomas" : "Languages"}:</strong> ${escape(data.languages[lang])}</p></main></body></html>`;
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
  const temporary = await mkdtemp(resolve(tmpdir(), "culichi-cv-"));
  try {
    // Only the free upper-right header area is stamped; original PDF is never written.
    await page.setContent(`<!doctype html><style>@page{size:595.92pt 842.88pt;margin:0}body{margin:0;background:transparent}.mascot{position:absolute;left:470pt;top:64pt;width:56pt;height:56pt;background-image:url(data:image/webp;base64,${mascotAtlas});background-size:300% 300%;background-position:0% 50%}</style><div class="mascot"></div>`);
    const overlay = resolve(temporary, "mascot.pdf");
    await page.pdf({ path: overlay, printBackground: true, preferCSSPageSize: true, omitBackground: true });
    const stamped = resolve(out, "christian-velasco-electrical-mascot.pdf");
    execFileSync("python", [resolve(root, "scripts/stamp-electrical-cv.py"), resolve(out, "christian-velasco-electrical-original.pdf"), overlay, stamped]);
    execFileSync("pdftoppm", ["-f", "1", "-singlefile", "-scale-to", "1600", "-png", stamped, resolve(out, "previews/christian-velasco-electrical-mascot")]);
    console.log("Original electrical CV: separate mascot copy created; original preserved");
  } finally { await rm(temporary, { recursive: true, force: true }); }
  await writeFile(resolve(root, "src/data/cvManifest.json"), JSON.stringify(data.resumes.map(resume => ({ id: resume.id, profile: resume.profile, summary: resume.en.summary })), null, 2) + "\n");
  await writeFile(resolve(out, "README.md"), "Six role-specific CVs, each in ES/EN. Generated from src/data/resumes.json with scripts/generate-profile-cvs.mjs. Preview PNGs are rasterizations of the actual PDF first page. No employers, dates of employment, degrees or performance metrics are inferred.\n");
} finally { await browser.close(); }
