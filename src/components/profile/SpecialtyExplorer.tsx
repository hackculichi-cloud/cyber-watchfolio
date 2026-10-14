import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { specialtiesFor } from "@/data/specialties";
import type { ProfileSlug } from "@/data/profiles";
import { useLanguage } from "@/i18n/LanguageProvider";
import Tag from "@/components/shared/Tag";
import SectionHeading from "@/components/shared/SectionHeading";

/** Stable hash destinations and visual, expandable specialty cards. */
const SpecialtyExplorer = ({ profile }: { profile: ProfileSlug }) => {
  const { t } = useLanguage();
  const { hash } = useLocation();
  const items = useMemo(() => specialtiesFor(profile), [profile]);
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const id = hash.slice(1);
    if (items.some(item => item.id === id)) setActive(id);
  }, [hash, items]);
  return <section id="specialties" className="container mx-auto scroll-mt-32 px-4 py-12">
    <SectionHeading eyebrow={t("Specialties")} title={t("Explore this area")} description={t("Choose a specialty to see its training status, topics and related work.")} />
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map(item => <div key={item.id} id={item.id} className="scroll-mt-32">
        <button type="button" data-specialty={item.id} aria-expanded={active === item.id} aria-controls={active === item.id ? `specialty-details-${profile}` : undefined}
          onClick={() => setActive(active === item.id ? null : item.id)}
          className={`flex h-full w-full flex-col items-start gap-3 rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${active === item.id ? "border-primary bg-primary/10" : "border-border bg-surface/60 hover:border-primary/60"}`}>
          <span className="grid h-14 w-14 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary"><item.icon className="h-7 w-7" aria-hidden /></span>
          <span className="flex w-full items-center justify-between gap-2 font-semibold">{t(item.title)}<ChevronDown className={`h-4 w-4 shrink-0 ${active === item.id ? "rotate-180" : ""}`} aria-hidden /></span>
          <Tag variant={item.status.includes("Planned") ? "muted" : "primary"}>{t(item.status)}</Tag>
          <span className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">{t(item.summary)}</span>
        </button>
      </div>)}
    </div>
    {items.filter(item => item.id === active).map(item => <article key={item.id} id={`specialty-details-${profile}`} className="panel-glow mt-5">
      <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-xl font-semibold">{t(item.title)}</h3><Tag variant="primary">{t(item.status)}</Tag></div>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{t(item.summary)}</p>
      <ul className="my-4 flex flex-wrap gap-2">{item.topics.map(topic => <li key={topic}><Tag>{t(topic)}</Tag></li>)}</ul>
      <div className="flex flex-wrap gap-4">{item.related.map(link => <a key={link.anchor} href={`#${link.anchor}`} className="inline-flex items-center gap-2 rounded text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t(link.label)}<ArrowRight className="h-4 w-4" aria-hidden /></a>)}</div>
    </article>)}
  </section>;
};
export default SpecialtyExplorer;
