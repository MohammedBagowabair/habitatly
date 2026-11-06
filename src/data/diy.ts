export type DiyStep = {
  id: string;
  title: string;
  summary: string;
  image: string;
  alt: string;
  duration: string;
  tools: string[];
  materials: string[];
};

export const DIY_STEPS: DiyStep[] = [
  {
    id: "plan",
    title: "Plan & Prepare",
    summary: "Measure your room, prepare the renovation area, and create a materials checklist.",
    image: "images/diy/plan.jpg",
    alt: "Printed floor plan on a table with glasses and a pen.",
    duration: "Half a day",
    tools: ["Tape measure", "Notebook", "Pencil", "Painter's tape"],
    materials: ["Your materials list from the estimator"],
  },
  {
    id: "removal",
    title: "Responsible Removal",
    summary: "Remove old materials carefully, separate anything reusable, and identify what can be recycled.",
    image: "images/diy/removal.jpg",
    alt: "Person sealing a cardboard box with packing tape in an empty room.",
    duration: "1 day",
    tools: ["Pry bar", "Gloves", "Boxes", "Labels"],
    materials: ["Drop cloths", "Separate bags for reuse, recycle, and trash"],
  },
  {
    id: "surfaces",
    title: "Prepare Surfaces",
    summary: "Clean and repair surfaces so new flooring and paint have a sound base.",
    image: "images/diy/surfaces.jpg",
    alt: "Gloved hand smoothing plaster with a trowel.",
    duration: "1–2 days",
    tools: ["Vacuum", "Sanding block", "Filling knife", "Level"],
    materials: ["Patching compound", "Cleaner appropriate to the surface"],
  },
  {
    id: "flooring",
    title: "Install Sustainable Flooring",
    summary: "Prepare the base, install the flooring you selected, and finish the edges.",
    image: "images/diy/flooring.jpg",
    alt: "Person drilling into a wood board during a flooring project.",
    duration: "2–3 days",
    tools: ["Saw", "Spacers", "Tapping block", "Knee pads"],
    materials: ["Selected flooring", "Underlayment", "Transition strips"],
  },
  {
    id: "painting",
    title: "Eco-Friendly Painting",
    summary: "Choose a low-VOC paint, prepare the walls, and apply an even coat.",
    image: "images/diy/painting.jpg",
    alt: "Person rolling paint onto an interior wall from a ladder.",
    duration: "2 days",
    tools: ["Roller", "Brush", "Tray", "Edging tape"],
    materials: ["Low-VOC paint", "Primer if the wall needs it"],
  },
  {
    id: "lighting",
    title: "Lighting & Energy Efficiency",
    summary: "Install LED lighting, improve how daylight enters, and review what still draws power.",
    image: "images/diy/lighting.jpg",
    alt: "Cluster of warm glass pendant bulbs hanging in a bright interior.",
    duration: "1 day",
    tools: ["Screwdriver", "Voltage tester", "Ladder"],
    materials: ["LED lamps or fixtures", "Sheer window covering if glare is the issue"],
  },
  {
    id: "furniture",
    title: "Furniture & Decoration",
    summary: "Arrange furniture, add sustainable decorations, and bring in a few natural elements.",
    image: "images/diy/furniture.jpg",
    alt: "Open living room with a caramel leather sofa, houseplants, and a kitchen beyond.",
    duration: "1 day",
    tools: ["Felt pads", "Stud finder", "Picture hooks"],
    materials: ["Selected furniture", "Rug", "Plants that match the light you have"],
  },
  {
    id: "review",
    title: "Final Review",
    summary: "Inspect the work, note the sustainability changes you actually made, and close the project.",
    image: "images/diy/review.jpg",
    alt: "Finished corner with a yellow chair, wood floor, and a slim floor lamp.",
    duration: "Half a day",
    tools: ["Checklist", "Touch-up brush", "Camera"],
    materials: ["Leftover paint for touch-ups", "Spare flooring offcuts, labeled"],
  },
];
