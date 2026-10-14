import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Home, UserRound, Shield, Zap, CodeXml, CircuitBoard, Wrench, PhoneCall, FileText, Mail, type LucideIcon } from "lucide-react";
import { navigation } from "@/data/site";
import logoCv from "@/assets/culichi-logo-zorro.png";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageProvider";
import ProfileDropdown from "./ProfileDropdown";
import Tag from "@/components/shared/Tag";
import LanguageSwitcher from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";

const navIcons: Record<string, LucideIcon> = { Home, About: UserRound, Cybersecurity: Shield, "Software Development": CodeXml, "Residential & Industrial Electrical Maintenance": Zap, Electronics: CircuitBoard, "Technical Repair": Wrench, "Call Center & Customer Service": PhoneCall, CV: FileText, Contact: Mail };

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
};


const NavIcon = ({ label, className }: { label: string; className?: string }) => {
  const Icon = navIcons[label] ?? FileText;
  return <Icon className={cn("h-5 w-5 shrink-0", className)} aria-hidden />;
};

const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileProfile, setMobileProfile] = useState<string | null>(null);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setMobileProfile(null); }, [location.pathname, location.hash]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-4" aria-label={t("Main")}>
        <Link to="/" className="group flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-lg border border-primary/25 bg-primary/10 transition-transform duration-300 group-hover:scale-110">
            <img src={logoCv} alt={t("Culichi fox logo")} width={36} height={36} className="h-8 w-8 object-contain" />
          </span>
          <span className="text-sm transition-colors group-hover:text-primary sm:text-base">{t("Christian Velasco")}</span>
        </Link>


        <ul className="hidden items-center gap-1 lg:flex">
          {navigation.map(item => {
            const link = <NavLink to={item.href} end={item.href === "/"} aria-label={t(item.label)} className={({ isActive }) => cn("flex items-center gap-1 rounded-md px-2 py-2 text-sm font-semibold transition-colors xl:px-3", isActive ? "bg-primary/10 text-primary" : "text-foreground/90 hover:bg-secondary hover:text-primary")}>
              {navIconColor[item.label] ? <NavIcon label={item.label} className={navIconColor[item.label]} /> : t(item.label)}
            </NavLink>;
            return <li key={item.href} className="relative">{item.children ? <ProfileDropdown item={item}>{link}</ProfileDropdown> : link}</li>;
          })}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher compact className="hidden sm:flex lg:ml-2" />
          <Button variant="ghost" size="icon"
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground lg:hidden"
            aria-expanded={open}
            aria-label={t(open ? t("Close menu") : t("Open menu"))}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background/98 backdrop-blur-xl lg:hidden">
          <div className="container mx-auto px-4 pt-4 sm:hidden"><LanguageSwitcher /></div>
          <ul className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {navigation.map(item => <li key={item.href}>
              <div className="flex items-center justify-between gap-2">
                <Link to={item.href} aria-label={t(item.label)} className="inline-flex min-h-11 min-w-0 items-center gap-3 rounded-lg px-3 text-sm font-semibold hover:bg-secondary">
                  {navIconColor[item.label] && <NavIcon label={item.label} className={navIconColor[item.label]} />}{t(item.label)}
                </Link>
                {item.children && <button type="button" aria-label={`${t("Open profile menu")}: ${t(item.label)}`} aria-expanded={mobileProfile === item.href} aria-controls={mobileProfile === item.href ? `mobile-specialties-${item.profile}` : undefined} className="rounded p-3 text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary" onClick={() => setMobileProfile(mobileProfile === item.href ? null : item.href)}><ChevronDown className={`h-4 w-4 ${mobileProfile === item.href ? "rotate-180" : ""}`} aria-hidden /></button>}
              </div>
              {item.children && mobileProfile === item.href && <ul id={`mobile-specialties-${item.profile}`} className="my-2 ml-5 space-y-1 border-l border-border pl-3">
                {item.children.map(child => <li key={child.href}><Link to={child.href} onClick={() => { setOpen(false); setMobileProfile(null); }} className="flex items-start gap-3 rounded-lg p-3 text-sm hover:bg-secondary">
                  {child.icon && <child.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />}
                  <span className="min-w-0"><span className="block font-medium">{t(child.label)}</span>{child.status && <span className="mt-1 block"><Tag>{t(child.status)}</Tag></span>}</span>
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
