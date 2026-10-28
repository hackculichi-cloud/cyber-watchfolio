import atlas from "@/assets/barber-tools-realistic.webp";
import { cn } from "@/lib/utils";

/** Generated realistic reference images; original personal equipment stays separate. */
export default function BarberToolImage({ kind, className }: { kind: "clipper" | "trimmer" | "scissors" | "hygiene"; className?: string }) {
  const positions = { clipper: "0% 0%", trimmer: "100% 0%", scissors: "0% 100%", hygiene: "100% 100%" };
  return <span aria-hidden data-realistic-tool={kind} className={cn("block aspect-square w-full bg-no-repeat", className)} style={{ backgroundImage: `url(${atlas})`, backgroundSize: "200% 200%", backgroundPosition: positions[kind] }} />;
}
