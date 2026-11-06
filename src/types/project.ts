export const ROOM_IDS = [
  "living-room",
  "bedroom",
  "kitchen",
  "bathroom",
  "dining-room",
  "home-office",
] as const;
export type RoomId = (typeof ROOM_IDS)[number];

export const BUDGET_IDS = [
  "under-1000",
  "1000-3000",
  "3000-5000",
  "5000-10000",
  "above-10000",
] as const;
export type BudgetId = (typeof BUDGET_IDS)[number];

export const STYLE_IDS = [
  "scandinavian",
  "modern-minimalist",
  "industrial",
  "rustic",
  "contemporary",
  "biophilic",
] as const;
export type StyleId = (typeof STYLE_IDS)[number];

export const GOAL_IDS = [
  "appearance",
  "energy",
  "sustainable-materials",
  "space",
  "cost",
  "lighting",
] as const;
export type GoalId = (typeof GOAL_IDS)[number];

export type MaterialScale = "floor" | "paint" | "wall" | "feature" | "fixtures" | "each";

export type MaterialSelection = {
  id: string;
  quantity: number;
  custom: boolean;
};

export type ProjectState = {
  imageDataUrl: string | null;
  imageLabel: string | null;
  roomId: RoomId | null;
  budgetId: BudgetId | null;
  styles: StyleId[];
  goals: GoalId[];
  step: number;
  selectedDesignId: string | null;
  materials: MaterialSelection[];
  roomSize: number;
  analyzed: boolean;
  diy: Record<string, boolean>;
};

export const STORAGE_KEY = "habitatly-project-v1";

export function defaultProject(): ProjectState {
  return {
    imageDataUrl: null,
    imageLabel: null,
    roomId: null,
    budgetId: null,
    styles: [],
    goals: [],
    step: 0,
    selectedDesignId: null,
    materials: [],
    roomSize: 180,
    analyzed: false,
    diy: {},
  };
}
