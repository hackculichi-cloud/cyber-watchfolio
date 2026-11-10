import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageProvider";
import Tag from "@/components/shared/Tag";
import { repairDevelopmentGoals } from "@/data/repairCareer";

export default function RepairDevelopment() {
  const { t } = useLanguage();
  return <div data-repair-development className="mt-10 space-y-6">
    <h3 className="text-xl font-semibold">{t("Supporting studies & next steps")}</h3>
    <div className="grid gap-4 sm:grid-cols-2">
      <Link to="/electronics#basic-electronics" className="rounded-xl border border-border bg-surface/60 p-5 outline-none hover:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary"><Tag>{t("In progress")}</Tag><h4 className="mt-3 font-semibold">{t("Basic Electronics")} · ETO</h4><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("Components, measurement and circuit diagnosis in an ongoing electronics program.")}</p></Link>
      <Link to="/electrical#certificate-electrical-measurements" className="rounded-xl border border-border bg-surface/60 p-5 outline-none hover:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary"><Tag variant="primary">{t("Completed")}</Tag><h4 className="mt-3 font-semibold">{t("Electrical Measurements")} · Udemy</h4><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("Multimeter, voltage, resistance and continuity coursework that complements device diagnostics.")}</p></Link>
    </div>
    <div className="rounded-xl border border-primary/25 p-5"><Tag>{t("Development goals")}</Tag><h4 className="mt-3 font-semibold">{t("Next step: Apple device service")}</h4><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("I am willing to pursue specialized training and Apple certifications for a device-service role.")}</p><ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">{repairDevelopmentGoals.map(goal => <li key={goal} className="flex gap-2"><span aria-hidden className="text-primary">·</span>{t(goal)}</li>)}</ul></div>
  </div>;
}
