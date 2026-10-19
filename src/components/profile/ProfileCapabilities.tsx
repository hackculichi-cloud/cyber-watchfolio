import { profileCapabilities, type ProfileCapability } from "@/data/profileCapabilities";
import type { ProfileSlug } from "@/data/profiles";
import { useLanguage } from "@/i18n/LanguageProvider";
import SectionHeading from "@/components/shared/SectionHeading";
import Tag from "@/components/shared/Tag";
import TrainingProviderBadge from "./TrainingProviderBadge";

/** Describe knowledge without turning a course topic into a fabricated client project. */
export default function ProfileCapabilities({ profile, entries }: { profile: ProfileSlug; entries?: ProfileCapability[] }) {
  const { t } = useLanguage();
  return <section id="overview" data-profile-capabilities={profile} className="container mx-auto scroll-mt-32 px-4 py-16">
    <SectionHeading mascot={profile} mascotScene="practice" eyebrow={t("Knowledge & applied practice")} title={t("What I know and how I apply it")} />
    <div className="grid gap-4 md:grid-cols-2">
      {(entries ?? profileCapabilities[profile])?.map(item => <article key={item.title} className="glass-panel p-5">
        <Tag variant="primary">{t(item.status)}</Tag>
        <h3 className="mt-3 text-lg font-semibold">{t(item.title)}</h3>
        <p className="reading-copy mt-3 text-base leading-7 text-foreground/95">{t(item.body)}</p>
        {item.providers && <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-3">{item.providers.map(id => <TrainingProviderBadge key={id} id={id} />)}</div>}
      </article>)}
    </div>
  </section>;
}
