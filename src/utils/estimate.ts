import { materialById, type CatalogMaterial } from "../data/materials";
import type { MaterialScale, MaterialSelection } from "../types/project";

export function wallArea(sqft: number): number {
  const side = Math.sqrt(Math.max(1, sqft));
  return Math.max(1, Math.round(side * 4 * 8 * 0.78));
}

export function suggestedQuantity(material: CatalogMaterial, sqft: number): number {
  switch (material.scale) {
    case "floor":
      return Math.max(1, Math.round(sqft));
    case "paint":
      return Math.max(1, Math.ceil(wallArea(sqft) / 350));
    case "wall":
      return wallArea(sqft);
    case "feature":
      return Math.max(material.defaultQty, Math.round(wallArea(sqft) * 0.28));
    case "fixtures":
      return Math.max(2, Math.round(sqft / 70));
    default:
      return material.defaultQty;
  }
}

export type EstimateLine = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  lineTotal: number;
  conventionalTotal: number;
  scale: MaterialScale;
  operatingSavings: number;
  co2: number;
  waste: number;
  kwh: number;
};

export type Estimate = {
  lines: EstimateLine[];
  materials: number;
  conventional: number;
  labor: number;
  extras: number;
  total: number;
  upfrontDifference: number;
  operatingSavings: number;
  potentialSavings: number;
  co2: number;
  waste: number;
  kwh: number;
};

export function buildEstimate(selections: MaterialSelection[], roomSize: number): Estimate {
  const lines: EstimateLine[] = [];
  for (const selection of selections) {
    const material = materialById(selection.id);
    if (!material) continue;
    const quantity = Math.max(1, Math.round(selection.quantity));
    lines.push({
      id: material.id,
      name: material.name,
      quantity,
      unit: material.unit,
      unitPrice: material.unitPrice,
      lineTotal: Math.round(material.unitPrice * quantity),
      conventionalTotal: Math.round(material.conventionalPrice * quantity),
      scale: material.scale,
      operatingSavings: Math.round(material.operatingSavings * quantity),
      co2: material.co2PerUnit * quantity,
      waste: material.wasteLbPerUnit * quantity,
      kwh: material.kwhPerUnit * quantity,
    });
  }

  const materials = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const conventional = lines.reduce((sum, line) => sum + line.conventionalTotal, 0);
  const installed = lines.filter((line) => line.scale !== "each" && line.scale !== "fixtures");
  const installedSubtotal = installed.reduce((sum, line) => sum + line.lineTotal, 0);
  const fixtureCount = lines
    .filter((line) => line.scale === "fixtures")
    .reduce((sum, line) => sum + line.quantity, 0);
  const pieceCount = lines
    .filter((line) => line.scale === "each")
    .reduce((sum, line) => sum + line.quantity, 0);
  const labor =
    lines.length === 0
      ? 0
      : Math.round((installed.length ? roomSize * 1.6 + installedSubtotal * 0.22 : 0) + fixtureCount * 45 + pieceCount * 35);
  const extras = lines.length === 0 ? 0 : Math.round(materials * 0.06 + 35);
  const operatingSavings = lines.reduce((sum, line) => sum + line.operatingSavings, 0);
  const upfrontDifference = conventional - materials;
  const potentialSavings = Math.max(0, upfrontDifference) + operatingSavings;

  return {
    lines,
    materials,
    conventional,
    labor,
    extras,
    total: materials + labor + extras,
    upfrontDifference,
    operatingSavings,
    potentialSavings,
    co2: lines.reduce((sum, line) => sum + line.co2, 0),
    waste: lines.reduce((sum, line) => sum + line.waste, 0),
    kwh: lines.reduce((sum, line) => sum + line.kwh, 0),
  };
}
