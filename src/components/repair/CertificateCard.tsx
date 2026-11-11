import { useLanguage } from "@/i18n/LanguageProvider";
import Tag from "@/components/shared/Tag";
import ProfileCertificateCard from "@/components/profile/ProfileCertificateCard";
import TrainingCurriculum from "./TrainingCurriculum";
import { trainingProvider, trainingModules, smartphoneSkills } from "@/data/smartphoneRepair";
import { certifications } from "@/data/certifications";

const certificate = certifications.repair!.find(record => record.id === "lidetec")!;

/** The faithful document scan leads; course knowledge stays visible before cases. */
const CertificateCard = () => {
  const { t } = useLanguage();
  return <div id="repair-certification" className="space-y-10">
    <div className="mx-auto max-w-4xl">
      <ProfileCertificateCard record={certificate} visual course={<div className="space-y-4">
        <dl className="grid gap-4 text-sm sm:grid-cols-2">{[
          { k: "Institution", v: `${trainingProvider.name} — ${trainingProvider.fullName}` },
          { k: "Course format", v: trainingProvider.format },
        ].map(row => <div key={row.k}><dt className="text-xs text-muted-foreground">{t(row.k)}</dt><dd className="mt-1">{t(row.v)}</dd></div>)}</dl>
        <p className="text-sm text-muted-foreground">{t("Digitized from the supplied photograph.")}</p>
      </div>} />
    </div>
    <section id="repair-training" className="scroll-mt-40" aria-labelledby="repair-training-title">
      <span id="overview" className="block scroll-mt-40" />
      <h3 id="repair-training-title" className="mb-5 text-xl font-semibold sm:text-2xl">{t("Course syllabus")}</h3>
      <TrainingCurriculum modules={trainingModules} />
      <details id="repair-training-skills" className="mt-6 rounded-xl border border-primary/25 p-4">
        <summary className="min-h-11 cursor-pointer py-2 font-semibold text-primary">{t("Skills developed in training")}</summary>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">{smartphoneSkills.map(group => <div key={group.group} className="rounded-lg border border-border p-4"><h4 className="mb-3 text-sm font-semibold text-primary">{t(group.group)}</h4><ul className="flex flex-wrap gap-2">{group.items.map(skill => <li key={skill}><Tag>{t(skill)}</Tag></li>)}</ul></div>)}</div>
      </details>
    </section>
  </div>;
};
export default CertificateCard;
