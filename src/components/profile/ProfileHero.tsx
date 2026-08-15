import { ReactNode } from "react";
import type { ProfileIdentity } from "@/data/profiles";
import Tag from "@/components/shared/Tag";
import { cn } from "@/lib/utils";

const atmosphere: Record<ProfileIdentity["slug"], string> = {
  cybersecurity: "atmos-grid",
  development: "atmos-grid",
  electrical: "atmos-energy",
  repair: "atmos-circuit",
};

interface ProfileHeroProps {
  profile: ProfileIdentity;
  children?: ReactNode;
}

const ProfileHero = ({ profile, children }: ProfileHeroProps) => (
  <section
    className={cn(
      "profile-atmosphere relative overflow-hidden border-b border-border",
      atmosphere[profile.slug],
    )}
  >
    <div className="container mx-auto px-4 py-16 md:py-20">
      <div className="animate-fade-in-up flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
          <profile.icon className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <p className="eyebrow">{profile.eyebrow}</p>
          <Tag variant="primary" className="mt-1">
            {profile.status}
          </Tag>
        </div>
      </div>

      <h1 className="animate-fade-in-up delay-100 mt-6 max-w-3xl text-3xl font-bold md:text-5xl">
        {profile.label}
      </h1>
      <p className="animate-fade-in-up delay-200 mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {profile.description}
      </p>
      {children && <div className="animate-fade-in-up delay-300 mt-8">{children}</div>}
    </div>
  </section>
);

export default ProfileHero;
