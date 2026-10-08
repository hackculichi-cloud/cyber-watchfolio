import { useId, useState, type ReactNode } from "react";
import { ExternalLink, Github, Linkedin, Mail, Send } from "lucide-react";
import { site } from "@/data/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import githubPreview from "@/assets/contact-github-preview.png.asset.json";
import linkedinPreview from "@/assets/contact-linkedin-preview.png.asset.json";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Portal } from "@radix-ui/react-hover-card";
import SmartImage from "./SmartImage";

type Channel = "Email" | "GitHub" | "LinkedIn";
type Props = { channel: Channel; href: string; external?: boolean; className?: string; children: ReactNode };

const ContactPreview = ({ channel, href, external, className, children }: Props) => {
  const id = useId();
  const [open, setOpen] = useState(false);
  const { lang } = useLanguage();
  const spanish = lang === "es";
  const Icon = channel === "Email" ? Mail : channel === "GitHub" ? Github : Linkedin;
  return (
    <HoverCard open={open} onOpenChange={setOpen} openDelay={150} closeDelay={150}>
      <HoverCardTrigger asChild>
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer noopener" : undefined}
        onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}
        onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }}
        aria-describedby={open ? id : undefined} className={className}>
        {children}
      </a>
      </HoverCardTrigger>
      <Portal>
      <HoverCardContent id={id} role="tooltip" data-contact-preview={channel} sideOffset={12} collisionPadding={16}
        className="z-[60] w-[min(25rem,calc(100vw-2rem))] overflow-hidden rounded-lg border-primary/30 p-0 shadow-xl">
          <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-2.5 text-xs text-muted-foreground">
            <Icon className="h-4 w-4 text-primary" />
            <span className="min-w-0 flex-1 truncate">{channel === "Email" ? site.email : channel === "GitHub" ? "github.com/ByCulichi" : "linkedin.com/in/culichi"}</span>
            <ExternalLink className="h-3 w-3" />
          </div>
          {channel === "Email" ? (
            <div className="space-y-4 p-5">
              <p className="text-sm font-semibold">{spanish ? "Nuevo mensaje" : "New message"}</p>
              <div className="border-b border-border pb-2 text-xs"><span className="text-muted-foreground">{spanish ? "Para: " : "To: "}</span>{site.email}</div>
              <div className="border-b border-border pb-2 text-xs text-muted-foreground">{spanish ? "Asunto" : "Subject"}</div>
              <div className="min-h-28 pt-2 text-sm text-muted-foreground">{spanish ? "Hola Christian," : "Hi Christian,"}</div>
              <div className="flex items-center gap-2 border-t border-border pt-3 text-sm text-primary"><Send className="h-4 w-4" />{spanish ? "Enviar" : "Send"}</div>
            </div>
          ) : (
            <div className="max-h-[min(32rem,65vh)] overflow-y-auto overscroll-contain">
              <SmartImage src={channel === "GitHub" ? githubPreview.url : linkedinPreview.url}
                alt={spanish ? `Captura de ${channel}` : `${channel} screenshot`} eager
                imgClassName="!h-auto" className="min-h-48" />
            </div>
          )}
      </HoverCardContent>
      </Portal>
    </HoverCard>
  );
};

export default ContactPreview;