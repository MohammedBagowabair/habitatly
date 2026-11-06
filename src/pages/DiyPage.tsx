import { useMemo } from "react";
import { Button } from "../components/Button";
import { DIY_STEPS } from "../data/diy";
import { designById } from "../data/designs";
import { materialById } from "../data/materials";
import { budgetById, roomById } from "../data/options";
import { useProject } from "../context/ProjectContext";
import { usePageTitle } from "../hooks/usePageTitle";
import { buildEstimate } from "../utils/estimate";
import { money, publicUrl } from "../utils/format";

export function DiyPage() {
  usePageTitle("DIY Guide");
  const { project, toggleDiy } = useProject();
  const room = roomById(project.roomId);
  const design = designById(project.selectedDesignId);
  const budget = budgetById(project.budgetId);
  const estimate = useMemo(() => buildEstimate(project.materials, project.roomSize), [project.materials, project.roomSize]);
  const done = DIY_STEPS.filter((step) => project.diy[step.id]).length;
  const progress = Math.round((done / DIY_STEPS.length) * 100);
  const projectName = room && design ? `${room.name} · ${design.name}` : room ? room.name : design ? design.name : "Your renovation";
  const duration =
    !budget || budget.id === "under-1000"
      ? "1 weekend"
      : budget.id === "1000-3000"
        ? "1–2 weeks"
        : budget.id === "3000-5000"
          ? "2–3 weeks"
          : budget.id === "5000-10000"
            ? "3–5 weeks"
            : "5–8 weeks";
  const difficulty = !budget || budget.id === "under-1000" ? "Beginner" : budget.id === "above-10000" || budget.id === "5000-10000" ? "Advanced" : "Intermediate";
  const budgetLabel =
    estimate.total > 0
      ? `${money(estimate.total)} from your materials estimate`
      : design
        ? `${money(design.estimateLow)}–${money(design.estimateHigh)} concept estimate`
        : (budget?.label ?? "Set a budget in your project");

  const tools = [...new Set(DIY_STEPS.flatMap((step) => step.tools))];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">Make Your Vision a Reality.</h1>
      <p className="mt-4 max-w-2xl text-lg leading-7 text-forest">Follow a simple, practical roadmap to bring your renovation project to life.</p>

      {!project.roomId && !project.selectedDesignId ? (
        <p className="mt-4 max-w-2xl text-sm leading-6 text-forest">
          This plan works without a finished project. Naming a room and a design makes the title specific. Start from My Project when you are ready.
        </p>
      ) : null}

      <section className="mt-8 rounded-[1.75rem] bg-forest p-6 text-paper sm:p-8">
        <p className="text-sm font-semibold text-lime">Project overview</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.03em]">{projectName}</h2>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Overview label="Selected room" value={room?.name ?? "Not chosen"} />
          <Overview label="Selected design" value={design?.name ?? "Not chosen"} />
          <Overview label="Estimated budget" value={budgetLabel} />
          <Overview label="Estimated duration" value={duration} />
          <Overview label="Difficulty" value={difficulty} />
          <Overview label="Completion" value={`${done} of ${DIY_STEPS.length} steps · ${progress}%`} />
        </dl>
        <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/20" role="meter" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Renovation progress">
          <div className="h-full rounded-full bg-lime" style={{ width: `${progress}%` }} />
        </div>
      </section>

      <ol className="mt-8 space-y-5">
        {DIY_STEPS.map((step, index) => {
          const checked = Boolean(project.diy[step.id]);
          return (
            <li key={step.id} className="overflow-hidden rounded-[1.75rem] border border-forest/10 bg-paper">
              <div className="grid md:grid-cols-[16rem_minmax(0,1fr)]">
                <img src={publicUrl(step.image)} alt={step.alt} className="h-52 w-full object-cover md:h-full" />
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-forest">Step {index + 1}</p>
                      <h3 className="text-2xl font-extrabold tracking-[-0.03em]">{step.title}</h3>
                    </div>
                    <label className="inline-flex items-center gap-2 text-sm font-semibold text-forest">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleDiy(step.id, step.title)}
                        className="h-5 w-5 accent-forest"
                      />
                      {checked ? "Done" : "Mark done"}
                    </label>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-forest">{step.summary}</p>
                  <p className="mt-3 text-sm font-semibold">About {step.duration}</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-bold text-forest uppercase">Tools</p>
                      <p className="mt-1 text-sm">{step.tools.join(", ")}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-forest uppercase">Materials</p>
                      <p className="mt-1 text-sm">{step.materials.join(", ")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <section className="mt-10 grid gap-6 rounded-[1.75rem] border border-forest/10 bg-ivory p-6 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-extrabold tracking-[-0.03em]">Materials checklist</h2>
          {project.materials.length === 0 ? (
            <p className="mt-3 text-sm leading-6 text-forest">
              No materials saved yet. Add them in the estimator and they will list here with quantities.
            </p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {project.materials.map((item) => {
                const material = materialById(item.id);
                return (
                  <li key={item.id} className="flex justify-between gap-3 border-b border-forest/10 pb-2">
                    <span>{material?.name ?? item.id}</span>
                    <span className="tabular-nums text-forest">
                      {item.quantity} {material?.unit}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
          <div className="mt-4">
            <Button to="/materials" variant="ghost">
              Edit materials
            </Button>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold tracking-[-0.03em]">Tools to gather</h2>
          <ul className="mt-3 columns-1 gap-6 text-sm text-forest sm:columns-2">
            {tools.map((tool) => (
              <li key={tool} className="mb-1">
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mt-10">
        <Button to="/green-living">See the green living picture</Button>
      </div>
    </div>
  );
}

function Overview({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold text-lime">{label}</dt>
      <dd className="mt-1 text-sm font-semibold">{value}</dd>
    </div>
  );
}
