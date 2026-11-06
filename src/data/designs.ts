import type { StyleId } from "../types/project";

export type DesignConcept = {
  id: string;
  name: string;
  homeLabel?: string;
  summary: string;
  image: string;
  alt: string;
  palette: { name: string; hex: string }[];
  sustainability: number;
  estimateLow: number;
  estimateHigh: number;
  traits: string[];
  styles: StyleId[];
  furniture: string[];
  materials: string[];
  space: string[];
  benefits: string[];
};

export const DESIGNS: DesignConcept[] = [
  {
    id: "scandinavian",
    name: "Scandinavian Calm",
    summary: "Natural wood, neutral colors, minimal furniture, bright and peaceful.",
    image: "images/designs/scandinavian.jpg",
    alt: "Pale living room with a light sofa, woven mirrors, oak floor, and dried grasses.",
    palette: [
      { name: "Chalk", hex: "#F4F1EA" },
      { name: "Oak", hex: "#C4A484" },
      { name: "Lime", hex: "#C7DB9A" },
      { name: "Forest", hex: "#244C3B" },
    ],
    sustainability: 90,
    estimateLow: 2400,
    estimateHigh: 4800,
    traits: ["Pale timber", "Low seating", "Linen textiles", "Quiet walls"],
    styles: ["scandinavian"],
    furniture: ["Low oak sofa or daybed", "Round light-wood table", "One floor lamp with a paper or linen shade"],
    materials: ["Bamboo or pale timber floor", "Low-VOC warm white paint", "Wool or cotton rug"],
    space: [
      "Keep a clear walk along the window.",
      "Let one rug set the seating zone instead of extra chairs.",
    ],
    benefits: [
      "Fewer pieces means less to replace.",
      "Light finishes bounce daylight deeper into the room.",
      "Low-emission paint keeps the air easier to live with.",
    ],
  },
  {
    id: "biophilic",
    name: "Biophilic Living",
    homeLabel: "Natural Living",
    summary: "Indoor greenery, natural textures, organic materials, and a connection to the outdoors.",
    image: "images/designs/biophilic.jpg",
    alt: "Living room with a forest view, wood ceiling trim, plants, and a timber coffee table.",
    palette: [
      { name: "Leaf", hex: "#6E8B74" },
      { name: "Lime", hex: "#C7DB9A" },
      { name: "Clay", hex: "#8B5E3C" },
      { name: "Sand", hex: "#F3EFE6" },
    ],
    sustainability: 94,
    estimateLow: 3200,
    estimateHigh: 6400,
    traits: ["Indoor plants", "Wood grain", "Daylight", "Organic textiles"],
    styles: ["biophilic"],
    furniture: ["Timber coffee table", "Leather or linen lounge chairs you already own", "Open plant stands, not more closed storage"],
    materials: ["Reclaimed or bamboo floor", "Clay or mineral paint", "Natural-fiber rug"],
    space: [
      "Group plants where they get real light, not in dark corners.",
      "Leave the window wall unblocked so the view does the decorating.",
    ],
    benefits: [
      "Daylight reduces daytime lamp use.",
      "Natural textures age instead of peeling.",
      "Keeping existing chairs avoids a new furniture footprint.",
    ],
  },
  {
    id: "modern-earth",
    name: "Modern Earth",
    summary: "Warm earthy colors, reclaimed wood, contemporary furniture, and sustainable finishes.",
    image: "images/designs/modern-earth.jpg",
    alt: "Warm living room with a cognac leather sofa, fiddle-leaf fig, and a gallery wall.",
    palette: [
      { name: "Clay", hex: "#8C4A2F" },
      { name: "Sand", hex: "#EFE6DA" },
      { name: "Olive", hex: "#3E4A3A" },
      { name: "Straw", hex: "#E3C56B" },
    ],
    sustainability: 88,
    estimateLow: 3800,
    estimateHigh: 7200,
    traits: ["Earthy color", "Reclaimed wood", "Contemporary seating", "Soft textiles"],
    styles: ["contemporary", "rustic"],
    furniture: ["One substantial sofa in a repairable covering", "Round wood table", "A single accent chair"],
    materials: ["Reclaimed wood floor", "Mineral paint in clay or olive", "Wool rug"],
    space: [
      "Float the sofa off the wall if the room is deep enough to gain a path.",
      "Use one gallery wall so the other walls stay calm.",
    ],
    benefits: [
      "Reclaimed boards skip a new-timber harvest.",
      "A limited palette means leftover paint can be reused.",
      "Quality seating outlasts a trend cycle.",
    ],
  },
  {
    id: "minimalist",
    name: "Minimalist Elegance",
    summary: "Clean lines, functional furniture, neutral palettes, and a clutter-free room.",
    image: "images/designs/minimalist.jpg",
    alt: "Minimal living room with a gray sectional, pale walls, and a light wood stair.",
    palette: [
      { name: "Paper", hex: "#F7F7F4" },
      { name: "Stone", hex: "#D9D4CC" },
      { name: "Sage", hex: "#91A98C" },
      { name: "Ink", hex: "#252D29" },
    ],
    sustainability: 86,
    estimateLow: 1800,
    estimateHigh: 3600,
    traits: ["Clear lines", "Neutral palette", "Functional furniture", "Open floor"],
    styles: ["modern-minimalist", "contemporary"],
    furniture: ["One sofa sized to the room", "A low media cabinet with doors", "Two side tables, not a cluster"],
    materials: ["Low-VOC white paint", "Pale floor you can refinish", "LED pendants or a single floor lamp"],
    space: [
      "Remove one piece before you add one.",
      "Closed storage hides the things that make a minimal room look finished.",
    ],
    benefits: [
      "The lowest material list of the five concepts.",
      "Light walls improve the daylight you already have.",
      "Refinishable floors avoid a future tear-out.",
    ],
  },
  {
    id: "rustic",
    name: "Rustic Harmony",
    summary: "Natural stone, recycled timber, warm lighting, and organic elements.",
    image: "images/designs/rustic.jpg",
    alt: "Living room with exposed wood beams, a white brick fireplace, and arched windows.",
    palette: [
      { name: "Timber", hex: "#6B3F2A" },
      { name: "Lime", hex: "#C7DB9A" },
      { name: "Plaster", hex: "#E7D7C1" },
      { name: "Forest", hex: "#244C3B" },
    ],
    sustainability: 91,
    estimateLow: 4200,
    estimateHigh: 8500,
    traits: ["Recycled timber", "Stone or brick", "Warm lamps", "Arched daylight"],
    styles: ["rustic", "biophilic"],
    furniture: ["A sturdy table you can refinish", "Loose-back chairs", "A bench that can move to another room later"],
    materials: ["Reclaimed beams or floorboards", "Limewashed brick or stone tile at the hearth", "Warm LED filaments in efficient lamps"],
    space: [
      "Keep furniture low so the beams and windows stay visible.",
      "A single hearth rug defines the room without wall-to-wall covering.",
    ],
    benefits: [
      "Timber and brick are repairable in place.",
      "Stone at wet or hot spots lasts longer than a thin finish.",
      "Warm light can still be an efficient lamp.",
    ],
  },
];

export function designById(id: string | null): DesignConcept | undefined {
  return DESIGNS.find((design) => design.id === id);
}
