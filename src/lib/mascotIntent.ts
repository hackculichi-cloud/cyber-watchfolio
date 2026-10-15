import type { ProfileSlug } from "@/data/profiles";

export type MascotIntent = { profile: ProfileSlug | null; commit?: boolean };
let activeArea: ProfileSlug | null = null;
/** Menu intent is separate from the orbit's outgoing preview, avoiding event loops. */
export const previewMascotArea = (profile: ProfileSlug | null, commit = false) => {
  activeArea = profile;
  window.dispatchEvent(new CustomEvent<MascotIntent>("culichi:area-intent", { detail: { profile, commit } }));
};

/** A delayed close from a previous menu must not clear the next area's preview. */
export const clearMascotArea = (profile: ProfileSlug) => {
  if (activeArea === profile) previewMascotArea(null);
};
