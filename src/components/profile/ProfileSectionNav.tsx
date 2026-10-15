import { useLanguage } from "@/i18n/LanguageProvider";
import { useEffect, useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronsUpDown } from "lucide-react";
import type { ProfileSection } from "@/data/profiles";
import { cn } from "@/lib/utils";

/** Sticky in-page navigation for a profile page. Scroll-spy driven, keyboard accessible. */
const ProfileSectionNav = ({ sections }: { sections: ProfileSection[] }) => {
  const { t } = useLanguage();
  const [active, setActive] = useState(sections[0]?.id);
  const selectId = useId();
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [sections]);

  return (
    <nav
      aria-label={t("Profile sections")}
      className="sticky top-28 z-30 border-b border-border bg-background/85 backdrop-blur-xl"
    >
      <div className="container mx-auto flex items-center gap-3 px-4 py-2 sm:hidden">
        <label htmlFor={selectId} className="shrink-0 text-[11px] font-medium text-muted-foreground">{t("On this page")}</label>
        <div className="relative min-w-0 flex-1">
          <select id={selectId} aria-label={t("Jump to section")} value={active} onChange={event => { setActive(event.target.value); navigate({ hash: `#${event.target.value}` }); }}
            className="h-11 w-full appearance-none rounded-lg border border-primary/25 bg-surface pl-3 pr-9 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary">
            {sections.map(section => <option key={section.id} value={section.id}>{t(section.label)}</option>)}
          </select>
          <ChevronsUpDown aria-hidden className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
        </div>
      </div>
      <ul className="container mx-auto hidden gap-1 overflow-x-auto px-4 py-2 sm:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className={cn(
                "block whitespace-nowrap rounded-md px-3 py-1.5 text-sm transition-colors",
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
