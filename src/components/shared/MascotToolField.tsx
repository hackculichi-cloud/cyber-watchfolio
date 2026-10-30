import { useLayoutEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import type { ProfileSlug } from "@/data/profiles";
import { mascotGear } from "@/data/mascotGear";
import { floatingToolLayout, type ToolRect } from "@/lib/floatingToolLayout";
import MascotGearPreview from "./MascotGearPreview";
import MascotToolProp from "./MascotToolProp";

/** Three photographs float in measured gaps instead of crossing outfit controls. */
export default function MascotToolField({ profile, committing, id, stage }: { profile: ProfileSlug; committing: boolean; id: string; stage: RefObject<HTMLDivElement> }) {
  const [slots, setSlots] = useState<ToolRect[]>([]);
  const [entered, setEntered] = useState(false);
  const signature = useRef("");
  useLayoutEffect(() => {
    const root = stage.current;
    if (!root) return;
    let frame: number | null = null;
    const measure = () => {
      frame = null;
      const bounds = root.getBoundingClientRect();
      const nodes = root.querySelectorAll("[data-outfit], .mascot-orbit-body, :scope > button");
      const blocked = [...nodes].map(node => {
        const box = node.getBoundingClientRect();
        return { x: box.x - bounds.x, y: box.y - bounds.y, width: box.width, height: box.height };
      });
      const next = floatingToolLayout(bounds.width, bounds.height, blocked);
      const key = JSON.stringify(next);
      if (key !== signature.current) { signature.current = key; setSlots(next); }
    };
    const schedule = () => { if (frame === null) frame = requestAnimationFrame(measure); };
    measure();
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    const body = root.querySelector(".mascot-orbit-body");
    if (body) observer.observe(body);
    return () => { observer.disconnect(); if (frame !== null) cancelAnimationFrame(frame); };
  }, [stage]);
  useLayoutEffect(() => {
    if (slots.length !== 3) return;
    let next = 0;
    const first = requestAnimationFrame(() => { next = requestAnimationFrame(() => setEntered(true)); });
    return () => { cancelAnimationFrame(first); cancelAnimationFrame(next); };
  }, [slots.length]);
  return <div data-tool-field={profile} data-profile={profile} data-floating-tools data-equipping={committing} data-tools-entered={entered} className="mascot-tool-field pointer-events-none absolute inset-0 z-[5] text-primary">
    <MascotGearPreview profile={profile} id={id} />
    {slots.map((slot, index) => <span key={mascotGear[profile][index]} data-tool-flight={mascotGear[profile][index]} data-floating-tool className="mascot-tool-flight pointer-events-auto absolute grid place-items-center" style={{ left: slot.x, top: slot.y, width: slot.width, height: slot.height, "--tool-tilt": `${[-7, 6, -3][index]}deg`, "--tool-bob": slot.width < 40 ? "1px" : "2px" } as CSSProperties}>
      <span className="mascot-tool-float grid h-full w-full place-items-center p-[10%]"><MascotToolProp tool={mascotGear[profile][index]} contain /></span>
    </span>)}
  </div>;
}
