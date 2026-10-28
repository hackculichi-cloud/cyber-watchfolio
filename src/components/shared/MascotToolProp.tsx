import atlas from "@/assets/culichi-tool-props.png";
import { toolArtwork, type MascotTool } from "@/data/mascotGear";
import { cn } from "@/lib/utils";
import { Scissors } from "lucide-react";

/** Original transparent artwork, selected with CSS rather than remote image services. */
export default function MascotToolProp({ tool, className }: { tool: MascotTool; className?: string }) {
  if (tool === "barber-scissors") return <span aria-hidden data-tool-prop={tool} className={cn("block aspect-square w-full p-1 text-primary", className)}><Scissors className="h-full w-full -rotate-12" strokeWidth={1.3} /></span>;
  if (tool === "hair-clipper") return <span aria-hidden data-tool-prop={tool} className={cn("block aspect-square w-full p-1 text-primary", className)}><svg viewBox="0 0 48 48" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 6h22v9H13z" fill="currentColor" fillOpacity=".2" /><path d="M17 15v23a7 7 0 0 0 14 0V15M16 3v3m5-3v3m6-3v3m5-3v3M24 24v6M20 36h8" /></svg></span>;
  const { region, clip } = toolArtwork[tool];
  if (!region) return null;
  const [x, y, width, height] = region;
  return <span aria-hidden data-tool-prop={tool} className={cn("block w-full bg-no-repeat", className)} style={{
    aspectRatio: `${width}/${height}`, backgroundImage: `url(${atlas})`,
    backgroundSize: `${1086 / width * 100}% ${1448 / height * 100}%`,
    backgroundPosition: `${x / (1086 - width) * 100}% ${y / (1448 - height) * 100}%`, clipPath: clip,
  }} />;
}
