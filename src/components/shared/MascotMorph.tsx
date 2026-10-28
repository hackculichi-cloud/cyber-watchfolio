import CulichiBody from "./CulichiBody";
import CulichiMascot, { type MascotVariant } from "./CulichiMascot";
import type { ProfileSlug } from "@/data/profiles";
import { cn } from "@/lib/utils";

type Props = {
  outfit: MascotVariant;
  portrait?: boolean;
  committing?: boolean;
  preview?: boolean;
  entryScene?: boolean;
};

/** Two local illustrations are revealed by one finite scan; rapid previews start from the last outfit. */
export default function MascotMorph({ outfit, portrait = false, committing = false, preview = false, entryScene = false }: Props) {
  const renderOutfit = (variant: MascotVariant, scene: boolean) => portrait
    ? <CulichiMascot variant={variant} portrait decorative className="h-full w-full" />
    : <CulichiBody profile={variant as ProfileSlug | "home"} scene={scene} className="w-full" />;
  return <span data-morph-to={outfit} data-committing={committing} className={cn("mascot-morph relative block w-full", portrait && "aspect-square")}>
    <span key={outfit} data-outfit-preview={preview || committing ? outfit : undefined} className="mascot-current block w-full">
      {renderOutfit(outfit, entryScene)}
    </span>
  </span>;
}
