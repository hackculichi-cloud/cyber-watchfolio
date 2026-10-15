import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { profileHeroImage } from "@/data/profileMedia";
import Tag from "@/components/shared/Tag";
import type { NavItem } from "@/data/site";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useLanguage } from "@/i18n/LanguageProvider";
import { clearMascotArea, previewMascotArea } from "@/lib/mascotIntent";
import MascotGearPreview from "@/components/shared/MascotGearPreview";

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
    <div className="flex items-center" onFocusCapture={() => previewMascotArea(item.profile ?? null)} onPointerEnter={(event) => { if (event.pointerType === "mouse" && !(event.target as Element).closest("[data-dropdown-toggle]")) keepOpen(); }} onPointerLeave={leave}>
      {children}
      <PopoverTrigger asChild>
        <button type="button" data-dropdown-toggle
          aria-label={`${t("Open profile menu")}: ${t(item.label)}`}
          className="rounded-md px-1 py-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
        </button>
      </PopoverTrigger>
    </div>
    <PopoverContent ref={content} align="start" sideOffset={10} collisionPadding={16} data-profile={item.profile}
      aria-label={`${t("Specialties")}: ${t(item.label)}`} onPointerEnter={keepOpen} onPointerLeave={leave}
      onOpenAutoFocus={(event) => { event.preventDefault(); if (!openedByHover.current) content.current?.querySelector<HTMLAnchorElement>("a")?.focus(); }}
      onCloseAutoFocus={event => { if (openedByHover.current) event.preventDefault(); }}
      onFocusCapture={() => previewMascotArea(item.profile ?? null)}
      className="max-h-[calc(100dvh-8rem)] w-[min(23rem,calc(100vw-2rem))] overflow-y-auto rounded-xl border-primary/25 p-3 shadow-2xl">
      {item.profile && <img src={profileHeroImage[item.profile]} alt="" aria-hidden className="mb-3 h-20 w-full rounded-lg object-cover opacity-70" />}
      <p className="mb-2 border-b border-border px-3 pb-3 pt-1 text-xs font-semibold uppercase tracking-wider text-primary">{t(item.label)}</p>
      {item.profile && <div className="mb-3"><MascotGearPreview profile={item.profile} /></div>}
      <ul className="space-y-1">
        {item.children?.map((child) => <li key={child.href}>
          <Link to={child.href} onClick={() => { previewMascotArea(item.profile ?? null, true); setOpen(false); }} className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            {child.icon ? <child.icon className="h-5 w-5 shrink-0 text-primary" aria-hidden /> : <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" aria-hidden />}
            <span className="min-w-0 flex-1"><span className="block text-sm font-medium">{t(child.label)}</span>
              {child.status && <span className="my-1 block"><Tag>{t(child.status)}</Tag></span>}
              {child.description && <span className="mt-0.5 block text-xs text-muted-foreground">{t(child.description)}</span>}
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden />
          </Link>
        </li>)}
      </ul>
    </PopoverContent>
  </Popover>;
};
export default ProfileDropdown;
