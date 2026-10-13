import { es } from "./es";

export type Lang = "en" | "es";

/** Translate canonical source strings without changing identifiers or React's DOM. */
export function translate(text: string | undefined | null, lang: Lang): string {
  if (!text) return "";
  if (lang === "en") return text;
  const leading = text.match(/^\s*/)?.[0] ?? "";
  const trailing = text.match(/\s*$/)?.[0] ?? "";
  const source = text.trim();
  if (!source) return text;
  const exact = es[source];
  if (exact) return `${leading}${exact}${trailing}`;
  const t = (value: string) => translate(value, lang);
  const patterns: Array<[RegExp, (...parts: string[]) => string]> = [
    [/^Explore the (.+) profile$/, (_match, name) => `Explorar el perfil de ${t(name)}`],
    [/^Open (.+) photo$/, (_match, name) => `Abrir foto de ${t(name)}`],
    [/^No (.+) cases published yet$/, (_match, name) => `Aún no hay casos de ${t(name)} publicados`],
    [/^Issued by (.+)$/, (_match, issuer) => `Emitido por ${issuer}`],
    [/^(.+) — pending documentation$/, (_match, label) => `${t(label)} — documentación pendiente`],
    [/^(.+) — photo pending$/, (_match, label) => `${t(label)} — foto pendiente`],
    [/^Before — (.+)$/, (_match, label) => `Antes — ${t(label)}`],
    [/^→ view full playbook \((\d+) steps\)$/, (_match, count) => `→ ver Playbook completo (${count} pasos)`],
  ];
  for (const [pattern, render] of patterns) {
    const match = source.match(pattern);
    if (match) return `${leading}${render(...match)}${trailing}`;
  }
  // Metadata composes independently translated labels with stable separators.
  for (const separator of [" | ", " · "]) {
    if (source.includes(separator)) return `${leading}${source.split(separator).map(t).join(separator)}${trailing}`;
  }
  return text;
}
