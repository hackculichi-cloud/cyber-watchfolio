/** Owner-supplied photos, presented with an edited background and lighting. */
export const electricalOwnedTools = [
  { id: "pliers", title: "Pliers set", brand: "Truper", description: "Combination pliers, long-nose pliers and diagonal cutters.", alt: "Three orange-handled Truper pliers: combination, long nose and diagonal cutters." },
  { id: "wire-stripper-knife", title: "Wire stripper and utility knife", brand: "Truper", description: "Automatic wire stripper and retractable utility knife for preparing materials.", alt: "Orange-and-black automatic wire stripper and utility knife." },
  { id: "screwdrivers", title: "Screwdriver set", brand: "Klein Tools", description: "Six screwdrivers with different tips for installation and adjustment tasks.", alt: "Six Klein Tools screwdrivers with orange shafts and black-and-orange handles." },
  { id: "adjustment-tools", title: "Cutting and adjustment tools", brand: "Surtek · Truper", description: "Diagonal cutters, slip-joint pliers and an adjustable wrench.", alt: "Black-and-yellow cutters and slip-joint pliers beside a silver Truper adjustable wrench." },
  { id: "tape-conduit", title: "Electrical tape and conduit", brand: "Installation materials", description: "Six colors of electrical tape and orange corrugated conduit.", alt: "Red, green, blue, yellow, white and black electrical tape rolls with orange corrugated conduit." },
].map(item => ({ ...item, src: `/images/electrical/tools/${item.id}-retouched.webp`, thumbnail: `/images/electrical/tools/${item.id}-retouched-320.webp` }));

export type ElectricalOwnedTool = typeof electricalOwnedTools[number];
