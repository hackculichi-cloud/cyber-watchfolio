import type { ProfileSlug } from "./profiles";

export type ProfileCapability = { title: string; status: string; body: string };

/** Owner-provided course knowledge; practical work and unfinished tracks retain their setting. */
export const profileCapabilities: Partial<Record<ProfileSlug, ProfileCapability[]>> = {
  "electrical": [
    {
      "title": "Electrical foundations & drawings",
      "status": "Training & practice",
      "body": "I apply electrical quantities, Ohm’s and Kirchhoff’s laws, circuit analysis and electrical symbols in training exercises. My completed LinkedIn Learning course supports reading drawings and schematics."
    },
    {
      "title": "Residential installations & planning",
      "status": "Training & client practice",
      "body": "I study conductors, cable selection, load calculations, distribution, conduit and installation standards. My practical work includes an installation board, outlet and switch replacement, and two ceiling luminaires for a residential client."
    },
    {
      "title": "Measurement & fault finding",
      "status": "Training & practice",
      "body": "I develop AC/DC measurement skills with a multimeter and clamp meter: voltage, current, resistance and de-energized continuity. My Udemy training also covers series/parallel circuits, short-circuit checks, protection devices and instrument safety ratings."
    },
    {
      "title": "Industrial systems, motors & control",
      "status": "Currently studying",
      "body": "My RED CONOCER studies cover three-phase systems, motor protection and starting, contactors, control/power diagrams, simulation and introductory VFDs. I have practiced float-switch control; the START/STOP contactor exercise remains planned."
    },
    {
      "title": "Maintenance, projects & energy",
      "status": "Currently studying",
      "body": "I study fault diagnosis, preventive maintenance planning and electrical project design, calculations and commissioning concepts. The program also introduces photovoltaic components, solar system types and energy efficiency; these are training topics rather than completed client installations."
    }
  ],
  "electronics": [
    {
      "title": "Components & circuit behavior",
      "status": "Currently studying",
      "body": "At Escuela Tecnológica de Occidente I study how to identify electronic components, interpret their behavior and validate them individually and within a circuit. Laboratory work connects electricity technology with circuit diagnosis."
    },
    {
      "title": "Instruments & metrology",
      "status": "Training & practice",
      "body": "My basic electronics training develops instrument-based diagnosis using multimeter, oscilloscope, thermometer, logic probe and power supply. Metrology and applied mathematics support interpreting measurements and circuit behavior."
    },
    {
      "title": "Electronic drawings & diagnosis",
      "status": "Training & practice",
      "body": "I work with electronic symbols and diagram reading/drawing to follow connections, identify components and structure fault finding: observe, measure, isolate and verify."
    },
    {
      "title": "Soldering & board care",
      "status": "Course practice",
      "body": "LIDETEC coursework adds soldering-iron and hot-air practice, component/connector handling, shielding and introductory microsoldering. I apply these foundations alongside basic electronics studies; the six advanced ETO tracks are still upcoming."
    }
  ],
  "repair": [
    {
      "title": "Intake, tools & disassembly",
      "status": "Course practice",
      "body": "My LIDETEC training includes service records, identifying phone assemblies, choosing tools and controlled disassembly/reassembly. I use suitable tools and organize the work around diagnosis, replacement and final checks."
    },
    {
      "title": "Phone diagnosis & components",
      "status": "Course practice",
      "body": "Course practice covers multimeter checks of batteries, speakers and earpieces; common charging, microphone, camera, touch and flex faults; and inspection/maintenance of logic boards and liquid-damaged devices."
    },
    {
      "title": "Soldering, connectors & software",
      "status": "Course practice",
      "body": "I trained with soldering iron and hot air, passive-component handling, charging ports, buttons, connectors and introductory microsoldering. The course also covered operating-system fault recognition, software restoration and carrier-service concepts."
    },
    {
      "title": "Completed iPhone interventions",
      "status": "Documented practice",
      "body": "I replaced batteries in an iPhone 12 Pro and iPhone 14 Pro (aftermarket self-programming battery), and the display in an iPhone XR. Final checks included power, charging, touch, cameras, audio, Face ID and battery settings. Real photographs are grouped by case; Samsung and additional iPhone work remain planned."
    }
  ],
  "cybersecurity": [
    {
      "title": "Alert triage & authentication",
      "status": "Educational practice",
      "body": "I have worked through educational LetsDefend investigations involving VPN authentication and RDP brute force, examining log events and building a sequence of activity to support the verdict."
    },
    {
      "title": "Phishing analysis & findings",
      "status": "Educational practice",
      "body": "I analyze suspicious-email scenarios, extract relevant indicators and explain the evidence behind the conclusion. These are learning investigations, with findings published in my portfolio."
    },
    {
      "title": "Playbooks & incident communication",
      "status": "Educational practice",
      "body": "I organize investigation steps, evidence, conclusions and response guidance in reusable write-ups and playbooks. My bilingual support background helps me explain technical findings clearly."
    },
    {
      "title": "Linux & networking foundations",
      "status": "Currently studying",
      "body": "I am taking a Linux diploma program and developing command-line, permissions and system fundamentals alongside TCP/IP networking concepts. Cisco training remains planned; I am seeking my first SOC Tier 1 role."
    }
  ],
  "development": [
    {
      "title": "Frontend interfaces",
      "status": "Portfolio project",
      "body": "My portfolio demonstrates React and TypeScript interfaces, reusable components, responsive layouts, ES/EN content and accessible controls, styled with Tailwind CSS and shadcn/ui."
    },
    {
      "title": "Backend & data foundations",
      "status": "Incomplete studies",
      "body": "My partial Academlo studies covered APIs, server-side logic and data. I retain this learning foundation while building practical evidence; I do not present the program as a completed qualification."
    },
    {
      "title": "Full-stack integration",
      "status": "Incomplete studies",
      "body": "I studied how frontend, backend and data fit together in a web application. My current published evidence is this portfolio; additional integrated application cases will be added as they are completed."
    },
    {
      "title": "Version control & delivery",
      "status": "Portfolio project",
      "body": "This project uses Git/GitHub, pull requests and Vercel, with TypeScript checks, production builds and browser validation. Its reusable data structures support specialty pages, CVs and real photo galleries."
    }
  ]
};
