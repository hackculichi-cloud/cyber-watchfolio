export type Service = {
  id: string;
  title: string;
  description: string;
  /** Flip to true when you are ready to offer the service publicly. */
  active: boolean;
};

export const services: Service[] = [
  { id: "smartphone-repair", title: "Smartphone repair", description: "Diagnostics and repair of mobile devices.", active: false },
  { id: "electronics", title: "Electronics", description: "General electronics troubleshooting and small repairs.", active: false },
  { id: "electrical", title: "Residential electrical work", description: "Residential electrical maintenance support.", active: false },
  { id: "barbering", title: "Barbering", description: "Secondary skill offered independently.", active: false },
];
