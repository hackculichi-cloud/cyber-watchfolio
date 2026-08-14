import { CalendarDays, ExternalLink, Signal } from "lucide-react";
import type { Lab } from "@/data/labs";
import Tag from "@/components/shared/Tag";

const LabCard = ({ lab }: { lab: Lab }) => (
  <article className="panel-glow flex h-full flex-col hover:-translate-y-1">
    <header className="mb-3 flex flex-wrap items-center gap-2">
      <h3 className="mr-auto text-base font-semibold">{lab.title}</h3>
      <Tag variant="primary">
        <Signal className="mr-1 h-3 w-3" /> {lab.difficulty}
      </Tag>
    </header>

    <p className="text-sm leading-relaxed text-muted-foreground">{lab.description}</p>

    {lab.result && (
      <p className="mt-3 rounded-lg border border-accent/25 bg-accent/5 p-3 text-sm text-muted-foreground">
        <span className="font-medium text-accent">Result: </span>
        {lab.result}
      </p>
    )}

    <div className="mt-4 flex flex-wrap gap-1.5">
      {lab.technologies.map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </div>

    <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="h-3.5 w-3.5" /> {lab.date}
      </span>
      {lab.link && (
        <a href={lab.link} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 text-primary hover:underline">
          {lab.linkLabel ?? "Write-up"} <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </div>
  </article>
);

export default LabCard;
