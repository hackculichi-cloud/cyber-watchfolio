import type { WorkImage } from "./works";
import type { SmartphoneRepair } from "./smartphoneRepair";

const photo = (number: number, caption: string): WorkImage => ({
  src: `/images/repair/iphone-13-battery/${String(number).padStart(2, "0")}.jpeg`, alt: caption, caption,
});

/** All eleven original phone photographs supplied in trabajos.zip. */
export const iphone13BatteryPhotos: WorkImage[] = [
  photo(1, "Opening the red iPhone during battery replacement."),
  photo(2, "Device secured in a suction opening fixture on the workbench."),
  photo(3, "Original Apple-marked battery inside the opened device."),
  photo(4, "Overview of the repair workstation and tools."),
  photo(5, "Opened device held in the repair fixture before battery removal."),
  photo(6, "Battery compartment shown after the original battery was removed."),
  photo(7, "Replacement battery marked For: IP 13 installed in the device."),
  photo(8, "Closer view of the replacement battery and opened display."),
  photo(9, "Device in the fixture with the replacement battery installed."),
  photo(10, "Rear view of the assembled red iPhone in its case."),
  photo(11, "Front view of the assembled phone; the display is not illuminated."),
];

export const iphone13BatteryRepair: SmartphoneRepair = {
  id: "sr-004", ref: "SMARTPHONE REPAIR #004", device: "iPhone 13", brand: "iPhone", repairType: "Battery replacement",
  photos: iphone13BatteryPhotos,
  work: ["Battery replacement performed by the portfolio owner"],
  tools: ["Phone repair fixture", "Suction opening tool", "Precision screwdriver"],
  components: ["Replacement battery marked For: IP 13"],
  result: "Battery replaced; installation and the assembled device are documented in eleven original photographs.",
  notes: "The service date, initial symptom, battery brand and final functional test results have not been supplied for this case.",
  protocol: [
    "Record the model, reported fault, initial checks and service date. Keep personal information out of public evidence.",
    "Follow the model-specific shutdown, battery-isolation and electrostatic-handling procedure; organize screws and protect flex cables and connectors.",
    "Check replacement-part compatibility and record its reference. Document installation and reassembly according to the manufacturer procedure.",
    "Record functional checks and their actual results, with photographs or video. Note limitations without claiming water resistance or calibration that was not tested.",
  ],
  documentationNeeded: [{ timing: "Original record", title: "Service record and final checks", description: "The service date, initial symptom, battery brand and final functional test results have not been supplied for this case." }],
  documentedSteps: [
    { title: "Workbench and device opening", description: "Photographs record the device being opened, the suction fixture and the repair workstation.", images: [iphone13BatteryPhotos[0], iphone13BatteryPhotos[1], iphone13BatteryPhotos[3]] },
    { title: "Original battery and removal record", description: "Internal photographs show the Apple-marked battery and the battery compartment after removal.", images: [iphone13BatteryPhotos[2], iphone13BatteryPhotos[4], iphone13BatteryPhotos[5]] },
    { title: "Replacement battery installation", description: "The replacement is shown inside the device with a visible For: IP 13 marking.", images: iphone13BatteryPhotos.slice(6, 9) },
    { title: "Assembled device record", description: "The supplied rear and front views show the assembled phone. The front photograph does not record a powered-on functional check.", images: iphone13BatteryPhotos.slice(9) },
  ],
};
