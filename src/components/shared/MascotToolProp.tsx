import atlas from "@/assets/culichi-tool-props.webp";
import { toolArtwork, type MascotTool } from "@/data/mascotGear";
import { cn } from "@/lib/utils";
import BarberToolImage from "@/components/barbering/BarberToolImage";

/** Original transparent artwork, selected with CSS rather than remote image services. */
export default function MascotToolProp({ tool, className }: { tool: MascotTool; className?: string }) {
  if (tool === "barber-scissors" || tool === "hair-clipper" || tool === "detail-trimmer") return <span aria-hidden data-tool-prop={tool} className={cn("block w-full", className)}><BarberToolImage kind={tool === "hair-clipper" ? "clipper" : tool === "detail-trimmer" ? "trimmer" : "scissors"} /></span>;
  const { region, clip } = toolArtwork[tool];
  if (!region) return null;
  const [x, y, width, height] = region;
  return <span aria-hidden data-tool-prop={tool} className={cn("block w-full bg-no-repeat", className)} style={{
    aspectRatio: `${width}/${height}`, backgroundImage: `url(${atlas})`,
    backgroundSize: `${1086 / width * 100}% ${1448 / height * 100}%`,
    backgroundPosition: `${x / (1086 - width) * 100}% ${y / (1448 - height) * 100}%`, clipPath: clip,
  }} />;
}
