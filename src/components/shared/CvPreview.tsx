import { useId, useState, type ReactNode } from "react";
import { FileText } from "lucide-react";
import { Portal } from "@radix-ui/react-hover-card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useLanguage } from "@/i18n/LanguageProvider";
import SmartImage from "./SmartImage";

const CvPreview = ({ preview, title, children }: { preview?: string; title: string; children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const id = useId();
  const { t } = useLanguage();
  if (!preview) return <>{children}</>;
  return (
    <HoverCard open={open} onOpenChange={setOpen} openDelay={150} closeDelay={150}>
      <HoverCardTrigger asChild onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }} aria-describedby={open ? id : undefined}>
        {children}
      </HoverCardTrigger>
      <Portal>
        <HoverCardContent id={id} role="tooltip" data-cv-preview side="top" sideOffset={10} collisionPadding={16} className="z-[60] w-[min(16rem,calc(100vw-2rem))] overflow-hidden rounded-lg border-primary/30 p-0 shadow-xl">
          <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-3 py-2 text-xs">
            <FileText className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span>{t(title)}</span>
          </div>
          <div className="max-h-[min(22rem,55vh)] overflow-y-auto overscroll-contain">
            <SmartImage src={preview} alt={t("Electrical CV preview")} eager className="min-h-32" imgClassName="!h-auto" />
          </div>
        </HoverCardContent>
      </Portal>
    </HoverCard>
  );
};

export default CvPreview;