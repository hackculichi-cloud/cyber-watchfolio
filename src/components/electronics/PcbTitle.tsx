import { useId } from "react";
import "./PcbTitle.css";

/** Lettering mounted on a board: copper tracks, solder joints and SMD components. */
export default function PcbTitle({ text, variant = "hero" }: { text: string; variant?: "hero" | "brand" }) {
  const compact = variant === "brand";
  const id = `pcb-${useId().replace(/:/g, "")}`;
  const Heading = compact ? "span" : "h1";
  const width = compact ? 350 : 720;
  const height = compact ? 100 : 180;
  return <Heading data-pcb-title={compact ? undefined : ""} data-pcb-wordmark={compact ? "" : undefined} className={`pcb-lettering ${compact ? "pcb-lettering--brand" : "pcb-lettering--hero"}`}>
    <span className="sr-only">{text}</span>
    <svg aria-hidden="true" focusable="false" viewBox={`0 0 ${width} ${height}`} className="pcb-board">
      <defs>
        <linearGradient id={`${id}-board`} x2="1" y2="1"><stop stopColor="#143b38" /><stop offset=".5" stopColor="#0a242a" /><stop offset="1" stopColor="#102f30" /></linearGradient>
        <linearGradient id={`${id}-solder`} x2="0" y2="1"><stop stopColor="#fffdf4" /><stop offset=".26" stopColor="#dae4e9" /><stop offset=".55" stopColor="#89999f" /><stop offset=".73" stopColor="#eaf2ef" /><stop offset="1" stopColor="#a3aeb2" /></linearGradient>
        <linearGradient id={`${id}-copper`} x2="1" y2="1"><stop stopColor="#fbd39e" /><stop offset=".5" stopColor="#bc763e" /><stop offset="1" stopColor="#f0ad65" /></linearGradient>
      </defs>
      <rect x="3" y="3" width={width - 6} height={height - 6} rx={compact ? 13 : 18} fill={`url(#${id}-board)`} stroke="#517467" strokeWidth="2" />
      <rect x="10" y="10" width={width - 20} height={height - 20} rx="10" fill="none" stroke="#658a71" strokeOpacity=".3" />
      {[12, width - 12].flatMap(x => [12, height - 12].map(y => <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" fill="#071719" stroke="#ca9d62" strokeWidth="2" />))}
      <g fill="none" stroke={`url(#${id}-copper)`} strokeWidth={compact ? 2 : 3} strokeLinejoin="round" strokeLinecap="round">
        {compact ? <>
          <path d="M30 35h24l12 12h12M30 67h22l12-12h14M96 76h180l15-15h28M96 23h169l15 15h39" />
        </> : <>
          <path d="M30 58h38l20 20h44M30 130h40l20-20h42M103 38h173l18 18h340l25-25h30M103 145h80l18-18h426l24 24h37" />
          <path d="M190 76v-8h72m36 5v-8h88m32 6v-6h84m39 5v-5h78M194 108v12h68m37-13v13h89m32-13v13h84m38-13v13h77" strokeOpacity=".65" />
          <path d="M638 90h24l14-14h15M637 106h17l21 21h17" />
        </>}
      </g>
      {/* A mounted IC and bright soldered pins, rather than a generic area icon. */}
      <g data-pcb-component transform={compact ? "translate(34 38) scale(.55)" : "translate(38 68)"}>
        {[0, 1, 2, 3].map(i => <g key={i} fill={`url(#${id}-solder)`}><rect x={i * 12 + 7} y="-12" width="6" height="16" rx="2" /><rect x={i * 12 + 7} y="40" width="6" height="16" rx="2" /></g>)}
        <rect width="57" height="44" rx="5" fill="#151c23" stroke="#70808a" strokeWidth="1.5" /><path d="M6 6h44" stroke="#47535c" /><circle cx="9" cy="12" r="2" fill="#b4babc" />
        <path d="M18 28h7l5-12 5 17 5-9h9" fill="none" stroke="#efb27a" strokeWidth="2" />
      </g>
      <text data-pcb-solder-text x={compact ? 78 : 143} y={compact ? 75 : 108} fontFamily="Manrope, sans-serif" fontWeight="800" fontSize={compact ? 72 : 61} letterSpacing={compact ? -2 : -1.8} fill={`url(#${id}-solder)`} stroke="#9c632f" strokeWidth={compact ? 1 : 1.8} paintOrder="stroke fill">{text}</text>
      <g fill={`url(#${id}-solder)`} stroke="#c6945c" strokeWidth="1">
        {(compact ? [[30,35],[30,67],[319,38],[319,61]] : [[30,58],[30,130],[103,38],[103,145],[689,31],[688,151],[691,76],[692,127]]).map(([cx,cy]) => <circle data-pcb-solder-joint key={`${cx}-${cy}`} cx={cx} cy={cy} r={compact ? 3 : 4} />)}
      </g>
      {!compact && <>
        <g transform="translate(313 139)"><rect x="0" y="-7" width="48" height="14" rx="4" fill="#c2b28c" stroke="#63543a" /><rect x="6" y="-7" width="5" height="14" fill="#6c3c30" /><rect x="20" y="-7" width="5" height="14" fill="#da5b2b" /><rect x="35" y="-7" width="4" height="14" fill="#a68c4a" /><path d="M-8 0h8m48 0h8" stroke="#d6e0df" strokeWidth="3" /></g>
        <g transform="translate(658 57)"><rect x="-7" y="-10" width="14" height="20" rx="3" fill="#db854e" stroke="#c2c9c6" strokeWidth="3" /><path d="M-8 15h16" stroke="#eee9cc" /></g>
        <path d="M138 30h31m-31 122h48m430-123h20m-20 123h20" stroke="#a4b5a5" strokeWidth="1.2" opacity=".6" />
      </>}
    </svg>
  </Heading>;
}
