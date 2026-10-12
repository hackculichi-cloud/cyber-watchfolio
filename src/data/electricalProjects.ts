/** Real training photographs live in public/images/electrical/ (root-relative, works in Vite and Vercel). */
const boardWork = "/images/electrical/training-board-work.jpg";
const groupPhoto = "/images/electrical/training-group.jpg";
const wiringWork = "/images/electrical/training-wiring.jpg";
const installationDetail = "/images/electrical/training-installation.jpg";
import type { WorkItem } from "@/data/works";
import { site } from "@/data/site";
import floatBoard from "@/assets/electrical-practices/float-switch-practice-board.png.asset.json";
import floatVideo from "@/assets/electrical-practices/float-switch-functional-test.mp4.asset.json";
import floatVideoWebm from "@/assets/electrical-practices/float-switch-functional-test.webm.asset.json";
import outletAfter from "@/assets/electrical-practices/residential-outlet-switch-after.png.asset.json";
import outletComparison from "@/assets/electrical-practices/residential-outlet-switch-comparison.png.asset.json";
import oldDevice from "@/assets/electrical-practices/residential-old-device-and-power-strip.png.asset.json";
import lightDuring1 from "@/assets/electrical-practices/ceiling-light-installation-1.png.asset.json";
import lightAfter from "@/assets/electrical-practices/ceiling-light-operational.png.asset.json";
import lightDuring2 from "@/assets/electrical-practices/ceiling-light-installation-2.png.asset.json";
import lightsCompleted from "@/assets/electrical-practices/two-ceiling-lights-completed.png.asset.json";

// Use the public asset origin so the same media also resolves in plain Vite.
const assetUrl = (asset: { url: string }) => new URL(asset.url, site.url).href;
const floatPhoto = {
  src: assetUrl(floatBoard),
  alt: "Float-switch course practice on the electrical training board",
  caption: "Course practice: training board with control devices and lighting points.",
};
const outletPhotos = [
  { src: assetUrl(outletAfter), alt: "Replacement outlet and switch beside a power strip", caption: "Residential client work: installed outlet and switch beside the power strip." },
  { src: assetUrl(outletComparison), alt: "Removed outlet and switch compared with the replacement", caption: "Comparison of the removed device and the installed replacement." },
  { src: assetUrl(oldDevice), alt: "Removed outlet and switch with a power strip", caption: "Removed outlet and switch alongside a power strip." },
];
const lightPhotos = [
  { src: assetUrl(lightDuring1), alt: "Ceiling luminaire during connection and mounting", caption: "Residential client work: luminaire connection and mounting in progress." },
  { src: assetUrl(lightAfter), alt: "Replacement ceiling luminaire illuminated", caption: "Replacement luminaire installed and illuminated." },
  { src: assetUrl(lightDuring2), alt: "Close view of luminaire wiring and mounting bracket", caption: "Detail of the luminaire wiring, driver and ceiling mounting bracket." },
  { src: assetUrl(lightsCompleted), alt: "Two replacement ceiling luminaires illuminated in the room", caption: "Completed client work: both replacement luminaires illuminated." },
];

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
  {
    id: "float-switch-course-practice",
    profile: "electrical",
    title: "Float-switch Control — Course Practice",
    summary: "Course exercise with an electronivel (float switch) on the electrical practice board, documented with a photograph and a functional demonstration video.",
    category: "Practical training",
    status: "Completed",
    skills: ["Float-switch practice", "Electrical control", "Circuit assembly"],
    did: ["Practiced float-switch control on the course training board.", "Documented the exercise with a board photograph and a video demonstration."],
    cover: floatPhoto,
    images: [floatPhoto],
    video: { src: assetUrl(floatVideo), webmSrc: assetUrl(floatVideoWebm), title: "Float-switch practice demonstration", poster: floatPhoto.src },
  },
  {
    id: "residential-outlet-switch-replacement",
    profile: "electrical",
    title: "Outlet, Switch & Power Strip — Residential Client Practice",
    summary: "Residential client maintenance documenting outlet and switch replacement, with photographs of the removed device, the replacement and power strips.",
    category: "Residential client work",
    status: "Completed",
    skills: ["Device replacement", "Residential wiring", "Electrical maintenance"],
    did: ["Replaced a residential outlet and switch for a client.", "Documented the removed device, the installed replacement and the power strips."],
    cover: outletPhotos[0],
    images: outletPhotos,
    before: outletPhotos[2],
    after: outletPhotos[0],
  },
  {
    id: "residential-two-luminaire-replacement",
    profile: "electrical",
    title: "Two Ceiling Luminaires — Residential Client Replacement",
    summary: "Residential client maintenance: replacement of two ceiling luminaires, documented during connection and mounting and with photographs of both lights operating.",
    category: "Residential client work",
    status: "Completed",
    skills: ["Luminaire replacement", "Residential wiring", "Electrical maintenance"],
    did: ["Replaced two ceiling luminaires in a client's residence.", "Documented the luminaire connections and ceiling mounting.", "Photographed the completed installation with both luminaires illuminated."],
    results: ["Two replacement ceiling luminaires shown operating in the completed installation."],
    cover: lightPhotos[3],
    images: lightPhotos,
  },
];

export const electricalEvidence = electricalProjects.flatMap((project) =>
  (project.images ?? []).filter((image) => Boolean(image.src)).map((image) => ({
    ...image,
    projectId: project.id,
    projectTitle: project.title,
  })),
);