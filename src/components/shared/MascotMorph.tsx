import { useLayoutEffect, useState } from "react";
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
  const [frame, setFrame] = useState({ from: outfit, to: outfit, cycle: 0 });
  useLayoutEffect(() => {
    setFrame(previous => previous.to === outfit ? previous : { from: previous.to, to: outfit, cycle: previous.cycle + 1 });
  }, [outfit]);
  const renderOutfit = (variant: MascotVariant, scene: boolean) => portrait
    ? <CulichiMascot variant={variant} portrait decorative className="h-full w-full" />
    : <CulichiBody profile={variant as ProfileSlug | "home"} scene={scene} className="w-full" />;
  const changed = frame.cycle > 0;
  return <span data-morph-to={outfit} data-morph-cycle={frame.cycle} data-committing={committing} className={cn("mascot-morph relative block w-full", portrait && "aspect-square", changed && "mascot-morph-changed")}>
    <span key={frame.cycle} className="mascot-morph-stage relative block w-full">
      <span className="mascot-source mascot-morph-source block w-full">{renderOutfit(changed ? frame.from : frame.to, entryScene)}</span>
      {changed && <span data-outfit-preview={preview || committing ? frame.to : undefined} className={cn("mascot-morph-target pointer-events-none absolute inset-0", committing ? "mascot-target" : preview ? "mascot-preview" : "mascot-restored")}>{renderOutfit(frame.to, false)}</span>}
      {changed && <span aria-hidden className="mascot-morph-sweep pointer-events-none absolute inset-0" />}
    </span>
    <span aria-hidden className="mascot-commit-scan pointer-events-none absolute inset-0" />
    <span aria-hidden className="mascot-charge-ring pointer-events-none absolute inset-3 rounded-full" />
  </span>;
}
