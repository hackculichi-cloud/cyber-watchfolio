import { useMemo, useState } from "react";
import type { WorkItem } from "@/data/works";
import WorkCard from "@/components/work/WorkCard";
import WorkDetail from "@/components/work/WorkDetail";
import DetailModal from "@/components/shared/DetailModal";
import EmptyState from "@/components/shared/EmptyState";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageProvider";

interface WorkGridProps {
  items: WorkItem[];
  emptyTitle?: string;
  emptyDescription?: string;
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
  emptyDescription = "Documented work and original photos will appear here when available.",
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

  if (!items.length) return <EmptyState title={emptyTitle} description={emptyDescription} />;

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
        profile={current?.profile}
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
