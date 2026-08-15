import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ProfileCardData } from "@/data/profiles";
import Tag from "@/components/shared/Tag";

/**
 * Each card carries its own `data-profile`, so the accent colour of the card
 * previews the visual identity of the profile it opens.
 */
const ProfileCard = ({ data }: { data: ProfileCardData }) => (
  <Link
    to={data.href}
    data-profile={data.slug}
    aria-label={`Explore the ${data.title} profile`}
    className="panel-glow group relative flex h-full flex-col overflow-hidden hover:-translate-y-1"
  >
    <span
      aria-hidden
      className="pointer-events-none absolute inset-x-0 -top-16 h-32 bg-[radial-gradient(24rem_8rem_at_50%_100%,hsl(var(--primary)/0.18),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    />

    <div className="mb-4 flex items-start justify-between gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-lg border border-primary/25 bg-primary/12 text-primary transition-transform duration-300 group-hover:scale-110">
        <data.icon className="h-5 w-5" aria-hidden />
      </span>
      {data.status && <Tag variant="primary">{data.status}</Tag>}
    </div>

    <h3 className="text-base font-semibold">{data.title}</h3>
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
  </Link>
);

export default ProfileCard;
