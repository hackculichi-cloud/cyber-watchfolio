import { useLanguage } from "@/i18n/LanguageProvider";
import { FileClock } from "lucide-react";

interface EmptyStateProps { title: string; description: string; }

/** A brief, honest pending row shared by every unpublished collection. */
const EmptyState = ({ title, description }: EmptyStateProps) => {
  const { t } = useLanguage();
  return <div data-empty-state className="flex items-start gap-3 rounded-xl border border-dashed border-primary/25 bg-background/85 p-4">
    <FileClock className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
    <div className="min-w-0"><p className="text-sm font-semibold text-foreground">{t(title)}</p><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(description)}</p></div>
  </div>;
};
export default EmptyState;
