import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUp, ArrowUpRight, Github, Linkedin, Mail, UserRound, FileText } from "lucide-react";
import { site } from "@/data/site";
import { professionalProfiles, profileForPath } from "@/data/profiles";
import { useLanguage } from "@/i18n/LanguageProvider";
import ContactPreview from "@/components/shared/ContactPreview";
import HomeCharacter from "@/components/shared/HomeCharacter";
import CulichiMascot from "@/components/shared/CulichiMascot";
import MascotScene from "@/components/shared/MascotScene";

const contactLink = "inline-grid h-12 w-12 place-items-center rounded-full border border-primary/25 bg-background/50 text-foreground/85 transition-colors hover:border-primary/70 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

// Changing a section hash does not change the footer's copy, art or menus.
const FooterContent = memo(function FooterContent({ pathname }: { pathname: string }) {
  const { t } = useLanguage();
  const mascot = profileForPath(pathname)?.slug ?? "emblem";
  const footerProfile = profileForPath(pathname)?.slug;
  return <footer className="site-footer relative isolate overflow-hidden border-t border-border bg-[#080f1b]">
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_20%,hsl(var(--primary)/0.12),transparent_60%)]" />
    <div aria-hidden className="flex h-0.5">{professionalProfiles.map(area => <span key={area.slug} data-profile={area.slug} className="flex-1 bg-primary/80" />)}</div>
    <div className="container mx-auto px-4">
      <div className="flex flex-col justify-between gap-7 border-b border-border/70 py-12 sm:py-16 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <p className="eyebrow">{t("Let’s connect")}</p>
          <h2 className="mt-3 text-3xl font-bold leading-[1.1] tracking-[-.035em] sm:text-4xl">{t("Ideas become projects.")}<br /><span className="text-primary">{t("Let’s talk.")}</span></h2>
          <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted-foreground">{t("Available for junior roles, internships and collaborative technical projects.")}</p>
        </div>
        <div data-footer-contact className={`relative isolate w-fit max-w-full min-w-0 ${pathname === "/" ? "mt-10" : footerProfile ? "mt-16 lg:mt-0" : ""}`}>
        {pathname === "/" && <HomeCharacter profile="customer-service" scene="service-leaning" className="absolute -top-20 right-2 z-0 h-32 w-28 overflow-hidden sm:w-32" />}
        {footerProfile && <MascotScene profile={footerProfile} scene="practice" className="footer-contact-fox pointer-events-none absolute -top-20 right-2 z-0 h-28 w-24 overflow-hidden" />}
        <ContactPreview channel="Email" href={`mailto:${site.email}`} className="group relative z-10 inline-flex min-h-14 w-fit max-w-full items-center gap-3 rounded-xl border border-primary/40 bg-surface px-5 py-4 text-sm font-semibold text-primary transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <Mail className="h-5 w-5 shrink-0" aria-hidden /><span className="break-all">{site.email}</span><ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </ContactPreview>
          <div className="relative z-10 mt-3 flex flex-wrap justify-center gap-3">
            <ContactPreview channel="GitHub" href={site.github} external ariaLabel="GitHub" className={contactLink}><Github className="h-5 w-5" aria-hidden /></ContactPreview>
            <ContactPreview channel="LinkedIn" href={site.linkedin} external ariaLabel="LinkedIn" className={contactLink}><Linkedin className="h-5 w-5" aria-hidden /></ContactPreview>
          </div>
        </div>
      </div>
      <div className="grid gap-10 py-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <nav aria-label={t("Footer")}>
          <p className="text-center text-xs font-semibold uppercase tracking-[.14em] text-muted-foreground">{t("Explore my areas")}</p>
          <ul className="footer-area-links mt-5">{professionalProfiles.map(area => <li key={area.slug}>
            <Link to={area.href} data-profile={area.slug} aria-label={t(area.shortTitle ?? area.title)} title={t(area.shortTitle ?? area.title)} className="footer-area-link group grid min-h-14 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <span className="footer-area-icon grid h-14 w-14 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary"><area.icon className="h-6 w-6" aria-hidden /></span>
            </Link>
          </li>)}</ul>
          <ul data-footer-utilities className="mt-6 flex items-center justify-center gap-4 text-muted-foreground">{([["About", "/about", UserRound], ["CV", "/cv", FileText], ["Contact", "/contact", Mail]] as const).map(([label, href, Icon]) => <li key={href}><Link to={href} aria-label={t(label)} title={t(label)} className="grid h-12 w-12 place-items-center rounded-full border border-border/70 bg-background/30 text-foreground/80 hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Icon className="h-5 w-5" aria-hidden /></Link></li>)}</ul>
        </nav>
        <div data-footer-introduction className="w-full max-w-md lg:justify-self-end">
          <Link to="/" data-footer-identity className="flex w-full items-center justify-between gap-5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <span data-footer-brand className="min-w-0"><span className="block text-xl font-bold tracking-[-.025em] sm:text-2xl">{site.shortName}</span><span className="mt-1 block text-sm font-medium text-primary">aka Culichi</span></span>
            <span data-footer-mascot={mascot} className="shrink-0"><CulichiMascot variant={mascot} portrait decorative className="h-24 w-24 sm:h-28 sm:w-28" /></span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">{t("Learning, building and solving across technology and technical trades.")}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/70 py-6 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} {site.shortName} <span className="text-primary/70">/ aka Culichi</span></p>
        <a href="#main" className="footer-top-link group relative inline-flex min-h-11 items-center gap-3 overflow-hidden rounded-full border border-primary/35 bg-primary/5 py-1.5 pl-4 pr-1.5 font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <span aria-hidden className="footer-top-signal h-1.5 w-1.5 rounded-full bg-primary" />
          <span>{t("Back to top")}</span>
          <span className="footer-top-arrow grid h-8 w-8 place-items-center rounded-full border border-primary/50 bg-primary/15 text-primary"><ArrowUp className="h-4 w-4" aria-hidden /></span>
        </a>
      </div>
    </div>
  </footer>;
});

const SiteFooter = () => {
  const { pathname } = useLocation();
  return <FooterContent pathname={pathname} />;
};
export default SiteFooter;
