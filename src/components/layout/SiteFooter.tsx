import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { navigation, site } from "@/data/site";

const SiteFooter = () => (
  <footer className="border-t border-border bg-surface/40">
    <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr]">
      <div>
        <p className="text-lg font-semibold">{site.shortName}</p>
        <p className="mt-1 text-sm text-primary">{site.role}</p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{site.tagline}</p>

        <div className="mt-6 flex items-center gap-3">
          <a href={`mailto:${site.email}`} aria-label="Email" className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
            <Mail className="h-4 w-4" />
          </a>
          <a href={site.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub" className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
            <Github className="h-4 w-4" />
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>

      <nav aria-label="Footer">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Navigate</p>
        <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link to={item.href} className="text-muted-foreground transition-colors hover:text-foreground">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>

    <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} {site.shortName}. Built with React, TypeScript and Tailwind CSS.
    </div>
  </footer>
);

export default SiteFooter;
