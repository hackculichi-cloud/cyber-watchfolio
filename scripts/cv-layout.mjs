import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Award, BriefcaseBusiness, Code2, Cpu, ExternalLink, GraduationCap, Headset, Layers, ShieldCheck, UserRound, Wrench, Zap } from "lucide-react";

const escape = value => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const icon = name => renderToStaticMarkup(createElement({ skills: Layers, experience: BriefcaseBusiness, projects: Code2, work: Wrench, certifications: Award, education: GraduationCap, profile: UserRound, cybersecurity: ShieldCheck, software: Code2, electrical: Zap, electronics: Cpu, repair: Wrench, "customer-service": Headset, general: Layers, link: ExternalLink }[name] ?? Layers, { size: 20, strokeWidth: 1.7, "aria-hidden": true }));

export const cvDesigns = {
  general: { accent: "#38bdf8", badge: ["MULTIDISCIPLINARY", "MULTIDISCIPLINARIO"], image: "culichi-home-background.webp", cell: 0 },
  cybersecurity: { accent: "#38bdf8", badge: ["SOC / BLUE TEAM", "SOC / BLUE TEAM"], image: "hero-cybersecurity.jpg", cell: 1 },
  software: { accent: "#22c55e", badge: ["SOFTWARE", "SOFTWARE"], image: "hero-development.jpg", cell: 2 },
  electrical: { accent: "#facc15", badge: ["ELECTRICAL", "ELECTRICIDAD"], image: "hero-electrical.jpg", cell: 3 },
  electronics: { accent: "#fb923c", badge: ["ELECTRONICS", "ELECTRÓNICA"], image: "hero-electronics.jpg", cell: 4 },
  repair: { accent: "#a78bfa", badge: ["TECHNICAL REPAIR", "REPARACIÓN TÉCNICA"], image: "hero-repair.jpg", cell: 5 },
  "customer-service": { accent: "#2dd4bf", badge: ["CUSTOMER SERVICE", "ATENCIÓN AL CLIENTE"], image: "hero-customer-service.svg", cell: 6 },
};

export function cvSections(data, resume, lang) {
  return resume[lang].sections.map(section => ({ ...section, entries: section.source === "career" ? data.career[lang] : section.source === "training" ? section.ids.map(id => {
    const entry = data.training[lang].find(item => item.id === id);
    if (!entry) throw new Error(`Unknown training record: ${id}`);
    return section.entryNotes?.[id] ? { ...entry, body: `${entry.body} ${section.entryNotes[id]}` } : entry;
  }) : section.entries }));
}

