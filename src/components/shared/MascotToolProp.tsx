import atlas from "@/assets/culichi-tool-props.png";
import { toolArtwork, type MascotTool } from "@/data/mascotGear";
import { cn } from "@/lib/utils";

/** Original transparent artwork, selected with CSS rather than remote image services. */
export default function MascotToolProp({ tool, className }: { tool: MascotTool; className?: string }) {
  const { region: [x, y, width, height], clip } = toolArtwork[tool];
  return <span aria-hidden data-tool-prop={tool} className={cn("block w-full bg-no-repeat", className)} style={{
    aspectRatio: `${width}/${height}`, backgroundImage: `url(${atlas})`,
    backgroundSize: `${1086 / width * 100}% ${1448 / height * 100}%`,
    backgroundPosition: `${x / (1086 - width) * 100}% ${y / (1448 - height) * 100}%`, clipPath: clip,
  }} />;
}
