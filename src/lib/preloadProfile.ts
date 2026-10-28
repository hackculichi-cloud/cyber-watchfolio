/** Warm only the route the visitor is pointing at; never load every profile at startup. */
const loaders: Record<string, () => Promise<unknown>> = {
  "/cybersecurity": () => import("@/pages/Cybersecurity"),
  "/software-development": () => import("@/pages/SoftwareDevelopment"),
  "/electrical": () => import("@/pages/Electrical"),
  "/electronics": () => import("@/pages/Electronics"),
  "/repair": () => import("@/pages/TechnicalRepair"),
  "/experience": () => import("@/pages/Experience"),
  "/barbering": () => import("@/pages/Barbering"),
  "/cv": () => import("@/pages/CV"),
  "/contact": () => import("@/pages/Contact"),
};
const pending = new Map<string, Promise<unknown>>();
export function preloadProfile(href: string) {
  const path = href.split("#")[0];
  if (!loaders[path] || pending.has(path)) return;
  pending.set(path, loaders[path]().catch(() => { pending.delete(path); }));
}
