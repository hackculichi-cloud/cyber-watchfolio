import { useId, type ReactNode } from "react";
import { ExternalLink, Github, Linkedin, Mail, Send } from "lucide-react";
import { site } from "@/data/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import logo from "@/assets/culichi-logo-zorro.png";

type Channel = "Email" | "GitHub" | "LinkedIn";
type Props = { channel: Channel; href: string; external?: boolean; className?: string; children: ReactNode };

const ContactPreview = ({ channel, href, external, className, children }: Props) => {
  const id = useId();
  const { lang } = useLanguage();
  const spanish = lang === "es";
  const Icon = channel === "Email" ? Mail : channel === "GitHub" ? Github : Linkedin;
  return (
    <div className="group/contact relative min-w-0">
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer noopener" : undefined}
        aria-describedby={id} className={className}>
        {children}
      </a>
      <div id={id} role="tooltip" data-contact-preview={channel}
        className="pointer-events-none invisible absolute left-0 top-full z-[60] w-[min(22rem,calc(100vw-2rem))] pt-3 opacity-0 transition-opacity duration-200 group-hover/contact:visible group-hover/contact:opacity-100 group-focus-within/contact:visible group-focus-within/contact:opacity-100">
        <div className="overflow-hidden rounded-lg border border-primary/30 bg-popover text-popover-foreground shadow-xl">
          <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-2.5 text-xs text-muted-foreground">
            <Icon className="h-4 w-4 text-primary" />
            <span className="min-w-0 flex-1 truncate">{channel === "Email" ? site.email : channel === "GitHub" ? "github.com/ByCulichi" : "linkedin.com/in/culichi"}</span>
            <ExternalLink className="h-3 w-3" />
          </div>
          {channel === "Email" ? (
            <div className="space-y-3 p-4">
              <p className="text-sm font-semibold">{spanish ? "Nuevo mensaje" : "New message"}</p>
              <div className="border-b border-border pb-2 text-xs"><span className="text-muted-foreground">{spanish ? "Para: " : "To: "}</span>{site.email}</div>
              <div className="border-b border-border pb-2 text-xs text-muted-foreground">{spanish ? "Asunto" : "Subject"}</div>
              <div className="h-14 space-y-2 pt-2" aria-hidden="true"><div className="h-1.5 w-4/5 rounded bg-muted" /><div className="h-1.5 w-3/5 rounded bg-muted" /></div>
              <Send className="h-4 w-4 text-primary" />
            </div>
          ) : (
            <div className="p-4">
              <div className="flex items-center gap-3">
                <img src={logo} alt="" className="h-14 w-14 shrink-0 object-contain" />
                <div className="min-w-0"><p className="text-sm font-semibold">{site.shortName}</p><p className="text-xs text-primary">{channel === "GitHub" ? "@ByCulichi" : "IT · Cybersecurity · Software"}</p></div>
              </div>
              <div className="mt-4 flex gap-4 border-b border-border pb-2 text-xs text-muted-foreground">
                <span className="text-primary">{channel === "GitHub" ? (spanish ? "Perfil" : "Overview") : (spanish ? "Acerca de" : "About")}</span>
                <span>{channel === "GitHub" ? (spanish ? "Repositorios" : "Repositories") : (spanish ? "Experiencia" : "Experience")}</span>
              </div>
              <div className="mt-3 space-y-2" aria-hidden="true"><div className="h-1.5 w-full rounded bg-muted" /><div className="h-1.5 w-4/5 rounded bg-muted" /><div className="h-1.5 w-2/3 rounded bg-muted" /></div>
            </div>
          )}
          <p className="border-t border-border px-4 py-2 text-[11px] text-muted-foreground">{spanish ? "Maqueta ilustrativa · No es una página en vivo" : "Illustrative mockup · Not a live page"}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPreview;