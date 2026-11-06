import { budgetById, roomById } from "../data/options";
import { designById } from "../data/designs";
import { DIY_STEPS } from "../data/diy";
import { materialById } from "../data/materials";
import { useProject } from "../context/ProjectContext";
import { buildEstimate } from "../utils/estimate";
import { money } from "../utils/format";

export function ProjectReview() {
  const { project } = useProject();
  const room = roomById(project.roomId);
  const design = designById(project.selectedDesignId);
  const budget = budgetById(project.budgetId);
  const estimate = buildEstimate(project.materials, project.roomSize);
  const done = DIY_STEPS.filter((step) => project.diy[step.id]).length;
  const styles = project.styles.length ? project.styles.join(", ").replaceAll("-", " ") : "Not chosen";
  const goals = project.goals.length ? project.goals.join(", ").replaceAll("-", " ") : "Not chosen";

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div>
        {project.imageDataUrl ? (
          <img
            src={project.imageDataUrl}
            alt={project.imageLabel ?? "Your room"}
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
        ) : (
          <div className="grid aspect-[4/3] place-items-center rounded-2xl border border-dashed border-forest/25 bg-ivory px-6 text-center text-sm text-forest">
            No photo yet. Start a project to attach a room image.
          </div>
        )}
        <p className="mt-2 text-xs text-forest">Saved in this browser only. Nothing is uploaded to a server.</p>
      </div>
      <dl className="grid gap-3 text-sm">
        <Row label="Room" value={room?.name ?? "Not chosen"} />
        <Row label="Budget band" value={budget?.label ?? "Not chosen"} />
        <Row label="Styles" value={styles} />
        <Row label="Goals" value={goals} />
        <Row label="Selected design" value={design?.name ?? "Not selected"} />
        <Row
          label="Estimated total"
          value={estimate.total > 0 ? `${money(estimate.total)} estimate` : "Add materials to calculate"}
        />
        <Row label="DIY progress" value={`${done} of ${DIY_STEPS.length} steps`} />
        <div>
          <dt className="font-semibold text-ink">Materials</dt>
          {project.materials.length === 0 ? (
            <dd className="text-forest">None saved yet.</dd>
          ) : (
            <dd>
              <ul className="mt-1 space-y-1">
                {project.materials.map((item) => {
                  const material = materialById(item.id);
                  return (
                    <li key={item.id} className="flex justify-between gap-3 text-forest">
                      <span>{material?.name ?? item.id}</span>
                      <span className="tabular-nums">
                        {item.quantity} {material?.unit}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </dd>
          )}
        </div>
      </dl>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-forest/10 pb-2">
      <dt className="font-semibold text-ink">{label}</dt>
      <dd className="text-right text-forest capitalize">{value}</dd>
    </div>
  );
}
