import type { ProfileSlug } from "@/data/profiles";
import atlas from "@/assets/culichi-athletic-body-atlas.webp";
import { cn } from "@/lib/utils";

const cells: Record<ProfileSlug | "home", number> = { home: 0, cybersecurity: 1, development: 2, electrical: 3, electronics: 4, repair: 5, "customer-service": 6 };
/** The standing/title pose; action and closing scenes have separate illustrations. */
const CulichiBody = ({ profile, className, scene = true }: { profile: ProfileSlug | "home"; className?: string; scene?: boolean }) => {
  const cell = cells[profile];
  return <span data-body-mascot={profile} className={cn("block shrink-0", className)}>
    <span aria-hidden data-mascot={profile} data-full-body data-mascot-scene={scene ? "entry" : undefined} data-scene-profile={scene ? profile : undefined} className="block aspect-square w-full bg-no-repeat" style={{ backgroundImage: `url(${atlas})`, backgroundSize: "300% 300%", backgroundPosition: `${cell % 3 * 50}% ${Math.floor(cell / 3) * 50}%` }} />
  </span>;
};
export default CulichiBody;
