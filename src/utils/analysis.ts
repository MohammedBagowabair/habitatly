import { roomById } from "../data/options";
import type { GoalId, ProjectState } from "../types/project";

export type Score = { label: string; value: number; note: string };
export type Opportunity = { title: string; detail: string; goal?: GoalId };
export type Recommendation = { title: string; detail: string; impact: "High" | "Medium" };

const OPPORTUNITIES: Opportunity[] = [
  {
    title: "Natural lighting",
    goal: "lighting",
    detail: "Improve the use of daylight with lighter finishes and strategic mirror placement.",
  },
  {
    title: "Space optimization",
    goal: "space",
    detail: "Rearrange furniture to improve movement and usable floor space.",
  },
  {
    title: "Sustainable flooring",
    goal: "sustainable-materials",
    detail: "Consider bamboo or reclaimed wood flooring.",
  },
  {
    title: "Energy efficiency",
    goal: "energy",
    detail: "Replace traditional lighting with energy-efficient LED solutions.",
  },
];

const RECOMMENDATIONS: Recommendation[] = [
  {
    title: "Lighten the finishes that face the window",
    detail: "A paler wall and floor send daylight farther. This is the highest-leverage move if lighting is one of your goals.",
    impact: "High",
  },
  {
    title: "Swap the lamps before you buy more furniture",
    detail: "LED lamps cut electricity use without a construction sequence. Pair them with the daylight work so evenings stay warm.",
    impact: "High",
  },
  {
    title: "Choose a floor you can refinish",
    detail: "Bamboo or reclaimed wood keeps the room out of a future tear-out. Pick this if sustainable materials are on your list.",
    impact: "Medium",
  },
  {
    title: "Edit the furniture before you add storage",
    detail: "One clear path around the room usually beats another cabinet. Measure the walkway before anything is ordered.",
    impact: "Medium",
  },
  {
    title: "Spend the budget on the surface you touch daily",
    detail: "If cost is the constraint, paint and lighting change the room before flooring does. Save the larger line items for a second phase.",
    impact: "Medium",
  },
  {
    title: "Keep one existing piece and design around it",
    detail: "Appearance improves faster when a familiar sofa or table stays. New material goes to the floor or the wall, not to every object.",
    impact: "High",
  },
];

function clamp(value: number): number {
  return Math.max(40, Math.min(98, value));
}

export function analysisScores(project: ProjectState): Score[] {
  const goals = new Set(project.goals);
  const sustainability = clamp(78 + (goals.has("sustainable-materials") ? 4 : 0) + (goals.has("energy") ? -3 : 0));
  const space = clamp(72 + (goals.has("space") ? -4 : 0));
  const lighting = clamp(65 + (goals.has("lighting") ? -4 : 0));
  return [
    {
      label: "Design Potential",
      value: 94,
      note: "The room can take a clearer palette without structural work.",
    },
    {
      label: "Sustainability",
      value: sustainability,
      note: goals.has("energy")
        ? "Energy use is the weak spot in an otherwise workable room."
        : "Good bones, with room to specify better materials.",
    },
    {
      label: "Space Efficiency",
      value: space,
      note: `About ${space}% of the floor is doing useful work in this sample read.`,
    },
    {
      label: "Lighting",
      value: lighting,
      note: "Daylight is present and not yet doing all it could.",
    },
  ];
}

export function orderedOpportunities(goals: GoalId[]): Opportunity[] {
  const preferred = OPPORTUNITIES.filter((item) => item.goal && goals.includes(item.goal));
  const rest = OPPORTUNITIES.filter((item) => !item.goal || !goals.includes(item.goal));
  return [...preferred, ...rest];
}

export function recommendationsFor(goals: GoalId[]): Recommendation[] {
  const ranked = [...RECOMMENDATIONS];
  const weight = (item: Recommendation) => {
    if (goals.includes("lighting") && item.title.startsWith("Lighten")) return 0;
    if (goals.includes("energy") && item.title.startsWith("Swap")) return 0;
    if (goals.includes("sustainable-materials") && item.title.startsWith("Choose a floor")) return 1;
    if (goals.includes("space") && item.title.startsWith("Edit")) return 1;
    if (goals.includes("cost") && item.title.startsWith("Spend")) return 0;
    if (goals.includes("appearance") && item.title.startsWith("Keep")) return 1;
    return 2;
  };
  ranked.sort((a, b) => weight(a) - weight(b));
  return ranked.slice(0, 3);
}

export function assessmentCopy(project: ProjectState): { label: string; value: string }[] {
  const room = roomById(project.roomId);
  return [
    { label: "Room type", value: room?.name ?? "Not chosen yet" },
    { label: "Lighting", value: room?.lighting ?? "Moderate natural light" },
    { label: "Space utilization", value: "72%" },
    { label: "Energy efficiency", value: "Needs improvement" },
    { label: "Design potential", value: "Excellent" },
  ];
}
