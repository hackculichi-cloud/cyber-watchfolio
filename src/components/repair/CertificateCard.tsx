import { useLanguage } from "@/i18n/LanguageProvider";
import { useRef, useState } from "react";
import { ExternalLink, Expand } from "lucide-react";
import Tag from "@/components/shared/Tag";
import DetailModal from "@/components/shared/DetailModal";
import TrainingCurriculum from "./TrainingCurriculum";
import { trainingProvider, trainingModules, smartphoneSkills } from "@/data/smartphoneRepair";

/** The original document leads; course knowledge stays visible before the cases. */
const CertificateCard = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLButtonElement>(null);
  return <div id="repair-certification" className="space-y-10">
    <article data-repair-certificate className="mx-auto max-w-4xl rounded-xl border border-primary/35 bg-surface/60 p-4 sm:p-6">
      <button ref={opener} type="button" onClick={() => setOpen(true)} aria-label={t("View certificate")} className="block w-full overflow-hidden rounded-lg border border-primary/35 bg-background text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <img src={trainingProvider.image} alt={t(`${trainingProvider.course} certificate issued by ${trainingProvider.name}`)} loading="lazy" decoding="async" style={{ rotate: `${trainingProvider.imageRotation}deg` }} className="block h-auto w-full object-contain" />
        <span className="flex min-h-11 items-center justify-between gap-3 border-t border-primary/25 px-3 text-sm text-primary">{t("View original certificate")}<Expand className="h-4 w-4" aria-hidden /></span>
      </button>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <a data-repair-school href={trainingProvider.website} target="_blank" rel="noopener noreferrer" aria-label={t("Visit LIDETEC website")} className="lidetec-neon inline-flex min-h-11 flex-col justify-center rounded-lg px-2 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <span className="text-2xl font-bold tracking-[.12em]">{trainingProvider.name}</span><span className="text-xs">{trainingProvider.fullName}</span>
        </a>
        <Tag variant="accent">{t("Certificate of participation")}</Tag>
      </div>
      <details className="mt-4 border-t border-border pt-3"><summary className="min-h-11 cursor-pointer py-2 text-sm font-semibold text-primary">{t("View document details")}</summary>
        <dl className="mt-3 grid gap-4 text-sm sm:grid-cols-2">{[
          { k: "Institution", v: `${trainingProvider.name} — ${trainingProvider.fullName}` },
          { k: "Document", v: trainingProvider.document },
          { k: "Issued", v: `${trainingProvider.location}, ${trainingProvider.certificateDate}` },
          { k: "Instructor", v: trainingProvider.instructor },
        ].map(row => <div key={row.k}><dt className="text-xs text-muted-foreground">{t(row.k)}</dt><dd className="mt-1">{t(row.v)}</dd></div>)}</dl>
        <a href={trainingProvider.website} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-primary underline">{t("Visit LIDETEC website")}<ExternalLink className="h-4 w-4" aria-hidden /></a>
      </details>
    </article>
    <section id="repair-training" className="scroll-mt-40" aria-labelledby="repair-training-title">
      <h3 id="repair-training-title" className="mb-5 text-xl font-semibold sm:text-2xl">{t("What I learned in this course")}</h3>
      <TrainingCurriculum modules={trainingModules} />
      <details id="repair-training-skills" className="mt-6 rounded-xl border border-primary/25 p-4">
        <summary className="min-h-11 cursor-pointer py-2 font-semibold text-primary">{t("Skills developed in training")}</summary>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">{smartphoneSkills.map(group => <div key={group.group} className="rounded-lg border border-border p-4"><h4 className="mb-3 text-sm font-semibold text-primary">{t(group.group)}</h4><ul className="flex flex-wrap gap-2">{group.items.map(skill => <li key={skill}><Tag>{t(skill)}</Tag></li>)}</ul></div>)}</div>
      </details>
    </section>
    <DetailModal open={open} onOpenChange={setOpen} returnFocusRef={opener} profile="repair" title={`${t(trainingProvider.course)} — ${trainingProvider.name}`} subtitle={t("Certificate of participation")} showLanguageSwitcher={false}>
      <img src={trainingProvider.image} alt={t(`${trainingProvider.course} certificate issued by ${trainingProvider.name}`)} style={{ rotate: `${trainingProvider.imageRotation}deg` }} className="max-h-[75vh] w-full rounded-lg object-contain" />
    </DetailModal>
  </div>;
};
export default CertificateCard;
