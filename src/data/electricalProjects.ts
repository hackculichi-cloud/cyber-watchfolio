/** Real training photographs live in public/images/electrical/ (root-relative, works in Vite and Vercel). */
const boardWork = "/images/electrical/training-board-work.jpg";
const groupPhoto = "/images/electrical/training-group.jpg";
const wiringWork = "/images/electrical/training-wiring.jpg";
const installationDetail = "/images/electrical/training-installation.jpg";
import type { WorkItem } from "@/data/works";

export const electricalProjects: WorkItem[] = [
  {
    id: "residential-training-board",
    profile: "electrical",
    title: "Residential Electrical Installation Practice Board",
    summary:
      "Hands-on course practice documenting the assembly and wiring of a residential installation training board.",
    category: "Practical training",
    status: "Completed",
    skills: ["Residential wiring", "Conduit routing", "Device installation", "Circuit assembly"],
    tools: ["Wire stripping and crimping tools", "Screwdrivers", "Hand tools", "Power drill"],
    did: [
      "Participated in assembling and wiring a residential installation practice board.",
      "Worked with conduit, junction boxes, lighting points, switches, outlets and control devices.",
      "Documented the practical exercise with photographs during assembly and after energizing the board.",
    ],
    learned: [
      "Residential circuit layout and conduit routing",
      "Organization of conductors inside junction and device boxes",
      "Installation workflow from assembly through functional testing",
    ],
    cover: {
      src: boardWork,
      alt: "Residential electrical training board with conduit, outlets, switches and lighting points",
      caption: "Training board during practical installation work.",
    },
    images: [
      {
        src: boardWork,
        alt: "Electrical training board during hands-on assembly",
        caption: "Hands-on assembly of devices and enclosures on the training board.",
      },
      {
        src: groupPhoto,
        alt: "Training group beside the energized residential electrical practice board",
        caption: "Training group with the assembled board and lighting circuits energized.",
      },
      {
        src: wiringWork,
        alt: "Close view of conductors being organized in the electrical practice board",
        caption: "Conductor routing and device-box wiring during the practical exercise.",
      },
      {
        src: installationDetail,
        alt: "Detail of conduit, junction boxes, outlet and lighting points on the practice board",
        caption: "Installation detail showing conduit runs, boxes, an outlet and lighting points.",
      },
    ],
  },
];

export const electricalEvidence = electricalProjects.flatMap((project) =>
  (project.images ?? []).filter((image) => Boolean(image.src)).map((image) => ({
    ...image,
    projectId: project.id,
    projectTitle: project.title,
  })),
);