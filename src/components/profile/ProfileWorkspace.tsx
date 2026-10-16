import type { ProfileSlug } from "@/data/profiles";
import CulichiBody from "@/components/shared/CulichiBody";
import { useLanguage } from "@/i18n/LanguageProvider";

const workspaces: Record<ProfileSlug, { title: string; description: string }> = {
  cybersecurity: { title: "Networks & monitoring lab", description: "Culichi in a network monitoring workspace with server racks and connected screens" },
  development: { title: "Development studio", description: "Culichi in a software studio with code screens and a development workstation" },
  electrical: { title: "Electrical workshop", description: "Culichi in an electrical workshop with a tool wall, workbench and training panel" },
  electronics: { title: "Electronics laboratory", description: "Culichi in an electronics laboratory with an oscilloscope, circuits and a laboratory bench" },
  repair: { title: "Repair workbench", description: "Culichi at a repair workbench with a microscope, phone and precision tools" },
  "customer-service": { title: "Customer support workspace", description: "Culichi in a customer support workspace with a headset, service screens and an organized desk" },
};

function Monitor({ x, y, code = false }: { x: number; y: number; code?: boolean }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect width="156" height="106" rx="9" fill="#111e30" />
    <rect x="7" y="7" width="142" height="85" rx="4" fill="#07111e" />
    {code ? <g strokeWidth="3" opacity=".75"><path d="M18 26h30m10 0h46M25 40h51m10 0h36M25 54h32m10 0h43M18 68h52" /></g>
      : <g><path d="M20 61l28-29 33 33 43-43M48 32l76-10M48 32l33 33" fill="none" /><g fill="currentColor">{[[20,61],[48,32],[81,65],[124,22]].map(([cx,cy]) => <circle key={cx} cx={cx} cy={cy} r="5" />)}</g></g>}
    <path d="M78 106v22m-30 0h60" strokeWidth="5" />
  </g>;
}

function ServerRack({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}><rect width="106" height="244" rx="8" fill="#101c2a" />
    {[0,1,2,3,4,5].map(row => <g key={row} transform={`translate(9 ${12 + row * 37})`}><rect width="88" height="29" rx="3" fill="#17283b" strokeOpacity=".35" /><path d="M10 10h38m-38 8h38" strokeOpacity=".35" /><circle cx="68" cy="14" r="3" fill="currentColor" /><circle cx="79" cy="14" r="2" fill="currentColor" /></g>)}
  </g>;
}

