import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageProvider";

interface SmartImageProps {
  src: string;
  alt: string;
  /** Classes for the outer frame (sizing, aspect ratio, radius). */
  className?: string;
  imgClassName?: string;
  fit?: "contain" | "cover";
  eager?: boolean;
}

/** Image with loading skeleton and a designed fallback — never shows raw alt text as the visual. */
const SmartImage = ({ src, alt, className, imgClassName, fit = "contain", eager }: SmartImageProps) => {
  const { t } = useLanguage();
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <div className={cn("relative overflow-hidden bg-secondary/40", className)}>
      {state === "loading" && <div className="absolute inset-0 animate-pulse bg-secondary/60" aria-label={t("Loading image")} />}
      {state === "error" ? (
        <div role="img" aria-label={alt} className="flex h-full min-h-40 w-full flex-col items-center justify-center gap-2 text-muted-foreground">
          <ImageOff className="h-6 w-6 text-primary/60" aria-hidden />
          <span className="text-[11px] font-medium uppercase tracking-[0.18em]">{t("Image unavailable")}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setState("loaded")}
          onError={() => setState("error")}
          className={cn(
            "h-full w-full transition-opacity duration-300",
            fit === "contain" ? "object-contain" : "object-cover",
            state === "loaded" ? "opacity-100" : "opacity-0",
            imgClassName,
          )}
        />
      )}
    </div>
  );
};

export default SmartImage;
