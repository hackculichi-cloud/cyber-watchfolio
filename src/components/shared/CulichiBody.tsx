import { useState } from "react";
import type { ProfileSlug } from "@/data/profiles";
import { useLanguage } from "@/i18n/LanguageProvider";
import atlas from "@/assets/culichi-full-body-atlas.webp";
import { cn } from "@/lib/utils";

const cells: Record<ProfileSlug | "home", number> = { home: 0, cybersecurity: 1, development: 2, electrical: 3, electronics: 4, repair: 5, "customer-service": 6 };
const CulichiBody = ({ profile, className, interactive = false }: { profile: ProfileSlug | "home"; className?: string; interactive?: boolean }) => {
  const { t } = useLanguage();
  const [greeting, setGreeting] = useState(false);
  const cell = cells[profile];
  const art = <span aria-hidden data-mascot={profile} data-full-body className={cn("block aspect-square w-full bg-no-repeat", interactive && "culichi-idle", greeting && "culichi-greet")} onAnimationEnd={() => setGreeting(false)} style={{ backgroundImage: `url(${atlas})`, backgroundSize: "300% 300%", backgroundPosition: `${cell % 3 * 50}% ${Math.floor(cell / 3) * 50}%` }} />;
  return interactive ? <button type="button" data-home-mascot onClick={() => setGreeting(true)} aria-label={t("Greet Culichi")} className={cn("shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", className)}>{art}</button> : <span data-body-mascot={profile} className={cn("block shrink-0", className)}>{art}</span>;
};
export default CulichiBody;
