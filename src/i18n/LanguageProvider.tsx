import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { es } from "./es";

export type Lang = "en" | "es";
const dictionaries: Record<Lang, Record<string, string>> = { en: {}, es };
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

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
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
