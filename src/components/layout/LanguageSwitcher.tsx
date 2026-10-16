import { ArrowLeftRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const languages = {
  es: { flag: "/images/flags/mx.svg", name: "Español", short: "ES" },
  en: { flag: "/images/flags/gb.svg", name: "English", short: "EN" },
};

const LanguageSwitcher = ({ className, compact = false }: { className?: string; compact?: boolean }) => {
  const { lang, setLang, t } = useLanguage();
  const next = lang === "es" ? "en" : "es";
  const current = languages[lang];
  return <div role="group" aria-label={t("Language")} data-selected-language={lang} className={cn("language-switcher inline-flex", className)}>
    <button type="button" data-language-toggle data-current-language={lang} lang={lang}
      onClick={() => setLang(next)} aria-label={t(next === "en" ? "Switch to English" : "Switch to Spanish")}
      title={t(next === "en" ? "Switch to English" : "Switch to Spanish")}
      className={cn("group flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-lg border border-primary/35 bg-primary/10 px-3 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", compact ? "min-w-28" : "min-w-36")}>
      <span key={lang} className="language-flag-in flex items-center gap-2" aria-live="polite">
        <img data-language-flag={lang} src={current.flag} width={24} height={18} alt="" aria-hidden className="h-[18px] w-6 rounded-sm object-cover" />
        <span>{compact ? current.short : current.name}</span>
      </span>
      <ArrowLeftRight className="h-3.5 w-3.5 opacity-70 transition-opacity group-hover:opacity-100" aria-hidden />
      <span aria-hidden className="block w-2 overflow-hidden opacity-50"><img data-language-flag={next} src={languages[next].flag} width={24} height={18} alt="" className="h-[18px] w-6 max-w-none rounded-sm object-cover" /></span>
    </button>
  </div>;
};
export default LanguageSwitcher;
