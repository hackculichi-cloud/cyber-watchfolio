import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SmartImage from "./SmartImage";
import type { WorkImage } from "@/data/works";
import { useLanguage } from "@/i18n/LanguageProvider";

type EvidenceImage = WorkImage & { projectTitle?: string };

/** Shared photo evidence with keyboard-accessible enlargement and navigation. */
const WorkImageGallery = ({ images, title }: { images: EvidenceImage[]; title: string }) => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const available = images.filter((image) => Boolean(image.src));
  const active = activeIndex === null ? undefined : available[activeIndex];
  const move = (delta: number) => setActiveIndex((index) => index === null ? null : (index + delta + available.length) % available.length);
  if (!available.length) return null;
  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {available.map((image, index) => (
          <figure key={`${image.src}-${index}`} className="group mb-4 break-inside-avoid overflow-hidden rounded-lg border border-border bg-surface">
            <button type="button" onClick={() => setActiveIndex(index)} className="block w-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={`${t("Open larger preview")}: ${t(image.alt)}`}>
              <SmartImage src={image.src!} alt={t(image.alt)} className="aspect-[4/3] w-full" imgClassName="transition-transform duration-500 group-hover:scale-[1.02]" />
            </button>
            {(image.caption || image.projectTitle) && <figcaption className="p-4">
              {image.caption && <p className="text-sm leading-relaxed text-muted-foreground">{t(image.caption)}</p>}
              {image.projectTitle && <p className="mt-2 text-xs font-medium text-primary">{t(image.projectTitle)}</p>}
            </figcaption>}
          </figure>
        ))}
      </div>
      <Dialog open={Boolean(active)} onOpenChange={(open) => !open && setActiveIndex(null)}>
        <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto" onKeyDown={(event) => {
          if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
          if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
        }}>
          {active && <>
            <DialogTitle className="text-base">{t(active.projectTitle ?? title)}</DialogTitle>
            <DialogDescription>{t(active.caption ?? active.alt)}</DialogDescription>
            <SmartImage src={active.src!} alt={t(active.alt)} eager className="h-[min(65vh,42rem)] w-full rounded-lg border border-border" />
            {available.length > 1 && <div className="flex items-center justify-between gap-3">
              <Button type="button" variant="outline" size="icon" onClick={() => move(-1)} aria-label={t("Previous photo")}><ChevronLeft aria-hidden /></Button>
              <p role="status" className="text-xs text-muted-foreground">{t("Photo {current} of {total}").replace("{current}", String(activeIndex! + 1)).replace("{total}", String(available.length))}</p>
              <Button type="button" variant="outline" size="icon" onClick={() => move(1)} aria-label={t("Next photo")}><ChevronRight aria-hidden /></Button>
            </div>}
          </>}
        </DialogContent>
      </Dialog>
    </>
  );
};
export default WorkImageGallery;
