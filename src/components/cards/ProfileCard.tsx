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
  const title = data.slug === "electrical" ? "Electricity" : data.slug === "customer-service" ? "Call Center & Customer Service" : data.title;
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
          "profile-atmosphere relative flex min-h-36 items-center gap-3 overflow-hidden border-b border-border/70 py-5 pl-5 pr-16",
          atmosphere[data.slug],
        )}
      >
        <img
          src={profileHeroImage[data.slug]}
          alt={t(profileHeroAlt[data.slug])}
          loading="lazy"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover opacity-25 transition-transform duration-700 motion-safe:group-hover:scale-105"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--background)/0.95),hsl(var(--background)/0.7))]"
        />
        <span className="mascot-neon-orb relative grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-primary/70 bg-background text-primary"><data.icon className="h-7 w-7" aria-hidden /></span>
        <div className="relative min-w-0">
          <h3 className="text-xl font-bold leading-tight text-foreground">{t(title)}</h3>
          {data.status && <Tag variant="primary" className="mt-2 text-[11px]">{t(data.status)}</Tag>}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-lg font-semibold leading-snug text-foreground">{t(spotlight.headline)}</p>
        <ul className="reading-copy my-5 flex-1 space-y-3">
          {spotlight.skills.map(skill => <li key={skill} className="flex items-start gap-2.5 text-base leading-relaxed text-foreground/95"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary"><Check className="h-3.5 w-3.5" aria-hidden /></span>{t(skill)}</li>)}
        </ul>
        <p className="reading-copy flex items-start gap-2 border-t border-primary/20 pt-3 text-sm font-medium leading-relaxed text-muted-foreground"><FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />{t(spotlight.proof)}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">{t("See my work")}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
    </ProfileSectionPreview>
  );
};

export default ProfileCard;
