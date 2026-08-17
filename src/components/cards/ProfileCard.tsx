import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ProfileCardData, ProfileSlug } from "@/data/profiles";
import Tag from "@/components/shared/Tag";
import { cn } from "@/lib/utils";

const atmosphere: Record<ProfileSlug, string> = {
  cybersecurity: "atmos-grid",
  development: "atmos-code",
  electrical: "atmos-energy",
  electronics: "atmos-pcb",
  repair: "atmos-circuit",
};

/**
 * Immersive entry point into a professional world.
 * Each card carries its own `data-profile`, so its accent, glow and technical
 * backdrop preview the visual identity of the profile it opens.
 */
const ProfileCard = ({ data }: { data: ProfileCardData }) => (
  <Link
    to={data.href}
    data-profile={data.slug}
    aria-label={`Explore the ${data.title} profile`}
    className="glass-panel group relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]"
  >
    {/* Atmospheric illustration area */}
    <div
      className={cn(
        "profile-atmosphere relative h-32 overflow-hidden border-b border-border/70",
        atmosphere[data.slug],
      )}
    >
      <span className="absolute inset-0 grid place-items-center">
        <span className="glow-ring grid h-14 w-14 place-items-center rounded-2xl border border-primary/35 bg-background/70 text-primary backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
          <data.icon className="h-7 w-7" aria-hidden />
        </span>
      </span>
      {data.status && (
        <span className="absolute left-3 top-3">
          <Tag variant="primary" className="bg-background/70 backdrop-blur-sm">
            {data.status}
          </Tag>
        </span>
      )}
    </div>

    <div className="flex flex-1 flex-col p-5">
      <h3 className="text-lg font-semibold">{data.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{data.summary}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {data.focus.map((f) => (
          <Tag key={f}>{f}</Tag>
        ))}
      </div>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        Explore Profile
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </span>
    </div>
  </Link>
);

export default ProfileCard;
