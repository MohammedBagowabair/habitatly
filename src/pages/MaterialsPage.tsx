import { Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { BudgetChart } from "../components/BudgetChart";
import { Button } from "../components/Button";
import { CATEGORIES, MATERIALS, materialById } from "../data/materials";
import { useProject } from "../context/ProjectContext";
import { usePageTitle } from "../hooks/usePageTitle";
import { buildEstimate } from "../utils/estimate";
import { money, publicUrl } from "../utils/format";

export function MaterialsPage() {
  usePageTitle("Materials & Budget");
  const { project, addMaterial, removeMaterial, setQuantity, useSuggestedQuantity, setRoomSize } = useProject();
  const [category, setCategory] = useState<(typeof CATEGORIES)[number] | "All">("All");
  const [compare, setCompare] = useState(false);
  const estimate = useMemo(
    () => buildEstimate(project.materials, project.roomSize),
    [project.materials, project.roomSize],
  );
  const visible = MATERIALS.filter((material) => category === "All" || material.category === category);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-4xl font-extrabold tracking-[-0.03em] text-balance sm:text-5xl">Choose Materials That Make a Difference.</h1>
      <p className="mt-4 max-w-2xl text-lg leading-7 text-forest">
        Prices are estimates for this demo. Quantities for flooring, paint, insulation, and feature surfaces follow the room size until you set them yourself.
      </p>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
        {(["All", ...CATEGORIES] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${category === item ? "bg-forest text-paper" : "bg-paper text-forest ring-1 ring-forest/15"}`}
            aria-pressed={category === item}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="grid gap-4 sm:grid-cols-2">
          {visible.map((material) => {
            const selected = project.materials.some((item) => item.id === material.id);
            return (
              <article key={material.id} className={`overflow-hidden rounded-3xl border bg-paper ${selected ? "border-forest" : "border-forest/10"}`}>
                <img src={publicUrl(material.image)} alt={material.alt} className="aspect-[4/3] w-full object-cover" />
                <div className="p-4">
                  <p className="text-xs font-bold tracking-wide text-forest uppercase">{material.category}</p>
                  <h2 className="mt-1 text-lg font-bold">{material.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-forest">{material.description}</p>
                  <p className="mt-3 text-sm font-semibold">
                    {money(material.unitPrice)} <span className="font-normal text-forest">/ {material.unit} · estimate</span>
                  </p>
                  <p className="mt-1 text-sm text-forest">Sustainability {material.score}/100</p>
                  <ul className="mt-2 list-disc pl-4 text-sm text-forest">
                    {material.benefits.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    {selected ? (
                      <Button variant="ghost" onClick={() => removeMaterial(material.id)}>
                        Added · Remove
                      </Button>
                    ) : (
                      <Button onClick={() => addMaterial(material.id)}>Add to Project</Button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="rounded-[1.75rem] border border-forest/10 bg-paper p-5 lg:sticky lg:top-24">
          <h2 className="text-xl font-extrabold tracking-[-0.03em]">Cost estimator</h2>
          <label className="mt-4 block text-sm font-semibold">
            Estimated room size
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                min={60}
                max={600}
                step={10}
                value={project.roomSize}
                onChange={(event) => setRoomSize(Number(event.target.value))}
                aria-valuetext={`${project.roomSize} square feet`}
                className="w-full"
              />
              <input
                type="number"
                min={40}
                max={800}
                value={project.roomSize}
                onChange={(event) => setRoomSize(Number(event.target.value) || 40)}
                className="w-20 rounded-xl border border-forest/20 bg-ivory px-2 py-1 tabular-nums"
                aria-label="Room size in square feet"
              />
            </div>
            <span className="mt-1 block font-normal text-forest">{project.roomSize} sq ft</span>
          </label>

          {estimate.lines.length === 0 ? (
            <p className="mt-6 rounded-2xl bg-ivory px-4 py-5 text-sm leading-6 text-forest">
              Your estimate is waiting for a material. Add flooring, paint, or a lamp and the totals update here.
            </p>
          ) : (
            <ul className="mt-5 space-y-4">
              {estimate.lines.map((line) => {
                const selection = project.materials.find((item) => item.id === line.id);
                const catalog = materialById(line.id);
                return (
                  <li key={line.id} className="border-b border-forest/10 pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold">{line.name}</p>
                      <button type="button" className="text-xs font-semibold text-forest underline" onClick={() => removeMaterial(line.id)}>
                        Remove
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center rounded-full border border-forest/15">
                        <button
                          type="button"
                          className="grid h-8 w-8 place-items-center"
                          aria-label={`Decrease ${line.name}`}
                          onClick={() => setQuantity(line.id, line.quantity - 1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="min-w-10 text-center text-sm tabular-nums">{line.quantity}</span>
                        <button
                          type="button"
                          className="grid h-8 w-8 place-items-center"
                          aria-label={`Increase ${line.name}`}
                          onClick={() => setQuantity(line.id, line.quantity + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="text-sm font-semibold tabular-nums">{money(line.lineTotal)}</p>
                    </div>
                    <p className="mt-1 text-xs text-forest">
                      {line.quantity} {line.unit}
                      {selection?.custom ? " · custom quantity" : catalog && catalog.scale !== "each" ? " · follows room size" : ""}
                    </p>
                    {selection?.custom && catalog && catalog.scale !== "each" ? (
                      <button type="button" className="mt-1 text-xs font-semibold text-forest underline" onClick={() => useSuggestedQuantity(line.id)}>
                        Use room size
                      </button>
                    ) : null}
                    {compare ? (
                      <p className="mt-1 text-xs text-forest">
                        Conventional ({catalog?.conventionalName}): {money(line.conventionalTotal)}
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          )}

          <label className="mt-4 flex items-start gap-2 text-sm text-forest">
            <input type="checkbox" checked={compare} onChange={(event) => setCompare(event.target.checked)} className="mt-1" />
            Compare with a conventional alternative
          </label>

          <dl className="mt-4 space-y-2 text-sm">
            <Total label="Materials subtotal" value={estimate.materials} />
            <Total label="Estimated labor" value={estimate.labor} />
            <Total label="Additional expenses" value={estimate.extras} />
            <div className="flex justify-between border-t border-forest/10 pt-2 text-base font-extrabold">
              <dt>Estimated total</dt>
              <dd className="tabular-nums">{money(estimate.total)}</dd>
            </div>
            <div className="flex justify-between text-forest">
              <dt>Potential savings</dt>
              <dd className="font-semibold tabular-nums">{money(estimate.potentialSavings)}</dd>
            </div>
          </dl>
          {compare && estimate.lines.length > 0 ? (
            <p className="mt-3 text-xs leading-5 text-forest">
              Sustainable materials {money(estimate.materials)}. Conventional alternative {money(estimate.conventional)}. Upfront difference{" "}
              {money(estimate.upfrontDifference)} (positive means the sustainable list costs less). Illustrative yearly operating savings{" "}
              {money(estimate.operatingSavings)}. Labor and extras are estimated the same either way.
            </p>
          ) : (
            <p className="mt-3 text-xs leading-5 text-forest">
              Potential savings combine any lower sticker price versus the conventional stand-in with illustrative yearly energy savings. Not a quote.
            </p>
          )}

          <div className="mt-5">
            <BudgetChart
              parts={[
                { label: "Materials", value: estimate.materials, color: "#244C3B" },
                { label: "Labor", value: estimate.labor, color: "#91A98C" },
                { label: "Extras", value: estimate.extras, color: "#C7DB9A" },
              ]}
            />
          </div>
          <div className="mt-6">
            <Button to="/diy">Create My Renovation Plan</Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Total({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-forest">{label}</dt>
      <dd className="font-semibold tabular-nums">{money(value)}</dd>
    </div>
  );
}
