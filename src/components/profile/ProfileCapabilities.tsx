import { profileCapabilities } from "@/data/profileCapabilities";
import type { ProfileSlug } from "@/data/profiles";
import { useLanguage } from "@/i18n/LanguageProvider";
import SectionHeading from "@/components/shared/SectionHeading";
import Tag from "@/components/shared/Tag";

/** Describe knowledge without turning a course topic into a fabricated client project. */
export default function ProfileCapabilities({ profile }: { profile: ProfileSlug }) {
  const { t } = useLanguage();
  return <section id="overview" data-profile-capabilities={profile} className="container mx-auto scroll-mt-32 px-4 py-16">
    <SectionHeading eyebrow={t("Knowledge & applied practice")} title={t("What I know and how I apply it")} description={t("Course knowledge, training exercises and completed work, with the context of each skill.")} />
    <div className="grid gap-4 md:grid-cols-2">
      {profileCapabilities[profile]?.map(item => <article key={item.title} className="glass-panel p-5">
        <Tag variant="primary">{t(item.status)}</Tag>
        <h3 className="mt-3 text-base font-semibold">{t(item.title)}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(item.body)}</p>
      </article>)}
    </div>
  </section>;
}
