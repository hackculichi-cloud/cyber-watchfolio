import { FileClock, ExternalLink } from "lucide-react";
import { certifications } from "@/data/certifications";
import type { ProfileSlug } from "@/data/profiles";
import { useLanguage } from "@/i18n/LanguageProvider";
import SectionHeading from "@/components/shared/SectionHeading";
import Tag from "@/components/shared/Tag";
import type { ReactNode } from "react";
import CertificateMockup from "./CertificateMockup";
import TrainingProviderBadge from "./TrainingProviderBadge";

/** Documents are not treated as credentials until the owner confirms them. */
const ProfileCertificates = ({ profile, courseContent, headerContent }: { profile: ProfileSlug; courseContent?: Record<string, ReactNode>; headerContent?: ReactNode }) => {
  const { t } = useLanguage();
  const records = certifications[profile] ?? [];
  return <section id={profile === "electrical" ? "certificate" : "certifications"} className="container mx-auto scroll-mt-32 px-4 py-16" data-certifications={profile}>
    <SectionHeading eyebrow={t("Certifications")} title={t("Certificates and pending documents")} description={t("Confirmed training and the documents still to be added. In-progress courses are not completed certifications.")} />
    {headerContent}
    {records.length ? <div className={`grid gap-6 ${courseContent ? "" : "md:grid-cols-2"}`}>{records.map(record => <article key={record.id} data-certificate={record.id} className="rounded-xl border border-border bg-surface/50 p-5 sm:p-6">
      <div className={courseContent ? "grid gap-6 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)]" : ""}>
      {courseContent && <CertificateMockup record={record} />}
      <div className="min-w-0">
      <div className="flex items-start justify-between gap-3"><FileClock className="h-5 w-5 shrink-0 text-primary" aria-hidden /><Tag variant={record.training === "Completed" ? "primary" : "muted"}>{t(record.training)}</Tag></div>
      <h3 className="mt-4 text-base font-semibold">{t(record.title)}</h3>
      {record.providerId ? <div className="mt-3"><TrainingProviderBadge id={record.providerId} /></div> : <p className="mt-2 text-xs text-primary">{t(record.provider)}</p>}
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(record.document)}</p>
      {record.href && <a href={record.href} className="mt-4 inline-flex items-center gap-2 rounded text-sm text-primary underline focus-visible:ring-2 focus-visible:ring-primary">{t("View document")}<ExternalLink className="h-4 w-4" aria-hidden /></a>}
      {courseContent?.[record.id] && <div className="mt-5 border-t border-border pt-5">{courseContent[record.id]}</div>}
      </div>
      </div>
    </article>)}</div> : <p className="rounded-lg border border-dashed border-border p-5 text-sm text-muted-foreground">{t("No certificates provided for this area yet.")}</p>}
  </section>;
};
export default ProfileCertificates;
