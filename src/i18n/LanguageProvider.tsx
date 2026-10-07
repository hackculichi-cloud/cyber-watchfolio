import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { es } from "./es";

export type Lang = "en" | "es";
const dictionaries: Record<Lang, Record<string, string>> = { en: {}, es };
const spanishToEnglish = Object.fromEntries(Object.entries(es).map(([english, spanish]) => [spanish, english]));
const STORAGE_KEY = "portfolio-lang";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (text?: string) => string };
const LanguageContext = createContext<Ctx | null>(null);

const initial = (): Lang => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "es") return saved;
  } catch {
    /* storage unavailable */
  }
  return "en";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(initial);
  const sourceText = useRef(new WeakMap<Text, string>());
  const sourceAttributes = useRef(new WeakMap<Element, Map<string, string>>());

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  useEffect(() => {
    const translate = (text: string) => {
      const exact = dictionaries[lang][text];
      if (exact) return exact;
      if (lang === "en") return spanishToEnglish[text] ?? text;

      const patterns: Array<[RegExp, (...parts: string[]) => string]> = [
        [/^Explore the (.+) profile$/, (_match, name) => `Explorar el perfil de ${translate(name)}`],
        [/^Open (.+) photo$/, (_match, name) => `Abrir foto de ${translate(name)}`],
        [/^No (.+) cases published yet$/, (_match, name) => `Aún no hay casos de ${translate(name)} publicados`],
        [/^Issued by (.+)$/, (_match, issuer) => `Emitido por ${issuer}`],
        [/^ID (.+)$/, (_match, id) => `ID ${id}`],
        [/^(.+) — pending documentation$/, (_match, label) => `${translate(label)} — documentación pendiente`],
        [/^(.+) — photo pending$/, (_match, label) => `${translate(label)} — foto pendiente`],
        [/^→ view full playbook \((\d+) steps\)$/, (_match, count) => `→ ver Playbook completo (${count} pasos)`],
      ];
      for (const [pattern, render] of patterns) {
        const match = text.match(pattern);
        if (match) return render(...match);
      }
      return text;
    };

    const translateTextNode = (node: Text) => {
      const parent = node.parentElement;
      if (!parent || parent.closest("script, style, code, pre")) return;
      const original = sourceText.current.get(node) ?? node.data;
      sourceText.current.set(node, original);
      const leading = original.match(/^\s*/)?.[0] ?? "";
      const trailing = original.match(/\s*$/)?.[0] ?? "";
      const content = original.trim();
      if (!content) return;
      const translated = translate(content);
      const next = `${leading}${translated}${trailing}`;
      if (node.data !== next) node.data = next;
    };

    const translateElement = (element: Element) => {
      const names = ["aria-label", "title", "placeholder", "alt", "content"];
      let originals = sourceAttributes.current.get(element);
      if (!originals) {
        originals = new Map<string, string>();
        sourceAttributes.current.set(element, originals);
      }
      names.forEach((name) => {
        const current = element.getAttribute(name);
        if (current === null) return;
        const original = originals?.get(name) ?? current;
        originals?.set(name, original);
        const translated = translate(original);
        if (current !== translated) element.setAttribute(name, translated);
      });
    };

    const translateTree = (root: Node) => {
      if (root.nodeType === Node.TEXT_NODE) {
        translateTextNode(root as Text);
        return;
      }
      if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
      if (root.nodeType === Node.ELEMENT_NODE) translateElement(root as Element);
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        if (node.nodeType === Node.TEXT_NODE) translateTextNode(node as Text);
        else translateElement(node as Element);
        node = walker.nextNode();
      }
    };

    translateTree(document.body);
    translateTree(document.head);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(translateTree);
        if (mutation.type === "attributes") translateElement(mutation.target as Element);
      });
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["aria-label", "title", "placeholder", "alt", "content"],
    });
    return () => observer.disconnect();
  }, [lang]);

  const t = useCallback((text?: string) => (text ? dictionaries[lang][text] ?? text : ""), [lang]);
  const value = useMemo(() => ({ lang, setLang: setLangState, t }), [lang, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) return { lang: "en" as Lang, setLang: () => {}, t: (s?: string) => s ?? "" };
  return ctx;
};
