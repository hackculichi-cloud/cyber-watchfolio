import { useState } from "react";
import { Award, ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Tag from "@/components/shared/Tag";
import { trainingProvider } from "@/data/smartphoneRepair";

const skills = ["Diagnostics", "Disassembly", "Soldering & hot air", "Microsoldering fundamentals", "Software servicing"];

/** Certificate preview card with a lightbox viewer. Only certificate-visible data is shown. */
const CertificateCard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="panel-glow grid gap-6 md:grid-cols-[minmax(0,320px)_1fr]">
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{ padding: 0 }}
        className="group relative overflow-hidden rounded-lg border border-border"
        aria-label="View certificate"
      >
        <img
          src={trainingProvider.image}
          alt={`${trainingProvider.course} certificate issued by ${trainingProvider.name}`}
          loading="lazy"
          decoding="async"
          className="h-full max-h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute inset-0 grid place-items-center bg-background/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ZoomIn className="h-5 w-5 text-primary" aria-hidden />
        </span>
      </button>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="glow-ring grid h-10 w-10 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
            <Award className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              {trainingProvider.name}
            </p>
            <h3 className="text-base font-semibold">{trainingProvider.course}</h3>
          </div>
        </div>

        <dl className="grid gap-3 sm:grid-cols-2">
          {[
            { k: "Institution", v: `${trainingProvider.name} — ${trainingProvider.fullName}` },
            { k: "Document", v: trainingProvider.document },
            { k: "Issued", v: `${trainingProvider.location}, ${trainingProvider.certificateDate}` },
            { k: "Instructor", v: trainingProvider.instructor },
          ].map((row) => (
            <div key={row.k} className="rounded-lg border border-border bg-surface-2/40 p-3">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{row.k}</dt>
              <dd className="mt-1 text-sm text-foreground/90">{row.v}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap gap-1.5">
          {skills.map((s) => (
            <Tag key={s} variant="accent">
              {s}
            </Tag>
          ))}
        </div>

        <Button variant="outline" onClick={() => setOpen(true)}>
          View certificate
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogTitle className="text-base">
            {trainingProvider.course} — {trainingProvider.name}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Certificate of participation issued by {trainingProvider.name}
          </DialogDescription>
          <img
            src={trainingProvider.image}
            alt={`${trainingProvider.course} certificate issued by ${trainingProvider.name}`}
            className="max-h-[75vh] w-full rounded-lg border border-border object-contain"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CertificateCard;
