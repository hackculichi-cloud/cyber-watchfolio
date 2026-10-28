import { Scissors } from "lucide-react";
import "./BarberTitle.css";

/** Readable chrome lettering with the stripes and fine detailing of a barber pole. */
export default function BarberTitle({ text, variant = "hero" }: { text: string; variant?: "hero" | "brand" }) {
  const compact = variant === "brand";
  const Heading = compact ? "span" : "h1";

  return <Heading
    data-barber-title={compact ? undefined : ""}
    data-barber-wordmark={compact ? "" : undefined}
    className={`barber-lettering barber-lettering--${variant}`}
  >
    <span aria-hidden="true" className="barber-lettering-pole"><i /></span>
    <span className="barber-lettering-name">
      <span className="barber-lettering-ink">{text}</span>
      <span aria-hidden="true" className="barber-lettering-trim"><i />{!compact && <Scissors />}</span>
    </span>
  </Heading>;
}
