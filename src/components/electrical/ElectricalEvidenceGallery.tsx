import type { WorkImage } from "@/data/works";
import WorkImageGallery from "@/components/shared/WorkImageGallery";

import PhotoDisclosure from "@/components/shared/PhotoDisclosure";

type EvidenceItem = WorkImage & { projectId: string; projectTitle: string };
const ElectricalEvidenceGallery = ({ items }: { items: EvidenceItem[] }) => (
  <PhotoDisclosure title="Installations, wiring & measurements" count={items.length}>
    <WorkImageGallery images={items} title="Gallery" />
  </PhotoDisclosure>
);
export default ElectricalEvidenceGallery;