/** Static local artwork and lightweight SVG scenery: no orbit, timers, filters or canvas. */
export default function ProfileWorkspace({ profile }: { profile: ProfileSlug }) {
  const { t } = useLanguage();
  const workspace = workspaces[profile];
  return <figure data-profile-workspace={profile} className="relative mx-auto w-full max-w-[35rem]">
    <div role="img" aria-label={t(workspace.description)} className="relative aspect-[5/4] overflow-hidden">
      <svg aria-hidden viewBox="0 0 600 480" className="absolute inset-0 h-full w-full text-primary" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 420h576M28 408V50h544v358" strokeOpacity=".12" />
        <path d="M28 50l32-20h478l34 20" strokeOpacity=".25" />
        <path d="M70 30h170m48 0h170" strokeWidth="4" strokeOpacity=".6" />
        {profile === "cybersecurity" && <><ServerRack x={44} y={102} /><ServerRack x={164} y={102} /><Monitor x={375} y={83} /><path d="M44 365h230v24H44zm32 24v30m170-30v30M294 184h50v-48h31" strokeOpacity=".5" /></>}
        {profile === "development" && <><Monitor x={48} y={100} code /><Monitor x={222} y={66} code /><ServerRack x={449} y={155} /><path d="M30 276h370v18H30zm28 18v126m314-126v126M63 311h128v65H63z" fill="#102030" strokeOpacity=".45" /><path d="M72 262h107m-86-14h65" strokeWidth="5" strokeOpacity=".6" /></>}
        {profile === "electrical" && <>
          <rect x="40" y="80" width="255" height="209" rx="6" fill="#14202d" strokeOpacity=".5" />
          {[0,1,2,3,4,5,6].map(col => [0,1,2,3,4].map(row => <circle key={`${col}-${row}`} cx={58+col*36} cy={98+row*42} r="2" fill="currentColor" stroke="none" opacity=".2" />))}
          {[0,1,2,3].map(i => <g key={i} transform={`translate(${68+i*49} 108)`}><rect width="10" height="48" rx="4" fill="currentColor" opacity=".7" /><path d="M5 48v39" strokeWidth="3" /></g>)}
          <rect x="74" y="222" width="48" height="56" rx="5" /><rect x="81" y="230" width="34" height="18" fill="#243528" /><circle cx="98" cy="262" r="7" />
          <path d="M165 228l-9 30 14 12 15-14-9-28m-6 42v15" strokeWidth="4" />
          <rect x="430" y="94" width="96" height="148" rx="6" fill="#182332" /><path d="M445 125h65m-65 20h65m-65 20h65m-65 20h65" strokeWidth="7" strokeOpacity=".6" />
          <path d="M28 303h298v18H28zm25 18v99m246-99v99M64 341h203v54H64z" fill="#19202a" strokeOpacity=".6" />
        </>}
        {profile === "electronics" && <>
          <rect x="44" y="132" width="180" height="110" rx="8" fill="#152333" /><rect x="56" y="145" width="117" height="76" rx="4" fill="#07151e" /><path d="M64 185h12l12-27 17 52 17-47 16 34 16-12h10" strokeWidth="3" /><circle cx="198" cy="164" r="9" /><circle cx="198" cy="197" r="9" />
          <path d="M32 293h285v22H32zm26 22v105m232-105v105" fill="#172333" strokeOpacity=".5" />
          <rect x="78" y="261" width="118" height="25" rx="4" fill="#183a2d" /><path d="M96 263v-18m28 18v-24m27 24v-16m25 16v-20" strokeWidth="6" />
          <path d="M396 100h135v146H396zM414 124h97m-97 24h97m-97 24h97m-97 24h97" strokeOpacity=".3" />
        </>}
        {profile === "repair" && <>
          <path d="M61 281h230v21H61zm20 21v118m189-118v118" fill="#182033" strokeOpacity=".5" />
          <path d="M102 276h70m-32 0v-62l39-51-22-26m-6-12 17-15 46 49-18 17z" strokeWidth="8" strokeLinecap="round" />
          <rect x="200" y="222" width="45" height="58" rx="7" fill="#0d1524" /><path d="M208 230h29v35h-29z" strokeOpacity=".6" />
          <rect x="37" y="70" width="250" height="55" rx="5" fill="#151d31" /><path d="M58 87v23m26-23v23m26-23v23m26-23v23m26-23v23m26-23v23m26-23v23m26-23v23" strokeWidth="4" strokeOpacity=".6" />
          <Monitor x={392} y={104} code />
        </>}
        {profile === "customer-service" && <>
          <Monitor x={48} y={103} code /><Monitor x={382} y={84} />
          <path d="M30 280h286v20H30zm28 20v120m230-120v120" fill="#142534" strokeOpacity=".6" />
          <path d="M83 254v-23a33 33 0 0166 0v23m-66-11h12v27H83zm54 0h12v27h-12zm12 19v12h-23" strokeWidth="4" />
          <rect x="202" y="231" width="49" height="39" rx="4" fill="#19323c" /><path d="M212 242h29m-29 9h29m-29 9h17" strokeOpacity=".6" />
        </>}
      </svg>
      <CulichiBody profile={profile} className="absolute bottom-0 right-0 w-[72%]" />
    </div>
    <figcaption className="flex items-center gap-2 border-t border-primary/20 py-3 text-xs font-medium text-primary"><span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />{t(workspace.title)}</figcaption>
  </figure>;
}
