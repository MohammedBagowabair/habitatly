export const GREEN_CATEGORIES = [
  "Recycled Materials",
  "Eco-Friendly Furniture",
  "Energy Efficiency",
  "Water Conservation",
  "Waste Reduction",
  "Natural Materials",
] as const;

export type GreenCategory = (typeof GREEN_CATEGORIES)[number];

export type GreenCard = {
  id: string;
  name: string;
  category: GreenCategory;
  description: string;
  benefits: string[];
  score: number;
  impact: string;
  why: string;
  image: string;
  alt: string;
};

export const GREEN_CARDS: GreenCard[] = [
  {
    id: "reclaimed",
    name: "Reclaimed timber",
    category: "Recycled Materials",
    description: "Boards that already served as a floor, a barn, or a factory wall. Milled again, they skip a new harvest.",
    benefits: ["Keeps sound wood in use", "Character you cannot print onto a new plank"],
    score: 92,
    impact: "Illustrative: a 180 sq ft floor of reclaimed boards can divert on the order of 200 lb of wood from disposal.",
    why: "The tree work already happened. Your purchase asks for salvage and milling, not another stand of timber.",
    image: "images/green/reclaimed.jpg",
    alt: "Dark weathered wood planks with visible grain and nail holes.",
  },
  {
    id: "sofa",
    name: "The sofa you already have",
    category: "Eco-Friendly Furniture",
    description: "A sound frame with tired cushions is still a sofa. New fabric, or a careful secondhand find, beats a new carcass.",
    benefits: ["Avoids the largest object in many room refreshes", "Often the cheapest path that still looks deliberate"],
    score: 88,
    impact: "Illustrative: skipping one new sofa can avoid a few dozen pounds of frame, foam, and packaging.",
    why: "Furniture is bulky to ship and bulky to throw away. Repair and reuse shrink both trips.",
    image: "images/green/furniture.jpg",
    alt: "Caramel leather sectional in a living room with a large houseplant and an arched mirror.",
  },
  {
    id: "daylight",
    name: "Daylight before more lamps",
    category: "Energy Efficiency",
    description: "Sheer curtains, a lighter wall, and a mirror opposite the window stretch the light you already pay the sun for.",
    benefits: ["Cuts daytime lamp hours", "Makes a small room feel larger without moving walls"],
    score: 90,
    impact: "Illustrative: swapping a handful of halogen lamps for LEDs is on the order of 30–40 kWh a year per lamp in this demo.",
    why: "The cleanest kilowatt-hour is the one a brighter wall never asks for. Efficient lamps cover the hours after dusk.",
    image: "images/green/energy.jpg",
    alt: "A glass bulb lying on soil with a small green seedling growing inside it.",
  },
  {
    id: "faucet",
    name: "A faucet that does not rush",
    category: "Water Conservation",
    description: "Aerators and a considered shower head change the feel of the water less than they change the volume.",
    benefits: ["Less hot water to heat", "A change you can make without opening the wall"],
    score: 86,
    impact: "Illustrative: a lower-flow shower head can save several gallons a day in a busy bathroom. This demo does not meter your home.",
    why: "Water and the energy used to heat it move together. A smaller flow is a quiet cut to both.",
    image: "images/green/water.jpg",
    alt: "Close view of a chrome bathroom faucet and handles.",
  },
  {
    id: "sort",
    name: "Sort before the skip",
    category: "Waste Reduction",
    description: "Three piles: keep, recycle, and truly discard. Most renovation waste is mixed because nobody set the piles up first.",
    benefits: ["Reusable trim and hardware stay in the house", "Recyclers can actually take a clean stream"],
    score: 87,
    impact: "Illustrative: careful sorting is where the demo's waste-diversion story starts. Mixed skips hide reusable material.",
    why: "A hauler cannot recycle what arrived glued to everything else. Separation is the whole method.",
    image: "images/green/waste.jpg",
    alt: "A row of yellow, green, blue, and red recycling bins.",
  },
  {
    id: "stone",
    name: "Stone, used in a small dose",
    category: "Natural Materials",
    description: "A hearth, a shower niche, or a short run of stone. Not every wall needs the heaviest material in the catalog.",
    benefits: ["Ages without a reprint", "Right where water or heat would defeat a thin finish"],
    score: 80,
    impact: "Illustrative: limiting stone to a feature area keeps the quarried weight in proportion to the job.",
    why: "Stone is durable and also heavy to move. Using less of it, in the right place, is the sustainable version.",
    image: "images/green/natural.jpg",
    alt: "Smooth river stones in gray, cream, and muted blue.",
  },
  {
    id: "plants",
    name: "Plants that match the light",
    category: "Natural Materials",
    description: "One generous plant in real daylight does more than a shelf of struggling pots. Choose for the window you have.",
    benefits: ["A living texture that does not come in plastic packaging every season", "Softens hard new surfaces"],
    score: 84,
    impact: "Illustrative: this is a design choice, not a carbon offset. The gain is a room that needs fewer decorative replacements.",
    why: "A dead plant is waste. A plant matched to the light stays, and the room stops asking for new objects.",
    image: "images/green/plants.jpg",
    alt: "Sage green living room with large potted plants, a cane sideboard, and a round mirror.",
  },
  {
    id: "durable",
    name: "A shell you can repair",
    category: "Waste Reduction",
    description: "Timber, brick, and plaster that can be patched in place. The greenest renovation is the one you do not have to undo.",
    benefits: ["Local repair instead of full replacement", "Materials that show wear without failing"],
    score: 89,
    impact: "Illustrative: extending a finish by a decade avoids a second round of manufacturing and haul-away.",
    why: "Durability is a waste strategy. If it can be sanded, pointed, or patched, it stays out of the next skip.",
    image: "images/green/durable.jpg",
    alt: "Wooden cottage among trees in soft morning light.",
  },
];

export const GREEN_TIPS = [
  "Choose durable materials you can sand, patch, or refinish.",
  "Reuse existing furniture when the frame is still sound.",
  "Set up reuse, recycle, and trash piles before demolition starts.",
  "Use energy-efficient lighting, and paint the wall a lighter color first.",
  "Prefer low-emission paints, especially in bedrooms and nurseries.",
  "Choose locally sourced materials when the distance is honestly shorter.",
];
