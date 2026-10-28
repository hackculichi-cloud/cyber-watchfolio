import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Home, UserRound, Shield, Zap, CodeXml, CircuitBoard, Wrench, PhoneCall, FileText, Mail, Scissors, type LucideIcon } from "lucide-react";
import { preloadProfile } from "@/lib/preloadProfile";
import { navigation } from "@/data/site";
import { profileForPath } from "@/data/profiles";
import type { MascotVariant } from "@/components/shared/CulichiMascot";
import MascotMorph from "@/components/shared/MascotMorph";
import { previewMascotArea, type MascotIntent } from "@/lib/mascotIntent";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageProvider";
import ProfileDropdown from "./ProfileDropdown";
import LanguageSwitcher from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";
import CopperConductorTitle from "@/components/electrical/CopperConductorTitle";
import NetworkSecurityTitle from "@/components/cybersecurity/NetworkSecurityTitle";
import PcbTitle from "@/components/electronics/PcbTitle";
import { CodeWordmark } from "@/components/software/CodeExecutionTitle";
import BarberTitle from "@/components/barbering/BarberTitle";

const navIcons: Record<string, LucideIcon> = { Home, About: UserRound, Cybersecurity: Shield, "Software Development": CodeXml, "Residential & Industrial Electrical Maintenance": Zap, Electronics: CircuitBoard, "Technical Repair": Wrench, "Call Center & Customer Service": PhoneCall, Barbering: Scissors, CV: FileText, Contact: Mail };

/** Per-profile accent color utilities (defined in index.css). */
const navIconColor: Record<string, string> = {
  "Call Center & Customer Service": "text-teal-300",
  Technology: "nav-ico-cybersecurity",
  Cybersecurity: "nav-ico-cybersecurity",
  Labs: "nav-ico-cybersecurity",
  "Software Development": "nav-ico-software",
  Projects: "nav-ico-software",
  "Electrical & Electronics": "nav-ico-electrical",
  "Residential & Industrial Electrical Maintenance": "nav-ico-electrical",
  Electronics: "nav-ico-electronics",
  "Technical Repair": "nav-ico-repair",
  Smartphones: "nav-ico-repair",
  Laptops: "nav-ico-repair",
  Consoles: "nav-ico-repair",
  Barbering: "nav-ico-barbering",
};


const NavIcon = ({ label, className }: { label: string; className?: string }) => {
  const Icon = navIcons[label] ?? FileText;
  return <span className={cn("area-nav-icon grid h-10 w-10 shrink-0 place-items-center rounded-full", className)}><Icon className="h-6 w-6" aria-hidden /></span>;
};

