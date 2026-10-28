import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in ms before the reveal animation starts. */
  delay?: number;
  /** Direction the content travels from. */
  from?: "up" | "left" | "right" | "scale";
  as?: "div" | "section" | "li";
}

/** Stable wrapper: render content immediately without observers or scroll-triggered state. */
const Reveal = ({ children, className, as: Tag = "div" }: RevealProps) => {
  return (
    <Tag
      className={cn("reveal", "is-visible", className)}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
