import { useState } from "react";
import { ArrowRight, ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Tag from "@/components/shared/Tag";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import type { WorkImage } from "@/data/works";
import type { SmartphoneRepair } from "@/data/smartphoneRepair";

const Pending = ({ label }: { label: string }) => (
  <span className="text-muted-foreground/70">{label} — pending documentation</span>
);

interface FrameProps {
  image?: WorkImage;
  caption: string;
  onOpen: (image: WorkImage) => void;
}

const Frame = ({ image, caption, onOpen }: FrameProps) => (
  <figure className="min-w-0 flex-1">
    {image?.src ? (
      <button
        type="button"
        onClick={() => onOpen(image)}
        style={{ padding: 0 }}
        className="group relative block w-full overflow-hidden rounded-lg border border-border"
        aria-label={`Open ${caption} photo`}
      >
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute inset-0 grid place-items-center bg-background/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ZoomIn className="h-5 w-5 text-primary" aria-hidden />
        </span>
      </button>
    ) : (
      <PlaceholderImage className="aspect-[4/3] w-full" label={`${caption} — photo pending`} pattern="circuit" />
    )}
    <figcaption className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
      {image?.caption ?? caption}
    </figcaption>
  </figure>
);

/**
 * Reusable documented smartphone repair card.
 * Add entries to `smartphoneRepairs` — no UI change needed.
 * The same component works for future laptop/console cases.
 */
const SmartphoneRepairCard = ({ repair }: { repair: SmartphoneRepair }) => {
  const [lightbox, setLightbox] = useState<WorkImage | null>(null);

  const facts: { label: string; value?: string | string[] }[] = [
    { label: "Issue", value: repair.issue },
    { label: "Diagnosis", value: repair.diagnosis },
    { label: "Work performed", value: repair.work },
    { label: "Tools", value: repair.tools },
    { label: "Result", value: repair.result },
  ];

  return (
    <article className="panel-glow space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">{repair.ref}</p>
          <h3 className="mt-1 text-lg font-semibold">{repair.device}</h3>
          {repair.date && <p className="mt-1 text-xs text-muted-foreground">{repair.date}</p>}
        </div>
        <Tag variant="primary">{repair.repairType}</Tag>
      </header>

      <dl className="grid gap-4 md:grid-cols-2">
        {facts.map((f) => (
          <div key={f.label} className="rounded-lg border border-border bg-surface-2/40 p-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">{f.label}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {Array.isArray(f.value) ? (
                f.value.length ? (
                  <ul className="space-y-1">
                    {f.value.map((v) => (
                      <li key={v} className="flex gap-2">
                        <span className="text-primary">·</span>
                        <span>{v}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Pending label={f.label} />
                )
              ) : f.value ? (
                f.value
              ) : (
                <Pending label={f.label} />
              )}
            </dd>
          </div>
        ))}
      </dl>

      <div>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Before <ArrowRight className="inline h-3 w-3" aria-hidden /> During{" "}
          <ArrowRight className="inline h-3 w-3" aria-hidden /> After
        </p>
        <div className="flex flex-col items-stretch gap-4 sm:flex-row">
          <Frame image={repair.before} caption="Before" onOpen={setLightbox} />
          <Frame image={repair.during} caption="During" onOpen={setLightbox} />
          <Frame image={repair.after} caption="After" onOpen={setLightbox} />
        </div>
      </div>

      {repair.evidence?.length ? (
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Verification evidence
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repair.evidence.map((e) => (
              <Frame key={e.src} image={e} caption="Evidence" onOpen={setLightbox} />
            ))}
          </div>
        </div>
      ) : null}

      {repair.learned?.length ? (
        <div className="border-t border-border pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">What I learned</p>
          <ul className="mt-2 space-y-1 text-sm leading-relaxed text-muted-foreground">
            {repair.learned.map((l) => (
              <li key={l}>· {l}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <Dialog open={!!lightbox} onOpenChange={(o) => !o && setLightbox(null)}>
        <DialogContent className="max-w-3xl">
          {lightbox && (
            <>
              <DialogTitle className="text-base">{lightbox.caption ?? repair.device}</DialogTitle>
              <DialogDescription className="sr-only">{lightbox.alt}</DialogDescription>
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="max-h-[70vh] w-full rounded-lg border border-border object-contain"
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </article>
  );
};

export default SmartphoneRepairCard;
