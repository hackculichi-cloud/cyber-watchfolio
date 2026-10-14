import type { CSSProperties } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { ProfileSlug } from "@/data/profiles";
import atlas from "@/assets/culichi-mascot-atlas.webp";
import { cn } from "@/lib/utils";

export type MascotVariant = ProfileSlug | "home" | "ai" | "emblem";
const cells: Record<MascotVariant, number> = { home: 0, cybersecurity: 1, development: 2, electrical: 3, electronics: 4, repair: 5, "customer-service": 6, ai: 7, emblem: 8 };
const labels: Record<MascotVariant, string> = { home: "Culichi tech fox mascot", cybersecurity: "Culichi SOC analyst mascot", development: "Culichi software developer mascot", electrical: "Culichi electrician mascot", electronics: "Culichi electronics mascot", repair: "Culichi repair technician mascot", "customer-service": "Culichi customer support mascot", ai: "Culichi AI mascot", emblem: "Culichi fox logo" };

/** Local, unmodified generated artwork; CSS selects a cell without image processing. */
const CulichiMascot = ({ variant = "home", className, decorative = false }: { variant?: MascotVariant; className?: string; decorative?: boolean }) => {
  const { t } = useLanguage();
  const cell = cells[variant];
  const style: CSSProperties = { backgroundImage: `url(${atlas})`, backgroundSize: "300% 300%", clipPath: cell < 6 ? "inset(0 0 5% 0)" : undefined, backgroundPosition: `${(cell % 3) * 50}% ${Math.floor(cell / 3) * 50}%` };
  return <span role={decorative ? undefined : "img"} aria-label={decorative ? undefined : t(labels[variant])} aria-hidden={decorative || undefined} data-mascot={variant} style={style} className={cn("block aspect-square shrink-0 bg-no-repeat", className)} />;
};
export default CulichiMascot;
