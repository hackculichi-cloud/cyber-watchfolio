import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { translate, type Lang } from "./translate";

export type { Lang } from "./translate";
const STORAGE_KEY = "portfolio-lang";
type Ctx = { lang: Lang; setLang: (lang: Lang) => void; t: (text?: string | null) => string };
const LanguageContext = createContext<Ctx | null>(null);

const initial = (): Lang => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "es") return saved;
  } catch { /* Storage can be unavailable in private browsing. */ }
  return "es";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(initial);
  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* Optional persistence. */ }
  }, [lang]);
  const t = useCallback((text?: string | null) => translate(text, lang), [lang]);
  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
};
