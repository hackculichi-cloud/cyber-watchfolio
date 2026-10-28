import { memo } from "react";
import { Link } from "react-router-dom";
import type { MascotVariant } from "@/components/shared/CulichiMascot";
import MascotMorph from "@/components/shared/MascotMorph";
import { useLanguage } from "@/i18n/LanguageProvider";
import CopperConductorTitle from "@/components/electrical/CopperConductorTitle";
import NetworkSecurityTitle from "@/components/cybersecurity/NetworkSecurityTitle";
import PcbTitle from "@/components/electronics/PcbTitle";
import { CodeWordmark } from "@/components/software/CodeExecutionTitle";
import BarberTitle from "@/components/barbering/BarberTitle";

/** Route hash changes do not rebuild the character and discipline lettering. */
const HeaderIdentity = memo(function HeaderIdentity({ displayedMascot, committing }: { displayedMascot: MascotVariant; committing: boolean }) {
  const { t } = useLanguage();
  return (
        <Link to="/" className="group flex min-w-0 items-center gap-2 font-semibold tracking-tight">
          <span role="img" aria-label={t("Culichi fox logo")} data-profile={displayedMascot} data-header-mascot={displayedMascot} className="header-mascot-frame grid h-28 w-28 shrink-0 place-items-center">
            <MascotMorph outfit={displayedMascot} portrait committing={committing} />
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span data-header-brand data-brand-profile={displayedMascot} data-profile={displayedMascot === "emblem" ? undefined : displayedMascot} className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"><span key={displayedMascot} data-brand-lettering={displayedMascot} className="header-wordmark-slot">{displayedMascot === "electrical" ? <CopperConductorTitle text="Culichi" variant="brand" /> : displayedMascot === "development" ? <CodeWordmark /> : displayedMascot === "electronics" ? <PcbTitle text="Culichi" variant="brand" /> : displayedMascot === "cybersecurity" ? <NetworkSecurityTitle text="Culichi" variant="brand" /> : displayedMascot === "barbering" ? <BarberTitle text="Culichi" variant="brand" /> : <span className="profile-wordmark">Culichi</span>}<span data-brand-dot data-profile={displayedMascot === "emblem" ? undefined : displayedMascot} className="text-primary transition-colors duration-200">.</span></span></span>
            <span className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">{t("Christian Velasco")}</span>
          </span>
        </Link>
  );
});

export default HeaderIdentity;
