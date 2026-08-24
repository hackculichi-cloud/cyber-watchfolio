import Seo from "@/components/shared/Seo";
import PageHeader from "@/components/shared/PageHeader";
import LabCard from "@/components/cards/LabCard";
import EmptyState from "@/components/shared/EmptyState";
import { labs } from "@/data/labs";
import { site } from "@/data/site";

const Labs = () => (
  <>
    <Seo
      title={`Security Labs | ${site.shortName}`}
      description="Hands-on cybersecurity labs and exercises documented with objective, tooling and results."
      path="/labs"
    />
    <PageHeader
      eyebrow="Technology"
      title="Security Labs"
      description="Hands-on practice environments and exercises. Each lab records the objective, the tools used, the difficulty and the outcome."
    />

    <section className="container mx-auto px-4 py-16">
      {labs.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {labs.map((lab) => (
            <LabCard key={lab.id} lab={lab} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Labs are being documented"
          description="Completed labs will be published here with objective, technologies, difficulty and results. The layout is already wired to the labs data file."
        />
      )}
    </section>
  </>
);

export default Labs;
