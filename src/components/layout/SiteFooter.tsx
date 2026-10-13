import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { navigation, site } from "@/data/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import ContactPreview from "@/components/shared/ContactPreview";

const SiteFooter = () => {
  const { t } = useLanguage();
  return (
  <footer className="border-t border-border bg-surface/40">
    <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr]">
      <div>
        <p className="text-lg font-semibold">{site.shortName}</p>
        <p className="mt-1 text-sm text-primary">{t(site.role)}</p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{t(site.tagline)}</p>

        <div className="mt-6 flex items-center gap-3">
          <ContactPreview channel="Email" href={`mailto:${site.email}`} ariaLabel="Email" className={iconButton}>
            <Mail className="h-4 w-4" />
          </ContactPreview>
          <ContactPreview channel="GitHub" href={site.github} external ariaLabel="GitHub" className={iconButton}>
            <Github className="h-4 w-4" />
          </ContactPreview>
          <ContactPreview channel="LinkedIn" href={site.linkedin} external ariaLabel="LinkedIn" className={iconButton}>
            <Linkedin className="h-4 w-4" />
          </ContactPreview>
        </div>
      </div>

      <nav aria-label={t("Footer")}>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("Navigate")}</p>
        <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link to={item.href} className="text-muted-foreground transition-colors hover:text-foreground">
                {t(item.label)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>

    <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} {site.shortName}. {t("Built with React, TypeScript and Tailwind CSS.")}
    </div>
  </footer>
  );
};

export default SiteFooter;
