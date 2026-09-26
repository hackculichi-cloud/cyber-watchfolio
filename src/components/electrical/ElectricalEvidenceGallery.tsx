import { useState } from "react";
import { Expand } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { WorkImage } from "@/data/works";
import SmartImage from "@/components/shared/SmartImage";
import { useLanguage } from "@/i18n/LanguageProvider";

type EvidenceItem = WorkImage & { projectId: string; projectTitle: string };

const ElectricalEvidenceGallery = ({ items }: { items: EvidenceItem[] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { t } = useLanguage();
  const active = activeIndex === null ? null : items[activeIndex];

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((item, index) => (
          <figure key={`${item.projectId}-${item.alt}`} className="group relative mb-4 break-inside-avoid overflow-hidden rounded-lg border border-border bg-surface">
            <button type="button" onClick={() => setActiveIndex(index)} className="block w-full" aria-label={`${t("Open larger preview")}: ${t(item.alt)}`}>
              <SmartImage src={item.src!} alt={t(item.alt)} className="aspect-[4/3] w-full" imgClassName="transition-transform duration-500 group-hover:scale-[1.02]" />
            </button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={() => setActiveIndex(index)}
              className="absolute right-3 top-3 bg-background/80 opacity-100 backdrop-blur-sm sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
              aria-label={`${t("Open larger preview")}: ${t(item.alt)}`}
            >
              <Expand className="h-4 w-4" aria-hidden />
            </Button>
            <figcaption className="p-4">
              <p className="text-sm leading-relaxed text-muted-foreground">{t(item.caption)}</p>
              <p className="mt-2 text-xs font-medium text-primary">{t(item.projectTitle)}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <Dialog open={Boolean(active)} onOpenChange={(open) => !open && setActiveIndex(null)}>
        <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto">
          {active && (
            <>
              <DialogTitle className="text-base">{t(active.projectTitle)}</DialogTitle>
              <DialogDescription>{t(active.caption ?? active.alt)}</DialogDescription>
              <SmartImage src={active.src!} alt={t(active.alt)} eager className="h-[72vh] w-full rounded-lg border border-border" />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ElectricalEvidenceGallery;