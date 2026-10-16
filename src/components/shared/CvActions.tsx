import CulichiMascot from "./CulichiMascot";
import type { MascotVariant } from "./CulichiMascot";
import { useEffect, useRef, useState } from "react";
import { Download, Eye, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cvAssets, type CvVariant } from "@/data/cvs";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

const MAX_CV_ZOOM = 400;

/** Shared localized downloads and faithful previews of every actual PDF page. */
const CvActions = ({ cv }: { cv: CvVariant }) => {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [pageIndex, setPageIndex] = useState(0);
  const viewport = useRef<HTMLDivElement>(null);
  const assets = cvAssets(cv, lang);
  const previews = assets.previews.length ? assets.previews : assets.preview ? [assets.preview] : [];
  const currentPage = Math.min(pageIndex, Math.max(0, previews.length - 1));
  useEffect(() => { viewport.current?.scrollTo({ top: 0, left: 0 }); }, [currentPage]);
  const mascotProfiles: Record<string, MascotVariant> = { general: "home", cybersecurity: "cybersecurity", software: "development", electrical: "electrical", electronics: "electronics", repair: "repair", "customer-service": "customer-service" };
  if (!cv.available) return <Button size="sm" disabled variant="secondary">{t("Not published yet")}</Button>;
  return <>
    <div className="flex flex-wrap gap-2">
      <Button asChild size="sm"><a href={assets.file} download target="_blank" rel="noopener noreferrer" aria-label={`${t("Download PDF")}: ${t(cv.title)}`}><Download className="h-4 w-4" aria-hidden />{t("Download PDF")}{cv.localized && ` · ${lang.toUpperCase()}`}</a></Button>
      {assets.preview && <Button type="button" size="sm" variant="outline" onClick={() => { setZoom(100); setPageIndex(0); setOpen(true); }} aria-label={`${t("Preview CV")}: ${t(cv.title)}`}><Eye className="h-4 w-4" aria-hidden />{t("Preview CV")}</Button>}
    </div>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex max-h-[94dvh] w-[96vw] max-w-5xl flex-col gap-3 overflow-hidden">
        <div className="flex items-center gap-3 pr-6">
          {mascotProfiles[cv.id] && <CulichiMascot variant={mascotProfiles[cv.id]} className="h-12 w-12" decorative />}
          <DialogTitle>{t(cv.title)}</DialogTitle>
        </div>
        <DialogDescription>{t(previews.length > 1 ? "Complete CV — browse all pages" : "First page of the downloadable CV")}{cv.localized && ` · ${lang.toUpperCase()}`}</DialogDescription>
        <div className="flex flex-wrap items-center justify-between gap-3">
        {cv.localized && <LanguageSwitcher compact />}
        {previews.length > 1 && <div role="group" aria-label={t("CV pages")} className="flex items-center gap-2">
          <Button type="button" size="icon" variant="outline" aria-label={t("Previous page")} disabled={currentPage === 0} onClick={() => { setPageIndex(currentPage - 1); setZoom(100); }}><ChevronLeft className="h-4 w-4" aria-hidden /></Button>
          <output aria-live="polite" data-cv-page className="min-w-24 text-center text-sm">{t("Page {page} of {count}").replace("{page}", String(currentPage + 1)).replace("{count}", String(previews.length))}</output>
          <Button type="button" size="icon" variant="outline" aria-label={t("Next page")} disabled={currentPage === previews.length - 1} onClick={() => { setPageIndex(currentPage + 1); setZoom(100); }}><ChevronRight className="h-4 w-4" aria-hidden /></Button>
        </div>}
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t("CV zoom")}>
          <Button size="sm" variant="outline" aria-label={t("Zoom out")} disabled={zoom <= 100} onClick={() => setZoom(value => Math.max(100, value - 25))}><ZoomOut className="h-4 w-4" aria-hidden /></Button>
          <output className="min-w-12 text-center text-sm" aria-live="polite">{zoom}%</output>
          <Button size="sm" variant="outline" aria-label={t("Zoom in")} disabled={zoom >= MAX_CV_ZOOM} onClick={() => setZoom(value => Math.min(MAX_CV_ZOOM, value + 25))}><ZoomIn className="h-4 w-4" aria-hidden /></Button>
          <Button size="sm" variant="ghost" onClick={() => setZoom(100)}><RotateCcw className="h-4 w-4" aria-hidden />{t("Fit width")}</Button>
        </div>
        <div ref={viewport} className="min-h-0 overflow-auto rounded-lg border border-border bg-slate-800 p-2 sm:p-4" role="region" tabIndex={0} aria-label={t("CV preview")}>
          <img src={previews[currentPage]} alt={`${t("CV preview")}: ${t(cv.title)}`} style={{ width: `${zoom}%`, maxWidth: "none" }} className="block h-auto bg-white shadow-xl" />
        </div>
        <Button asChild><a href={assets.file} download target="_blank" rel="noopener noreferrer"><Download className="h-4 w-4" aria-hidden />{t("Download PDF")}</a></Button>
      </DialogContent>
    </Dialog>
  </>;
};
export default CvActions;
