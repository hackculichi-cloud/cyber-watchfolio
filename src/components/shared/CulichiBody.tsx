import type { ProfileSlug } from "@/data/profiles";
import { mascotIdentity } from "@/data/mascotIdentity";
import { cn } from "@/lib/utils";

const { bodyAtlas: atlas, bodyCells: cells } = mascotIdentity;
/** The standing/title pose; action and closing scenes have separate illustrations. */
const CulichiBody = ({ profile, className, scene = true }: { profile: ProfileSlug | "home"; className?: string; scene?: boolean }) => {
  if (profile === "barbering") return <span data-body-mascot={profile} className={cn("block shrink-0", className)}><span aria-hidden data-mascot={profile} data-full-body data-mascot-scene={scene ? "entry" : undefined} data-scene-profile={scene ? profile : undefined} className="block aspect-square w-full bg-contain bg-bottom bg-no-repeat" style={{ backgroundImage: `url(${mascotIdentity.barbering})` }} /></span>;
  const cell = cells[profile];
  if (profile === "cybersecurity") return <span data-body-mascot={profile} className={cn("block shrink-0", className)}><span aria-hidden data-mascot={profile} data-masked-mascot data-full-body data-mascot-scene={scene ? "entry" : undefined} data-scene-profile={scene ? profile : undefined} className="block aspect-square w-full bg-contain bg-bottom bg-no-repeat" style={{ backgroundImage: `url(${mascotIdentity.maskedCybersecurity})` }} /></span>;
  return <span data-body-mascot={profile} className={cn("block shrink-0", className)}>
    <span aria-hidden data-mascot={profile} data-full-body data-mascot-scene={scene ? "entry" : undefined} data-scene-profile={scene ? profile : undefined} className="block aspect-square w-full bg-no-repeat" style={{ backgroundImage: `url(${atlas})`, backgroundSize: "300% 300%", backgroundPosition: `${cell % 3 * 50}% ${Math.floor(cell / 3) * 50}%` }} />
  </span>;
};
export default CulichiBody;
