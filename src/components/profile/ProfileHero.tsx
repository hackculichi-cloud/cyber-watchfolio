import ProfileWorkspace from "./ProfileWorkspace";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ReactNode } from "react";
import type { ProfileIdentity } from "@/data/profiles";
import Tag from "@/components/shared/Tag";
import CopperConductorTitle from "@/components/electrical/CopperConductorTitle";
import NetworkSecurityTitle from "@/components/cybersecurity/NetworkSecurityTitle";
import PcbTitle from "@/components/electronics/PcbTitle";
import CodeExecutionTitle from "@/components/software/CodeExecutionTitle";
import BarberTitle from "@/components/barbering/BarberTitle";

interface ProfileHeroProps {
  profile: ProfileIdentity;
  children?: ReactNode;
}

/** Full-bleed image-first hero — the immersive entry point into a professional world. */
const ProfileHero = ({ profile, children }: ProfileHeroProps) => {
  const { t } = useLanguage();
  return (
    <section
      data-world-hero={profile.slug}
      className="relative isolate flex min-h-[62vh] items-end overflow-clip border-b border-border md:min-h-[72vh]"
    >
      {/* The original area backdrop stays behind the copy; the workplace remains its own illustration. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,hsl(var(--background)/0.2),hsl(var(--background)/0.1))]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(75rem_38rem_at_15%_110%,hsl(var(--primary)/0.22),transparent_65%)]"
      />

      <div className="profile-hero-layout container relative mx-auto flex flex-col-reverse gap-8 px-4 py-16 lg:flex-row-reverse lg:items-center lg:justify-between lg:py-24">
        <div className="hero-workspace w-full shrink-0 lg:w-[48%] xl:w-[40rem]">
          <ProfileWorkspace profile={profile.slug} />
        </div>
        <div className="profile-hero-copy min-w-0 flex-1">
        <div className="hero-eyebrow animate-fade-in-up flex items-center gap-3">
          <div>
            <p className="eyebrow">{t(profile.eyebrow)}</p>
            <Tag variant="primary" className="mt-1 bg-background/60 backdrop-blur-sm">
              {t(profile.status)}
            </Tag>
          </div>
        </div>

        <div className="hero-title animate-fade-in-up delay-100 mt-6 flex items-start gap-4">
          {profile.slug === "electrical" ? <CopperConductorTitle text={t(profile.label)} /> : profile.slug === "development" ? <CodeExecutionTitle text={t(profile.heroTitle ?? profile.label)} /> : profile.slug === "electronics" ? <PcbTitle text={t(profile.label)} /> : profile.slug === "cybersecurity" ? <NetworkSecurityTitle text={t(profile.label)} /> : profile.slug === "barbering" ? <BarberTitle text={t(profile.label)} /> : <>
            <span className="glow-ring mt-1 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-primary/60 bg-background text-primary sm:h-16 sm:w-16"><profile.icon className="h-8 w-8" aria-hidden /></span>
            <h1 className="max-w-4xl break-words text-3xl font-bold leading-tight text-foreground sm:text-4xl xl:text-5xl">{t(profile.label)}</h1>
          </>}
        </div>
        <p className="hero-description reading-copy animate-fade-in-up delay-200 mt-5 max-w-2xl text-base leading-relaxed text-foreground/95 md:text-lg">
          {t(profile.description)}
        </p>

        {profile.highlights?.length ? (
          <ul className="hero-highlights animate-fade-in-up delay-300 mt-8 flex flex-wrap gap-2">
            {profile.highlights.map((h) => (
              <li
                key={h}
                className="rounded-full border border-primary/25 bg-background/50 px-3.5 py-1.5 text-xs font-medium text-foreground/90 backdrop-blur-md"
              >
                {t(h)}
              </li>
            ))}
          </ul>
        ) : null}

        {children && <div className="hero-actions animate-fade-in-up delay-400 mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
};

export default ProfileHero;
