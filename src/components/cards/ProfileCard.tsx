import { useLanguage } from "@/i18n/LanguageProvider";
import { Link } from "react-router-dom";
import { ArrowRight, Check, FileCheck2 } from "lucide-react";
import type { ProfileCardData, ProfileSlug } from "@/data/profiles";
import { profileHeroImage, profileHeroAlt } from "@/data/profileMedia";
import Tag from "@/components/shared/Tag";
import ProfileSectionPreview from "@/components/profile/ProfileSectionPreview";
import { cn } from "@/lib/utils";
import { profileSpotlights } from "@/data/profileSpotlights";

const atmosphere: Record<ProfileSlug, string> = {
  cybersecurity: "atmos-grid",
  development: "atmos-code",
  electrical: "atmos-energy",
  electronics: "atmos-pcb",
  repair: "atmos-circuit",
  "customer-service": "atmos-grid",
};

/**
 * Immersive entry point into a professional world.
 * Each card carries its own `data-profile`, so its accent, glow and technical
 * backdrop preview the visual identity of the profile it opens.
 */
const ProfileCard = ({ data }: { data: ProfileCardData }) => {
  const { t } = useLanguage();
  const spotlight = profileSpotlights[data.slug];
  return (
    <ProfileSectionPreview data={data}>
    <Link
      to={data.href}
      data-profile={data.slug}
      data-personal-skills-card={data.slug}
      aria-label={t(`Explore the ${data.title} profile`)}
      className="glass-panel skill-spotlight-card group relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-[var(--shadow-lift)]"
    >
      {/* Atmospheric visual preview */}
      <div
        className={cn(
          "profile-atmosphere relative h-28 overflow-hidden border-b border-border/70",
          atmosphere[data.slug],
        )}
      >
        <img
          src={profileHeroImage[data.slug]}
          alt={t(profileHeroAlt[data.slug])}
          loading="lazy"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover opacity-45 transition-all duration-700 group-hover:scale-110 group-hover:opacity-70"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--background)/0.35),hsl(var(--background)/0.85))]"
        />
        <span className="absolute inset-0 grid place-items-center">
          <span className="mascot-neon-orb grid h-16 w-16 place-items-center rounded-2xl border border-primary/70 bg-background/85 text-primary backdrop-blur-sm transition-transform duration-500 group-hover:scale-105">
            <data.icon className="h-8 w-8" aria-hidden />
          </span>
        </span>
        {data.status && (
          <span className="absolute left-3 top-3">
            <Tag variant="primary" className="bg-background/70 backdrop-blur-sm">
              {t(data.status)}
            </Tag>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-sm font-semibold text-primary">{t(data.title)}</h3>
        <p className="mt-3 text-xl font-bold leading-snug tracking-tight text-foreground">{t(spotlight.headline)}</p>
        <ul className="reading-copy my-5 flex-1 space-y-3">
          {spotlight.skills.map(skill => <li key={skill} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/85"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary"><Check className="h-3.5 w-3.5" aria-hidden /></span>{t(skill)}</li>)}
        </ul>
        <p className="reading-copy flex items-start gap-2 border-t border-primary/20 pt-3 text-xs font-medium leading-relaxed text-muted-foreground"><FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />{t(spotlight.proof)}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">{t("See my work")}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
    </ProfileSectionPreview>
  );
};

export default ProfileCard;
