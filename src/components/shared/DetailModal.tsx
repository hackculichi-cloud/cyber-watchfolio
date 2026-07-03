import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ReactNode } from "react";

interface DetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const DetailModal = ({ open, onOpenChange, title, subtitle, children }: DetailModalProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-md border-primary/30 shadow-[0_0_40px_hsl(120_100%_40%/0.15)]">
      <DialogHeader>
        <DialogTitle className="font-display text-xl neon-text">
          {">"} {title}
        </DialogTitle>
        {subtitle && (
          <DialogDescription className="text-xs text-muted-foreground font-mono">
            {subtitle}
          </DialogDescription>
        )}
      </DialogHeader>
      <div className="mt-4 space-y-6">{children}</div>
    </DialogContent>
  </Dialog>
);

export default DetailModal;
