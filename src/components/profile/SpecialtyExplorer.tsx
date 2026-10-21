import "@/components/electronics/ElectronicsTimeline.css";
import InstitutionLink from "./InstitutionLink";
import BasicElectronicsSyllabus from "./BasicElectronicsSyllabus";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronDown, X, Zap } from "lucide-react";
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
  const timeline = profile === "electronics";
  const ChoiceList = timeline ? "ol" : "div";
  const ChoiceItem = timeline ? "li" : "div";
  const { hash } = useLocation();
  const navigate = useNavigate();
  const detail = useRef<HTMLElement>(null);
  const openingByClick = useRef(false);
  const closingId = useRef<string | null>(null);
  const items = useMemo(() => specialtiesFor(profile), [profile]);
  const [localActive, setLocalActive] = useState<string | null>(null);
  const active = activeId === undefined ? localActive : activeId;
  const setActive = onSelect ?? setLocalActive;
  const closeDetail = () => {
    closingId.current = active ?? null;
    setActive(null);
    navigate({ hash: "#specialties" });
  };
  const enterDetail = useCallback(() => {
    detail.current?.focus({ preventScroll: true });
    detail.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }, []);
  useEffect(() => {
    const id = hash.slice(1);
    if (items.some(item => item.id === id)) setActive(id);
    else if (id === "specialties") setActive(null);
  }, [hash, items, setActive]);
  useLayoutEffect(() => {
    if (!active || (hash.slice(1) !== active && !openingByClick.current)) return;
    openingByClick.current = false;
    enterDetail();
  }, [active, hash, enterDetail]);
  useLayoutEffect(() => {
    if (active || !closingId.current) return;
    const card = document.querySelector<HTMLButtonElement>(`[data-specialty="${closingId.current}"]`);
    closingId.current = null;
    card?.focus({ preventScroll: true });
  }, [active]);
  return <section id="specialties" className="container mx-auto scroll-mt-32 px-4 py-12">
    {timeline && <span id="tracks" className="block scroll-mt-32" />}
    <div className={profile === "electrical" ? "text-center [&_.eyebrow]:justify-center [&_p]:mx-auto" : undefined}><SectionHeading eyebrow={timeline ? t("Main training") : undefined} title={t(timeline ? "My electronics learning path" : "My specialties")} description={timeline ? t("Seven courses, in this order. Basic Electronics is in progress; the next six have not started yet.") : undefined} /></div>
    {timeline && <div className="mb-5"><InstitutionLink profile="electronics" /></div>}
    <ChoiceList data-electronics-timeline={timeline ? "" : undefined} className={timeline ? "specialty-grid electronics-training-timeline" : `specialty-grid grid grid-cols-1 gap-3 sm:grid-cols-2 ${profile === "electrical" ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
      {items.map((item, index) => { const art = specialtyArtwork[item.id]; return <ChoiceItem key={item.id} id={item.id} data-specialty-anchor data-training-stage={timeline ? index + 1 : undefined} className="scroll-mt-32">
        <button type="button" data-specialty={item.id} aria-expanded={active === item.id} aria-controls={active === item.id ? `specialty-details-${profile}` : undefined}
          onClick={() => { if (active === item.id) closeDetail(); else { openingByClick.current = true; setActive(item.id); navigate({ hash: `#${item.id}` }); } }}
          className={`specialty-choice ${timeline ? "electronics-training-choice" : "overflow-hidden"} group flex h-full w-full flex-col rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${active === item.id ? "border-primary bg-primary/10" : "border-border bg-surface/60 hover:border-primary/60"}`}>
          {!timeline && art && <span className="relative block aspect-[16/9] w-full overflow-hidden border-b border-border bg-background">
            <img data-specialty-art={item.id} src={art.src} alt={t(art.alt)} width={768} height={432} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </span>}
          {timeline ? <span className="training-stage-content">
            <span className="training-step-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <span data-specialty-logo={item.id} aria-hidden="true" className="training-stage-icon"><item.icon /></span>
            <span className="min-w-0"><span className="specialty-card-title block font-semibold">{t(item.title)}</span><Tag variant={item.status === "Upcoming" ? "muted" : "primary"}>{t(item.status)}</Tag></span>
            <ChevronDown className={`h-4 w-4 shrink-0 text-primary ${active === item.id ? "rotate-180" : ""}`} aria-hidden="true" />
            {item.status !== "Upcoming" && <span className="training-current-summary text-sm leading-relaxed text-muted-foreground">{t(item.summary)}<span className="mt-2 block font-semibold text-primary">{t("View syllabus & skills")}</span></span>}
          </span> : <span className={`specialty-card-copy flex flex-1 flex-col gap-3 p-5 ${profile === "electrical" ? "items-center text-center" : "items-start text-left"}`}>
            <span data-specialty-logo={item.id} aria-hidden className={`relative grid place-items-center border border-primary/40 bg-primary/10 text-primary ${profile === "electrical" ? "h-20 w-20 rounded-full shadow-[0_0_22px_hsl(var(--primary)/.12)]" : "h-14 w-14 rounded-xl"}`}>
              <item.icon className={profile === "electrical" ? "h-9 w-9" : "h-7 w-7"} />
              {profile === "electrical" && <span className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full border border-primary/50 bg-background"><Zap className="h-4 w-4" /></span>}
            </span>
            <span className={`specialty-card-title flex w-full items-center gap-2 font-semibold ${profile === "electrical" ? "justify-center" : "justify-between"}`}>{t(item.title)}<ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${active === item.id ? "rotate-180" : ""}`} aria-hidden /></span>
            <Tag variant={item.status.includes("Planned") || item.status === "Upcoming" ? "muted" : "primary"}>{t(item.status)}</Tag>
            <span className="specialty-card-summary line-clamp-3 text-xs leading-relaxed text-muted-foreground">{t(item.summary)}</span>
          </span>}
        </button>
      </ChoiceItem>; })}
    </ChoiceList>
    {/* A long article must not inherit panel-glow's large blurred hover shadow. */}
    {items.filter(item => item.id === active).map(item => <article key={item.id} ref={detail} tabIndex={-1} data-specialty-details-for={item.id} data-embedded-detail={!!renderDetail} id={`specialty-details-${profile}`} aria-labelledby={`specialty-title-${item.id}`} className="specialty-details mt-5 rounded-xl border border-primary/25 p-5 outline-none">
      <div className="mb-5 flex items-center justify-between gap-3">
        <button type="button" onClick={closeDetail} className="menu-choice inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/30 px-3 text-sm font-semibold text-primary"><ArrowLeft className="h-4 w-4" aria-hidden />{t("All specialties")}</button>
        <button type="button" data-close-specialty="top" onClick={closeDetail} aria-label={t("Close specialty")} className="menu-choice inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm font-semibold"><X className="h-5 w-5" aria-hidden /><span className="hidden sm:inline">{t("Close")}</span></button>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3"><h3 id={`specialty-title-${item.id}`} className="text-xl font-semibold">{t(item.title)}</h3><Tag variant={item.status === "Upcoming" ? "muted" : "primary"}>{t(item.status)}</Tag></div>
      {!renderDetail && <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{t(item.summary)}</p>}
      {item.id === "basic-electronics" && <BasicElectronicsSyllabus />}
      <ul className="my-4 flex flex-wrap gap-2">{item.topics.map(topic => <li key={topic}><Tag>{t(topic)}</Tag></li>)}</ul>
      {!renderDetail && <SpecialtyKnowledge profile={profile} specialty={item.id} />}
      {renderDetail ? renderDetail(item.id) : <div className="flex flex-wrap gap-4">{item.related.map(link => <a key={link.anchor} href={`#${link.anchor}`} className="inline-flex items-center gap-2 rounded text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t(link.label)}<ArrowRight className="h-4 w-4" aria-hidden /></a>)}</div>}
      <div className="mt-5 flex justify-end border-t border-border pt-4"><button type="button" data-close-specialty="bottom" onClick={closeDetail} className="menu-choice inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/30 px-4 text-sm font-semibold text-primary"><X className="h-4 w-4" aria-hidden />{t("Close specialty")}</button></div>
    </article>)}
  </section>;
};
export default SpecialtyExplorer;
