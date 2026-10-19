import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import type { NavItem } from "@/data/site";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useLanguage } from "@/i18n/LanguageProvider";
import { clearMascotArea, previewMascotArea } from "@/lib/mascotIntent";

const ProfileDropdown = ({ item, children }: { item: NavItem; children: ReactNode }) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const content = useRef<HTMLDivElement>(null);
  const openedByHover = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const { pathname, hash } = useLocation();
  const keepOpen = () => {
    clearTimeout(closeTimer.current);
    openedByHover.current = true;
    setOpen(true);
    previewMascotArea(item.profile ?? null);
  };
  const leave = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => { setOpen(false); if (item.profile) clearMascotArea(item.profile); }, 180);
  };
  useEffect(() => { setOpen(false); clearTimeout(closeTimer.current); previewMascotArea(null); }, [pathname, hash]);
  useEffect(() => () => clearTimeout(closeTimer.current), []);
  return <Popover open={open} onOpenChange={(value) => { clearTimeout(closeTimer.current); openedByHover.current = false; setOpen(value); }}>
    <div className="flex items-center" onPointerEnter={event => { if (event.pointerType === "mouse") { clearTimeout(closeTimer.current); previewMascotArea(item.profile ?? null); } }} onFocusCapture={() => previewMascotArea(item.profile ?? null)} onPointerLeave={leave}>
      {children}
      <PopoverTrigger asChild>
        <button type="button" data-dropdown-toggle
          onPointerEnter={event => { if (event.pointerType === "mouse") keepOpen(); }}
          aria-label={`${t("Open profile menu")}: ${t(item.label)}`}
          className="menu-choice rounded-md px-1 py-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
        </button>
      </PopoverTrigger>
    </div>
    <PopoverContent ref={content} align="start" sideOffset={10} collisionPadding={16} data-profile={item.profile}
      aria-label={`${t("Specialties")}: ${t(item.label)}`} onPointerEnter={keepOpen} onPointerLeave={leave}
      onOpenAutoFocus={(event) => { event.preventDefault(); if (!openedByHover.current) content.current?.querySelector<HTMLAnchorElement>("a")?.focus(); }}
      onCloseAutoFocus={event => { if (openedByHover.current) event.preventDefault(); }}
      onFocusCapture={() => previewMascotArea(item.profile ?? null)}
      className="profile-menu-panel max-h-[min(26rem,calc(100dvh-8rem))] w-[min(18rem,calc(100vw-2rem))] overflow-y-auto rounded-xl border-primary/25 p-2 shadow-2xl">
      <p className="mb-1 border-b border-border px-3 pb-2 pt-1 text-xs font-semibold text-primary">{t(item.shortLabel ?? item.label)}</p>
      <ul className="space-y-1">
        {item.children?.map((child) => <li key={child.href}>
          <Link to={child.href} aria-label={t(child.label)} onClick={() => { previewMascotArea(item.profile ?? null, true); setOpen(false); }} className="group flex items-center min-h-11 gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            {child.icon ? <child.icon className="h-4 w-4 shrink-0 text-primary" aria-hidden /> : <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" aria-hidden />}
            <span className="min-w-0 flex-1 text-sm font-medium">{t(child.shortLabel ?? child.label)}</span>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden />
          </Link>
        </li>)}
      </ul>
    </PopoverContent>
  </Popover>;
};
export default ProfileDropdown;