const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileProfile, setMobileProfile] = useState<string | null>(null);
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { t } = useLanguage();
  const mascot = profileForPath(location.pathname)?.slug ?? "emblem";
  const [previewMascot, setPreviewMascot] = useState<MascotVariant | null>(null);
  const [orbitCommit, setOrbitCommit] = useState(false);
  const [navigationCommit, setNavigationCommit] = useState(false);
  const commitTimer = useRef<ReturnType<typeof setTimeout>>();
  const displayedMascot = previewMascot ?? mascot;
  useEffect(() => {
    const preview = (event: Event) => {
      if (!isHome) return;
      const detail = (event as CustomEvent<{ profile: MascotVariant | null; committing?: boolean }>).detail;
      setPreviewMascot(detail.profile);
      setOrbitCommit(!!detail.committing);
    };
    const intent = (event: Event) => {
      if (!isHome) return;
      const { profile, commit } = (event as CustomEvent<MascotIntent>).detail;
      setPreviewMascot(profile);
      if (commit) {
        clearTimeout(commitTimer.current);
        setNavigationCommit(true);
        commitTimer.current = setTimeout(() => setNavigationCommit(false), 1000);
      }
    };
    window.addEventListener("culichi:outfit-preview", preview);
    window.addEventListener("culichi:area-intent", intent);
    return () => { window.removeEventListener("culichi:outfit-preview", preview); window.removeEventListener("culichi:area-intent", intent); clearTimeout(commitTimer.current); };
  }, [isHome]);

  useEffect(() => { setPreviewMascot(null); setOrbitCommit(false); setNavigationCommit(false); clearTimeout(commitTimer.current); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setMobileProfile(null); }, [location.pathname, location.hash]);
  useEffect(() => {
    if (!open) { setMobileProfile(null); previewMascotArea(null); }
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
      if (event.key === "Tab") {
        const controls = [...(header.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), select') ?? [])].filter(el => el.getClientRects().length > 0);
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    const outside = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("keydown", closeWithEscape);
    document.addEventListener("pointerdown", outside);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", closeWithEscape); document.removeEventListener("pointerdown", outside); };
  }, [open]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header
      ref={header}
      className={cn(
        "site-header fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-border bg-background/95 sm:backdrop-blur-sm" : "border-b border-transparent",
      )}
    >
      <nav className="container mx-auto flex h-28 items-center justify-between px-4" aria-label={t("Main")}>
        <Link to="/" className="group flex min-w-0 items-center gap-2 font-semibold tracking-tight">
          <span role="img" aria-label={t("Culichi fox logo")} data-profile={displayedMascot} data-header-mascot={displayedMascot} className="header-mascot-frame grid h-28 w-28 shrink-0 place-items-center">
            <MascotMorph outfit={displayedMascot} portrait committing={orbitCommit || navigationCommit} />
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span data-header-brand data-brand-profile={displayedMascot} data-profile={displayedMascot === "emblem" ? undefined : displayedMascot} className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"><span key={displayedMascot} data-brand-lettering={displayedMascot} className="header-wordmark-slot">{displayedMascot === "electrical" ? <CopperConductorTitle text="Culichi" variant="brand" /> : displayedMascot === "development" ? <CodeWordmark /> : displayedMascot === "electronics" ? <PcbTitle text="Culichi" variant="brand" /> : displayedMascot === "cybersecurity" ? <NetworkSecurityTitle text="Culichi" variant="brand" /> : displayedMascot === "barbering" ? <BarberTitle text="Culichi" variant="brand" /> : <span className="profile-wordmark">Culichi</span>}<span data-brand-dot data-profile={displayedMascot === "emblem" ? undefined : displayedMascot} className="text-primary transition-colors duration-200">.</span></span></span>
            <span className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">{t("Christian Velasco")}</span>
          </span>
        </Link>


        <ul className="hidden items-center gap-1 xl:flex">
          {navigation.map(item => {
            const link = <NavLink to={item.href} end={item.href === "/"} aria-label={t(item.label)} onPointerEnter={() => preloadProfile(item.href)} onPointerDown={() => preloadProfile(item.href)} onFocus={() => { preloadProfile(item.href); previewMascotArea(item.profile ?? null); }} onClick={event => { if (item.profile && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) previewMascotArea(item.profile, true); }} className={({ isActive }) => cn("menu-choice flex items-center gap-1 rounded-md px-2 py-2 text-sm font-semibold transition-colors", isActive ? "bg-primary/10 text-primary" : "text-foreground/90 hover:bg-secondary hover:text-primary")}>
              {navIconColor[item.label] ? <NavIcon label={item.label} className={navIconColor[item.label]} /> : t(item.label)}
            </NavLink>;
            return <li key={item.href} className="relative">{item.children ? <ProfileDropdown item={item}>{link}</ProfileDropdown> : link}</li>;
          })}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher compact className="hidden sm:flex xl:ml-2" />
          <Button variant="ghost" size="icon"
            ref={menuButton}
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={t(open ? t("Close menu") : t("Open menu"))}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div id="mobile-navigation" className="max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain border-t border-border bg-background/95 backdrop-blur-xl xl:hidden">
          <div className="container mx-auto px-4 pt-4 sm:hidden"><LanguageSwitcher /></div>
          <ul className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {navigation.map(item => <li key={item.href}>
              <div className="flex items-center justify-between gap-2">
                <Link to={item.href} onPointerEnter={() => preloadProfile(item.href)} onPointerDown={() => preloadProfile(item.href)} onFocus={() => { preloadProfile(item.href); previewMascotArea(item.profile ?? null); }} onClick={() => { if (item.profile) previewMascotArea(item.profile, true); setOpen(false); }} aria-label={t(item.label)} aria-current={location.pathname === item.href ? "page" : undefined} className="menu-choice inline-flex min-h-11 min-w-0 flex-1 items-center gap-3 rounded-lg px-3 text-sm font-semibold hover:bg-secondary aria-[current=page]:bg-primary/10 aria-[current=page]:text-primary">
                  {navIconColor[item.label] && <NavIcon label={item.label} className={navIconColor[item.label]} />}{t(item.shortLabel ?? item.label)}
                </Link>
                {item.children && <button type="button" aria-label={`${t("Open profile menu")}: ${t(item.label)}`} aria-expanded={mobileProfile === item.href} aria-controls={mobileProfile === item.href ? `mobile-specialties-${item.profile}` : undefined} className="rounded p-3 text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary" onClick={() => { const next = mobileProfile === item.href ? null : item.href; setMobileProfile(next); previewMascotArea(next ? item.profile ?? null : null); }}><ChevronDown className={`h-4 w-4 ${mobileProfile === item.href ? "rotate-180" : ""}`} aria-hidden /></button>}
              </div>
              {item.children && mobileProfile === item.href && <ul id={`mobile-specialties-${item.profile}`} className="my-2 ml-5 space-y-1 border-l border-border pl-3">
                {item.children.map(child => <li key={child.href}><Link to={child.href} aria-label={t(child.label)} onClick={() => { setOpen(false); setMobileProfile(null); }} className="menu-choice flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-secondary">
                  {child.icon && <child.icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />}
                  <span className="min-w-0 font-medium">{t(child.shortLabel ?? child.label)}</span>
                </Link></li>)}
              </ul>}
            </li>)}
          </ul>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
