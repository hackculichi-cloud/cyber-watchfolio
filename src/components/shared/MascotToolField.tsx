import { useLayoutEffect, useState } from "react";
import type { ProfileSlug } from "@/data/profiles";
import MascotGearPreview from "./MascotGearPreview";

/** A reserved tool rail stays outside the outfit controls, including during entry. */
export default function MascotToolField({ profile, committing, id }: { profile: ProfileSlug; committing: boolean; id: string }) {
  const [entered, setEntered] = useState(false);
  useLayoutEffect(() => {
    let next = 0;
    const first = requestAnimationFrame(() => { next = requestAnimationFrame(() => setEntered(true)); });
    return () => { cancelAnimationFrame(first); cancelAnimationFrame(next); };
  }, []);
  return <div data-tool-field={profile} data-profile={profile} data-equipping={committing} data-tools-entered={entered} className="mascot-tool-field absolute inset-x-0 top-full z-[5] mt-2 h-16">
    <MascotGearPreview profile={profile} id={id} compact />
  </div>;
}
