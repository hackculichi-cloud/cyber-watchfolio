import "./RepairTitle.css";

/** A service-bench identity: opened screen, precision contacts and readable metal lettering. */
export default function RepairTitle({ text, variant = "hero" }: { text: string; variant?: "hero" | "brand" }) {
  const compact = variant === "brand";
  const Heading = compact ? "span" : "h1";

  return <Heading data-repair-title={compact ? undefined : ""} data-repair-wordmark={compact ? "" : undefined} className={`repair-lettering repair-lettering--${variant}`}>
    {!compact && <svg aria-hidden="true" focusable="false" viewBox="0 0 48 64" className="repair-lettering-device">
      <path className="repair-lettering-body" d="M7 5h26a4 4 0 0 1 4 4v46a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4Z" />
      <path className="repair-lettering-screen" d="M14 5h25a4 4 0 0 1 4 4v41a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4Z" />
      <path d="M22 10h9M23 48h7" className="repair-lettering-detail" />
      <path d="M6 22h4m-4 6h4m-4 6h4" className="repair-lettering-contact" />
      <path d="m23 36 4-13 4 10 4-5" className="repair-lettering-probe" />
    </svg>}
    <span className="repair-lettering-name">
      <span className="repair-lettering-ink">{text}</span>
      <span aria-hidden="true" className="repair-lettering-corner repair-lettering-corner--start" />
      <span aria-hidden="true" className="repair-lettering-corner repair-lettering-corner--end" />
      <span aria-hidden="true" className="repair-lettering-flex"><i /><i /><i /><i /><span /></span>
    </span>
  </Heading>;
}
