import { useState } from "react";
import { Expand } from "lucide-react";
import type { ProfileSlug } from "@/data/profiles";
import { workspaceArtwork } from "@/data/workspaceArtwork";
import { useLanguage } from "@/i18n/LanguageProvider";
import DetailModal from "@/components/shared/DetailModal";

const workspaces: Record<ProfileSlug, { title: string; alt?: string }> = {
  cybersecurity: { title: "Networks & monitoring lab" },
  development: { title: "Development studio" },
  electrical: { title: "Electrical workshop", alt: "Illustrated electrical workshop with Culichi, a residential training board on the bench and an industrial control and power panel on the wall" },
  electronics: { title: "Electronics laboratory" },
  repair: { title: "Repair workbench" },
  "customer-service": { title: "Customer support workspace" },
};

/** Complete illustrated workplaces, served locally at the appropriate resolution. */
export default function ProfileWorkspace({ profile }: { profile: ProfileSlug }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const workspace = workspaces[profile];
  const art = workspaceArtwork[profile];
  return <figure data-profile-workspace={profile} className="relative mx-auto w-full max-w-[40rem]">
    <button type="button" onClick={() => setOpen(true)} aria-label={`${t("Enlarge workspace illustration")}: ${t(workspace.title)}`} className="group relative block w-full overflow-hidden rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background">
      <img src={art.full} srcSet={`${art.small} 768w, ${art.full} 1536w`} sizes="(min-width:1280px) 640px, (min-width:1024px) 48vw, calc(100vw - 2rem)" width={1536} height={1024} fetchPriority="high" decoding="async" alt={t(workspace.alt ?? workspace.title)} data-workspace-art={profile} data-body-mascot={profile} data-mascot={profile} data-mascot-scene="entry" data-scene-profile={profile} className="block h-auto w-full" />
      <span aria-hidden className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-lg border border-primary/50 bg-background/90 text-primary transition-colors group-hover:bg-background"><Expand className="h-5 w-5" /></span>
    </button>
    <DetailModal open={open} onOpenChange={setOpen} title={t(workspace.title)} subtitle={t("Illustrated workspace · Culichi")}>
      <img src={art.full} width={1536} height={1024} alt={t(workspace.alt ?? workspace.title)} decoding="async" className="h-auto w-full rounded-lg" />
    </DetailModal>
  </figure>;
}
