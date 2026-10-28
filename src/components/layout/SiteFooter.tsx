import { Link, useLocation } from "react-router-dom";
import { ArrowUp, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/data/site";
import { professionalProfiles, profileForPath } from "@/data/profiles";
import { useLanguage } from "@/i18n/LanguageProvider";
import ContactPreview from "@/components/shared/ContactPreview";
import HomeCharacter from "@/components/shared/HomeCharacter";
import CulichiMascot from "@/components/shared/CulichiMascot";

const contactLink = "inline-flex min-h-11 items-center gap-2 rounded-lg border border-border/70 bg-background/50 px-3 py-2 text-sm text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

const SiteFooter = () => {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const mascot = profileForPath(pathname)?.slug ?? "emblem";
  return <footer className="site-footer relative isolate overflow-hidden border-t border-border bg-[#080f1b]">
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_20%,hsl(var(--primary)/0.12),transparent_60%)]" />
    <div aria-hidden className="flex h-0.5">{professionalProfiles.map(area => <span key={area.slug} data-profile={area.slug} className="flex-1 bg-primary/80" />)}</div>
    <div className="container mx-auto px-4">
      <div className="flex flex-col justify-between gap-7 border-b border-border/70 py-12 sm:py-16 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <p className="eyebrow">{t("Let’s connect")}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">{t("Ideas become projects.")}<br /><span className="text-primary">{t("Let’s talk.")}</span></h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{t("Available for junior roles, internships and collaborative technical projects.")}</p>
        </div>
        <div data-footer-contact className={`relative isolate w-fit max-w-full min-w-0 ${pathname === "/" ? "mt-10" : ""}`}>
        {pathname === "/" && <HomeCharacter profile="customer-service" scene="service-leaning" className="absolute -top-20 right-2 z-0 h-32 w-28 overflow-hidden sm:w-32" />}
        <ContactPreview channel="Email" href={`mailto:${site.email}`} className="group relative z-10 inline-flex min-h-14 w-fit max-w-full items-center gap-3 rounded-xl border border-primary/40 bg-surface px-5 py-4 text-sm font-semibold text-primary transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <Mail className="h-5 w-5 shrink-0" aria-hidden /><span className="break-all">{site.email}</span><ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </ContactPreview>
          <div className="relative z-10 mt-3 flex flex-wrap gap-2">
            <ContactPreview channel="GitHub" href={site.github} external className={contactLink}><Github className="h-4 w-4" aria-hidden />GitHub<ArrowUpRight className="h-3 w-3" aria-hidden /></ContactPreview>
            <ContactPreview channel="LinkedIn" href={site.linkedin} external className={contactLink}><Linkedin className="h-4 w-4" aria-hidden />LinkedIn<ArrowUpRight className="h-3 w-3" aria-hidden /></ContactPreview>
          </div>
        </div>
      </div>
      <div className="grid gap-10 py-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <nav aria-label={t("Footer")}>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-muted-foreground">{t("Explore my areas")}</p>
          <ul className="mt-5 grid grid-cols-1 gap-2 min-[360px]:grid-cols-2 sm:grid-cols-3">{professionalProfiles.map(area => <li key={area.slug}>
            <Link to={area.href} data-profile={area.slug} className="footer-area-link group flex h-full min-h-16 items-center gap-2 rounded-xl sm:gap-2.5 border border-border/60 bg-background/40 px-3 py-3 text-xs sm:text-sm hover:border-primary/50 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <span className="footer-area-icon grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-primary/40 bg-primary/10 text-primary"><area.icon className="h-5 w-5" aria-hidden /></span><span className="min-w-0 break-words font-semibold text-foreground/90 group-hover:text-primary">{t(area.shortTitle ?? area.title)}</span>
            </Link>
          </li>)}</ul>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">{[["About", "/about"], ["CV", "/cv"], ["Contact", "/contact"]].map(([label, href]) => <li key={href}><Link to={href} className="rounded transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t(label)}</Link></li>)}</ul>
        </nav>
        <div data-footer-introduction className="w-full max-w-md lg:justify-self-end">
          <Link to="/" data-footer-identity className="flex w-full items-center justify-between gap-5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <span data-footer-brand className="min-w-0"><span className="block text-xl font-semibold tracking-tight sm:text-2xl">{site.shortName}</span><span className="mt-1 block text-sm font-medium text-primary">aka Culichi</span></span>
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
};
export default SiteFooter;
