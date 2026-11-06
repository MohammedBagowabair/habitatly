import { useMemo, useState } from "react";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { GREEN_CARDS, GREEN_CATEGORIES, GREEN_TIPS, type GreenCategory } from "../data/green";
import { useProject } from "../context/ProjectContext";
import { usePageTitle } from "../hooks/usePageTitle";
import { ProjectReview } from "../sections/ProjectReview";
import { buildEstimate } from "../utils/estimate";
import { publicUrl } from "../utils/format";

export function GreenPage() {
  usePageTitle("Green Living");
  const { project } = useProject();
  const [category, setCategory] = useState<GreenCategory | "All">("All");
  const [review, setReview] = useState(false);
  const estimate = useMemo(() => buildEstimate(project.materials, project.roomSize), [project.materials, project.roomSize]);
  const cards = GREEN_CARDS.filter((card) => category === "All" || card.category === category);
  const hasMaterials = project.materials.length > 0;

  const metrics = [
    {
      label: "Estimated CO₂ savings",
      value: hasMaterials ? `${Math.round(estimate.co2)} kg` : "—",
      note: "Illustrative kilograms avoided versus the conventional stand-ins in the catalog.",
      percent: hasMaterials ? Math.min(100, Math.round(estimate.co2 / 4)) : 0,
    },
    {
      label: "Waste diverted from landfill",
      value: hasMaterials ? `${Math.round(estimate.waste)} lb` : "—",
      note: "Illustrative weight kept in use by the materials you selected.",
      percent: hasMaterials ? Math.min(100, Math.round(estimate.waste / 5)) : 0,
    },
    {
      label: "Potential energy savings",
      value: hasMaterials ? `${Math.round(estimate.kwh)} kWh/yr` : "—",
      note: "Illustrative yearly electricity, mostly from efficient lamps and insulation.",
      percent: hasMaterials ? Math.min(100, Math.round(estimate.kwh / 3)) : 0,
    },
    {
      label: "Sustainable materials selected",
      value: String(project.materials.length),
      note: "Count of catalog items currently in your project.",
      percent: Math.min(100, project.materials.length * 12),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-4xl font-extrabold tracking-[-0.03em] text-balance sm:text-5xl">Small Choices. A Greener Future.</h1>
      <p className="mt-4 max-w-2xl text-lg leading-7 text-forest">
        Recommendations you can act on in a real room. The dashboard below uses your selected materials when you have them, and every figure is illustrative.
      </p>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
        {(["All", ...GREEN_CATEGORIES] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${category === item ? "bg-forest text-paper" : "bg-paper text-forest ring-1 ring-forest/15"}`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {cards.map((card) => (
          <article key={card.id} className="overflow-hidden rounded-[1.75rem] border border-forest/10 bg-paper">
            <img src={publicUrl(card.image)} alt={card.alt} className="aspect-[16/10] w-full object-cover" />
            <div className="p-5">
              <p className="text-xs font-bold text-forest uppercase">{card.category}</p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-[-0.03em]">{card.name}</h2>
              <p className="mt-2 text-sm leading-6 text-forest">{card.description}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-forest">
                {card.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm font-semibold">Sustainability {card.score}/100</p>
              <p className="mt-2 text-sm leading-6">{card.impact}</p>
              <p className="mt-2 text-sm leading-6 text-forest">
                <span className="font-semibold text-ink">Why it is a better choice. </span>
                {card.why}
              </p>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="text-3xl font-extrabold tracking-[-0.03em]">Your environmental impact</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-forest">
          Illustrative metrics, not a measured audit. {hasMaterials ? "They move with the materials in your project." : "Add materials and these figures personalize. Until then they stay blank rather than invent a result."}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-3xl border border-forest/10 bg-paper p-5">
              <p className="text-sm font-semibold text-forest">{metric.label}</p>
              <p className="mt-2 text-4xl font-extrabold tracking-[-0.04em] text-forest">{metric.value}</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-lime/80">
                <div className="h-full rounded-full bg-forest" style={{ width: `${metric.percent}%` }} />
              </div>
              <p className="mt-3 text-sm leading-5 text-forest">{metric.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-3xl bg-ivory p-5">
          <p className="text-sm font-semibold">How the three big numbers relate</p>
          <div className="mt-4 space-y-3">
            {[
              { label: "CO₂", value: estimate.co2, color: "#244C3B" },
              { label: "Waste", value: estimate.waste, color: "#91A98C" },
              { label: "Energy", value: estimate.kwh, color: "#252D29" },
            ].map((bar) => {
              const max = Math.max(estimate.co2, estimate.waste, estimate.kwh, 1);
              return (
                <div key={bar.label} className="grid grid-cols-[5rem_1fr] items-center gap-3 text-sm">
                  <span className="font-semibold">{bar.label}</span>
                  <div className="h-3 overflow-hidden rounded-full bg-paper">
                    <div className="h-full rounded-full" style={{ width: `${hasMaterials ? (bar.value / max) * 100 : 0}%`, background: bar.color }} />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-forest">Bars compare your illustrative CO₂ (kg), waste (lb), and energy (kWh/year) to each other. Different units, same picture of where the project leans.</p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-extrabold tracking-[-0.03em]">Green tips</h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {GREEN_TIPS.map((tip) => (
            <li key={tip} className="rounded-2xl bg-paper px-4 py-4 text-sm leading-6 ring-1 ring-forest/10">
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <section className="relative mt-16 overflow-hidden rounded-[2rem]">
        <img src={publicUrl("images/green/close.jpg")} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-forest/78" />
        <div className="relative max-w-2xl px-6 py-16 text-paper sm:px-10 sm:py-20">
          <h2 className="text-4xl font-extrabold tracking-[-0.03em] text-balance">Build a Home That Feels Good. And Does Good.</h2>
          <p className="mt-4 text-sm leading-6 text-lime">A summary of what you chose in this browser. It is not saved to a server.</p>
          <div className="mt-6">
            <Button variant="lime" onClick={() => setReview(true)}>
              Review My Renovation Project
            </Button>
          </div>
        </div>
      </section>

      {review ? (
        <Modal title="Your renovation project" onClose={() => setReview(false)} wide>
          <ProjectReview />
          <div className="mt-6 flex flex-wrap gap-2">
            <Button to="/project" variant="ghost">
              Edit project
            </Button>
            <Button to="/diy">Open the DIY guide</Button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
