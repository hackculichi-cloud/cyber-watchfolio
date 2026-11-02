import { toolArtwork, type MascotTool } from "@/data/mascotGear";
import { cn } from "@/lib/utils";

/** Local transparent product cutouts, colored for their own profession. */
export default function MascotToolProp({ tool, className }: { tool: MascotTool; className?: string }) {
  const artwork = toolArtwork[tool];
  return <span aria-hidden data-tool-prop={tool} data-tool-profile={artwork.profile} className={cn("block aspect-square h-full w-full", className)}>
    <img src={artwork.src} width={256} height={256} alt="" decoding="async" className="h-full w-full object-contain" />
  </span>;
}
