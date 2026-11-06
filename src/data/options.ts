import type { BudgetId, GoalId, RoomId, StyleId } from "../types/project";

export type RoomOption = {
  id: RoomId;
  name: string;
  blurb: string;
  image: string;
  lighting: string;
};

export const ROOMS: RoomOption[] = [
  {
    id: "living-room",
    name: "Living Room",
    blurb: "Seating, daylight, and the room you use most.",
    image: "images/samples/living.jpg",
    lighting: "Moderate natural light",
  },
  {
    id: "bedroom",
    name: "Bedroom",
    blurb: "A quieter palette and softer evening light.",
    image: "images/samples/bedroom.jpg",
    lighting: "Soft, filtered light",
  },
  {
    id: "kitchen",
    name: "Kitchen",
    blurb: "Work surfaces, storage, and the busiest floor.",
    image: "images/samples/kitchen.jpg",
    lighting: "Bright task light, with daylight that depends on the window wall",
  },
  {
    id: "bathroom",
    name: "Bathroom",
    blurb: "Wet surfaces, ventilation, and a small footprint.",
    image: "images/samples/bathroom.jpg",
    lighting: "Limited natural light",
  },
  {
    id: "dining-room",
    name: "Dining Room",
    blurb: "A table, a path around it, and evening light.",
    image: "images/samples/dining.jpg",
    lighting: "Warm ambient light with moderate daylight",
  },
  {
    id: "home-office",
    name: "Home Office",
    blurb: "A desk, a view, and light you can work in.",
    image: "images/samples/office.jpg",
    lighting: "Strong directional daylight",
  },
];

export type BudgetOption = {
  id: BudgetId;
  label: string;
  detail: string;
  low: number;
  high: number;
};

export const BUDGETS: BudgetOption[] = [
  { id: "under-1000", label: "Under $1,000", detail: "Paint, lighting, and a few careful swaps.", low: 0, high: 1000 },
  { id: "1000-3000", label: "$1,000–$3,000", detail: "A floor refresh or a full repaint plus furnishings.", low: 1000, high: 3000 },
  { id: "3000-5000", label: "$3,000–$5,000", detail: "Materials and labor for one room, done properly.", low: 3000, high: 5000 },
  { id: "5000-10000", label: "$5,000–$10,000", detail: "Flooring, finishes, and furniture together.", low: 5000, high: 10000 },
  { id: "above-10000", label: "Above $10,000", detail: "A deeper renovation with room to choose long-lived materials.", low: 10000, high: 20000 },
];

export type StyleOption = { id: StyleId; name: string; blurb: string };
export const STYLES: StyleOption[] = [
  { id: "scandinavian", name: "Scandinavian", blurb: "Pale wood, quiet colors, few pieces." },
  { id: "modern-minimalist", name: "Modern Minimalist", blurb: "Clear lines and only what you use." },
  { id: "industrial", name: "Industrial", blurb: "Raw structure, metal, and honest wear." },
  { id: "rustic", name: "Rustic", blurb: "Timber, stone, and warmer light." },
  { id: "contemporary", name: "Contemporary", blurb: "Current shapes with a calm palette." },
  { id: "biophilic", name: "Biophilic", blurb: "Plants, daylight, and natural texture." },
];

export type GoalOption = { id: GoalId; name: string };
export const GOALS: GoalOption[] = [
  { id: "appearance", name: "Improve appearance" },
  { id: "energy", name: "Reduce energy consumption" },
  { id: "sustainable-materials", name: "Use sustainable materials" },
  { id: "space", name: "Maximize available space" },
  { id: "cost", name: "Reduce renovation costs" },
  { id: "lighting", name: "Improve natural lighting" },
];

export type SampleImage = {
  id: string;
  name: string;
  roomId: RoomId;
  image: string;
};

export const SAMPLES: SampleImage[] = [
  { id: "living", name: "Living room", roomId: "living-room", image: "images/samples/living.jpg" },
  { id: "bedroom", name: "Bedroom", roomId: "bedroom", image: "images/samples/bedroom.jpg" },
  { id: "kitchen", name: "Kitchen", roomId: "kitchen", image: "images/samples/kitchen.jpg" },
  { id: "bathroom", name: "Bathroom", roomId: "bathroom", image: "images/samples/bathroom.jpg" },
  { id: "dining", name: "Dining room", roomId: "dining-room", image: "images/samples/dining.jpg" },
  { id: "office", name: "Home office", roomId: "home-office", image: "images/samples/office.jpg" },
];

export function roomById(id: RoomId | null): RoomOption | undefined {
  return ROOMS.find((room) => room.id === id);
}

export function budgetById(id: BudgetId | null): BudgetOption | undefined {
  return BUDGETS.find((budget) => budget.id === id);
}
