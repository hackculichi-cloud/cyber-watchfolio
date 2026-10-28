import { useState } from "react";
import { Expand } from "lucide-react";
import paper from "@/assets/electrical-certificate-paper.webp";
import type { CertificationRecord } from "@/data/certifications";
import { site } from "@/data/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import DetailModal from "@/components/shared/DetailModal";
import { ProviderMark } from "./TrainingProviderBadge";

function MockupPaper({ record }: { record: CertificationRecord }) {
  const { t } = useLanguage();
  return <div data-certificate-mockup={record.id} className="relative aspect-[3/2] w-full overflow-hidden rounded bg-[#faf9f4] text-slate-900 [container-type:inline-size]">
    <img src={paper} alt="" aria-hidden width={1536} height={1024} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
    <span aria-hidden className="pointer-events-none absolute inset-0 grid -rotate-12 place-items-center text-[14cqw] font-black tracking-widest text-slate-900/[0.06]">MOCKUP</span>
    <div className="absolute inset-[9%] flex flex-col items-center justify-center text-center">
      <div className="mb-[3cqw] flex items-center justify-center gap-[2cqw]">
        {record.providerId && <ProviderMark id={record.providerId} className="h-[8cqw] w-[8cqw]" />}
        <span className="text-[3.3cqw] font-bold leading-tight">{record.provider}</span>
      </div>
      <span className="text-[2.7cqw] font-semibold uppercase tracking-[.15em] text-amber-800">{t("Provisional document preview")}</span>
      <span className="mt-[3cqw] text-[4cqw] font-bold leading-tight">{t(record.title)}</span>
      <span className="mt-[3cqw] text-[3.4cqw] font-medium">{site.name}</span>
      <span className="mt-[3cqw] rounded border border-amber-600/40 bg-amber-100/90 px-[2cqw] py-[1cqw] text-[2.7cqw] font-bold">{t("MOCKUP · Original pending")}</span>
    </div>
  </div>;
}

/** Clearly marked visual sample: no fabricated dates, signatures or credential numbers. */
export default function CertificateMockup({ record }: { record: CertificationRecord }) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  return <div data-certificate-placeholder>
    <button type="button" onClick={() => setOpen(true)} aria-label={`${t("Enlarge provisional certificate")}: ${t(record.title)}`} className="block w-full rounded-lg border border-primary/30 text-left shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-primary">
      <span aria-hidden className="block"><MockupPaper record={record} /></span>
      <span className="flex items-center justify-between gap-2 rounded-b-lg bg-background px-3 py-2 text-xs text-primary">{t("View mockup")}<Expand className="h-4 w-4" aria-hidden /></span>
    </button>
    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{t("Visual mockup only. The original document will replace this preview when provided.")}</p>
    <DetailModal open={open} onOpenChange={setOpen} title={t("Provisional document preview")} subtitle={t("Visual mockup only. The original document will replace this preview when provided.")}><MockupPaper record={record} /></DetailModal>
  </div>;
}
