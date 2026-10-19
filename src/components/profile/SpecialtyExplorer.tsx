import BasicElectronicsSyllabus from "./BasicElectronicsSyllabus";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronDown, Zap } from "lucide-react";
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
  const navigate = useNavigate();
  const detail = useRef<HTMLElement>(null);
  const items = useMemo(() => specialtiesFor(profile), [profile]);
  const [localActive, setLocalActive] = useState<string | null>(null);
  const active = activeId === undefined ? localActive : activeId;
  const setActive = onSelect ?? setLocalActive;
  useEffect(() => {
    const id = hash.slice(1);
    if (items.some(item => item.id === id)) setActive(id);
    else if (id === "specialties") setActive(null);
  }, [hash, items, setActive]);
  useEffect(() => {
    // Wait for the selected panel to mount and for the route's card-anchor scroll.
    if (!active || hash.slice(1) !== active) return;
    const frame = requestAnimationFrame(() => {
      const panel = detail.current;
      if (!panel) return;
      const nav = document.querySelector<HTMLElement>(".profile-section-nav");
      if (nav) panel.style.scrollMarginTop = `${(parseFloat(getComputedStyle(nav).top) || 0) + nav.getBoundingClientRect().height + 16}px`;
      panel.focus({ preventScroll: true });
      panel.scrollIntoView({ block: "start", behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [active, hash]);
  return <section id="specialties" className="container mx-auto scroll-mt-32 px-4 py-12">
    <div className={profile === "electrical" ? "text-center" : undefined}><SectionHeading title={t("Specialties")} /></div>
    <div className={`specialty-grid grid grid-cols-1 gap-3 sm:grid-cols-2 ${profile === "electronics" ? "" : profile === "electrical" ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
      {items.map(item => { const art = specialtyArtwork[item.id]; return <div key={item.id} id={item.id} className="scroll-mt-32">
        <button type="button" data-specialty={item.id} aria-expanded={active === item.id} aria-controls={active === item.id ? `specialty-details-${profile}` : undefined}
          onClick={() => {
            const next = active === item.id ? null : item.id;
            setActive(next);
            navigate({ hash: `#${next ?? "specialties"}` });
          }}
          className={`group flex h-full w-full flex-col overflow-hidden rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${active === item.id ? "border-primary bg-primary/10" : "border-border bg-surface/60 hover:border-primary/60"}`}>
          {art && <span className="relative block aspect-[16/9] w-full overflow-hidden border-b border-border bg-background">
            <img data-specialty-art={item.id} src={art.src} alt={t(art.alt)} width={768} height={432} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </span>}
          <span className={`specialty-card-copy flex flex-1 flex-col gap-3 p-5 ${profile === "electrical" ? "items-center text-center" : "items-start text-left"}`}>
            <span data-specialty-logo={item.id} aria-hidden className={`relative grid place-items-center border border-primary/40 bg-primary/10 text-primary ${profile === "electrical" ? "h-20 w-20 rounded-full shadow-[0_0_22px_hsl(var(--primary)/.12)]" : "h-14 w-14 rounded-xl"}`}>
              <item.icon className={profile === "electrical" ? "h-9 w-9" : "h-7 w-7"} />
              {profile === "electrical" && <span className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full border border-primary/50 bg-background"><Zap className="h-4 w-4" /></span>}
            </span>
            <span className={`specialty-card-title flex w-full items-center gap-2 font-semibold ${profile === "electrical" ? "justify-center" : "justify-between"}`}>{t(item.title)}<ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${active === item.id ? "rotate-180" : ""}`} aria-hidden /></span>
            <Tag variant={item.status.includes("Planned") || item.status === "Upcoming" ? "muted" : "primary"}>{t(item.status)}</Tag>
            <span className="specialty-card-summary line-clamp-3 text-base leading-relaxed text-foreground/90">{t(item.summary)}</span>
          </span>
        </button>
      </div>; })}
    </div>
    {items.filter(item => item.id === active).map(item => <article ref={detail} key={item.id} id={`specialty-details-${profile}`} tabIndex={-1} aria-labelledby={`specialty-title-${profile}`} className="specialty-detail panel-glow mt-5 scroll-mt-48 focus:outline-none">
      <Link to="#specialties" className="mb-4 inline-flex min-h-11 items-center gap-2 rounded text-base font-medium text-primary hover:underline focus-visible:ring-2 focus-visible:ring-primary"><ArrowLeft className="h-4 w-4" aria-hidden />{t("Back to specialties")}</Link>
      <div className="flex flex-wrap items-center justify-between gap-3"><h3 id={`specialty-title-${profile}`} className="text-2xl font-semibold">{t(item.title)}</h3><Tag variant={item.status === "Upcoming" ? "muted" : "primary"}>{t(item.status)}</Tag></div>
      <p className="reading-copy mt-3 max-w-3xl text-base leading-7 text-foreground/90">{t(item.summary)}</p>
      {item.id === "basic-electronics" && <BasicElectronicsSyllabus />}
      <ul className="my-4 flex flex-wrap gap-2">{item.topics.map(topic => <li key={topic}><Tag>{t(topic)}</Tag></li>)}</ul>
      {renderDetail ? renderDetail(item.id) : <div className="flex flex-wrap gap-4">{item.related.map(link => <a key={link.anchor} href={`#${link.anchor}`} className="inline-flex items-center gap-2 rounded text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t(link.label)}<ArrowRight className="h-4 w-4" aria-hidden /></a>)}</div>}
    </article>)}
  </section>;
};
export default SpecialtyExplorer;
