import type { ReactNode, HTMLAttributes } from "react";
import { FileClock } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import "./EmptyCollectionSection.css";

/** Preserve the destination while giving unpublished work one small, meaningful row. */
export default function EmptyCollectionSection({ id, title, description, status, ...attributes }: { id: string; title: string; description: string; status?: ReactNode } & Omit<HTMLAttributes<HTMLElement>, "title" | "children">) {
  const { t } = useLanguage();
  return <section {...attributes} id={id} data-empty-collection className="container mx-auto scroll-mt-32 px-4">
    <div className="empty-collection-row"><FileClock aria-hidden="true" /><div className="empty-collection-heading"><h2 className="text-base font-semibold">{t(title)}</h2>{status}</div><p className="text-sm leading-relaxed text-muted-foreground">{t(description)}</p></div>
  </section>;
}
