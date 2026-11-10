import { ArrowUpRight, BadgeCheck, BookOpen, Download, ExternalLink, FileClock } from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import type { CertificationRecord } from "@/data/certifications";
import { useLanguage } from "@/i18n/LanguageProvider";
import Tag from "@/components/shared/Tag";
import CertificateMockup from "./CertificateMockup";
import { TrainingProviderLogo } from "./TrainingProviderBadge";

function CertificateInformation({ record, downloadOriginal, course }: { record: CertificationRecord; downloadOriginal: boolean; course?: ReactNode }) {
  const { t, lang } = useLanguage();
  return <div data-certificate-information-content>
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(record.document)}</p>
    {(record.awardedTo || record.instructor || record.issuedOn || record.duration || record.contactHours !== undefined || record.credentialId) && <dl data-certificate-details className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
      {record.awardedTo && <div className="sm:col-span-2"><dt className="text-xs text-muted-foreground">{t("Awarded to")}</dt><dd className="mt-1 font-medium">{record.awardedTo}</dd></div>}
      {record.instructor && <div><dt className="text-xs text-muted-foreground">{t("Instructor")}</dt><dd className="mt-1">{record.instructor}</dd></div>}
      {record.issuedOn && <div><dt className="text-xs text-muted-foreground">{t(record.digitized ? "Issued" : "Date of completion")}</dt><dd className="mt-1"><time dateTime={record.issuedOn}>{new Intl.DateTimeFormat(lang === "es" ? "es-MX" : "en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${record.issuedOn}T00:00:00Z`))}</time></dd></div>}
      {record.duration && <div><dt className="text-xs text-muted-foreground">{t("Course duration")}</dt><dd className="mt-1">{t(record.duration)}</dd></div>}
      {record.contactHours !== undefined && <div><dt className="text-xs text-muted-foreground">{t("PDUs / contact hours")}</dt><dd className="mt-1">{new Intl.NumberFormat(lang === "es" ? "es-MX" : "en-US").format(record.contactHours)}</dd></div>}
      {record.credentialId && <div className="sm:col-span-2"><dt className="text-xs text-muted-foreground">{t("Certificate ID")}</dt><dd className="mt-1 break-all font-mono text-xs leading-relaxed">{record.credentialId}</dd></div>}
    </dl>}
    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
      {record.href && <a href={record.href} download={downloadOriginal || undefined} target={!downloadOriginal && record.href.startsWith("/") ? "_blank" : undefined} rel={!downloadOriginal && record.href.startsWith("/") ? "noopener noreferrer" : undefined} className="inline-flex min-h-11 items-center gap-2 rounded text-sm text-primary underline focus-visible:ring-2 focus-visible:ring-primary">{t(downloadOriginal ? "Download PDF" : "View document")}{downloadOriginal ? <Download className="h-4 w-4" aria-hidden /> : <ExternalLink className="h-4 w-4" aria-hidden />}</a>}
      {record.verifyUrl && <a href={record.verifyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded text-sm text-primary underline focus-visible:ring-2 focus-visible:ring-primary">{t("View Udemy credential")}<ExternalLink className="h-4 w-4" aria-hidden /></a>}
      {record.sourcePhoto && <a href={record.sourcePhoto} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded text-sm text-primary underline focus-visible:ring-2 focus-visible:ring-primary">{t("View supplied photograph")}<ExternalLink className="h-4 w-4" aria-hidden /></a>}
    </div>
    {course && <div className="mt-5 border-t border-border pt-5">{course}</div>}
  </div>;
}

type Props = {
  record: CertificationRecord;
  id?: string;
  visual?: boolean;
  allowPlaceholder?: boolean;
  trainingRole?: "main" | "complementary";
  course?: ReactNode;
  relatedHref?: string;
  decoration?: ReactNode;
};

/** The same actual document, status and actions in its main and supporting areas. */
export default function ProfileCertificateCard({ record, id = `certificate-${record.id}`, visual = false, allowPlaceholder = false, trainingRole, course, relatedHref, decoration }: Props) {
  const { t } = useLanguage();
  const hasPreview = !!record.image || (allowPlaceholder && !record.credentialId);
  const downloadOriginal = !!(record.href?.endsWith(".pdf") && (record.credentialId || record.digitized));
  return <article id={id} tabIndex={-1} data-certificate={record.id} data-related-course={relatedHref ? record.id : undefined} data-certificate-provider={record.providerId} data-certificate-record={record.credentialId ? record.id : undefined} className={`certificate-card relative scroll-mt-64 rounded-xl border p-5 outline-none focus-visible:ring-2 focus-visible:ring-primary sm:p-6 ${trainingRole === "main" ? "border-primary/40 bg-primary/5" : "border-border bg-surface/50"}`}>
    {decoration}
    {trainingRole && <p data-training-role={trainingRole} className={`mb-4 text-sm font-bold ${trainingRole === "main" || record.image ? "text-primary" : "text-muted-foreground"}`}>{t(record.image ? "Original document" : trainingRole === "main" ? "Main training" : "Complementary courses")}</p>}
    {hasPreview && <CertificateMockup record={record} />}
    <div className={hasPreview ? "mt-4 min-w-0" : "min-w-0"}>
      <div className="flex items-start justify-between gap-3">{record.training === "Completed" ? <BadgeCheck className="h-5 w-5 shrink-0 text-primary" aria-hidden /> : <FileClock className="h-5 w-5 shrink-0 text-primary" aria-hidden />}<Tag variant={record.training === "Completed" ? "primary" : "muted"}>{t(record.training)}</Tag></div>
      <h3 className={visual ? "mt-4 text-lg font-semibold" : "mt-4 text-base font-semibold"}>{t(record.title)}</h3>
      {record.providerId ? <div className="mt-2"><TrainingProviderLogo id={record.providerId} /></div> : <p className="mt-2 text-sm text-muted-foreground">{t(record.provider)}</p>}
      <details data-certificate-info={record.id} className="mt-5 border-t border-border pt-3 [&[open]>summary>span]:rotate-45">
        <summary className="menu-choice flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-lg px-2 text-sm font-semibold text-primary [&::-webkit-details-marker]:hidden"><BookOpen aria-hidden className="h-4 w-4" />{t(visual ? "View course information and syllabus" : "View document details")}<span aria-hidden className="ml-auto">+</span></summary>
        <CertificateInformation record={record} downloadOriginal={downloadOriginal} course={course} />
      </details>
      {relatedHref && <Link to={relatedHref} className="mt-3 inline-flex min-h-11 items-center gap-2 rounded text-sm font-semibold text-primary underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-primary">{t("View full course")}<ArrowUpRight className="h-4 w-4" aria-hidden /></Link>}
    </div>
  </article>;
}
