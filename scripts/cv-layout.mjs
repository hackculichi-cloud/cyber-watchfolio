const escape = value => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

export const cvDesigns = {
  general: { accent: "#38bdf8", badge: ["MULTIDISCIPLINARY", "MULTIDISCIPLINARIO"], image: "culichi-home-background.webp", cell: 0 },
  cybersecurity: { accent: "#38bdf8", badge: ["SOC / BLUE TEAM", "SOC / BLUE TEAM"], image: "hero-cybersecurity.jpg", cell: 1 },
  software: { accent: "#22c55e", badge: ["SOFTWARE", "SOFTWARE"], image: "hero-development.jpg", cell: 2 },
  electrical: { accent: "#facc15", badge: ["ELECTRICAL", "ELECTRICIDAD"], image: "hero-electrical.jpg", cell: 3 },
  electronics: { accent: "#fb923c", badge: ["ELECTRONICS", "ELECTRÓNICA"], image: "hero-electronics.jpg", cell: 4 },
  repair: { accent: "#a78bfa", badge: ["TECHNICAL REPAIR", "REPARACIÓN TÉCNICA"], image: "hero-repair.jpg", cell: 5 },
  "customer-service": { accent: "#2dd4bf", badge: ["CUSTOMER SERVICE", "ATENCIÓN AL CLIENTE"], image: "hero-customer-service.svg", cell: 6 },
};

/** Self-contained print document; selectable text and original local artwork only. */
export function renderCv({ data, resume, lang, background, mascotAtlas, codeFont }) {
  const cv = resume[lang];
  const design = cvDesigns[resume.id];
  const pages = Math.max(...cv.sections.map(section => section.page ?? 1));
  const badge = design.badge[lang === "es" ? 1 : 0];
  const link = (url, label) => `<a href="${escape(url)}">${escape(label)}</a>`;
  const pageText = number => lang === "es" ? `Página ${number} de ${pages}` : `Page ${number} of ${pages}`;
  const sections = number => cv.sections.filter(section => (section.page ?? 1) === number).map(section => `<section><h2>${escape(section.title)}</h2><ul>${section.items.map(item => `<li>${escape(item)}</li>`).join("")}</ul></section>`).join("");
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${escape(data.name)} — ${escape(cv.role)}</title><style>
    @font-face{font-family:Code;src:url(data:font/woff2;base64,${codeFont}) format('woff2');font-weight:400}
    @page{size:A4;margin:0}*{box-sizing:border-box}html,body{margin:0;padding:0;background:#0b1220}body{font:10pt/1.36 Arial,sans-serif;color:#edf2f8;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .sheet{isolation:isolate;position:relative;width:210mm;height:297mm;padding:11mm 12mm 15mm;break-after:page}.sheet:last-child{break-after:auto}
    .backdrop{position:absolute;inset:0;z-index:-2;background-image:linear-gradient(100deg,#091222f0,#091222de 55%,#091222a8),url('${background}');background-position:center;background-size:cover;border-top:4mm solid ${design.accent}}
    .rail{position:absolute;left:0;top:4mm;bottom:0;width:2mm;background:linear-gradient(${design.accent}99,${design.accent}15)}
    header{position:relative;min-height:158pt;padding:15pt 17pt;margin-bottom:10pt;border:1px solid ${design.accent}75;border-left:4pt solid ${design.accent};border-radius:9pt;background-image:linear-gradient(90deg,#0b1426f0,#0b1426b8),url('${background}');background-size:cover;background-position:center}
    .header-copy{position:relative;z-index:1;max-width:calc(100% - 125pt)}.badge{font:7.1pt Code,monospace;letter-spacing:.07em;color:${design.accent};margin-bottom:8pt}.alias{font:9pt Code,monospace;color:${design.accent};margin:0 0 6pt}h1{font-size:22pt;letter-spacing:-.025em;line-height:1.08;margin:0 0 7pt}.role{font-size:11.1pt;font-weight:bold;line-height:1.25;margin:0 0 10pt;color:#e2e8f0}.mascot{position:absolute;right:8pt;top:18pt;width:125pt;height:125pt;background-image:url(data:image/webp;base64,${mascotAtlas});background-size:300% 300%;background-position:${design.cell % 3 * 50}% ${Math.floor(design.cell / 3) * 50}%}
    .contact{font-size:8pt;line-height:1.5;margin:0;color:#cbd5e1}.contact a{white-space:nowrap}a{color:inherit;text-decoration:none}.summary{border-left:2pt solid ${design.accent};padding:7pt 10pt;background:#0b1426e8;border-radius:0 5pt 5pt 0;margin:0 0 8pt;color:#f1f5f9;line-height:1.45}
    h2{font-size:10pt;letter-spacing:.025em;color:${design.accent};margin:0 0 6pt;font-weight:bold}section{break-inside:avoid;background:#101a2beb;border:1px solid #d0def026;border-left:2pt solid ${design.accent}99;border-radius:6pt;padding:8pt 10pt;margin:0 0 8pt}ul{padding-left:12pt;margin:0}li{margin:0 0 4pt}li:last-child{margin-bottom:0}li::marker{color:${design.accent}}
    .footer{position:absolute;bottom:7mm;left:12mm;right:12mm;display:flex;justify-content:space-between;align-items:center;gap:10pt;border-top:1px solid ${design.accent}55;padding-top:6pt;font-size:7.4pt;color:#cbd5e1}.footer strong{color:${design.accent}}
    .continuation{font-size:9.8pt;line-height:1.35}.continuation header{min-height:100pt;padding:12pt 15pt;margin-bottom:9pt}.continuation .header-copy{max-width:calc(100% - 85pt)}.continuation h1{font-size:19pt}.continuation .role{font-size:10pt;margin-bottom:6pt}.continuation .badge{margin-bottom:6pt}.continuation .alias{display:none}.continuation .mascot{width:86pt;height:86pt;top:12pt}.continuation .contact{font-size:7.6pt}.continuation section{padding:7pt 9pt;margin-bottom:7pt}.continuation h2{font-size:9.8pt;margin-bottom:5pt}.continuation li{margin-bottom:3pt}
    </style></head><body>${Array.from({ length: pages }, (_, index) => {
      const number = index + 1;
      return `<article class="sheet${number > 1 ? " continuation" : ""}" data-sheet="${number}"><div class="backdrop" aria-hidden="true"></div><div class="rail" aria-hidden="true"></div><header><div class="mascot" aria-hidden="true"></div><div class="header-copy"><div class="badge">${escape(badge)}</div><h1>${escape(data.name)}</h1><p class="alias">aka Culichi<span style="color:${design.accent}">.</span></p><p class="role">${escape(cv.role)}</p><p class="contact">${link(`mailto:${data.email}`, data.email)} · ${link(data.website,"culichi.lat")}<br>${link(data.github,"github.com/ByCulichi")} · ${link(data.linkedin,"linkedin.com/in/culichi")}</p></div></header><main data-page-content>${number === 1 ? `<p class="summary">${escape(cv.summary)}</p>` : ""}${sections(number)}</main><footer class="footer"><span><strong>${lang === "es" ? "Idiomas" : "Languages"}:</strong> ${escape(data.languages[lang])}</span><span>${pageText(number)}</span></footer></article>`;
    }).join("")}</body></html>`;
}
