import { useId } from "react";
import "./NetworkSecurityTitle.css";

/** Protected network lettering, with a Linux-style prompt; no implied Kali qualification. */
export default function NetworkSecurityTitle({ text, variant = "hero" }: { text: string; variant?: "hero" | "brand" }) {
  const compact = variant === "brand";
  const Heading = compact ? "span" : "h1";
  const id = `network-${useId().replace(/:/g, "")}`;
  const width = compact ? 350 : 850;
  const height = compact ? 100 : 195;
  return <Heading data-network-title={compact ? undefined : ""} data-network-wordmark={compact ? "" : undefined} className={`network-lettering ${compact ? "network-lettering--brand" : "network-lettering--hero"}`}>
    <span className="sr-only">{text}</span>
    <svg aria-hidden="true" focusable="false" className="network-lettering-svg" viewBox={`0 0 ${width} ${height}`}>
      <defs><linearGradient id={`${id}-ink`} x2="0" y2="1"><stop stopColor="#eefaff" /><stop offset=".7" stopColor="#b7efff" /><stop offset="1" stopColor="#46c6f3" /></linearGradient></defs>
      <g data-network-routes fill="none" stroke="#35bff2" strokeWidth={compact ? 2 : 2.5} strokeLinejoin="round" strokeLinecap="round">
        {compact ? <><path d="M12 53h22l15-15h17M78 83h86l15-13h69l16 13h66M92 16h69l14 14h91l14-14h42" /><path d="M48 50v23h20m204-19h20l14-14h24" strokeOpacity=".4" /></> : <><path d="M22 68h34l28 28h31M22 142h34l28-28h31M119 41h125l23 23h169l26-23h180l23 23h132M119 150h136l24-24h190l24 24h207l24-24h73" /><path d="M176 70V56h40m80 19V56h48m74 14V56h43m69 14V56h42m65 19V56h44M173 122v14h40m80-14v14h45m79-14v14h44m70-14v14h45m65-14v14h43" strokeOpacity=".35" /></>}
      </g>
      <g data-network-nodes fill="#091e2d" stroke="#65d9fa" strokeWidth="2.5">
        {(compact ? [[12,53],[78,83],[164,83],[248,70],[330,83],[322,16]] : [[22,68],[22,142],[119,41],[244,41],[436,64],[642,41],[797,64],[119,150],[255,150],[469,126],[700,150],[797,126]]).map(([cx,cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={compact ? 3 : 4.5} />)}
      </g>
      <g data-network-terminal transform={compact ? "translate(28 38) scale(.45)" : "translate(40 77)"}>
        <path d="M0-15 22-24l22 9v23c0 13-11 23-22 28C11 31 0 21 0 8Z" fill="#092b42" stroke="#42c9f5" strokeWidth="2.5" />
        <path d="m10-1 8 7-8 7m14 1h10" stroke="#c7f7ff" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <text data-network-ink x={compact ? 69 : 124} y={compact ? 71 : 111} fontFamily="Manrope,sans-serif" fontWeight="800" fontSize={compact ? 69 : 73} letterSpacing={compact ? -2 : -2.8} fill={`url(#${id}-ink)`}>{text}</text>
      {!compact && <g transform="translate(726 78)" stroke="#45c7ee" fill="#09283e" strokeWidth="2"><rect x="0" y="0" width="61" height="39" rx="6" /><path d="M24 39v9m-10 0h33" fill="none" /><path d="m14 19 6 6 17-15" stroke="#81e4d2" strokeWidth="3" fill="none" strokeLinecap="round" /></g>}
    </svg>
  </Heading>;
}
