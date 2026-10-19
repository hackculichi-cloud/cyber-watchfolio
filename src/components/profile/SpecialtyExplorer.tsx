import BasicElectronicsSyllabus from "./BasicElectronicsSyllabus";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronDown, Zap } from "lucide-react";
import { specialtyArtwork } from "@/data/specialtyArtwork";
import { specialtiesFor } from "@/data/specialties";
import type { ProfileSlug } from "@/data/profiles";
import { useLanguage } from "@/i18n/LanguageProvider";
import Tag from "@/components/shared/Tag";
import SectionHeading from "@/components/shared/SectionHeading";
import SpecialtyKnowledge from "./SpecialtyKnowledge";

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
  const enterDetail = useCallback(() => {
    detail.current?.focus({ preventScroll: true });
    detail.current?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, []);
  useEffect(() => {
    const id = hash.slice(1);
    if (items.some(item => item.id === id)) setActive(id);
    else if (id === "specialties") setActive(null);
  }, [hash, items, setActive]);
  useEffect(() => {
    if (!active || hash.slice(1) !== active) return;
    let cancelled = false;
    let frame = 0;
    void document.fonts.ready.then(() => {
      if (!cancelled) frame = requestAnimationFrame(enterDetail);
    });
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }, [active, hash, enterDetail]);
  return <section id="specialties" className="container mx-auto scroll-mt-32 px-4 py-12">
    <div className={profile === "electrical" ? "text-center [&_.eyebrow]:justify-center [&_p]:mx-auto" : undefined}><SectionHeading title={t("My specialties")} /></div>
    <div className={`specialty-grid grid grid-cols-1 gap-3 sm:grid-cols-2 ${profile === "electronics" ? "" : profile === "electrical" ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
      {items.map(item => { const art = specialtyArtwork[item.id]; return <div key={item.id} id={item.id} data-specialty-anchor className="scroll-mt-32">
        <button type="button" data-specialty={item.id} aria-expanded={active === item.id} aria-controls={active === item.id ? `specialty-details-${profile}` : undefined}
          onClick={() => { if (active === item.id && hash.slice(1) === item.id) enterDetail(); else { setActive(item.id); navigate({ hash: `#${item.id}` }); } }}
          className={`specialty-choice group flex h-full w-full flex-col overflow-hidden rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${active === item.id ? "border-primary bg-primary/10" : "border-border bg-surface/60 hover:border-primary/60"}`}>
          {art && <span className="relative block aspect-[16/9] w-full overflow-hidden border-b border-border bg-background">
            <img data-specialty-art={item.id} src={art.src} alt={`${art.reference ? `${t("Illustrative reference")}: ` : ""}${t(art.alt)}`} width={768} height={432} loading="lazy" decoding="async" className="h-full w-full object-cover" />
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
    {items.filter(item => item.id === active).map(item => <article key={item.id} ref={detail} tabIndex={-1} data-specialty-details-for={item.id} data-embedded-detail={!!renderDetail} id={`specialty-details-${profile}`} aria-labelledby={`specialty-title-${item.id}`} className="specialty-details panel-glow mt-5 outline-none">
      <button type="button" onClick={() => { setActive(null); navigate({ hash: "#specialties" }); }} className="menu-choice mb-5 inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/30 px-3 text-sm font-semibold text-primary"><ArrowLeft className="h-4 w-4" aria-hidden />{t("All specialties")}</button>
      <div className="flex flex-wrap items-center justify-between gap-3"><h3 id={`specialty-title-${item.id}`} className="text-xl font-semibold">{t(item.title)}</h3><Tag variant={item.status === "Upcoming" ? "muted" : "primary"}>{t(item.status)}</Tag></div>
      {!renderDetail && <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{t(item.summary)}</p>}
      {item.id === "basic-electronics" && <BasicElectronicsSyllabus />}
      <ul className="my-4 flex flex-wrap gap-2">{item.topics.map(topic => <li key={topic}><Tag>{t(topic)}</Tag></li>)}</ul>
      {!renderDetail && <SpecialtyKnowledge profile={profile} specialty={item.id} />}
      {renderDetail ? renderDetail(item.id) : <div className="flex flex-wrap gap-4">{item.related.map(link => <a key={link.anchor} href={`#${link.anchor}`} className="inline-flex items-center gap-2 rounded text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t(link.label)}<ArrowRight className="h-4 w-4" aria-hidden /></a>)}</div>}
    </article>)}
  </section>;
};
export default SpecialtyExplorer;
