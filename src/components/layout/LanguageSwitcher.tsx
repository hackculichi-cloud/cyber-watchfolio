import { ArrowLeftRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const languages = {
  es: "/images/flags/mx.svg",
  en: "/images/flags/gb.svg",
};

const LanguageSwitcher = ({ className, compact = false }: { className?: string; compact?: boolean }) => {
  const { lang, setLang, t } = useLanguage();
  const next = lang === "es" ? "en" : "es";
  return <div role="group" aria-label={t("Language")} data-selected-language={lang} className={cn("language-switcher inline-flex", className)}>
    <button type="button" data-language-toggle data-current-language={lang} lang={lang}
      onClick={() => setLang(next)} aria-label={t(next === "en" ? "Switch to English" : "Switch to Spanish")}
      title={t(next === "en" ? "Switch to English" : "Switch to Spanish")}
      className={cn("language-switch-control group relative inline-flex shrink-0 items-center justify-center gap-2.5 rounded-lg border border-primary/40 text-primary transition-colors hover:border-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background", compact ? "h-11 w-20" : "h-12 w-[88px]")}>
      <span key={lang} className="language-flag-in inline-flex rounded-md border border-white/15 p-0.5 shadow-sm">
        <img data-language-flag={lang} src={languages[lang]} width={28} height={21} alt="" aria-hidden className="h-[21px] w-7 rounded-sm object-cover" />
      </span>
      <ArrowLeftRight className="h-4 w-4 opacity-80 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100 motion-reduce:transform-none" aria-hidden />
    </button>
  </div>;
};
export default LanguageSwitcher;
