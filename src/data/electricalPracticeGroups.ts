import { Home, Factory, ToggleLeft, Plug, Lightbulb, LayoutDashboard, Waves, Cog, Cable } from "lucide-react";

/** Explicit case membership keeps photos and contexts together as the portfolio grows. */
export const electricalPracticeGroups = [
  { id: "residential", title: "Residential", icon: Home, categories: [
    { id: "outlets", title: "Outlets & switches", icon: Plug, projectIds: ["residential-outlet-october-2026", "residential-outlet-switch-replacement"] },
    { id: "lighting", title: "Lighting", icon: Lightbulb, projectIds: ["residential-two-luminaire-replacement"] },
    { id: "training-boards", title: "Training boards", icon: LayoutDashboard, projectIds: ["residential-training-board"] },
  ] },
  { id: "industrial", title: "Industrial", icon: Factory, categories: [
    { id: "motors", title: "Motors & maintenance", icon: Cog, projectIds: [] },
  ] },
  { id: "control", title: "Control", icon: ToggleLeft, categories: [
    { id: "level-control", title: "Level control", icon: Waves, projectIds: ["float-switch-course-practice"] },
    { id: "contactors", title: "Contactors / START–STOP", icon: Cable, projectIds: ["start-stop-contactor-planned"] },
  ] },
];
