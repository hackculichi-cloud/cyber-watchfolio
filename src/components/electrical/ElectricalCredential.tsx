import { Award, BadgeCheck, CalendarDays, ExternalLink, ImageOff } from "lucide-react";
import Tag from "@/components/shared/Tag";
import { Button } from "@/components/ui/button";
import type { ElectricalCredential as Credential } from "@/data/electrical";

/** Credential / title block. Add `image`, `issuedOn`, `credentialId` in the data file when confirmed. */
const ElectricalCredential = ({ credential }: { credential: Credential }) => (
  <div className="panel-glow grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
    <div>
      <div className="flex items-center gap-2 text-primary">
        <Award className="h-5 w-5" aria-hidden />
        <span className="text-xs font-semibold uppercase tracking-[0.16em]">Credential</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold">{credential.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">Issued by {credential.issuer}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Tag variant="primary">{credential.issuer}</Tag>
        <Tag variant="accent">
          <BadgeCheck className="mr-1 h-3 w-3" aria-hidden /> {credential.status}
        </Tag>
        {credential.issuedOn && (
          <Tag>
            <CalendarDays className="mr-1 h-3 w-3" aria-hidden /> {credential.issuedOn}
          </Tag>
        )}
        {credential.credentialId && <Tag>ID {credential.credentialId}</Tag>}
      </div>

      <ul className="mt-5 grid gap-2">
        {credential.highlights.map((h) => (
          <li key={h} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
            {h}
          </li>
        ))}
      </ul>

      {credential.verifyUrl && (
        <Button asChild variant="outline" className="mt-5">
          <a href={credential.verifyUrl} target="_blank" rel="noreferrer noopener">
            Verify credential <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      )}
    </div>

    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      {credential.image ? (
        <img
          src={credential.image.src}
          alt={credential.image.alt}
          loading="lazy"
          decoding="async"
          className="h-auto w-full"
        />
      ) : (
        <div className="flex h-full min-h-56 flex-col items-center justify-center gap-2 p-6 text-center">
          <ImageOff className="h-6 w-6 text-muted-foreground" aria-hidden />
          <p className="text-sm font-medium">Certificate photo pending</p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            The scanned RED CONOCER document will be published here.
          </p>
        </div>
      )}
    </div>
  </div>
);

export default ElectricalCredential;
