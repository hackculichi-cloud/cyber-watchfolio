import { useId, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Images, ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SmartImage from "./SmartImage";
import type { WorkImage } from "@/data/works";
import { useLanguage } from "@/i18n/LanguageProvider";

type EvidenceImage = WorkImage & { projectTitle?: string };

/** Shared photo evidence with keyboard-accessible enlargement and navigation. */
const WorkImageGallery = ({ images, title, compact = false, collapsible = false }: { images: EvidenceImage[]; title: string; compact?: boolean; collapsible?: boolean }) => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const galleryId = useId();
  const available = images.filter((image) => Boolean(image.src));
  const active = activeIndex === null ? undefined : available[activeIndex];
  const previewCount = Math.min(4, available.length);
  // Spread the preview across the collection so a long photo sequence isn't the only work shown.
  const previewIndexes = new Set(Array.from({ length: previewCount }, (_, index) => previewCount === 1 ? 0 : Math.round(index * (available.length - 1) / (previewCount - 1))));
  const visible = available.map((image, index) => ({ image, index })).filter(({ index }) => !collapsible || expanded || previewIndexes.has(index));
  const move = (delta: number) => setActiveIndex((index) => index === null ? null : (index + delta + available.length) % available.length);
  if (!available.length) return null;
  return (
    <>
      {collapsible && <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2 font-medium text-foreground"><Images className="h-4 w-4 text-primary" aria-hidden />{t("Photo gallery")}</span>
        <span aria-live="polite">{t("Showing {shown} of {total} photos").replace("{shown}", String(visible.length)).replace("{total}", String(available.length))} · {t("Tap a photo to enlarge")}</span>
      </div>}
      <div id={galleryId} data-photo-gallery className={compact ? `grid grid-cols-2 items-start gap-3 ${collapsible ? "lg:grid-cols-4" : "sm:grid-cols-3 lg:grid-cols-5"}` : "columns-1 gap-4 sm:columns-2 lg:columns-3"}>
        {visible.map(({ image, index }) => (
          <figure key={`${image.src}-${index}`} className={`group break-inside-avoid overflow-hidden rounded-lg border border-border bg-surface ${compact ? "" : "mb-4"}`}>
            <button type="button" onClick={() => setActiveIndex(index)} className="block w-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={`${t("Open larger preview")}: ${t(image.alt)}`}>
              <div className="relative"><SmartImage src={image.src!} alt={t(image.alt)} className="aspect-[4/3] w-full" imgClassName="transition-transform duration-500 group-hover:scale-[1.02]" />
                <span aria-hidden className="absolute bottom-2 right-2 grid h-7 w-7 place-items-center rounded-full border border-white/15 bg-background/80 text-white"><ZoomIn className="h-3.5 w-3.5" /></span>
              </div>
            </button>
            {(image.caption || image.projectTitle) && <figcaption className={compact ? "p-2" : "p-4"}>
              {image.caption && <p className={`${compact ? "text-xs line-clamp-2" : "text-sm"} leading-relaxed text-muted-foreground`}>{t(image.caption)}</p>}
              {image.projectTitle && <p className="mt-2 line-clamp-2 text-xs font-medium text-primary">{t(image.projectTitle)}</p>}
            </figcaption>}
          </figure>
        ))}
      </div>
      {collapsible && available.length > previewCount && <Button type="button" variant="outline" className="mt-4" aria-expanded={expanded} aria-controls={galleryId} aria-label={`${t(expanded ? "Show fewer photos" : "View more photos")}: ${t(title)}`} onClick={() => setExpanded(value => !value)}>
        {t(expanded ? "Show fewer photos" : "View more photos")} {!expanded && `(${available.length - previewCount})`}
        <ChevronDown className={`ml-2 h-4 w-4 transition-transform motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`} aria-hidden />
      </Button>}
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
