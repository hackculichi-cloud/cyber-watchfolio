import BasicElectronicsSyllabus from "./BasicElectronicsSyllabus";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown, Zap } from "lucide-react";
import { specialtyArtwork } from "@/data/specialtyArtwork";
import { specialtiesFor } from "@/data/specialties";
import type { ProfileSlug } from "@/data/profiles";
import { useLanguage } from "@/i18n/LanguageProvider";
import Tag from "@/components/shared/Tag";
import SectionHeading from "@/components/shared/SectionHeading";

/** Stable hash destinations and visual, expandable specialty cards. */
const SpecialtyExplorer = ({ profile, activeId, onSelect, renderDetail }: { profile: ProfileSlug; activeId?: string | null; onSelect?: (id: string | null) => void; renderDetail?: (id: string) => ReactNode }) => {
  const { t } = useLanguage();
  const { hash } = useLocation();
  const items = useMemo(() => specialtiesFor(profile), [profile]);
  const [localActive, setLocalActive] = useState<string | null>(null);
  const active = activeId === undefined ? localActive : activeId;
  const setActive = onSelect ?? setLocalActive;
  useEffect(() => {
    const id = hash.slice(1);
    if (items.some(item => item.id === id)) setActive(id);
  }, [hash, items, setActive]);
  return <section id="specialties" className="container mx-auto scroll-mt-32 px-4 py-12">
    <div className={profile === "electrical" ? "text-center [&_.eyebrow]:justify-center [&_p]:mx-auto" : undefined}><SectionHeading eyebrow={t("Specialties")} title={t("Explore this area")} description={t("Choose a specialty to see its training status, topics and related work.")} /></div>
    <div className={`specialty-grid grid grid-cols-1 gap-3 sm:grid-cols-2 ${profile === "electronics" ? "" : profile === "electrical" ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
      {items.map(item => { const art = specialtyArtwork[item.id]; return <div key={item.id} id={item.id} className="scroll-mt-32">
        <button type="button" data-specialty={item.id} aria-expanded={active === item.id} aria-controls={active === item.id ? `specialty-details-${profile}` : undefined}
          onClick={() => setActive(active === item.id ? null : item.id)}
          className={`group flex h-full w-full flex-col overflow-hidden rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${active === item.id ? "border-primary bg-primary/10" : "border-border bg-surface/60 hover:border-primary/60"}`}>
          {art && <span className="relative block aspect-[16/9] w-full overflow-hidden border-b border-border bg-background">
            <img data-specialty-art={item.id} src={art.src} alt={t(art.alt)} width={768} height={432} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            <span className="absolute bottom-2 left-2 rounded-md border border-white/20 bg-background/90 px-2 py-1 text-[10px] font-medium text-foreground">{t(art.reference ? "Illustrative reference" : "My completed work")}</span>
          </span>}
          <span className={`specialty-card-copy flex flex-1 flex-col gap-3 p-5 ${profile === "electrical" ? "items-center text-center" : "items-start text-left"}`}>
            <span data-specialty-logo={item.id} aria-hidden className={`relative grid place-items-center border border-primary/40 bg-primary/10 text-primary ${profile === "electrical" ? "h-20 w-20 rounded-full shadow-[0_0_22px_hsl(var(--primary)/.12)]" : "h-14 w-14 rounded-xl"}`}>
              <item.icon className={profile === "electrical" ? "h-9 w-9" : "h-7 w-7"} />
              {profile === "electrical" && <span className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full border border-primary/50 bg-background"><Zap className="h-4 w-4" /></span>}
            </span>
            <span className={`specialty-card-title flex w-full items-center gap-2 font-semibold ${profile === "electrical" ? "justify-center" : "justify-between"}`}>{t(item.title)}<ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${active === item.id ? "rotate-180" : ""}`} aria-hidden /></span>
            <Tag variant={item.status.includes("Planned") || item.status === "Upcoming" ? "muted" : "primary"}>{t(item.status)}</Tag>
            <span className="specialty-card-summary line-clamp-3 text-xs leading-relaxed text-muted-foreground">{t(item.summary)}</span>
          </span>
        </button>
      </div>; })}
    </div>
    {items.filter(item => item.id === active).map(item => <article key={item.id} id={`specialty-details-${profile}`} className="panel-glow mt-5">
      <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-xl font-semibold">{t(item.title)}</h3><Tag variant={item.status === "Upcoming" ? "muted" : "primary"}>{t(item.status)}</Tag></div>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{t(item.summary)}</p>
      {item.id === "basic-electronics" && <BasicElectronicsSyllabus />}
      <ul className="my-4 flex flex-wrap gap-2">{item.topics.map(topic => <li key={topic}><Tag>{t(topic)}</Tag></li>)}</ul>
      {renderDetail ? renderDetail(item.id) : <div className="flex flex-wrap gap-4">{item.related.map(link => <a key={link.anchor} href={`#${link.anchor}`} className="inline-flex items-center gap-2 rounded text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t(link.label)}<ArrowRight className="h-4 w-4" aria-hidden /></a>)}</div>}
    </article>)}
  </section>;
};
export default SpecialtyExplorer;
