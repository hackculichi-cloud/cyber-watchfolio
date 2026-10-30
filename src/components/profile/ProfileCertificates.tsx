import { BadgeCheck, Download, FileClock, ExternalLink } from "lucide-react";
import { certifications } from "@/data/certifications";
import type { ProfileSlug } from "@/data/profiles";
import { useLanguage } from "@/i18n/LanguageProvider";
import EmptyCollectionSection from "@/components/shared/EmptyCollectionSection";
import SectionHeading from "@/components/shared/SectionHeading";
import Tag from "@/components/shared/Tag";
import type { ReactNode } from "react";
import CertificateMockup from "./CertificateMockup";
import TrainingProviderBadge from "./TrainingProviderBadge";

/** Documents are not treated as credentials until the owner confirms them. */
const ProfileCertificates = ({ profile, courseContent, headerContent, featuredId }: { profile: ProfileSlug; courseContent?: Record<string, ReactNode>; headerContent?: ReactNode; featuredId?: string }) => {
  const { t, lang } = useLanguage();
  const records = certifications[profile] ?? [];
  if (!records.length && !headerContent) return <EmptyCollectionSection id={profile === "electrical" ? "certificate" : "certifications"} data-certifications={profile} title="Certifications" description="No certificates provided for this area yet." />;
  return <section id={profile === "electrical" ? "certificate" : "certifications"} className="container mx-auto scroll-mt-32 px-4 py-16" data-certifications={profile}>
    <SectionHeading eyebrow={t("Certifications")} title={t("Certificates and pending documents")} description={t("Confirmed training and the documents still to be added. In-progress courses are not completed certifications.")} />
    {headerContent}
    {records.length ? <div className={`grid gap-6 ${courseContent ? "" : "md:grid-cols-2"}`}>{records.map(record => {
      const hasPreview = !!courseContent && (!!record.image || !record.credentialId);
      const downloadOriginal = !!record.credentialId && record.href?.endsWith(".pdf");
      return <article key={record.id} id={`certificate-${record.id}`} tabIndex={-1} data-certificate={record.id} data-certificate-record={record.credentialId ? record.id : undefined} className={`scroll-mt-64 rounded-xl border p-5 outline-none focus-visible:ring-2 focus-visible:ring-primary sm:p-6 ${record.id === featuredId ? "border-primary/40 bg-primary/5" : "border-border bg-surface/50"}`}>
      {featuredId && <p data-training-role={record.id === featuredId ? "main" : "complementary"} className={`mb-4 text-sm font-bold ${record.id === featuredId ? "text-primary" : "text-muted-foreground"}`}>{t(record.id === featuredId ? "Main training" : "Complementary courses")}</p>}
      <div className={hasPreview ? "grid gap-6 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)]" : ""}>
      {hasPreview && <CertificateMockup record={record} />}
      <div className="min-w-0">
      <div className="flex items-start justify-between gap-3">{record.training === "Completed" ? <BadgeCheck className="h-5 w-5 shrink-0 text-primary" aria-hidden /> : <FileClock className="h-5 w-5 shrink-0 text-primary" aria-hidden />}<Tag variant={record.training === "Completed" ? "primary" : "muted"}>{t(record.training)}</Tag></div>
      <h3 className="mt-4 text-base font-semibold">{t(record.title)}</h3>
      {record.providerId ? <div className="mt-3"><TrainingProviderBadge id={record.providerId} /></div> : <p className="mt-2 text-xs text-primary">{t(record.provider)}</p>}
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(record.document)}</p>
      {(record.awardedTo || record.instructor || record.issuedOn || record.duration || record.credentialId) && <dl data-certificate-details className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        {record.awardedTo && <div className="sm:col-span-2"><dt className="text-xs text-muted-foreground">{t("Awarded to")}</dt><dd className="mt-1 font-medium">{record.awardedTo}</dd></div>}
        {record.instructor && <div><dt className="text-xs text-muted-foreground">{t("Instructor")}</dt><dd className="mt-1">{record.instructor}</dd></div>}
        {record.issuedOn && <div><dt className="text-xs text-muted-foreground">{t("Date of completion")}</dt><dd className="mt-1"><time dateTime={record.issuedOn}>{new Intl.DateTimeFormat(lang === "es" ? "es-MX" : "en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${record.issuedOn}T00:00:00Z`))}</time></dd></div>}
        {record.duration && <div><dt className="text-xs text-muted-foreground">{t("Course duration")}</dt><dd className="mt-1">{t(record.duration)}</dd></div>}
        {record.credentialId && <div className="sm:col-span-2"><dt className="text-xs text-muted-foreground">{t("Certificate ID")}</dt><dd className="mt-1 break-all font-mono text-xs leading-relaxed">{record.credentialId}</dd></div>}
      </dl>}
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
      {record.href && <a href={record.href} download={downloadOriginal || undefined} target={!downloadOriginal && record.href.startsWith("/") ? "_blank" : undefined} rel={!downloadOriginal && record.href.startsWith("/") ? "noopener noreferrer" : undefined} className="inline-flex min-h-11 items-center gap-2 rounded text-sm text-primary underline focus-visible:ring-2 focus-visible:ring-primary">{t(downloadOriginal ? "Download PDF" : "View document")}{downloadOriginal ? <Download className="h-4 w-4" aria-hidden /> : <ExternalLink className="h-4 w-4" aria-hidden />}</a>}
      {record.verifyUrl && <a href={record.verifyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded text-sm text-primary underline focus-visible:ring-2 focus-visible:ring-primary">{t("View Udemy credential")}<ExternalLink className="h-4 w-4" aria-hidden /></a>}
      </div>
      {courseContent?.[record.id] && <div className="mt-5 border-t border-border pt-5">{courseContent[record.id]}</div>}
      </div>
      </div>
    </article>; })}</div> : <p className="rounded-lg border border-dashed border-border p-5 text-sm text-muted-foreground">{t("No certificates provided for this area yet.")}</p>}
  </section>;
};
export default ProfileCertificates;
