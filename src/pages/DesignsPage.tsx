import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BeforeAfter } from "../components/BeforeAfter";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { DESIGNS, designById, type DesignConcept } from "../data/designs";
import { SAMPLES, budgetById } from "../data/options";
import { useProject } from "../context/ProjectContext";
import { usePageTitle } from "../hooks/usePageTitle";
import { money, publicUrl } from "../utils/format";

export function DesignsPage() {
  usePageTitle("Design Studio");
  const { project, selectDesign } = useProject();
  const [params] = useSearchParams();
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const concept = params.get("concept");
    if (concept && DESIGNS.some((design) => design.id === concept)) setOpenId(concept);
  }, [params]);

  const open = designById(openId);
  const before = project.imageDataUrl ?? publicUrl(SAMPLES[0].image);
  const beforeCaption = project.imageDataUrl
    ? "Your room"
    : "Sample current space — add your photo for a personal comparison.";
  const budget = budgetById(project.budgetId);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">Imagine What's Possible.</h1>
      <p className="mt-4 max-w-2xl text-lg leading-7 text-forest">Explore creative ways to transform your space.</p>
      {!project.imageDataUrl ? (
        <p className="mt-4 max-w-2xl text-sm leading-6 text-forest">
          You can browse without a photo. The before side of each comparison uses a sample living room until you add your own.
        </p>
      ) : null}

      <div className="mt-10 grid gap-6">
        {DESIGNS.map((design) => {
          const selected = project.selectedDesignId === design.id;
          const aboveBudget = budget ? design.estimateLow > budget.high : false;
          const styleMatch = design.styles.some((style) => project.styles.includes(style));
          return (
            <article key={design.id} className={`overflow-hidden rounded-[1.75rem] border bg-paper ${selected ? "border-forest ring-2 ring-lime" : "border-forest/10"}`}>
              <div className="grid lg:grid-cols-[1.25fr_0.9fr]">
                <div className="relative min-h-72">
                  <img src={publicUrl(design.image)} alt={design.alt} className="h-full min-h-72 w-full object-cover" />
                  {selected ? (
                    <span className="absolute top-4 left-4 rounded-full bg-lime px-3 py-1 text-xs font-bold text-forest">Selected</span>
                  ) : null}
                </div>
                <div className="flex flex-col p-5 sm:p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-extrabold tracking-[-0.03em]">{design.name}</h2>
                    {styleMatch ? <span className="rounded-full bg-lime px-2.5 py-1 text-xs font-bold text-forest">Matches a style you chose</span> : null}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-forest">{design.summary}</p>
                  <div className="mt-4 flex gap-2" aria-label={`${design.name} color palette`}>
                    {design.palette.map((swatch) => (
                      <span key={swatch.hex} className="h-7 w-7 rounded-full ring-1 ring-forest/15" style={{ background: swatch.hex }} title={swatch.name} />
                    ))}
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-forest">Sustainability</dt>
                      <dd className="font-bold tabular-nums">{design.sustainability}/100</dd>
                    </div>
                    <div>
                      <dt className="text-forest">Estimated budget</dt>
                      <dd className="font-bold">
                        {money(design.estimateLow)}–{money(design.estimateHigh)}
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-1 text-xs text-forest">Estimate only, not a quote.</p>
                  {aboveBudget ? (
                    <p className="mt-2 text-xs text-forest">This estimate sits above the budget band you chose.</p>
                  ) : null}
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {design.traits.map((trait) => (
                      <li key={trait} className="rounded-full bg-ivory px-3 py-1 text-xs font-semibold text-forest">
                        {trait}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    <Button variant="ghost" onClick={() => setOpenId(design.id)}>
                      View Details
                    </Button>
                    <Button onClick={() => selectDesign(design.id, design.name)}>
                      {selected ? "Selected" : "Select This Design"}
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-10">
        <Button to="/materials">Continue to Materials</Button>
      </div>

      {open ? (
        <DesignDialog
          design={open}
          before={before}
          beforeCaption={beforeCaption}
          selected={project.selectedDesignId === open.id}
          onClose={() => setOpenId(null)}
          onSelect={() => selectDesign(open.id, open.name)}
        />
      ) : null}
    </div>
  );
}

function DesignDialog({
  design,
  before,
  beforeCaption,
  selected,
  onClose,
  onSelect,
}: {
  design: DesignConcept;
  before: string;
  beforeCaption: string;
  selected: boolean;
  onClose: () => void;
  onSelect: () => void;
}) {
  return (
    <Modal title={design.name} onClose={onClose} wide>
      <p className="text-sm text-forest">{beforeCaption}</p>
      <div className="mt-3">
        <BeforeAfter before={before} after={publicUrl(design.image)} beforeLabel="Before" afterLabel="After" />
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section>
          <h3 className="font-bold">Proposed color palette</h3>
          <ul className="mt-3 space-y-2">
            {design.palette.map((swatch) => (
              <li key={swatch.hex} className="flex items-center gap-3 text-sm">
                <span className="h-6 w-6 rounded-full ring-1 ring-forest/20" style={{ background: swatch.hex }} />
                <span className="font-semibold">{swatch.name}</span>
                <span className="text-forest">{swatch.hex}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="font-bold">Estimated renovation cost</h3>
          <p className="mt-2 text-2xl font-extrabold text-forest">
            {money(design.estimateLow)}–{money(design.estimateHigh)}
          </p>
          <p className="text-xs text-forest">Estimate only. Sustainability score {design.sustainability}/100.</p>
          <h3 className="mt-4 font-bold">Sustainability benefits</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-forest">
            {design.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="font-bold">Furniture recommendations</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-forest">
            {design.furniture.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="font-bold">Suggested materials</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-forest">
            {design.materials.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
      <section className="mt-6">
        <h3 className="font-bold">Space optimization</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-forest">
          {design.space.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <div className="mt-6">
        <Button
          onClick={() => {
            onSelect();
          }}
        >
          {selected ? "Keep this design" : "Select This Design"}
        </Button>
      </div>
    </Modal>
  );
}
