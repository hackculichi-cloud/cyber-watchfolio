import { ReactNode } from "react";
import type { ProfileIdentity } from "@/data/profiles";
import Tag from "@/components/shared/Tag";
import { cn } from "@/lib/utils";

const atmosphere: Record<ProfileIdentity["slug"], string> = {
  cybersecurity: "atmos-grid",
  development: "atmos-code",
  electrical: "atmos-energy",
  electronics: "atmos-pcb",
  repair: "atmos-circuit",
};

interface ProfileHeroProps {
  profile: ProfileIdentity;
  children?: ReactNode;
}

/** Large atmospheric hero — the visual entry point into a professional world. */
const ProfileHero = ({ profile, children }: ProfileHeroProps) => (
  <section
    className={cn(
      "profile-atmosphere relative overflow-hidden border-b border-border",
      atmosphere[profile.slug],
    )}
  >
    <div className="container relative mx-auto px-4 py-20 md:py-28">
      <div className="animate-fade-in-up flex items-center gap-3">
        <span className="glow-ring grid h-14 w-14 place-items-center rounded-2xl border border-primary/35 bg-primary/10 text-primary">
          <profile.icon className="h-7 w-7" aria-hidden />
        </span>
        <div>
          <p className="eyebrow">{profile.eyebrow}</p>
          <Tag variant="primary" className="mt-1">
            {profile.status}
          </Tag>
        </div>
      </div>

      <h1 className="animate-fade-in-up delay-100 mt-8 max-w-4xl text-4xl font-bold leading-[1.05] md:text-6xl">
        <span className="gradient-text">{profile.label}</span>
      </h1>
      <p className="animate-fade-in-up delay-200 mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
        {profile.description}
      </p>

      {profile.highlights?.length ? (
        <ul className="animate-fade-in-up delay-300 mt-8 flex flex-wrap gap-2">
          {profile.highlights.map((h) => (
            <li
              key={h}
              className="rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-foreground/90 backdrop-blur-sm"
            >
              {h}
            </li>
          ))}
        </ul>
      ) : null}

      {children && <div className="animate-fade-in-up delay-400 mt-8">{children}</div>}
    </div>
  </section>
);

export default ProfileHero;
