import { relatedTrainingFor } from "@/data/certifications";
import type { ProfileSlug } from "@/data/profiles";
import { useLanguage } from "@/i18n/LanguageProvider";
import ProfileCertificateCard from "./ProfileCertificateCard";

export default function RelatedTraining({ profile }: { profile: ProfileSlug }) {
  const { t } = useLanguage();
  const courses = relatedTrainingFor(profile);
  if (!courses.length) return null;
  const documents = courses.filter(course => course.record.image);
  const otherStudies = courses.filter(course => !course.record.image);
  const card = ({ record, href, summary }: typeof courses[number]) => <ProfileCertificateCard key={record.id} id={`related-certificate-${profile}-${record.id}`} record={record} visual={!!record.image} relatedHref={href} course={<p className="text-sm leading-relaxed text-muted-foreground">{t(summary)}</p>} />;
  return <section data-related-training={profile} aria-label={t("Related courses")} className="mt-8">
    <h3 className="mb-4 text-xl font-semibold">{t("Related courses")}</h3>
    {documents.length > 0 && <div data-related-certificates className={`grid items-start gap-6 ${documents.length === 1 ? "mx-auto max-w-4xl" : "md:grid-cols-2"} ${documents.length > 1 && documents.length % 2 ? "[&>article:last-child]:md:col-span-2 [&>article:last-child]:md:w-[calc(50%-0.75rem)] [&>article:last-child]:md:justify-self-center" : ""}`}>{documents.map(card)}</div>}
    {otherStudies.length > 0 && <div data-related-ongoing-studies className="mx-auto mt-6 grid max-w-4xl gap-4">{otherStudies.map(card)}</div>}
  </section>;
}
