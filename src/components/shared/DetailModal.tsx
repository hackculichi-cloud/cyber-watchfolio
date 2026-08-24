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
    <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto border-primary/25 bg-background/95 backdrop-blur-xl">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold tracking-tight">{title}</DialogTitle>
        {subtitle && (
          <DialogDescription className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {subtitle}
          </DialogDescription>
        )}
      </DialogHeader>
      <div className="mt-4 space-y-6">{children}</div>
    </DialogContent>
  </Dialog>
);

export default DetailModal;
