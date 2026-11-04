import type { ReactNode, Ref } from "react";
import type { LucideIcon } from "lucide-react";
import { X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

/** One prominent close action stays within reach while browsing a collection. */
export default function CollectionToolbar({ title, icon: Icon, headingRef, kind, onClose, children }: { title: string; icon: LucideIcon; headingRef?: Ref<HTMLHeadingElement>; kind: "tools" | "training"; onClose: () => void; children?: ReactNode }) {
  const { t } = useLanguage();
  return <div data-collection-toolbar={kind} className="collection-toolbar">
    <div className="flex min-w-0 items-center gap-2 sm:gap-3">{children}<h2 ref={headingRef} tabIndex={-1} className="flex min-w-0 items-center gap-2 text-base font-semibold outline-none sm:text-xl"><Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden />{title}</h2></div>
    <button type="button" data-close-electrical-tools={kind === "tools" || undefined} data-close-electrical-training={kind === "training" || undefined} aria-label={t(kind === "tools" ? "Close tools" : "Close training")} onClick={onClose} className="collection-close inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-primary bg-primary px-3 py-2 text-sm font-bold text-primary-foreground shadow-[0_0_16px_hsl(var(--primary)/.2)] hover:bg-primary/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"><X className="h-5 w-5" aria-hidden />{t("Close")}</button>
  </div>;
}
