/** Real training photographs live in public/images/electrical/ (root-relative, works in Vite and Vercel). */
const boardWork = "/images/electrical/training-board-work.jpg";
const groupPhoto = "/images/electrical/training-group.jpg";
const wiringWork = "/images/electrical/training-wiring.jpg";
const installationDetail = "/images/electrical/training-installation.jpg";
import type { WorkItem } from "@/data/works";

const floatPhoto = {
  src: "/media/portfolio/float-switch-practice-board.png",
  alt: "Float-switch course practice on the electrical training board",
  caption: "Course practice: training board with control devices and lighting points.",
};
const outletPhotos = [
  { src: "/media/portfolio/residential-outlet-switch-after.png", alt: "Replacement outlet and switch beside a power strip", caption: "Residential client work: installed outlet and switch beside the power strip." },
  { src: "/media/portfolio/residential-outlet-switch-comparison.png", alt: "Removed outlet and switch compared with the replacement", caption: "Comparison of the removed device and the installed replacement." },
  { src: "/media/portfolio/residential-old-device-and-power-strip.png", alt: "Removed outlet and switch with a power strip", caption: "Removed outlet and switch alongside a power strip." },
];
const lightPhotos = [
  { src: "/media/portfolio/ceiling-light-installation-1.png", alt: "Ceiling luminaire during connection and mounting", caption: "Residential client work: luminaire connection and mounting in progress." },
  { src: "/media/portfolio/ceiling-light-operational.png", alt: "Replacement ceiling luminaire illuminated", caption: "Replacement luminaire installed and illuminated." },
  { src: "/media/portfolio/ceiling-light-installation-2.png", alt: "Close view of luminaire wiring and mounting bracket", caption: "Detail of the luminaire wiring, driver and ceiling mounting bracket." },
  { src: "/media/portfolio/two-ceiling-lights-completed.png", alt: "Two replacement ceiling luminaires illuminated in the room", caption: "Completed client work: both replacement luminaires illuminated." },
];

const contactPhoto = (number: number, caption: string) => ({
  src: `/images/electrical/outlet-october-2026/${String(number).padStart(2, "0")}.jpeg`,
  alt: caption,
  caption,
});
const contactPhotos = [
  contactPhoto(1, "Original duplex outlet before replacement."),
  contactPhoto(2, "Original outlet and adjacent switch with their wall plates."),
  contactPhoto(3, "Conductors exposed after removing the original outlet."),
  contactPhoto(4, "Device box and conductors during disassembly."),
  contactPhoto(5, "Close-up of conductor insulation and identification tape."),
  contactPhoto(6, "Replacement duplex outlet and wall plate before mounting."),
  contactPhoto(7, "Replacement outlet being connected outside the box."),
  contactPhoto(8, "Rear terminal connections on the replacement outlet."),
  contactPhoto(9, "Conductor routing before closing the device box."),
  contactPhoto(10, "Replacement outlet secured to the device box before fitting the plate."),
  contactPhoto(11, "Removed outlet beside the newly installed device."),
  contactPhoto(12, "Plug-in outlet tester connected to the replacement."),
  contactPhoto(13, "Outlet tester and completed wall plate."),
  contactPhoto(14, "Digital multimeter displaying 119.3 V AC at the outlet."),
  contactPhoto(15, "Close-up of terminal connections and green conductors."),
  contactPhoto(16, "Completed replacement outlet with its wall plate."),
];

