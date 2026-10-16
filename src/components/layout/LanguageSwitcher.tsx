import { useLanguage, type Lang } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const options: { value: Lang; flag: string; label: string; short: string }[] = [
  { value: "es", flag: "/images/flags/mx.svg", label: "Español", short: "ES" },
  { value: "en", flag: "/images/flags/gb.svg", label: "English", short: "EN" },
];

const LanguageSwitcher = ({ className, compact = false }: { className?: string; compact?: boolean }) => {
  const { lang, setLang, t } = useLanguage();
  return (
    <div role="group" aria-label={t("Language")} data-selected-language={lang} className={cn("language-switcher relative isolate flex items-center rounded-lg border border-border p-0.5", className)}>
      <span aria-hidden className="language-selection pointer-events-none absolute inset-y-0.5 left-0.5 w-[calc(50%-0.125rem)] rounded-md border border-primary/35 bg-primary/15 shadow-[0_0_12px_hsl(var(--primary)/.1)]" />
      {options.map((o) => {
        const active = lang === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => setLang(o.value)}
            aria-label={o.label}
            aria-pressed={active}
            lang={o.value}
            title={o.label}
            className={cn(
              "relative z-10 flex min-h-11 min-w-14 flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              active ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <img data-language-flag={o.value} src={o.flag} width={24} height={18} alt="" aria-hidden className="language-flag h-[18px] w-6 rounded-sm object-cover" />
            <span>{compact ? o.short : o.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
