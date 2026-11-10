import { useLanguage } from "@/i18n/LanguageProvider";
import Tag from "@/components/shared/Tag";
import { repairDevelopmentGoals } from "@/data/repairCareer";
import RelatedTraining from "@/components/profile/RelatedTraining";

export default function RepairDevelopment() {
  const { t } = useLanguage();
  return <div data-repair-development className="mt-10 space-y-6">
    <RelatedTraining profile="repair" />
    <div className="rounded-xl border border-primary/25 p-5"><Tag>{t("Development goals")}</Tag><h4 className="mt-3 font-semibold">{t("Next step: Apple device service")}</h4><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("I am willing to pursue specialized training and Apple certifications for a device-service role.")}</p><ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">{repairDevelopmentGoals.map(goal => <li key={goal} className="flex gap-2"><span aria-hidden className="text-primary">·</span>{t(goal)}</li>)}</ul></div>
  </div>;
}
