import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "primary" | "accent" | "muted";

const variants: Record<Variant, string> = {
  default: "border-border bg-secondary/60 text-muted-foreground",
  primary: "border-primary/30 bg-primary/10 text-primary",
  accent: "border-accent/30 bg-accent/10 text-accent",
  muted: "border-border bg-transparent text-muted-foreground",
};

const Tag = ({ children, variant = "default", className }: { children: ReactNode; variant?: Variant; className?: string }) => (
  <span
    className={cn(
      "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium",
      variants[variant],
      className,
    )}
  >
    {children}
  </span>
);

export default Tag;
