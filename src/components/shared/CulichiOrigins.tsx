import { CircuitBoard, ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

/** An original rivers/circuit mark complements the personal mascot. */
export default function CulichiOrigins() {
  const { t } = useLanguage();
  return <div data-culichi-origins className="relative mt-6 max-w-xl border-t border-primary/20 pt-5">
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 104 72" fill="none" aria-hidden className="h-14 w-20 shrink-0 text-primary">
        <path d="M8 10C25 10 30 36 49 36M8 62C25 62 30 36 49 36M49 36C68 36 72 36 96 36" stroke="currentColor" strokeWidth="2" />
        <path d="M8 20C25 20 30 42 48 42M8 52C25 52 30 30 48 30M54 30H76L86 20H96M54 42H76L86 52H96" stroke="currentColor" strokeOpacity=".3" />
        <circle cx="49" cy="36" r="7" fill="currentColor" fillOpacity=".15" stroke="currentColor" />
        <circle cx="8" cy="10" r="3" fill="currentColor" /><circle cx="8" cy="62" r="3" fill="currentColor" /><circle cx="96" cy="36" r="3" fill="currentColor" />
      </svg>
      <div><p className="text-[11px] font-semibold uppercase tracking-[.14em] text-primary">Culiacán × {t("Technology")}</p>
        <p className="reading-copy mt-1 text-sm text-muted-foreground">{t("Local roots. A curious mind for technology.")}</p>
      </div>
    </div>
    <details className="group mt-4">
      <summary className="flex w-fit cursor-pointer list-none items-center gap-2 rounded py-2 text-xs font-medium text-foreground/80 outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
        <CircuitBoard className="h-4 w-4 text-primary" aria-hidden />{t("Why Culichi and a fox?")}<ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" aria-hidden />
      </summary>
      <p className="reading-copy mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">{t("Culichi comes from Culiacán. The fox is my personal mascot: curiosity, adaptability and problem solving connect its six technical outfits. The rivers-and-circuits mark adds a reference to the Humaya and Tamazula joining to form the Culiacán River.")}</p>
    </details>
  </div>;
}
