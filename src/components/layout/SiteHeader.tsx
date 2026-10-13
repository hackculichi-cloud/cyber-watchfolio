import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Home, UserRound, Shield, Zap, Wrench, BriefcaseBusiness, NotebookPen, FileText, Mail, type LucideIcon } from "lucide-react";
import { navigation } from "@/data/site";
import logoCv from "@/assets/culichi-logo-zorro.png";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const navIcons: Record<string, LucideIcon> = { Home, About: UserRound, Technology: Shield, "Electrical & Electronics": Zap, "Technical Repair": Wrench, Experience: BriefcaseBusiness, Journal: NotebookPen, CV: FileText, Contact: Mail };

/** Per-profile accent color utilities (defined in index.css). */
const navIconColor: Record<string, string> = {
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

const navDotColor: Record<string, string> = {
  Cybersecurity: "nav-dot-cybersecurity",
  Labs: "nav-dot-cybersecurity",
  "Software Development": "nav-dot-software",
  Projects: "nav-dot-software",
  "Residential & Industrial Electrical Maintenance": "nav-dot-electrical",
  Electronics: "nav-dot-electronics",
  Smartphones: "nav-dot-repair",
  Laptops: "nav-dot-repair",
  Consoles: "nav-dot-repair",
};

const NavIcon = ({ label, className }: { label: string; className?: string }) => {
  const Icon = navIcons[label] ?? FileText;
  return <Icon className={cn("h-5 w-5 shrink-0", className)} aria-hidden />;
};

const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

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
            <img src={logoCv} alt="Culichi fox logo" width={36} height={36} className="h-8 w-8 object-contain" />
          </span>
          <span className="text-sm transition-colors group-hover:text-primary sm:text-base">Christian Velasco</span>
        </Link>


        <ul className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <li key={item.href} className="group relative">
              <Tooltip>
              <TooltipTrigger asChild>
              <NavLink
                to={item.href}
                aria-label={t(item.label)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-1 rounded-md px-3 py-2 text-sm transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )
                }
              >
                <NavIcon label={item.label} className={navIconColor[item.label]} />
                {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
              </NavLink>
              </TooltipTrigger>
              {/* Parents open a dropdown; the label there would cover it. */}
              {!item.children && <TooltipContent side="bottom">{t(item.label)}</TooltipContent>}
              </Tooltip>

              {item.children && (
                <div className="invisible absolute left-0 top-full w-60 translate-y-1 rounded-xl border border-border bg-popover p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      to={child.href}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      <span aria-hidden className={cn("h-1.5 w-1.5 shrink-0 rounded-full", navDotColor[child.label])} />
                      {t(child.label)}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
        <LanguageSwitcher compact className="hidden sm:flex lg:ml-2" />
        <Button variant="ghost" size="icon"
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground lg:hidden"
          aria-expanded={open}
          aria-label={open ? t("Close menu") : t("Open menu")}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/98 backdrop-blur-xl lg:hidden">
          <div className="container mx-auto px-4 pt-4 sm:hidden"><LanguageSwitcher /></div>
          <ul className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {navigation.map((item) => (
              <li key={t(item.label)}>
                <Link
                  to={item.href}
                  aria-label={t(item.label)}
                   title={t(item.label)}
                   className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary"
                >
                  <NavIcon label={item.label} className={navIconColor[item.label]} />
                </Link>
                {item.children && (
                  <ul className="ml-3 border-l border-border pl-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          to={child.href}
                          className="block rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {t(child.label)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
