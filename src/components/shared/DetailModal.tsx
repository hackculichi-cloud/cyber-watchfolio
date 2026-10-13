import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ReactNode } from "react";

interface DetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const DetailModal = ({ open, onOpenChange, title, subtitle, children }: DetailModalProps) => {
  const { t } = useLanguage();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto border-primary/25 bg-background/95 backdrop-blur-xl">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-3 pr-6">
            <DialogTitle className="min-w-0 flex-1 text-xl font-semibold tracking-tight">{t(title)}</DialogTitle>
            <LanguageSwitcher compact />
          </div>
          {(
            <DialogDescription className={`${subtitle ? "" : "sr-only"} text-xs uppercase tracking-[0.16em] text-muted-foreground`}>
              {t(subtitle || title)}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="mt-4 space-y-6">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailModal;
