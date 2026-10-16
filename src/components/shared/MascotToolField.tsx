import { useLayoutEffect, useState, type CSSProperties, type RefObject } from "react";
import type { ProfileSlug } from "@/data/profiles";
import { mascotGear } from "@/data/mascotGear";
import MascotToolProp from "./MascotToolProp";

/** Props launch from the focused bubble, hover near the hands, then equip on selection. */
export default function MascotToolField({ profile, committing, stage }: { profile: ProfileSlug; committing: boolean; stage: RefObject<HTMLDivElement> }) {
  const [flight, setFlight] = useState({ x: 0, y: 0, entered: false });
  useLayoutEffect(() => {
    const root = stage.current;
    const node = root?.querySelector(`[data-outfit="${profile}"] [data-orbit-node]`);
    if (!root || !node) return;
    const bounds = root.getBoundingClientRect(), origin = node.getBoundingClientRect();
    setFlight({ x: (origin.x + origin.width / 2 - bounds.x) / bounds.width * 100 - 50, y: (origin.y + origin.height / 2 - bounds.y) / bounds.height * 100 - 50, entered: false });
    let next = 0;
    const first = requestAnimationFrame(() => { next = requestAnimationFrame(() => setFlight(value => ({ ...value, entered: true }))); });
    return () => { cancelAnimationFrame(first); cancelAnimationFrame(next); };
  }, [profile, stage]);
  return <div aria-hidden data-tool-field={profile} data-profile={profile} data-equipping={committing} className="mascot-tool-field pointer-events-none absolute inset-0 z-[5]">
    {mascotGear[profile].map((tool, i) => {
      const style = {
        "--tool-x": `${committing ? 0 : flight.entered ? (i ? 27 : -27) : flight.x}cqw`,
        "--tool-y": `${committing ? 3 : flight.entered ? (i ? 5 : -3) : flight.y}cqh`,
        "--tool-angle": `${committing ? 0 : i ? 12 : -12}deg`,
        "--tool-scale": committing ? .12 : flight.entered ? 1 : .45,
        opacity: committing ? 0 : flight.entered ? 1 : 0,
      } as CSSProperties;
      return <span key={tool} data-tool-flight={tool} className="mascot-tool-flight absolute left-1/2 top-1/2 -ml-[9%] -mt-[9%] w-[18%]" style={style}><span className="mascot-tool-float block"><MascotToolProp tool={tool} /></span></span>;
    })}
  </div>;
}
