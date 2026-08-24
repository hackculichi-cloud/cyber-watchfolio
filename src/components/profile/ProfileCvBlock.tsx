import { Download, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Tag from "@/components/shared/Tag";
import { cvVariants } from "@/data/cvs";

/** Profile-scoped CV block: shows the most relevant CV variants for this profile. */
const ProfileCvBlock = ({ cvIds }: { cvIds: string[] }) => {
  const variants = cvIds.map((id) => cvVariants.find((c) => c.id === id)).filter(Boolean);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {variants.map((cv) => (
        <div key={cv!.id} className="panel-glow flex flex-col hover:-translate-y-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="inline-flex items-center gap-2 text-base font-semibold">
              <FileText className="h-4 w-4 text-primary" aria-hidden /> {cv!.title}
            </h3>
            <Tag variant={cv!.available ? "primary" : "muted"}>{cv!.available ? "Available" : "Coming soon"}</Tag>
          </div>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{cv!.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild size="sm" disabled={!cv!.available} variant={cv!.available ? "default" : "secondary"}>
              {cv!.available ? (
                <a href={cv!.file} download>
                  <Download className="h-4 w-4" /> Download
                </a>
              ) : (
                <span aria-disabled>Not published yet</span>
              )}
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link to="/cv">All CV versions</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileCvBlock;
