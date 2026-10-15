import CulichiMascot from "./CulichiMascot";
import type { ProfileSlug } from "@/data/profiles";
import { useState } from "react";
import { Download, Eye, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cvAssets, type CvVariant } from "@/data/cvs";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

/** Same localized download and actual-PDF first-page preview on every CV entry point. */
const CvActions = ({ cv }: { cv: CvVariant }) => {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const assets = cvAssets(cv, lang);
  const mascotProfiles: Record<string, ProfileSlug> = { cybersecurity: "cybersecurity", software: "development", electrical: "electrical", electronics: "electronics", repair: "repair", "customer-service": "customer-service" };
  if (!cv.available) return <Button size="sm" disabled variant="secondary">{t("Not published yet")}</Button>;
  return <>
    <div className="flex flex-wrap gap-2">
      <Button asChild size="sm"><a href={assets.file} download target="_blank" rel="noopener noreferrer" aria-label={`${t("Download PDF")}: ${t(cv.title)}`}><Download className="h-4 w-4" aria-hidden />{t("Download PDF")}{cv.localized && ` · ${lang.toUpperCase()}`}</a></Button>
      {assets.preview && <Button type="button" size="sm" variant="outline" onClick={() => { setZoom(100); setOpen(true); }} aria-label={`${t("Preview CV")}: ${t(cv.title)}`}><Eye className="h-4 w-4" aria-hidden />{t("Preview CV")}</Button>}
    </div>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex max-h-[94dvh] w-[96vw] max-w-5xl flex-col gap-3 overflow-hidden">
        <div className="flex items-center gap-3 pr-6">
          {mascotProfiles[cv.id] && <CulichiMascot variant={mascotProfiles[cv.id]} className="h-12 w-12" decorative />}
          <DialogTitle>{t(cv.title)}</DialogTitle>
        </div>
        <DialogDescription>{t("First page of the downloadable CV")}{cv.localized && ` · ${lang.toUpperCase()}`}</DialogDescription>
        {cv.localized && <LanguageSwitcher compact />}
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t("CV zoom")}>
          <Button size="sm" variant="outline" aria-label={t("Zoom out")} disabled={zoom <= 100} onClick={() => setZoom(value => Math.max(100, value - 25))}><ZoomOut className="h-4 w-4" aria-hidden /></Button>
          <output className="min-w-12 text-center text-sm" aria-live="polite">{zoom}%</output>
          <Button size="sm" variant="outline" aria-label={t("Zoom in")} disabled={zoom >= 200} onClick={() => setZoom(value => Math.min(200, value + 25))}><ZoomIn className="h-4 w-4" aria-hidden /></Button>
          <Button size="sm" variant="ghost" onClick={() => setZoom(100)}><RotateCcw className="h-4 w-4" aria-hidden />{t("Fit width")}</Button>
        </div>
        <div className="min-h-0 overflow-auto rounded-lg border border-border bg-slate-800 p-2 sm:p-4" tabIndex={0} aria-label={t("CV preview")}>
          <img src={assets.preview} alt={`${t("CV preview")}: ${t(cv.title)}`} style={{ width: `${zoom}%`, maxWidth: "none" }} className="block h-auto bg-white shadow-xl" />
        </div>
        <Button asChild><a href={assets.file} download target="_blank" rel="noopener noreferrer"><Download className="h-4 w-4" aria-hidden />{t("Download PDF")}</a></Button>
      </DialogContent>
    </Dialog>
  </>;
};
export default CvActions;
