import InteractiveMascot from "@/components/shared/InteractiveMascot";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ReactNode } from "react";
import type { ProfileIdentity } from "@/data/profiles";
import { profileHeroImage, profileHeroAlt } from "@/data/profileMedia";
import Tag from "@/components/shared/Tag";
import { cn } from "@/lib/utils";

const atmosphere: Record<ProfileIdentity["slug"], string> = {
  cybersecurity: "atmos-grid",
  development: "atmos-code",
  electrical: "atmos-energy",
  electronics: "atmos-pcb",
  repair: "atmos-circuit",
  "customer-service": "atmos-grid",
};

interface ProfileHeroProps {
  profile: ProfileIdentity;
  children?: ReactNode;
}

/** Full-bleed image-first hero — the immersive entry point into a professional world. */
const ProfileHero = ({ profile, children }: ProfileHeroProps) => {
  const { t } = useLanguage();
  return (
    <section
      className={cn(
        "profile-atmosphere relative isolate flex min-h-[62vh] items-end overflow-clip border-b border-border md:min-h-[72vh]",
        atmosphere[profile.slug],
      )}
    >
      {/* Atmospheric photography layer */}
      <img
        src={profileHeroImage[profile.slug]}
        alt={t(profileHeroAlt[profile.slug])}
        width={1920}
        height={1088}
        className="absolute inset-0 -z-10 h-full w-full scale-105 object-cover opacity-60 [animation:hero-zoom_18s_ease-out_forwards]"
      />
      {/* Readability + brand tint overlays */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,hsl(var(--background)/0.55)_0%,hsl(var(--background)/0.7)_45%,hsl(var(--background))_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(75rem_38rem_at_15%_110%,hsl(var(--primary)/0.22),transparent_65%)]"
      />

      <div className="container relative mx-auto flex flex-col-reverse gap-8 px-4 py-16 lg:flex-row-reverse lg:items-center lg:justify-between lg:py-24">
        <div className="w-full shrink-0 lg:w-[27rem] xl:w-[30rem]">
          <InteractiveMascot key={profile.slug} profile={profile.slug} className="drop-shadow-[0_0_25px_hsl(var(--primary)/0.2)]" />
        </div>
        <div className="min-w-0 flex-1">
        <div className="animate-fade-in-up flex items-center gap-3">
          <span className="glow-ring grid h-14 w-14 place-items-center rounded-2xl border border-primary/35 bg-background/60 text-primary backdrop-blur-md">
            <profile.icon className="h-7 w-7" aria-hidden />
          </span>
          <div>
            <p className="eyebrow">{t(profile.eyebrow)}</p>
            <Tag variant="primary" className="mt-1 bg-background/60 backdrop-blur-sm">
              {t(profile.status)}
            </Tag>
          </div>
        </div>

        <h1 className="animate-fade-in-up delay-100 mt-8 max-w-4xl break-words text-4xl font-bold leading-[1.05] sm:text-5xl xl:text-6xl">
          <span className="gradient-text">{t(profile.label)}</span>
        </h1>
        <p className="reading-copy animate-fade-in-up delay-200 mt-5 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
          {t(profile.description)}
        </p>

        {profile.highlights?.length ? (
          <ul className="animate-fade-in-up delay-300 mt-8 flex flex-wrap gap-2">
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

        {children && <div className="animate-fade-in-up delay-400 mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
};

export default ProfileHero;
