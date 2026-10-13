import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { specialtiesFor } from "@/data/specialties";
import type { ProfileSlug } from "@/data/profiles";
import Tag from "@/components/shared/Tag";
import SectionHeading from "@/components/shared/SectionHeading";
import { useLanguage } from "@/i18n/LanguageProvider";

const SpecialtySections = ({ profile }: { profile: ProfileSlug }) => {
  const { t } = useLanguage();
  return <section className="container mx-auto px-4 py-16" aria-label={t("Specialties")}>
    <SectionHeading eyebrow={t("Specialties")} title={t("Explore each area")} />
    <div className="grid gap-4 md:grid-cols-2">
      {specialtiesFor(profile).map((item) => <article key={item.id} id={item.id} className="glass-panel scroll-mt-36 p-6">
        <item.icon className="mb-4 h-7 w-7 text-primary" aria-hidden />
        <Tag variant={(item.status === "Documentation pending" || item.status === "Planned") ? "muted" : "primary"}>{t(item.status)}</Tag>
        <h3 className="mt-3 text-lg font-semibold">{t(item.title)}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(item.description)}</p>
        <Link to={item.destination} className="mt-5 inline-flex items-center gap-2 rounded text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          {t(item.destinationLabel)}<ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </article>)}
    </div>
  </section>;
};
export default SpecialtySections;
