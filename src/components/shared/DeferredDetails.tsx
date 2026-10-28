import { useState, type ComponentPropsWithoutRef, type ReactNode } from "react";

type DeferredDetailsProps = ComponentPropsWithoutRef<"details"> & {
  summary: ReactNode;
};

/** Mount costly contents on first opening, then retain their state when closed. */
export default function DeferredDetails({ summary, children, open, onToggle, onClick, ...props }: DeferredDetailsProps) {
  const [hasOpened, setHasOpened] = useState(() => !!open);

  return <details {...props} open={open} onClick={event => {
    onClick?.(event);
    // Native toggle is asynchronous. Prepare on activation so the first open
    // paints the complete content, with toggle as a fallback for scripted opens.
    const clickedSummary = event.target instanceof Element ? event.target.closest("summary") : null;
    if (!event.defaultPrevented && clickedSummary?.parentElement === event.currentTarget && !event.currentTarget.open) setHasOpened(true);
  }} onToggle={event => {
    if (event.currentTarget.open) setHasOpened(true);
    onToggle?.(event);
  }}>
    {summary}
    {hasOpened && children}
  </details>;
}
