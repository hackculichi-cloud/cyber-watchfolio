import ProfileCertificates from "@/components/profile/ProfileCertificates";
import ProfileCvBlock from "@/components/profile/ProfileCvBlock";
import SpecialtyExplorer from "@/components/profile/SpecialtyExplorer";
import { useLanguage } from "@/i18n/LanguageProvider";
import Seo from "@/components/shared/Seo";
import { PhoneCall, Headset, ListChecks, Handshake, Users, Wrench, GraduationCap, Truck } from "lucide-react";
import Tag from "@/components/shared/Tag";
import ProfileHero from "@/components/profile/ProfileHero";
import ProfileSectionNav from "@/components/profile/ProfileSectionNav";
import { profileBySlug } from "@/data/profiles";
import SectionHeading from "@/components/shared/SectionHeading";
import { experienceEntries, experienceSummary, transferableImpact, customerServiceSkills } from "@/data/experience";
import { site } from "@/data/site";

const profile = profileBySlug("customer-service");
const skillIcons = { phone: PhoneCall, support: Headset, problem: ListChecks, conflict: Handshake, operations: Users, technical: Wrench, training: GraduationCap, logistics: Truck };

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
      <SpecialtyExplorer profile={profile.slug} />

      <section id="skills" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading mascot={profile.slug} mascotScene="action" eyebrow={t("Skills")} title={t("Customer service skills")} description={t("Skills developed through bilingual customer service experience.")} />
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
          <SectionHeading mascot={profile.slug} mascotScene="practice" eyebrow={t("Experience")} title={t(experienceSummary.headline)} description={t(experienceSummary.statement)} />
          <div className="grid max-w-2xl grid-cols-3 gap-3">
            {experienceSummary.stats.map(stat => <div key={stat.label} className="panel text-center">
              <p className="text-2xl font-bold text-primary">{t(stat.value)}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t(stat.label)}</p>
            </div>)}
          </div>
          <ol data-career-timeline className="mt-10 space-y-0 border-l border-primary/30 pl-5 sm:pl-8">
            {experienceEntries.map(entry => <li key={entry.id} data-career-role={entry.id} className="relative pb-9 last:pb-0">
              <span aria-hidden className="absolute -left-[1.56rem] top-2 h-2.5 w-2.5 rounded-full border border-primary bg-background ring-4 ring-background sm:-left-[2.31rem]" />
              <article className="rounded-xl border border-border bg-background/50 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm font-semibold text-primary">{entry.organization}</p>{entry.current && <Tag variant="primary">{t("Current role")}</Tag>}</div>
                <h3 className="mt-2 text-lg font-semibold">{t(entry.title)}</h3>
                <p className="mt-2 text-xs font-medium text-foreground/80">{t(entry.period)}</p>
                {entry.location && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t(entry.location)}</p>}
                <p className="reading-copy mt-4 text-sm leading-relaxed text-muted-foreground">{t(entry.summary)}</p>
                <ul className="mt-4 flex flex-wrap gap-2">{entry.highlights.map(item => <li key={item}><Tag>{t(item)}</Tag></li>)}</ul>
              </article>
            </li>)}
          </ol>
        </div>
      </section>

      <section id="transferable" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading mascot={profile.slug} mascotScene="detail" eyebrow={t("Transferable value")} title={t("How customer service strengthens my technical work")} />
        <div className="grid gap-4 md:grid-cols-3">
          {transferableImpact.map((item) => (
            <div key={item.area} className="panel-glow hover:-translate-y-1">
              <h3 className="text-sm font-semibold text-primary">{t(item.area)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(item.detail)}</p>
            </div>
          ))}
        </div>
      </section>

      <ProfileCertificates profile={profile.slug} />
      <section id="cv" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading mascot={profile.slug} eyebrow={t("CV")} title={t("CV for this profile")} />
        <ProfileCvBlock cvIds={profile.cvIds} />
      </section>

    </>
  );
};

export default Experience;
