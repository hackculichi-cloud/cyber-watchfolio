import { useEffect, useState } from "react";
import type { ProfileSection } from "@/data/profiles";
import { cn } from "@/lib/utils";

/** Sticky in-page navigation for a profile page. Scroll-spy driven, keyboard accessible. */
const ProfileSectionNav = ({ sections }: { sections: ProfileSection[] }) => {
  const [active, setActive] = useState(sections[0]?.id);

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
      aria-label="Profile sections"
      className="sticky top-16 z-30 border-b border-border bg-background/85 backdrop-blur-xl"
    >
      <ul className="container mx-auto flex gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ProfileSectionNav;
