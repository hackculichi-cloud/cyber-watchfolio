import { ArrowRight } from "lucide-react";
import type { WorkImage } from "@/data/works";
import PlaceholderImage from "@/components/shared/PlaceholderImage";

const Frame = ({ image, caption }: { image?: WorkImage; caption: string }) => (
  <figure className="min-w-0 flex-1">
    {image?.src ? (
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="aspect-[4/3] w-full rounded-lg border border-border object-cover"
      />
    ) : (
      <PlaceholderImage className="aspect-[4/3] w-full" label={`${caption} — photo pending`} pattern="circuit" />
    )}
    <figcaption className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
      {image?.caption ?? caption}
    </figcaption>
  </figure>
);

/** Reusable before / after (optionally during) visual comparison. */
const BeforeAfter = ({
  before,
  during,
  after,
}: {
  before?: WorkImage;
  during?: WorkImage;
  after?: WorkImage;
}) => (
  <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
    <Frame image={before} caption="Before" />
    <ArrowRight className="mx-auto h-4 w-4 shrink-0 rotate-90 text-primary sm:rotate-0" aria-hidden />
    <Frame image={during} caption="During" />
    <ArrowRight className="mx-auto h-4 w-4 shrink-0 rotate-90 text-primary sm:rotate-0" aria-hidden />
    <Frame image={after} caption="After" />
  </div>
);

export default BeforeAfter;
