import { useLanguage } from "@/i18n/LanguageProvider";
import { useMemo, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Tag from "@/components/shared/Tag";
import EmptyState from "@/components/shared/EmptyState";
import type { GalleryItem } from "@/data/gallery";
import { cn } from "@/lib/utils";

interface GalleryProps {
  items: GalleryItem[];
  emptyTitle?: string;
  emptyDescription?: string;
}

/**
 * Reusable, filterable gallery with a lightbox.
 * Add entries to `src/data/gallery.ts` — no UI changes required.
 */
const Gallery = ({
  items,
  emptyTitle = "No photos published yet",
  emptyDescription = "Original photos and screenshots will appear here when available.",
}: GalleryProps) => {
  const { t } = useLanguage();
  const [category, setCategory] = useState<string>("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const returnFocus = useRef<HTMLButtonElement | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((i) => i.category)))],
    [items],
  );
  const filtered = category === "All" ? items : items.filter((i) => i.category === category);
  const current = items.find((i) => i.id === openId) ?? null;

  if (!items.length) return <EmptyState title={t(emptyTitle)} description={t(emptyDescription)} />;

  return (
    <>
      {categories.length > 2 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={cn(
                "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                category === c
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {t(c)}
            </button>
          ))}
        </div>
      )}

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={event => { returnFocus.current = event.currentTarget; setOpenId(item.id); }}
              style={{ padding: 0 }}
              className="panel-glow group w-full overflow-hidden text-left hover:-translate-y-1"
            >
              <span className="block aspect-[4/3] overflow-hidden rounded-t-xl bg-secondary">
                <img
                  src={item.thumbnail ?? item.src}
                  alt={t(item.alt)}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </span>
              <span className="block p-4">
                <span className="flex items-start justify-between gap-2">
                  <span className="text-sm font-semibold">{t(item.title)}</span>
                  <Tag variant="primary">{t(item.category)}</Tag>
                </span>
                {item.date && <span className="mt-1 block text-xs text-muted-foreground">{t(item.date)}</span>}
                {item.description && (
                  <span className="mt-2 line-clamp-2 block text-sm text-muted-foreground">{t(item.description)}</span>
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={!!current} onOpenChange={(o) => !o && setOpenId(null)}>
        <DialogContent onCloseAutoFocus={event => { if (returnFocus.current) { event.preventDefault(); returnFocus.current.focus({ preventScroll: true }); } }} className="max-h-[90dvh] max-w-3xl overflow-y-auto">
          {current && (
            <>
              <DialogTitle className="text-base">{t(current.title)}</DialogTitle>
              <DialogDescription className="sr-only">{t(current.alt)}</DialogDescription>
              <div className={cn("grid gap-3", current.beforeSrc && "sm:grid-cols-2")}>
                {current.beforeSrc && (
                  <figure>
                    <img src={current.beforeSrc} alt={t(`Before — ${current.alt}`)} className="rounded-lg border border-border" />
                    <figcaption className="mt-1 text-xs text-muted-foreground">{t("Before")}</figcaption>
                  </figure>
                )}
                <figure>
                  <img src={current.src} alt={t(current.alt)} className="max-h-[65dvh] w-full rounded-lg border border-border object-contain" />
                  {current.beforeSrc && <figcaption className="mt-1 text-xs text-muted-foreground">{t("After")}</figcaption>}
                </figure>
              </div>
              {current.description && (
                <p className="text-sm leading-relaxed text-muted-foreground">{t(current.description)}</p>
              )}
              <div className="flex flex-wrap gap-1.5">
                {current.project && <Tag variant="accent">{t(current.project)}</Tag>}
                {current.date && <Tag>{t(current.date)}</Tag>}
                {current.tags?.map((entry) => <Tag key={entry}>{t(entry)}</Tag>)}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Gallery;
