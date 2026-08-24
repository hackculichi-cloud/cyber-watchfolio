import { ExternalLink, Github, FileText } from "lucide-react";
import type { WorkItem } from "@/data/works";
import Tag from "@/components/shared/Tag";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import BeforeAfter from "@/components/shared/BeforeAfter";

const List = ({ title, items }: { title: string; items?: string[] }) =>
  items?.length ? (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{title}</h4>
      <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
        {items.map((i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
            {i}
          </li>
        ))}
      </ul>
    </div>
  ) : null;

/** Full project detail: hero image, metadata, process, results and gallery. */
const WorkDetail = ({ item }: { item: WorkItem }) => (
  <div className="space-y-8">
    {item.cover?.src ? (
      <img src={item.cover.src} alt={item.cover.alt} className="w-full rounded-lg border border-border object-cover" />
    ) : (
      <PlaceholderImage className="aspect-[16/9] w-full" label="Project image pending" />
    )}

    <div className="flex flex-wrap gap-1.5">
      <Tag variant="primary">{item.category}</Tag>
      <Tag>{item.status}</Tag>
      {item.difficulty && <Tag variant="accent">{item.difficulty}</Tag>}
      {item.date && <Tag>{item.date}</Tag>}
      {item.environment && <Tag>{item.environment}</Tag>}
    </div>

    <p className="text-sm leading-relaxed text-muted-foreground">{item.summary}</p>

    {item.objective && (
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Objective</h4>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.objective}</p>
      </div>
    )}

    <div className="grid gap-6 md:grid-cols-2">
      <List title="What I did" items={item.did} />
      <List title="What I learned" items={item.learned} />
      <List title="Results" items={item.results} />
      <List title="Tools used" items={item.tools} />
      <List title="Technologies" items={item.technologies} />
    </div>

    {(item.before || item.after) && (
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Before / After</h4>
        <BeforeAfter before={item.before} after={item.after} />
      </div>
    )}

    {item.images?.length ? (
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Gallery</h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {item.images.map((img) =>
            img.src ? (
              <figure key={img.alt}>
                <img src={img.src} alt={img.alt} loading="lazy" className="w-full rounded-lg border border-border object-cover" />
                {img.caption && <figcaption className="mt-1.5 text-xs text-muted-foreground">{img.caption}</figcaption>}
              </figure>
            ) : (
              <PlaceholderImage key={img.alt} className="aspect-[4/3] w-full" label={img.alt} />
            ),
          )}
        </div>
      </div>
    ) : null}

    {(item.repo || item.demo || item.writeup) && (
      <div className="flex flex-wrap items-center gap-5 border-t border-border pt-5 text-sm">
        {item.repo && (
          <a href={item.repo} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 text-primary hover:underline">
            <Github className="h-4 w-4" /> Repository
          </a>
        )}
        {item.demo && (
          <a href={item.demo} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 text-primary hover:underline">
            <ExternalLink className="h-4 w-4" /> Live demo
          </a>
        )}
        {item.writeup && (
          <a href={item.writeup} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 text-primary hover:underline">
            <FileText className="h-4 w-4" /> Write-up
          </a>
        )}
      </div>
    )}
  </div>
);

export default WorkDetail;
