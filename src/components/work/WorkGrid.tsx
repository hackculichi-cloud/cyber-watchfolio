import { useMemo, useState } from "react";
import type { WorkItem } from "@/data/works";
import WorkCard from "@/components/work/WorkCard";
import WorkDetail from "@/components/work/WorkDetail";
import DetailModal from "@/components/shared/DetailModal";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageProvider";

interface WorkGridProps {
  items: WorkItem[];
  emptyTitle?: string;
  emptyDescription?: string;
  /** Number of marked placeholder slots shown while no real work is published. */
  placeholderSlots?: number;
  /** Center small collections without stretching a lone card across the page. */
  centered?: boolean;
}

/**
 * Image-first project grid with category filtering and a detail modal.
 * Publishing new work only requires adding an object to `src/data/works.ts`.
 */
const WorkGrid = ({
  items,
  emptyTitle = "Real projects coming soon",
  emptyDescription = "These slots are reserved for documented work with real photos and screenshots.",
  placeholderSlots = 3,
  centered = false,
}: WorkGridProps) => {
  const { t } = useLanguage();
  const [category, setCategory] = useState("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((i) => i.category)))],
    [items],
  );
  const filtered = category === "All" ? items : items.filter((i) => i.category === category);
  const current = items.find((i) => i.id === openId) ?? null;

  if (!items.length) {
    return (
      <div className={centered ? "text-center" : undefined}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: placeholderSlots }).map((_, i) => (
            <div key={i} className="panel flex flex-col overflow-hidden p-0">
              <PlaceholderImage className="aspect-[16/10] w-full rounded-none border-0" />
              <div className="space-y-2 p-5">
                <div className="h-3 w-2/3 rounded bg-secondary/70" />
                <div className="h-2.5 w-full rounded bg-secondary/50" />
                <div className="h-2.5 w-4/5 rounded bg-secondary/40" />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{t(emptyTitle)}.</span> {t(emptyDescription)}
        </p>
      </div>
    );
  }

  return (
    <>
      {categories.length > 2 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Button
              key={c}
              type="button"
              variant="outline"
              size="sm"
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
            </Button>
          ))}
        </div>
      )}

      <div className={centered ? "flex flex-wrap items-stretch justify-center gap-5" : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"}>
        {filtered.map((item) => (
          centered ? <div key={item.id} className="w-full min-w-0 max-w-sm flex-[1_1_16rem]"><WorkCard item={item} onOpen={setOpenId} /></div> : <WorkCard key={item.id} item={item} onOpen={setOpenId} />
        ))}
      </div>

      <DetailModal
        open={Boolean(current)}
        onOpenChange={(o) => !o && setOpenId(null)}
        title={t(current?.title)}
        subtitle={t(current ? `${t(current.category)} · ${t(current.status)}` : undefined)}
      >
        {current && <WorkDetail item={current} />}
      </DetailModal>
    </>
  );
};

export default WorkGrid;
