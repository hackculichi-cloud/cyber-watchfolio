import { useLanguage } from "@/i18n/LanguageProvider";
import Seo from "@/components/shared/Seo";
import { PhoneCall, Headset, ListChecks, Handshake } from "lucide-react";
import ProfileHero from "@/components/profile/ProfileHero";
import ProfileSectionNav from "@/components/profile/ProfileSectionNav";
import { profileBySlug } from "@/data/profiles";
import SectionHeading from "@/components/shared/SectionHeading";
import { experienceEntries, experienceSummary, transferableImpact, customerServiceSkills } from "@/data/experience";
import { site } from "@/data/site";

const profile = profileBySlug("customer-service");
const skillIcons = { phone: PhoneCall, support: Headset, problem: ListChecks, conflict: Handshake };

const Experience = () => {
  const { t } = useLanguage();
  return (
    <>
      <Seo
        title={t(`Call Center & Customer Service | ${site.shortName}`)}
        description={t("5+ years of bilingual customer service experience and how those skills transfer into IT, cybersecurity and software development.")}
        path="/experience"
      />
      <ProfileHero profile={profile} />
      <ProfileSectionNav sections={profile.sections} />

      <section id="skills" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading eyebrow={t("Skills")} title={t("Customer service skills")} description={t("Skills developed through bilingual customer service experience.")} />
        <div className="grid gap-4 sm:grid-cols-2">
          {customerServiceSkills.map(skill => {
            const Icon = skillIcons[skill.icon];
            return <article key={skill.title} className="panel-glow">
              <span className="glow-ring mb-4 grid h-12 w-12 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary"><Icon className="h-6 w-6" aria-hidden /></span>
              <h3 className="text-lg font-semibold">{t(skill.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(skill.description)}</p>
            </article>;
          })}
        </div>
      </section>

      <section id="background" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading eyebrow={t("Experience")} title={t(experienceSummary.headline)} description={t(experienceSummary.statement)} />
          <div className="grid max-w-2xl grid-cols-3 gap-3">
            {experienceSummary.stats.map(stat => <div key={stat.label} className="panel text-center">
              <p className="text-2xl font-bold text-primary">{t(stat.value)}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t(stat.label)}</p>
            </div>)}
          </div>
        </div>
      </section>

      <section id="transferable" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading eyebrow={t("Transferable value")} title={t("How customer service strengthens my technical work")} />
        <div className="grid gap-4 md:grid-cols-3">
          {transferableImpact.map((item) => (
            <div key={item.area} className="panel-glow hover:-translate-y-1">
              <h3 className="text-sm font-semibold text-primary">{t(item.area)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(item.detail)}</p>
            </div>
          ))}
        </div>
      </section>

      {experienceEntries.length > 0 && (
        <section className="border-t border-border bg-surface/40">
          <div className="container mx-auto px-4 py-16">
            <SectionHeading eyebrow={t("Timeline")} title={t("Roles")} />
            <div className="space-y-4">
              {experienceEntries.map((entry) => (
                <article key={entry.id} className="panel-glow">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-base font-semibold">{t(entry.title)}</h3>
                    {entry.period && <span className="text-xs text-muted-foreground">{t(entry.period)}</span>}
                  </div>
                  {entry.organization && <p className="text-sm text-primary">{t(entry.organization)}</p>}
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(entry.summary)}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {entry.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="text-primary">•</span>
                        {t(h)}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Experience;
