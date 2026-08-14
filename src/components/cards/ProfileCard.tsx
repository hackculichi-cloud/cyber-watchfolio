import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ProfileCardData } from "@/data/profiles";
import Tag from "@/components/shared/Tag";

const ProfileCard = ({ data }: { data: ProfileCardData }) => (
  <Link
    to={data.href}
    className="panel-glow group flex h-full flex-col hover:-translate-y-1"
  >
    <div className="mb-4 flex items-start justify-between gap-3">
      <span
        className={`grid h-10 w-10 place-items-center rounded-lg ${
          data.emphasis === "primary" ? "bg-primary/12 text-primary" : "bg-secondary text-muted-foreground"
        }`}
      >
        <data.icon className="h-5 w-5" aria-hidden />
      </span>
      {data.status && <Tag variant={data.emphasis === "primary" ? "primary" : "muted"}>{data.status}</Tag>}
    </div>

    <h3 className="text-base font-semibold">{data.title}</h3>
    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{data.summary}</p>

    <div className="mt-4 flex flex-wrap gap-1.5">
      {data.focus.map((f) => (
        <Tag key={f}>{f}</Tag>
      ))}
    </div>

    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
      Explore
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
    </span>
  </Link>
);

export default ProfileCard;
