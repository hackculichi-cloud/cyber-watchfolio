import { useLanguage } from "@/i18n/LanguageProvider";
import { useState } from "react";
import { Award, ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Tag from "@/components/shared/Tag";
import TrainingCurriculum from "./TrainingCurriculum";
import { trainingProvider, trainingModules, smartphoneSkills } from "@/data/smartphoneRepair";

/** Certificate preview card with a lightbox viewer. Only certificate-visible data is shown. */
const CertificateCard = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div id="repair-certification" className="panel-glow grid gap-6 md:grid-cols-[minmax(0,320px)_1fr]">
      {trainingProvider.image ? <button
        type="button"
        onClick={() => setOpen(true)}
        style={{ padding: 0 }}
        className="group relative overflow-hidden rounded-lg border border-border"
        aria-label={t("View certificate")}
      >
        <img
          src={trainingProvider.image}
          alt={t(`${trainingProvider.course} certificate issued by ${trainingProvider.name}`)}
          loading="lazy"
          decoding="async"
          style={{ rotate: `${trainingProvider.imageRotation}deg` }}
          className="h-full max-h-72 w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute inset-0 grid place-items-center bg-background/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ZoomIn className="h-5 w-5 text-primary" aria-hidden />
        </span>
      </button> : <div className="grid min-h-48 place-items-center rounded-lg border border-border p-6 text-center text-sm text-muted-foreground">{t("Certificate photo pending upload")}</div>}

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="glow-ring grid h-10 w-10 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
            <Award className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              {t(trainingProvider.name)}
            </p>
            <h3 className="text-base font-semibold">{t(trainingProvider.course)}</h3>
          </div>
        </div>

        <dl className="grid gap-3 sm:grid-cols-2">
          {[
            { k: "Institution", v: `${trainingProvider.name} — ${trainingProvider.fullName}` },
            { k: "Document", v: trainingProvider.document },
            { k: "Issued", v: `${trainingProvider.location}, ${trainingProvider.certificateDate}` },
            { k: "Instructor", v: trainingProvider.instructor },
          ].map((row) => (
            <div key={row.k} className="rounded-lg border border-border bg-surface-2/40 p-3">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{t(row.k)}</dt>
              <dd className="mt-1 text-sm text-foreground/90">{t(row.v)}</dd>
            </div>
          ))}
        </dl>

        <Tag variant="accent">{t("Certificate of participation")}</Tag>

        {trainingProvider.image && <Button variant="outline" onClick={() => setOpen(true)}>{t("View certificate")}</Button>}
      </div>

      <div className="md:col-span-2">
        <details id="repair-training" className="panel-glow mt-6">
          <summary className="cursor-pointer rounded text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t("Course syllabus")}</summary>
          <p className="my-4 text-sm text-muted-foreground">{t("Topics studied in the LIDETEC course. Practical repair evidence is documented separately below.")}</p>
          <TrainingCurriculum modules={trainingModules} />
        </details>
        <div id="repair-training-skills" className="mt-6 space-y-4">
          <h4 className="text-lg font-semibold">{t("Skills developed in training")}</h4>
          <div className="grid gap-4 sm:grid-cols-2">
            {smartphoneSkills.map(group => <div key={group.group} className="rounded-lg border border-border bg-surface-2/40 p-4">
              <h5 className="mb-3 text-sm font-semibold text-primary">{t(group.group)}</h5>
              <ul className="flex flex-wrap gap-2">{group.items.map(skill => <li key={skill}><Tag>{t(skill)}</Tag></li>)}</ul>
            </div>)}
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogTitle className="text-base">
            {t(trainingProvider.course)} — {t(trainingProvider.name)}
          </DialogTitle>
          <DialogDescription className="sr-only">{t("Certificate of participation issued by ")}{t(trainingProvider.name)}
          </DialogDescription>
          {trainingProvider.image && <img
            src={trainingProvider.image}
            alt={t(`${trainingProvider.course} certificate issued by ${trainingProvider.name}`)}
            style={{ rotate: `${trainingProvider.imageRotation}deg` }}
            className="max-h-[75vh] w-full rounded-lg border border-border object-contain"
          />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CertificateCard;
