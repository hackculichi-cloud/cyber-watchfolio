import type { WorkImage, WorkProcessRecord, WorkStep } from "./works";

type ProcessTemplate = Omit<WorkProcessRecord, "documentedSteps"> & {
  documentedSteps?: (Omit<WorkStep, "images"> & { photoIndexes?: number[] })[];
};

/** Photo indexes refer only to the existing, owner-assigned collection for each case. */
const records: Record<string, ProcessTemplate> = {
  "residential-outlet-october-2026": {
    "documentationNeeded": [
      {
        "timing": "Original record",
        "title": "Device, conductors and circuit protection",
        "description": "Add the original device markings, conductor size/material and protection details if retained. The reported 15 A outlet and 30 A breaker remain recorded without assuming compatibility."
      },
      {
        "timing": "Original record",
        "title": "Earth check and terminal specifications",
        "description": "Add the method and result of the confirmed earth check, plus terminal conductor limits and any recorded tightening value. A photo cannot recover an unrecorded measurement."
      },
      {
        "timing": "Next session",
        "title": "Isolation and checks recorded at the time",
        "description": "In the next suitable service session, document circuit isolation and the actual final checks. A later photo cannot establish that isolation occurred during this earlier energized intervention."
      }
    ]
  },
  "residential-training-board": {
    "documentedSteps": [
      {
        "title": "Layout and installation points",
        "description": "The original detail photograph records conduit, junction boxes, outlets and lighting points during the course exercise. The original circuit drawing has not been supplied.",
        "photoIndexes": [
          3
        ]
      },
      {
        "title": "Board assembly",
        "description": "Participated in mounting devices and enclosures on the training board. The photograph shows the assembly work and tools at the bench.",
        "photoIndexes": [
          0
        ]
      },
      {
        "title": "Conductor routing and connections",
        "description": "Worked on conductor routing and device-box wiring. The photograph documents the open boxes and wiring stage; specific continuity or torque values are not recorded.",
        "photoIndexes": [
          2
        ]
      },
      {
        "title": "Lighting demonstration and course record",
        "description": "The group photograph records the assembled board with lighting points illuminated. It documents operation at that moment, not a complete set of electrical test results.",
        "photoIndexes": [
          1
        ]
      }
    ],
    "protocol": [
      "Define the board diagram, device ratings, conductor specifications and intended training checks before assembly.",
      "Identify and isolate the supply, prevent reconnection and verify absence of voltage with a suitable instrument checked before and after use.",
      "Check mounting, conduit, conductor identification and approved connections against the course drawing and device instructions.",
      "Record de-energized continuity and protective-earth checks where applicable, then perform the controlled functional test and record each actual result."
    ],
    "documentationNeeded": [
      {
        "timing": "Original record",
        "title": "Course diagram and personal participation",
        "description": "Add the original drawing, course date and the tasks you personally completed if those notes are available. The board was a group exercise."
      },
      {
        "timing": "Current condition",
        "title": "Board overview and device labels",
        "description": "If the board is still accessible, photograph its current overall layout and visible device labels. Identify these as current photos."
      },
      {
        "timing": "Next session",
        "title": "Circuit identification and test sheet",
        "description": "At the next controlled practice, record isolation, conductor identification and measured test results alongside the diagram. Do not reconstruct earlier readings."
      }
    ]
  },
  "float-switch-course-practice": {
    "documentedSteps": [
      {
        "title": "Training setup",
        "description": "The supplied photograph records the training board used for the float-switch exercise. The float model and its individual terminals cannot be established from this overview.",
        "photoIndexes": [
          0
        ]
      },
      {
        "title": "Recorded functional demonstration",
        "description": "The original video documents the course demonstration. Supply voltage, contact selection, switching limits and load specifications have not been supplied as a test record.",
        "video": true
      }
    ],
    "protocol": [
      "Record the actual float-switch diagram, supply, controlled load and device ratings; identify whether an intermediate control device is required by the equipment specification.",
      "Identify and isolate the supply, prevent reconnection and verify absence of voltage with a suitable instrument checked before and after use.",
      "Check contact identification and the intended level-control states with the setup de-energized and according to the device instructions.",
      "Document each controlled switching state during the supervised course test, then record the final shutdown and observations."
    ],
    "documentationNeeded": [
      {
        "timing": "Original record",
        "title": "Actual diagram and control purpose",
        "description": "Add the original circuit sketch and explain which load the float switch controlled in this exercise. Do not assume it was a pump installation."
      },
      {
        "timing": "Current condition",
        "title": "Float-switch identification",
        "description": "If the disconnected training equipment is available, photograph the float switch and its readable label separately from the board overview."
      },
      {
        "timing": "Next session",
        "title": "Control-state test record",
        "description": "In the next controlled session, identify the tested states and record the observed response, actual supply and relevant measurements. Keep them separate from this earlier video."
      }
    ]
  },
  "residential-outlet-switch-replacement": {
    "documentationNeeded": [
      {
        "timing": "Original record",
        "title": "Removal and connection photographs",
        "description": "Add any original photographs of the wiring and replacement stage. The supplied images show the removed devices and completed installation, not those intermediate steps."
      },
      {
        "timing": "Current condition",
        "title": "Finished installation overview",
        "description": "If the location is available, take a clear external photo of the current outlet, switch and wall plate without dismantling them."
      },
      {
        "timing": "Next session",
        "title": "Specifications and final measurements",
        "description": "During a suitable future service, record circuit/device ratings, isolation and actual polarity, voltage and earth-check results. Do not borrow the 119.3 V reading from the other outlet case."
      }
    ]
  },
  "residential-two-luminaire-replacement": {
    "documentedSteps": [
      {
        "title": "Ceiling support and luminaire connection",
        "description": "The installation photograph records the ceiling bracket, supply conductors and luminaire driver during replacement. Circuit isolation is not documented in this photo set.",
        "photoIndexes": [
          0
        ]
      },
      {
        "title": "Connection and mounting detail",
        "description": "The close-up records the driver, wiring and mounting bracket. It does not establish terminal specifications, tightening values or protective-earth test results.",
        "photoIndexes": [
          2
        ]
      },
      {
        "title": "Installed luminaire operating",
        "description": "The photograph shows a replacement luminaire mounted on the ceiling and illuminated. No voltage reading accompanies this image.",
        "photoIndexes": [
          1
        ]
      },
      {
        "title": "Both luminaires completed",
        "description": "The room photograph records both replacement luminaires illuminated. This is the documented functional result of the residential work.",
        "photoIndexes": [
          3
        ]
      }
    ],
    "protocol": [
      "Identify the lighting circuit, luminaire/driver ratings and suitable ceiling support before choosing the replacement.",
      "Identify and isolate the supply, prevent reconnection and verify absence of voltage with a suitable instrument checked before and after use.",
      "Verify conductor identification, protective-earth requirements, approved connections and secure mounting using the device instructions.",
      "Close the installation before the controlled functional check; record switch operation, the observed result and any actual measurements."
    ],
    "documentationNeeded": [
      {
        "timing": "Original record",
        "title": "Original luminaires and replacement specifications",
        "description": "Add original removal photos and luminaire/driver labels if retained. The existing set starts during installation."
      },
      {
        "timing": "Current condition",
        "title": "Current lighting result",
        "description": "If the room is available, record both lights operating and their switch response from outside the closed installation. Label it as a current demonstration."
      },
      {
        "timing": "Next session",
        "title": "Isolation, mounting and electrical checks",
        "description": "In the next suitable service, record circuit isolation, the actual mounting/connection checks and measured results. Do not reopen these luminaires solely to photograph past stages."
      }
    ]
  },
  "start-stop-contactor-planned": {
    "protocol": [
      "Before this planned practice, define the actual training diagram, supply/control voltage, contactor and protection specifications with the course setup.",
      "Identify and isolate the supply, prevent reconnection and verify absence of voltage with a suitable instrument checked before and after use.",
      "Document assembly and de-energized checks against the approved course diagram before any controlled functional test.",
      "After performing the practice, record START/STOP behavior and the actual result; describe holding or protection functions only if they are part of the real setup."
    ],
    "documentationNeeded": [
      {
        "timing": "Next session",
        "title": "Planned practice record",
        "description": "When this exercise is performed, add the approved drawing, component labels, assembly photos, checks and final demonstration. No completed steps or results are published yet."
      }
    ]
  },
  "sr-001": {
    "documentedSteps": [
      {
        "title": "Device identification and external record",
        "description": "The supplied front and rear views are assigned to this iPhone 12 Pro by the owner. Their timing relative to the repair is not confirmed.",
        "photoIndexes": [
          2,
          7,
          8
        ]
      },
      {
        "title": "Opening and battery access",
        "description": "The interior photo records the device with a battery in place before the documented removal stage. It does not establish the initial diagnosis or battery health.",
        "photoIndexes": [
          4
        ]
      },
      {
        "title": "Battery removal record",
        "description": "The photographs show the empty battery area and the removed battery beside the device and display.",
        "photoIndexes": [
          5,
          6
        ]
      },
      {
        "title": "Replacement and installation record",
        "description": "The photographs document adhesive/connector details, the removed and replacement batteries, and a battery installed inside the device. The owner confirms the replacement.",
        "photoIndexes": [
          0,
          1,
          3
        ]
      },
      {
        "title": "Confirmed post-repair checks",
        "description": "The owner confirms the functional checks listed in this case. Individual test readings and screenshots were not supplied.",
        "confirmed": true
      }
    ],
    "protocol": [
      "Record the model, reported fault, initial checks and service date. Keep personal information out of public evidence.",
      "Follow the model-specific shutdown, battery-isolation and electrostatic-handling procedure; organize screws and protect flex cables and connectors.",
      "Check replacement-part compatibility and record its reference. Document installation and reassembly according to the manufacturer procedure.",
      "Record functional checks and their actual results, with photographs or video. Note limitations without claiming water resistance or calibration that was not tested."
    ],
    "documentationNeeded": [
      {
        "timing": "Original record",
        "title": "Initial fault and service date",
        "description": "Add the original symptom, diagnosis, service date and initial checks if you retained them. These details cannot be established from internal photos alone."
      },
      {
        "timing": "Original record",
        "title": "Replacement-part identification",
        "description": "Add the battery reference or original packaging if still available. Do not infer its brand or capacity from the repair result."
      },
      {
        "timing": "Current condition",
        "title": "Current external condition and operation",
        "description": "If the device is available, photograph it assembled and record a short functional demonstration without private notifications. Label this as a current check, not the original handover."
      },
      {
        "timing": "Next session",
        "title": "Initial checks, precautions and final results",
        "description": "For the next repair, record the initial tests, battery isolation, tools and final check results as they happen. Keep the completed device assembled for this documentation update."
      }
    ]
  },
  "sr-002": {
    "documentedSteps": [
      {
        "title": "Replacement-part record",
        "description": "The supplied photograph records battery packaging at the workstation. The owner identifies the installed part as an aftermarket self-programming battery; its brand is not confirmed.",
        "photoIndexes": [
          1
        ]
      },
      {
        "title": "Device opened in the repair fixture",
        "description": "The photographs show the opened device in the workstation fixture. Specific disconnection and electrostatic precautions have not been documented.",
        "photoIndexes": [
          2,
          3
        ]
      },
      {
        "title": "Battery intervention",
        "description": "The workstation photograph accompanies the battery replacement confirmed by the owner. Exact tools and installation measurements have not been recorded.",
        "photoIndexes": [
          0
        ]
      },
      {
        "title": "Reassembly and power-on record",
        "description": "The photograph shows the reassembled device powered on at its lock screen. This image alone does not establish every functional test result.",
        "photoIndexes": [
          4
        ]
      },
      {
        "title": "Confirmed post-repair checks",
        "description": "The owner confirms the functional checks listed in this case. Individual test readings and screenshots were not supplied.",
        "confirmed": true
      }
    ],
    "protocol": [
      "Record the model, reported fault, initial checks and service date. Keep personal information out of public evidence.",
      "Follow the model-specific shutdown, battery-isolation and electrostatic-handling procedure; organize screws and protect flex cables and connectors.",
      "Check replacement-part compatibility and record its reference. Document installation and reassembly according to the manufacturer procedure.",
      "Record functional checks and their actual results, with photographs or video. Note limitations without claiming water resistance or calibration that was not tested."
    ],
    "documentationNeeded": [
      {
        "timing": "Original record",
        "title": "Initial fault and service date",
        "description": "Add the original symptom, diagnosis, service date and initial checks if you retained them. These details cannot be established from internal photos alone."
      },
      {
        "timing": "Original record",
        "title": "Replacement-part identification",
        "description": "Add the battery reference or original packaging if still available. Do not infer its brand or capacity from the repair result."
      },
      {
        "timing": "Current condition",
        "title": "Current external condition and operation",
        "description": "If the device is available, photograph it assembled and record a short functional demonstration without private notifications. Label this as a current check, not the original handover."
      },
      {
        "timing": "Next session",
        "title": "Initial checks, precautions and final results",
        "description": "For the next repair, record the initial tests, battery isolation, tools and final check results as they happen. Keep the completed device assembled for this documentation update."
      }
    ]
  },
  "sr-003": {
    "documentedSteps": [
      {
        "title": "Internal inspection record",
        "description": "The two supplied interior photographs are assigned to this iPhone XR case by the owner. They show the internal area and the device with the display removed.",
        "photoIndexes": [
          0,
          1
        ]
      },
      {
        "title": "Confirmed display replacement",
        "description": "The owner confirms replacing the display. A photograph of the installed replacement and its part reference has not been supplied.",
        "confirmed": true
      },
      {
        "title": "Confirmed post-repair checks",
        "description": "The owner confirms the functional checks listed in this case. Individual test readings and screenshots were not supplied.",
        "confirmed": true
      }
    ],
    "protocol": [
      "Record the model, reported fault, initial checks and service date. Keep personal information out of public evidence.",
      "Follow the model-specific shutdown, battery-isolation and electrostatic-handling procedure; organize screws and protect flex cables and connectors.",
      "Check replacement-part compatibility and record its reference. Document installation and reassembly according to the manufacturer procedure.",
      "Record functional checks and their actual results, with photographs or video. Note limitations without claiming water resistance or calibration that was not tested."
    ],
    "documentationNeeded": [
      {
        "timing": "Original record",
        "title": "Initial fault and service date",
        "description": "Add the original symptom, diagnosis, service date and initial checks if you retained them. These details cannot be established from internal photos alone."
      },
      {
        "timing": "Original record",
        "title": "Replacement-part identification",
        "description": "Add the display reference or packaging if still available. The screen brand has not been confirmed."
      },
      {
        "timing": "Current condition",
        "title": "Current external condition and operation",
        "description": "If the device is available, photograph it assembled and record a short functional demonstration without private notifications. Label this as a current check, not the original handover."
      },
      {
        "timing": "Next session",
        "title": "Initial checks, precautions and final results",
        "description": "For the next repair, record the initial tests, battery isolation, tools and final check results as they happen. Keep the completed device assembled for this documentation update."
      }
    ]
  }
};

/** Preserve original image objects/captions; no evidence is generated or borrowed between cases. */
export function workProcessFor(id: string, photos: WorkImage[] = []): WorkProcessRecord {
  const template = records[id];
  if (!template) return {};
  const { documentedSteps, ...record } = template;
  return { ...record, ...(documentedSteps ? { documentedSteps: documentedSteps.map(({ photoIndexes, ...stage }) => ({
    ...stage, ...(photoIndexes ? { images: photoIndexes.map(index => photos[index]).filter(Boolean) } : {}),
  })) } : {}) };
}
