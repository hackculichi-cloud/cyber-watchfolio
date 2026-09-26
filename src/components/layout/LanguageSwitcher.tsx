import { useLanguage, type Lang } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const options: { value: Lang; flag: string; label: string; short: string }[] = [
  { value: "es", flag: "🇲🇽", label: "Español", short: "ES" },
  { value: "en", flag: "🇬🇧", label: "English", short: "EN" },
];

const LanguageSwitcher = ({ className, compact = false }: { className?: string; compact?: boolean }) => {
  const { lang, setLang, t } = useLanguage();
  return (
    <div role="group" aria-label={t("Language")} className={cn("flex items-center gap-1 rounded-lg border border-border p-0.5", className)}>
      {options.map((o) => {
        const active = lang === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => setLang(o.value)}
            aria-pressed={active}
            lang={o.value}
            title={o.label}
            className={cn(
              "flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors",
              active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span aria-hidden>{o.flag}</span>
            <span>{compact ? o.short : o.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
