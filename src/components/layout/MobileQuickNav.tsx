import { Link, useLocation } from "react-router-dom";
import { Home, LayoutGrid, FileText, Mail } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Thumb-friendly shortcuts; reserved layout space keeps the last content visible. */
const MobileQuickNav = () => {
  const { t } = useLanguage();
  const { pathname, hash } = useLocation();
  const items = [
    { href: "/", label: "Home", icon: Home, active: pathname === "/" && hash !== "#areas" },
    { href: "/#areas", label: "Areas", icon: LayoutGrid, active: pathname === "/" && hash === "#areas" },
    { href: "/cv", label: "CV", icon: FileText, active: pathname === "/cv" },
    { href: "/contact", label: "Contact", icon: Mail, active: pathname === "/contact" },
  ];
  return <nav aria-label={t("Quick navigation")} data-mobile-quicknav className="mobile-quicknav fixed inset-x-0 bottom-0 z-40 border-t border-primary/20 bg-background/95 backdrop-blur-xl sm:hidden">
    <ul className="mx-auto grid max-w-lg grid-cols-4 gap-1 px-2 pt-1">
      {items.map(({ href, label, icon: Icon, active }) => <li key={href}><Link to={href} aria-current={active ? "page" : undefined}
        className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[11px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
        <Icon className="h-5 w-5" aria-hidden />{t(label)}
      </Link></li>)}
    </ul>
  </nav>;
};
export default MobileQuickNav;
