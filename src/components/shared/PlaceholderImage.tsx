import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  label?: string;
  className?: string;
  /** Visual pattern hint — matches the active profile atmosphere. */
  pattern?: "grid" | "circuit" | "energy";
}

/**
 * Clearly marked stand-in used wherever a real photo or screenshot is not published yet.
 * Never presented as real work — the label always says the photo is pending.
 */
const PlaceholderImage = ({ label = "Real photo pending", className, pattern = "grid" }: PlaceholderImageProps) => (
  <div
    role="img"
    aria-label={label}
    className={cn(
      "relative grid place-items-center overflow-hidden rounded-lg border border-dashed border-primary/25 bg-surface-2/40",
      pattern === "grid" && "media-pattern-grid",
      pattern === "circuit" && "media-pattern-circuit",
      pattern === "energy" && "media-pattern-energy",
      className,
    )}
  >
    <div className="flex flex-col items-center gap-2 px-4 text-center">
      <ImageIcon className="h-6 w-6 text-primary/60" aria-hidden />
      <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
    </div>
  </div>
);

export default PlaceholderImage;
