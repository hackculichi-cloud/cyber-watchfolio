import { useLanguage } from "@/i18n/LanguageProvider";
import { useEffect, useId, useLayoutEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronsUpDown } from "lucide-react";
import { profileForPath, type ProfileSection } from "@/data/profiles";
import { cn } from "@/lib/utils";

/** Sticky in-page navigation for a profile page. Scroll-spy driven, keyboard accessible. */
const ProfileSectionNav = ({ sections, contentKey }: { sections: ProfileSection[]; contentKey?: string | null }) => {
  const { t } = useLanguage();
  const [active, setActive] = useState(sections[0]?.id);
  const [showAll, setShowAll] = useState(false);
  const selectId = useId();
  const navigate = useNavigate();
  const { hash, pathname } = useLocation();
  // Electricity already exposes one area/tab at a time; the other long profiles use this overview.
  const compactProfile = !!profileForPath(pathname) && profileForPath(pathname)?.slug !== "electrical";

  useLayoutEffect(() => {
    if (!compactProfile) return;
    const nodes = sections.map(section => document.getElementById(section.id)).filter((node): node is HTMLElement => !!node);
    let target: HTMLElement | null = null;
    try { target = document.getElementById(decodeURIComponent(hash.slice(1))); } catch { /* Invalid hashes use the overview. */ }
    const selected = nodes.find(node => node.id === hash.slice(1) || (target && node.contains(target)))?.id ?? nodes[0]?.id;
    for (const node of nodes) {
      node.dataset.mobileProfileSection = "true";
      node.dataset.mobileProfileActive = String(showAll || node.id === selected);
    }
    const phone = window.matchMedia("(max-width: 767px)");
    const syncSelection = () => { if (phone.matches && selected) setActive(selected); };
    syncSelection();
    phone.addEventListener("change", syncSelection);
    return () => {
      phone.removeEventListener("change", syncSelection);
      for (const node of nodes) {
        delete node.dataset.mobileProfileSection;
        delete node.dataset.mobileProfileActive;
      }
    };
  }, [compactProfile, sections, hash, showAll]);

  useEffect(() => {
    const target = hash.slice(1);
    if (sections.some(section => section.id === target)) setActive(target);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections, hash, contentKey]);

  return (
    <nav
      aria-label={t("Profile sections")}
      className="profile-section-nav sticky top-28 z-30 border-b border-border bg-background"
    >
      <div className="container mx-auto flex items-center gap-3 px-4 py-2 sm:hidden">
        <label htmlFor={selectId} className={`${compactProfile ? "sr-only" : "shrink-0 text-[11px] font-medium text-muted-foreground"}`}>{t("On this page")}</label>
        <div className="relative min-w-0 flex-1">
          <select id={selectId} aria-label={t("Jump to section")} value={active} onChange={event => { setActive(event.target.value); navigate({ hash: `#${event.target.value}` }); }}
            className="h-11 w-full appearance-none rounded-lg border border-primary/25 bg-surface pl-3 pr-9 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary">
            {sections.map(section => <option key={section.id} value={section.id}>{t(section.label)}</option>)}
          </select>
          <ChevronsUpDown aria-hidden className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
        </div>
        {compactProfile && <button type="button" aria-expanded={showAll} aria-label={t(showAll ? "Show one profile section at a time" : "Show the entire profile")} onClick={() => setShowAll(value => !value)} className="min-h-11 shrink-0 rounded-lg border border-primary/25 bg-primary/10 px-3 text-xs font-medium text-primary focus-visible:ring-2 focus-visible:ring-primary">{t(showAll ? "By section" : "View all")}</button>}
      </div>
      <ul className="container mx-auto hidden gap-1 overflow-x-auto px-4 py-2 sm:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className={cn(
                "menu-choice block whitespace-nowrap rounded-md px-3 py-1.5 text-sm transition-colors",
                active === s.id
                  ? "bg-primary/12 font-medium text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              {t(s.label)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ProfileSectionNav;
