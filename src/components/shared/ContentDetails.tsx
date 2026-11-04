import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Keep the full record available without making it the first screen of a presentation. */
export default function ContentDetails({ children, title = "View details", className = "" }: { children: ReactNode; title?: string; className?: string }) {
  const { t } = useLanguage();
  return <details data-content-details className={`content-details group rounded-xl border border-border ${className}`}>
    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden">{t(title)}<ChevronDown className="h-4 w-4 shrink-0 transition-transform motion-reduce:transition-none" aria-hidden /></summary>
    <div className="space-y-5 px-4 pb-4">{children}</div>
  </details>;
}
