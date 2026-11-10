import { Link } from "react-router-dom";
import { ArrowUpRight, Headset } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import SectionHeading from "@/components/shared/SectionHeading";
import { repairSupportExperience, repairServiceHeadline } from "@/data/repairCareer";

export default function RepairCareerBridge() {
  const { t } = useLanguage();
  return <section id="support-experience" data-repair-career className="container mx-auto scroll-mt-40 px-4 py-10">
    <SectionHeading title={t("Professional technical support")} description={t(repairServiceHeadline)} />
    <div className="grid gap-4 lg:grid-cols-3">{repairSupportExperience.map(entry => <article key={entry.id} data-support-role={entry.id} className="rounded-xl border border-primary/25 bg-surface/70 p-5">
      <div className="flex items-center gap-2 text-primary"><Headset className="h-5 w-5 shrink-0" aria-hidden /><p className="text-sm font-semibold">{entry.organization}</p></div>
      <h3 className="mt-3 font-semibold">{t(entry.title)}</h3><p className="mt-2 text-xs text-muted-foreground">{t(entry.period)}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(entry.summary)}</p>
    </article>)}</div>
    <Link to="/experience#background" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded text-sm font-semibold text-primary underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-primary">{t("View professional experience")}<ArrowUpRight className="h-4 w-4" aria-hidden /></Link>
  </section>;
}