export const outletPhotoPractice: WorkItem = {
  id: "residential-outlet-october-2026", profile: "electrical",
  title: "Residential Outlet Replacement — Photo Record",
  summary: "Replacement of a residential duplex outlet, documented with 16 original photographs: initial condition, conductors, replacement connections, mounting and final instrument checks.",
  category: "Residential practice", status: "Completed", reviewRequired: true,
  skills: ["Device replacement", "Photographic documentation", "Voltage measurement", "Multimeter operation"],
  tools: ["Digital multimeter", "Plug-in outlet tester", "Screwdrivers and hand tools"],
  objective: "Record the replacement process and distinguish visible evidence from electrical checks still to be confirmed.",
  did: ["Documented the original outlet, removal, replacement connections and final mounting.", "Photographed a plug-in tester and a multimeter connected to the installed outlet.", "Confirmed checking polarity and protective earth, and identifying the conductors with colored tape. Also reported working without disconnecting the circuit because the client did not allow an outage."],
  results: ["Replacement outlet shown mounted with its wall plate.", "A photograph records 119.3 V AC between the outlet slots. This reading alone does not establish polarity or an effective protective earth.", "Reported ratings: 15 A outlet and 30 A circuit breaker. Electrical compatibility requires correction or assessment by a qualified electrician before further use."],
  technicalExplanation: "The sequence is reconstructed from photographs and the owner's confirmation. The intervention was carried out with the circuit energized; it is not presented as a safe working method or a validated installation. The owner confirmed polarity and protective-earth checks; the earth-test method and result have not yet been recorded.",
  documentedSteps: [
    { title: "Initial condition", description: "Recorded the old duplex outlet and the adjacent switch before replacement.", images: contactPhotos.slice(0, 2) },
    { title: "Removal and conductor inspection", description: "Recorded the open box, exposed conductors and identification tape. The owner confirmed that the circuit was not disconnected; this is a safety deficiency to correct in future work, not a recommended step.", images: [contactPhotos[2], contactPhotos[4]] },
    { title: "Replacement and terminal connections", description: "Recorded the new device and its rear connections, with conductor identification confirmed by the owner. Terminal suitability and tightening torque still need documenting.", images: [contactPhotos[5], contactPhotos[7], contactPhotos[14]] },
    { title: "Mounting and wall plate", description: "Recorded the device secured to the box and the finished wall plate.", images: [contactPhotos[9], contactPhotos[15]] },
    { title: "Instrument checks", description: "Recorded the plug-in outlet tester and a 119.3 V AC multimeter reading. The owner confirmed polarity and protective-earth checks; the earth-test method and measured result remain to be recorded.", images: [contactPhotos[11], contactPhotos[13]] },
  ],
  reviewNotes: [
    "The circuit was not disconnected. Future replacement work must be postponed if isolation is refused: disconnect, prevent reconnection and verify absence of voltage, checking the tester on a known live source before and after.",
    "A 15 A outlet was reported on a circuit protected at 30 A. Do not treat this as a compatible arrangement. A qualified electrician must assess the outlet, conductor ampacity and circuit protection before further use; do not simply change one component without checking the circuit.",
    "Polarity, protective-earth verification and color identification were reported. Record the earth-test method and result; green conductors must be protective earth, and a neutral-to-earth bridge at the outlet is not a substitute.",
    "Document the confirmed protective-earth check and any required metal-box bonding. A three-light plug-in tester alone cannot certify an effective earth.",
    "Check the outlet rating, conductor gauge and material, circuit protection, strip length and manufacturer-specified tightening torque. Confirm the terminal accepts the number of conductors shown and that no bare copper remains outside the terminal.",
    "Inspect the marked or discolored insulation and any taped joints. Confirm sound insulation and approved connections inside the box before closing it.",
    "Record final polarity and earth-test results, secure mounting and any required protective-device tests. Resolve the circuit protection and outlet-rating mismatch with a qualified electrician before treating the installation as verified.",
  ],
  cover: contactPhotos[15], before: contactPhotos[0], after: contactPhotos[15], images: contactPhotos,
};

export const electricalProjects: WorkItem[] = [
  outletPhotoPractice,
  {
    id: "start-stop-contactor-planned",
    profile: "electrical",
    title: "Electrical Control — START/STOP Contactor Practice",
    summary: "Planned training practice with a contactor and START/STOP push buttons. Procedure, specifications and evidence will be documented after the exercise.",
    category: "Practical training",
    status: "Planned",
    objective: "Document the operation of a START/STOP control circuit with a contactor, using the actual training setup.",
  },
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
    video: { src: "/media/portfolio/float-switch-functional-test.mp4", webmSrc: "/media/portfolio/float-switch-functional-test.webm", title: "Float-switch practice demonstration", poster: floatPhoto.src },
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
