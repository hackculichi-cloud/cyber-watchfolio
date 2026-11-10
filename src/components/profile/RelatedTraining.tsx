import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { relatedTrainingFor } from "@/data/certifications";
import type { ProfileSlug } from "@/data/profiles";
import { useLanguage } from "@/i18n/LanguageProvider";
import Tag from "@/components/shared/Tag";

export default function RelatedTraining({ profile }: { profile: ProfileSlug }) {
  const { t } = useLanguage();
  const courses = relatedTrainingFor(profile);
  if (!courses.length) return null;
  return <section data-related-training={profile} aria-label={t("Related courses")} className="mt-8">
    <h3 className="mb-4 text-xl font-semibold">{t("Related courses")}</h3>
    <div className={`grid gap-4 ${courses.length === 3 ? "md:grid-cols-3" : "sm:grid-cols-2"}`}>{courses.map(({ record, href, summary }) => <Link key={record.id} data-related-course={record.id} to={href} className="flex flex-col rounded-xl border border-border bg-surface/60 p-5 outline-none hover:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary">
      <div className="mb-3"><Tag variant={record.training === "Completed" ? "primary" : "muted"}>{t(record.training)}</Tag></div>
      <h4 className="font-semibold">{t(record.title)}</h4><p className="mt-1 text-xs text-primary">{record.provider}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{t(summary)}</p>
      <span className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">{t("View course")}<ArrowUpRight className="h-4 w-4" aria-hidden /></span>
    </Link>)}</div>
  </section>;
}
