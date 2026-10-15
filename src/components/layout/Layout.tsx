import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import MobileQuickNav from "./MobileQuickNav";
import { profileForPath } from "@/data/profiles";
import { useLanguage } from "@/i18n/LanguageProvider";

const Layout = () => {
  const { pathname, hash } = useLocation();
  const profile = profileForPath(pathname);
  const { t } = useLanguage();

  useEffect(() => {
    if (hash) {
      let id: string;
      try { id = decodeURIComponent(hash.slice(1)); } catch { id = hash.slice(1); }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return (
    <div className="site-layout flex min-h-screen flex-col bg-background" data-profile={profile?.slug}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {t("Skip to content")}
      </a>
      <SiteHeader />
      <main id="main" key={profile?.slug ?? "base"} className="profile-fade flex-1 pt-20">
        <Outlet />
      </main>
      <SiteFooter />
      <MobileQuickNav />
    </div>
  );
};

export default Layout;
