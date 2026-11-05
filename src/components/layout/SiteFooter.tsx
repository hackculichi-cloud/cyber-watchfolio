import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUp, Github, Linkedin, Mail, UserRound, FileText } from "lucide-react";
import { site } from "@/data/site";
import { professionalProfiles, profileForPath } from "@/data/profiles";
import { useLanguage } from "@/i18n/LanguageProvider";
import ContactPreview from "@/components/shared/ContactPreview";
import HomeCharacter from "@/components/shared/HomeCharacter";
import CulichiMascot from "@/components/shared/CulichiMascot";
import MascotScene from "@/components/shared/MascotScene";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";

const contactLink = "footer-contact-link group relative flex min-h-28 flex-col items-center justify-center gap-2 rounded-2xl border bg-background/70 px-3 py-4 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background";

// Changing a section hash does not change the footer's copy, art or menus.
const FooterContent = memo(function FooterContent({ pathname }: { pathname: string }) {
  const { t } = useLanguage();
  const mascot = profileForPath(pathname)?.slug ?? "emblem";
  const footerProfile = profileForPath(pathname)?.slug;
  return <footer className="site-footer relative isolate overflow-hidden border-t border-border bg-[#080f1b]">
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_20%,hsl(var(--primary)/0.12),transparent_60%)]" />
    <div aria-hidden className="flex h-0.5">{professionalProfiles.map(area => <span key={area.slug} data-profile={area.slug} className="flex-1 bg-primary/80" />)}</div>
    <div className="container mx-auto px-4">
      <div data-footer-cta className="flex flex-col items-center border-b border-border/70 py-12 text-center sm:py-16">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow justify-center">{t("Let’s connect")}</p>
          <h2 className="mt-3 text-3xl font-bold leading-[1.1] tracking-[-.035em] sm:text-4xl">{t("Ideas become projects.")}<br /><span className="text-primary">{t("Let’s talk.")}</span></h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-muted-foreground">{t("Available for junior roles, internships and collaborative technical projects.")}</p>
        </div>
        <div data-footer-contact className={`relative isolate mx-auto w-full max-w-3xl ${pathname === "/" || footerProfile ? "mt-24" : "mt-8"}`}>
          {pathname === "/" && <HomeCharacter profile="customer-service" scene="service-leaning" className="pointer-events-none absolute -top-24 left-1/2 z-0 h-24 w-28 -translate-x-1/2 overflow-hidden sm:w-28" />}
          {footerProfile && <div className="pointer-events-none absolute -top-20 left-1/2 z-0 h-20 w-24 -translate-x-1/2 overflow-hidden"><MascotScene profile={footerProfile} scene="practice" className="footer-contact-fox h-full w-full overflow-hidden" /></div>}
          <div data-contact-grid data-channel-count={site.whatsapp ? 4 : 3} className="footer-contact-grid relative z-10">
            <ContactPreview channel="Email" href={`mailto:${site.email}`} ariaLabel="Email" className={`${contactLink} footer-contact-email`}>
              <Mail className="h-6 w-6" aria-hidden /><span className="text-base font-semibold">{t("Email")}</span><span data-contact-value className="max-w-full text-xs text-muted-foreground [overflow-wrap:anywhere]">{site.email.split("@")[0]}<wbr />@{site.email.split("@")[1]}</span>
            </ContactPreview>
            <ContactPreview channel="LinkedIn" href={site.linkedin} external ariaLabel="LinkedIn" className={`${contactLink} footer-contact-linkedin`}>
              <Linkedin className="h-6 w-6" aria-hidden /><span className="text-base font-semibold">LinkedIn</span><span data-contact-value className="max-w-full text-xs text-muted-foreground [overflow-wrap:anywhere]">{site.linkedinUsername}</span>
            </ContactPreview>
            <ContactPreview channel="GitHub" href={site.github} external ariaLabel="GitHub" className={`${contactLink} footer-contact-github`}>
              <Github className="h-6 w-6" aria-hidden /><span className="text-base font-semibold">GitHub</span><span data-contact-value className="max-w-full text-xs text-muted-foreground [overflow-wrap:anywhere]">{site.githubUsername}</span>
            </ContactPreview>
            {site.whatsapp && <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={`${contactLink} footer-contact-whatsapp`}>
              <WhatsAppIcon className="h-6 w-6" aria-hidden /><span className="text-base font-semibold">WhatsApp</span><span data-contact-value className="max-w-full text-xs text-muted-foreground [overflow-wrap:anywhere]">{site.whatsappDisplay}</span>
            </a>}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 py-10 text-center">
        <nav aria-label={t("Footer")}>
          <p className="text-center text-xs font-semibold uppercase tracking-[.14em] text-muted-foreground">{t("Explore my areas")}</p>
          <ul className="footer-area-links mt-5">{professionalProfiles.map(area => <li key={area.slug}>
            <Link to={area.href} data-profile={area.slug} aria-label={t(area.shortTitle ?? area.title)} title={t(area.shortTitle ?? area.title)} className="footer-area-link group flex min-h-14 flex-col items-center justify-start gap-2 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <span className="footer-area-icon grid h-14 w-14 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary"><area.icon className="h-6 w-6" aria-hidden /></span><span className="footer-area-label text-xs font-medium leading-snug">{t(area.shortTitle ?? area.title)}</span>
            </Link>
          </li>)}</ul>
          <ul data-footer-utilities className="mt-6 flex items-center justify-center gap-4 text-muted-foreground">{([["About", "/about", UserRound], ["CV", "/cv", FileText], ["Contact", "/contact", Mail]] as const).map(([label, href, Icon]) => <li key={href}><Link to={href} aria-label={t(label)} title={t(label)} className="flex min-h-14 min-w-20 flex-col items-center justify-center gap-2 rounded-xl border border-border/70 bg-background/30 text-foreground/80 hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Icon className="h-5 w-5" aria-hidden /><span className="text-xs font-medium">{t(label)}</span></Link></li>)}</ul>
        </nav>
        <div data-footer-introduction className="mx-auto w-full max-w-md">
          <Link to="/" data-footer-identity className="flex w-full flex-col-reverse items-center justify-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <span data-footer-brand className="min-w-0"><span className="block text-xl font-bold tracking-[-.025em] sm:text-2xl">{site.shortName}</span><span className="mt-1 block text-sm font-medium text-primary">aka Culichi</span></span>
            <span data-footer-mascot={mascot} className="shrink-0"><CulichiMascot variant={mascot} portrait decorative className="h-24 w-24 sm:h-28 sm:w-28" /></span>
          </Link>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{t("Learning, building and solving across technology and technical trades.")}</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 border-t border-border/70 py-6 text-xs text-muted-foreground">
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
