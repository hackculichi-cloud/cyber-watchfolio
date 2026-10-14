import { useState } from "react";
import { Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cvAssets, type CvVariant } from "@/data/cvs";
import CvPreview from "./CvPreview";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

/** Same localized download and actual-PDF first-page preview on every CV entry point. */
const CvActions = ({ cv }: { cv: CvVariant }) => {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const assets = cvAssets(cv, lang);
  if (!cv.available) return <Button size="sm" disabled variant="secondary">{t("Not published yet")}</Button>;
  return <>
    <div className="flex flex-wrap gap-2">
      <CvPreview preview={assets.preview} title={t(cv.title)}>
        <Button asChild size="sm"><a href={assets.file} download target="_blank" rel="noopener noreferrer" aria-label={`${t("Download PDF")}: ${t(cv.title)}`}><Download className="h-4 w-4" aria-hidden />{t("Download PDF")}{cv.localized && ` · ${lang.toUpperCase()}`}</a></Button>
      </CvPreview>
      {assets.preview && <Button type="button" size="sm" variant="outline" onClick={() => setOpen(true)} aria-label={`${t("Preview CV")}: ${t(cv.title)}`}><Eye className="h-4 w-4" aria-hidden />{t("Preview CV")}</Button>}
    </div>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[94dvh] max-w-3xl overflow-y-auto">
        <DialogTitle>{t(cv.title)}</DialogTitle>
        <DialogDescription>{t("First page of the downloadable CV")}{cv.localized && ` · ${lang.toUpperCase()}`}</DialogDescription>
        {cv.localized && <LanguageSwitcher compact />}
        <img src={assets.preview} alt={`${t("CV preview")}: ${t(cv.title)}`} className="max-h-[70dvh] w-full rounded border border-border bg-white object-contain" />
        <Button asChild><a href={assets.file} download target="_blank" rel="noopener noreferrer"><Download className="h-4 w-4" aria-hidden />{t("Download PDF")}</a></Button>
      </DialogContent>
    </Dialog>
  </>;
};
export default CvActions;
