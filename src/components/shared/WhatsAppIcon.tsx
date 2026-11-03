import type { SVGProps } from "react";

/** WhatsApp's recognizable chat/phone silhouette, rendered locally. */
export default function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20.3 11.7a8.3 8.3 0 0 1-12.2 7.4L3 20.5l1.4-5a8.3 8.3 0 1 1 15.9-3.8Z" />
    <path d="m8.1 7.6 1.1-.3 1.1 2.4-.9 1a7.4 7.4 0 0 0 3.8 3.5l1-1 2.3 1.1-.3 1.2c-.3 1.2-1.7 1.4-2.8 1-3.3-1.1-5.7-3.5-6.7-6.4-.3-1 .1-2 .9-2.5Z" />
  </svg>;
}
