import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Shield, Zap, CodeXml, CircuitBoard, Wrench, type LucideIcon } from "lucide-react";
import { navigation } from "@/data/site";
import type { ProfileSlug } from "@/data/profiles";
import logoCv from "@/assets/culichi-logo-zorro.png";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import ProfileDropdown from "./ProfileDropdown";
import { Button } from "@/components/ui/button";

const profileIcons: Record<ProfileSlug, LucideIcon> = { cybersecurity: Shield, development: CodeXml, electrical: Zap, electronics: CircuitBoard, repair: Wrench };
const profileColors: Record<ProfileSlug, string> = { cybersecurity: "nav-ico-cybersecurity", development: "nav-ico-software", electrical: "nav-ico-electrical", electronics: "nav-ico-electronics", repair: "nav-ico-repair" };

const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { pathname, hash } = useLocation();
  const { t } = useLanguage();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname, hash]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return <header className={cn("fixed inset-x-0 top-0 z-50 transition-colors duration-300", scrolled ? "border-b border-border bg-background/85 backdrop-blur-xl" : "border-b border-transparent")}>
    <nav className="container mx-auto flex h-16 items-center justify-between px-4" aria-label={t("Main")}>
      <Link to="/" className="group flex items-center gap-2 font-semibold tracking-tight">
        <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-lg border border-primary/25 bg-primary/10 transition-transform duration-300 group-hover:scale-110">
          <img src={logoCv} alt={t("Culichi fox logo")} width={36} height={36} className="h-8 w-8 object-contain" />
        </span>
        <span className="text-sm transition-colors group-hover:text-primary sm:text-base">Christian Velasco</span>
      </Link>
      <ul className="hidden items-center gap-1 lg:flex">
        {navigation.map((item) => {
          const Icon = item.profile ? profileIcons[item.profile] : null;
          const destination = <NavLink to={item.href} end={item.href === "/"} aria-label={t(item.label)}
            className={({ isActive }) => cn("flex items-center rounded-md px-2 py-2 text-sm font-semibold transition-colors xl:px-3", isActive ? "bg-primary/10 text-primary" : "text-foreground/90 hover:bg-secondary hover:text-primary")}>
            {Icon && item.profile ? <Icon className={cn("h-5 w-5 shrink-0", profileColors[item.profile])} aria-hidden /> : t(item.label)}
          </NavLink>;
          return <li key={item.href} className="flex items-center rounded-md">
            {item.children ? <ProfileDropdown item={item}>{destination}</ProfileDropdown> : destination}
          </li>;
        })}
      </ul>
      <div className="flex items-center gap-2">
        <LanguageSwitcher compact className="hidden sm:flex lg:ml-2" />
        <Button ref={menuButton} variant="ghost" size="icon" type="button" onClick={() => setOpen((value) => !value)}
          className="rounded-md p-2 text-muted-foreground lg:hidden" aria-expanded={open} aria-controls="mobile-navigation" aria-label={t(open ? "Close menu" : "Open menu")}>
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </Button>
      </div>
    </nav>
    {open && <nav id="mobile-navigation" aria-label={t("Mobile navigation")} className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
      <div className="container mx-auto px-4 pt-4 sm:hidden"><LanguageSwitcher /></div>
      <ul className="container mx-auto space-y-2 px-4 py-4">
        {navigation.map((item) => {
          const Icon = item.profile ? profileIcons[item.profile] : null;
          return <li key={item.href}>
            {item.children ? <details className="group rounded-lg border border-border/60">
              <summary className="flex min-h-12 cursor-pointer list-none items-center gap-3 rounded-lg px-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
                {Icon && item.profile && <Icon className={cn("h-5 w-5 shrink-0", profileColors[item.profile])} aria-hidden />}
                <span className="flex-1">{t(item.label)}</span><ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <ul className="space-y-1 border-t border-border p-2" data-profile={item.profile}>
                <li><Link to={item.href} className="block rounded-md px-3 py-2 text-sm font-medium text-primary">{t("Explore Profile")}</Link></li>
                {item.children.map((child) => <li key={child.href}><Link to={child.href} className="flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  {child.icon && <child.icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />}
                  <span>{t(child.label)}{child.description && <span className="block text-xs text-muted-foreground">{t(child.description)}</span>}</span>
                </Link></li>)}
              </ul>
            </details> : <Link to={item.href} aria-label={t(item.label)} className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium hover:bg-secondary">{t(item.label)}</Link>}
          </li>;
        })}
      </ul>
    </nav>}
  </header>;
};
export default SiteHeader;