/** Self-contained print document; cards are paginated by measured rows, never shrunk to fit. */
export function renderCv({ data, resume, lang, background, mascotAtlas, codeFont, providerLogos }) {
  const cv = resume[lang];
  const design = cvDesigns[resume.id];
  const badge = design.badge[lang === "es" ? 1 : 0];
  const link = (url, label, cls = "") => `<a class="${cls}" href="${escape(url)}">${escape(label)}${cls === "entry-link" ? icon("link") : ""}</a>`;
  const card = (entry, layout) => `<article class="card ${layout === "timeline" ? "career-card" : ""}" data-entry-title="${escape(entry.title)}">
    ${entry.organization ? `<div class="career-meta"><strong>${escape(entry.organization)}</strong><span>${escape(entry.period)}</span></div>` : ""}
    <div class="card-heading">${entry.provider ? `<span class="provider-mark">${entry.logo ? `<img src="${providerLogos[entry.logo]}" alt="" />` : escape(entry.monogram)}</span>` : ""}<div>${entry.provider ? `<p class="provider">${entry.url ? link(entry.url, entry.provider) : escape(entry.provider)}</p>` : ""}<h3>${escape(entry.title)}</h3></div></div>
    ${entry.location ? `<p class="location">${escape(entry.location)}</p>` : ""}
    ${entry.status ? `<p class="status ${entry.tone ?? "progress"}"><span></span>${escape(entry.status)}</p>` : ""}
    <p class="card-body">${escape(entry.body)}</p>
    ${entry.tags?.length ? `<div class="tags">${entry.tags.map(tag => `<span>${escape(tag)}</span>`).join("")}</div>` : ""}
    ${entry.document ? link(entry.document, lang === "es" ? "Ver constancia original" : "View original certificate", "entry-link") : entry.url && !entry.provider ? link(entry.url, entry.linkLabel ?? (lang === "es" ? "Ver trabajo" : "View work"), "entry-link") : ""}
  </article>`;
  const sections = cvSections(data, resume, lang).map((section, index) => {
    const columns = section.layout === "grid" ? 2 : 1;
    const rows = [];
    for (let i = 0; i < section.entries.length; i += columns) rows.push(`<div class="entry-row ${columns === 2 && i + 1 < section.entries.length ? "grid" : ""}">${section.entries.slice(i, i + columns).map(entry => card(entry, section.layout)).join("")}</div>`);
    return `<section class="cv-section" data-section="${escape(section.id)}" ${section.newPage ? 'data-page-start="true"' : ""}><div class="section-head"><span class="section-icon">${icon(section.icon)}</span><h2>${escape(section.title)}</h2><span class="section-number">${String(index + 1).padStart(2, "0")}</span><span class="continued"></span></div>${section.intro ? `<p class="section-intro">${escape(section.intro)}</p>` : ""}<div class="section-rows">${rows.join("")}</div></section>`;
  }).join("");
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${escape(data.name)} — ${escape(cv.role)}</title><style>
    @font-face{font-family:Code;src:url(data:font/woff2;base64,${codeFont}) format('woff2');font-weight:400}
    @page{size:A4;margin:0}*{box-sizing:border-box}html,body{margin:0;padding:0;background:#0a1120}body{font:10.7pt/1.45 Arial,sans-serif;color:#eef3fa;-webkit-print-color-adjust:exact;print-color-adjust:exact}a{color:inherit;text-decoration:none}svg{flex-shrink:0;vertical-align:middle}p,h1,h2,h3{margin:0}
    .sheet{isolation:isolate;position:relative;width:210mm;height:297mm;padding:11mm 12mm 17mm;break-after:page}.sheet:last-child{break-after:auto}.backdrop{position:absolute;inset:0;z-index:-2;background-image:linear-gradient(100deg,#091222f5,#091222ed 55%,#091222bd),url('${background}');background-position:center;background-size:cover;border-top:3mm solid ${design.accent}}.rail{position:absolute;left:0;top:3mm;bottom:0;width:1.5mm;background:linear-gradient(${design.accent}99,${design.accent}10)}
    .cv-header{position:relative;min-height:145pt;padding:16pt 17pt;border:1px solid ${design.accent}66;border-left:3pt solid ${design.accent};border-radius:9pt;background-image:linear-gradient(90deg,#0b1426f5,#0b1426c4),url('${background}');background-size:cover;background-position:center;margin-bottom:13pt}.header-copy{position:relative;z-index:1;width:calc(100% - 112pt)}.badge{display:flex;align-items:center;gap:6pt;font:7.7pt Code,monospace;letter-spacing:.05em;color:${design.accent};margin-bottom:9pt}.badge svg{width:13pt;height:13pt}h1{font-size:23pt;letter-spacing:-.025em;line-height:1.13;margin-bottom:6pt}.legal-name{font-size:8.8pt;color:#bfcde0;margin-bottom:5pt}.alias{font:10pt Code,monospace;color:${design.accent};margin-bottom:8pt}.role{font-size:11.4pt;font-weight:bold;line-height:1.35;margin-bottom:10pt}.contact{font-size:8.3pt;line-height:1.55;color:#c5d0df}.contact a{white-space:nowrap}.mascot{position:absolute;right:7pt;top:21pt;width:126pt;height:126pt;background-image:url(data:image/webp;base64,${mascotAtlas});background-size:300% 300%;background-position:${design.cell % 3 * 50}% ${Math.floor(design.cell / 3) * 50}%}
    .profile-summary{padding:12pt 14pt;border:1px solid #c6def02a;border-radius:7pt;background:#101b2ef7;margin-bottom:10pt}.profile-label{display:flex;gap:7pt;align-items:center;font-weight:bold;font-size:11.3pt;color:${design.accent};margin-bottom:6pt}.profile-label svg{width:16pt;height:16pt}.profile-summary p{line-height:1.5}.highlights{display:grid;grid-template-columns:repeat(3,1fr);gap:8pt;margin-bottom:15pt}.highlight{border:1px solid ${design.accent}4d;border-radius:6pt;padding:9pt 10pt;background:#101b2ef5}.highlight strong{display:block;color:${design.accent};font-size:16pt;line-height:1.2;margin-bottom:3pt}.highlight span{display:block;font-size:8.3pt;color:#c3cedd;line-height:1.3}
    .cv-section{margin-bottom:12pt}.section-head{display:flex;gap:9pt;align-items:center;margin-bottom:9pt;padding-bottom:7pt;border-bottom:1px solid ${design.accent}55}.section-icon{display:inline-flex;align-items:center;justify-content:center;width:27pt;height:27pt;border-radius:7pt;color:${design.accent};border:1px solid ${design.accent}66;background:${design.accent}13}h2{font-size:14pt;line-height:1.25;letter-spacing:-.01em}.section-number{font:8pt Code,monospace;color:${design.accent};margin-left:auto}.continued{font-size:8pt;color:#aabace}.section-intro{color:#becbdd;font-size:10pt;margin-bottom:9pt;line-height:1.5}.entry-row{margin-bottom:7pt;display:grid;grid-template-columns:1fr;gap:10pt}.entry-row:last-child{margin-bottom:0}.entry-row.grid{grid-template-columns:repeat(2,minmax(0,1fr))}.card{position:relative;background:#101b2ef5;border:1px solid #c6def030;border-radius:7pt;padding:10pt 12pt;border-top:2pt solid ${design.accent}99;overflow-wrap:break-word;min-width:0}.card-heading{display:flex;align-items:flex-start;gap:9pt;margin-bottom:5pt}.card-heading>div{min-width:0}h3{font-size:11.6pt;line-height:1.3;font-weight:bold;letter-spacing:-.01em}.card-body{color:#e2e9f3;font-size:10.7pt;line-height:1.45}.tags{display:flex;flex-wrap:wrap;gap:4pt;margin-top:8pt}.tags span{font-size:8.1pt;line-height:1.35;border:1px solid ${design.accent}44;border-radius:4pt;background:${design.accent}10;color:#d8e4f2;padding:3pt 5pt}.entry-link{display:block;margin-top:8pt;font-size:8.6pt;color:${design.accent};font-weight:bold}.entry-link svg{width:9pt;height:9pt;margin-left:4pt}.career-card{border-top:1px solid #c6def030;border-left:3pt solid ${design.accent};padding:8pt 12pt}.cv-section[data-section="experience"] .entry-row{margin-bottom:7pt}.career-meta{display:flex;justify-content:space-between;align-items:baseline;gap:8pt;margin-bottom:5pt;color:${design.accent};font-size:9pt}.career-meta strong{font-size:9.3pt}.career-meta span{white-space:nowrap;color:#bdcbdc}.location{font-size:8.5pt;color:#acbed3;margin:-1pt 0 4pt}.provider-mark{flex:none;display:flex;align-items:center;justify-content:center;width:29pt;height:29pt;background:#f1f5f9;color:#172337;border-radius:6pt;font-size:9pt;font-weight:bold;padding:4pt}.provider-mark img{max-width:100%;max-height:100%}.provider{font-size:8.8pt;color:#b8c8dc;margin-bottom:3pt;line-height:1.3}.status{display:flex;gap:5pt;align-items:center;color:#7dd3fc;font-size:8.5pt;font-weight:bold;margin:7pt 0;line-height:1.3}.status span{width:4pt;height:4pt;border-radius:50%;background:currentColor;flex:none}.status.complete{color:#86efac}.status.pending{color:#fcd34d}.status.partial{color:#cbd5e1}
    .footer{position:absolute;bottom:8mm;left:12mm;right:12mm;display:flex;justify-content:space-between;align-items:center;gap:10pt;border-top:1px solid ${design.accent}55;padding-top:7pt;font-size:7.8pt;color:#b9c9dc}.footer strong{color:${design.accent}}.continuation .cv-header{min-height:72pt;padding:11pt 14pt;margin-bottom:14pt}.continuation .header-copy{width:calc(100% - 65pt)}.continuation h1{font-size:15pt;margin-bottom:3pt}.continuation .legal-name,.continuation .alias,.continuation .contact{display:none}.continuation .role{font-size:9pt;margin:0;color:#c4d1e2}.continuation .badge{font-size:7pt;margin-bottom:5pt}.continuation .badge svg{width:10pt;height:10pt}.continuation .mascot{width:66pt;height:66pt;right:7pt;top:7pt}.cv-source{display:none}
    </style></head><body>
    <template id="cv-sheet"><article class="sheet"><div class="backdrop" aria-hidden="true"></div><div class="rail" aria-hidden="true"></div><header class="cv-header"><div class="mascot" aria-hidden="true"></div><div class="header-copy"><div class="badge">${icon(resume.id)}${escape(badge)}</div><h1>${escape(data.displayName)}</h1><p class="legal-name">${escape(data.name)}</p><p class="alias">aka Culichi.</p><p class="role">${escape(cv.role)}</p><p class="contact">${link(`mailto:${data.email}`, data.email)} · ${link(data.website,"culichi.lat")}<br>${link(data.github,"github.com/ByCulichi")} · ${link(data.linkedin,"linkedin.com/in/culichi")}</p></div></header><main data-page-content></main><footer class="footer"><span><strong>Culichi.</strong> · ${lang === "es" ? "Inglés / Español" : "English / Spanish"} · culichi.lat</span><span data-page-label></span></footer></article></template>
    <div class="cv-source" id="cv-intro"><section class="profile-summary"><div class="profile-label">${icon("profile")}${lang === "es" ? "Mi perfil" : "My profile"}</div><p>${escape(cv.summary)}</p></section><div class="highlights">${cv.highlights.map(item => `<div class="highlight"><strong>${escape(item.value)}</strong><span>${escape(item.label)}</span></div>`).join("")}</div></div>
    <div class="cv-source" id="cv-source">${sections}</div><div id="cv-pages"></div></body></html>`;
}

/** Runs in Chromium after fonts are ready; keep each card/row intact and repeat section headings. */
export function paginateCv({ lang }) {
  const pages = document.querySelector("#cv-pages");
  const template = document.querySelector("#cv-sheet");
  const source = document.querySelector("#cv-source");
  let sheet;
  const newSheet = () => {
    sheet = template.content.firstElementChild.cloneNode(true);
    if (pages.children.length) sheet.classList.add("continuation");
    pages.append(sheet);
    sheet.dataset.sheet = pages.children.length;
    return sheet.querySelector("main");
  };
  let main = newSheet();
  for (const child of document.querySelector("#cv-intro").children) main.append(child.cloneNode(true));
  const fits = () => main.getBoundingClientRect().bottom <= sheet.querySelector("footer").getBoundingClientRect().top - 14;
  if (!fits()) throw new Error("CV introduction exceeds the first page");
  for (const original of source.children) {
    if (original.hasAttribute("data-page-start") && main.children.length) main = newSheet();
    let section;
    let rows;
    let placed = 0;
    const startSection = continued => {
      section = original.cloneNode(true);
      rows = section.querySelector(".section-rows");
      rows.replaceChildren();
      if (continued) {
        section.querySelector(".section-intro")?.remove();
        section.querySelector(".continued").textContent = lang === "es" ? "continúa" : "continued";
      }
      main.append(section);
    };
    startSection(false);
    for (const originalRow of original.querySelector(".section-rows").children) {
      const row = originalRow.cloneNode(true);
      rows.append(row);
      if (!fits()) {
        row.remove();
        if (!rows.children.length) section.remove();
        main = newSheet();
        startSection(placed > 0);
        rows.append(row);
        if (!fits()) throw new Error(`CV row cannot fit: ${row.textContent.slice(0, 120)}`);
      }
      placed++;
    }
  }
  const count = pages.children.length;
  for (const [index, page] of [...pages.children].entries()) page.querySelector("[data-page-label]").textContent = lang === "es" ? `Página ${index + 1} de ${count}` : `Page ${index + 1} of ${count}`;
  document.querySelector("#cv-intro").remove();
  source.remove();
  template.remove();
  return count;
}
