import { useRef, useState } from "react";
import { Download, Expand } from "lucide-react";
import type { CertificationRecord } from "@/data/certifications";
import { useLanguage } from "@/i18n/LanguageProvider";
import DetailModal from "@/components/shared/DetailModal";

/** Shared document presentation for supplied PDFs and faithful photographic scans. */
export default function CertificateDocumentPreview({ record, label }: { record: CertificationRecord; label?: string }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLButtonElement>(null);
  if (!record.image) return null;
  const image = record.image;
  return <div data-certificate-original={record.id} data-digitized-document={record.digitized || undefined}>
    <button ref={opener} type="button" onClick={() => setOpen(true)} aria-label={label ? t(label) : record.digitized ? t("View certificate") : `${t("Enlarge original certificate")}: ${t(record.title)}`} className="block w-full rounded-lg border border-primary/30 bg-white text-left outline-none focus-visible:ring-2 focus-visible:ring-primary">
      <img src={image.src} alt={t(image.alt)} width={image.width} height={image.height} loading="lazy" decoding="async" className="block h-auto w-full rounded-t-lg bg-white" />
      <span className="flex min-h-11 items-center justify-between gap-2 rounded-b-lg bg-background px-3 py-2 text-xs text-primary">{t(record.digitized ? "View certificate" : "View original certificate")}<Expand className="h-4 w-4" aria-hidden /></span>
    </button>
    <DetailModal open={open} onOpenChange={setOpen} returnFocusRef={opener} showLanguageSwitcher={false} title={t(record.title)} subtitle={t(record.digitized ? "Digitized participation certificate" : "Original certificate supplied by the author")}>
      <img src={image.src} alt={t(image.alt)} width={image.width} height={image.height} decoding="async" className="h-auto w-full rounded-lg bg-white" />
      {record.digitized && record.href && <a href={record.href} download className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 text-sm font-semibold text-primary focus-visible:ring-2 focus-visible:ring-primary"><Download className="h-4 w-4" aria-hidden />{t("Download PDF")}</a>}
    </DetailModal>
  </div>;
}
