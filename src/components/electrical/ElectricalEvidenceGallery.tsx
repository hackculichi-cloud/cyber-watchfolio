import type { WorkImage } from "@/data/works";
import WorkImageGallery from "@/components/shared/WorkImageGallery";

type EvidenceItem = WorkImage & { projectId: string; projectTitle: string };
const ElectricalEvidenceGallery = ({ items }: { items: EvidenceItem[] }) => (
  <WorkImageGallery images={items} title="Installations, wiring & measurements" compact collapsible />
);
export default ElectricalEvidenceGallery;
