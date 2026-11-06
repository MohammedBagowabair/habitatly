import { ImagePlus, Trash2 } from "lucide-react";
import { useState, type DragEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { BUDGETS, GOALS, ROOMS, SAMPLES, STYLES } from "../data/options";
import { useProject } from "../context/ProjectContext";
import { usePageTitle } from "../hooks/usePageTitle";
import { publicUrl } from "../utils/format";

const STEP_TITLES = ["Upload a photo", "Choose your room", "Set your budget", "Preferred style", "Renovation goals"];

export function ProjectPage() {
  usePageTitle("Start Your Project");
  const navigate = useNavigate();
  const {
    project,
    notify,
    setImageFromFile,
    setImageFromUrl,
    clearImage,
    setRoom,
    setBudget,
    toggleStyle,
    toggleGoal,
    setStep,
  } = useProject();
  const [dragOver, setDragOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const step = project.step;

  const takeFile = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    try {
      await setImageFromFile(file);
    } catch {
      notify("That photo could not be read. Try a different JPG, PNG, or WEBP.");
    } finally {
      setBusy(false);
    }
  };

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragOver(false);
    void takeFile(event.dataTransfer.files?.[0]);
  };

  const chooseSample = async (sampleId: string) => {
    const sample = SAMPLES.find((item) => item.id === sampleId);
    if (!sample) return;
    setBusy(true);
    try {
      await setImageFromUrl(publicUrl(sample.image), `${sample.name} sample`);
      if (!project.roomId) setRoom(sample.roomId);
    } catch {
      notify("The sample photo could not be saved. Try another one.");
    } finally {
      setBusy(false);
    }
  };

  const goNext = () => {
    if (step === 0 && !project.imageDataUrl) {
      notify("Add a photo or choose a sample room before continuing.");
      return;
    }
    if (step === 1 && !project.roomId) {
      notify("Choose the room you want to renovate.");
      return;
    }
    setStep(step + 1);
  };

  const analyze = () => {
    if (!project.imageDataUrl || !project.roomId) {
      notify("Add a photo of your space and choose a room before analysis.");
      if (!project.imageDataUrl) setStep(0);
      else setStep(1);
      return;
    }
    navigate("/analysis");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-4xl font-extrabold tracking-[-0.03em] text-balance sm:text-5xl">Let's Get to Know Your Space.</h1>
      <p className="mt-4 max-w-2xl text-lg leading-7 text-forest">Every great transformation starts with understanding your home.</p>

      <div className="mt-8">
        <p className="text-sm font-semibold text-forest">
          Step {step + 1} of {STEP_TITLES.length} · {STEP_TITLES[step]}
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-lime/80">
          <div className="h-full rounded-full bg-forest transition-[width]" style={{ width: `${((step + 1) / STEP_TITLES.length) * 100}%` }} />
        </div>
        <div className="mt-3 hidden gap-2 sm:grid sm:grid-cols-5">
          {STEP_TITLES.map((title, index) => (
            <button
              key={title}
              type="button"
              onClick={() => setStep(index)}
              className={`rounded-full px-2 py-1 text-xs font-semibold ${index === step ? "bg-forest text-paper" : "text-forest hover:bg-lime/60"}`}
            >
              {title}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-[1.75rem] border border-forest/10 bg-paper p-4 sm:p-8">
        {step === 0 ? (
          <div>
            <label
              onDragOver={(event) => {
                event.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              className={`grid cursor-pointer place-items-center rounded-3xl border-2 border-dashed px-6 py-12 text-center ${dragOver ? "border-forest bg-lime/40" : "border-forest/25 bg-ivory"}`}
            >
              <ImagePlus className="text-forest" />
              <span className="mt-3 block text-lg font-bold">Drop a room photo here</span>
              <span className="mt-1 block max-w-md text-sm leading-6 text-forest">
                JPG, PNG, or WEBP. Drag a file in, or click to upload from your device. The photo stays in this browser.
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                className="sr-only"
                onChange={(event) => {
                  void takeFile(event.target.files?.[0]);
                  event.target.value = "";
                }}
              />
            </label>
            {project.imageDataUrl ? (
              <div className="mt-5">
                <img src={project.imageDataUrl} alt={project.imageLabel ?? "Selected room"} className="max-h-80 w-full rounded-2xl object-cover" />
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-forest">{busy ? "Preparing your photo…" : project.imageLabel}</p>
                  <Button variant="ghost" onClick={clearImage}>
                    <Trash2 size={15} />
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm text-forest">{busy ? "Preparing your photo…" : "Or start from a sample room. You can replace it later."}</p>
            )}
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
              {SAMPLES.map((sample) => {
                const selected = project.imageLabel === `${sample.name} sample`;
                return (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => void chooseSample(sample.id)}
                    className={`overflow-hidden rounded-2xl border text-left ${selected ? "border-forest ring-2 ring-lime" : "border-forest/10"}`}
                    aria-pressed={selected}
                  >
                    <img src={publicUrl(sample.image)} alt="" className="aspect-[4/3] w-full object-cover" />
                    <span className="block px-3 py-2 text-sm font-semibold">{sample.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ROOMS.map((room) => {
              const selected = project.roomId === room.id;
              return (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => setRoom(room.id)}
                  aria-pressed={selected}
                  className={`overflow-hidden rounded-2xl border text-left ${selected ? "border-forest ring-2 ring-lime" : "border-forest/10"}`}
                >
                  <img src={publicUrl(room.image)} alt="" className="aspect-[16/10] w-full object-cover" />
                  <span className="block px-4 pt-3 font-bold">{room.name}</span>
                  <span className="block px-4 pt-1 pb-4 text-sm text-forest">{room.blurb}</span>
                </button>
              );
            })}
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-3">
            {BUDGETS.map((budget) => {
              const selected = project.budgetId === budget.id;
              return (
                <button
                  key={budget.id}
                  type="button"
                  onClick={() => setBudget(budget.id)}
                  aria-pressed={selected}
                  className={`rounded-2xl border px-5 py-4 text-left ${selected ? "border-forest bg-lime/50" : "border-forest/10 hover:border-forest/30"}`}
                >
                  <span className="block font-bold">{budget.label}</span>
                  <span className="mt-1 block text-sm text-forest">{budget.detail}</span>
                </button>
              );
            })}
          </div>
        ) : null}

        {step === 3 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {STYLES.map((style) => {
              const selected = project.styles.includes(style.id);
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => toggleStyle(style.id)}
                  aria-pressed={selected}
                  className={`rounded-2xl border px-5 py-4 text-left ${selected ? "border-forest bg-lime/50" : "border-forest/10"}`}
                >
                  <span className="block font-bold">{style.name}</span>
                  <span className="mt-1 block text-sm text-forest">{style.blurb}</span>
                </button>
              );
            })}
          </div>
        ) : null}

        {step === 4 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {GOALS.map((goal) => {
              const selected = project.goals.includes(goal.id);
              return (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => toggleGoal(goal.id)}
                  aria-pressed={selected}
                  className={`rounded-2xl border px-5 py-4 text-left font-semibold ${selected ? "border-forest bg-lime/50" : "border-forest/10"}`}
                >
                  {goal.name}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex flex-wrap justify-between gap-3">
        <Button variant="ghost" onClick={() => setStep(step - 1)} disabled={step === 0}>
          Back
        </Button>
        {step < 4 ? (
          <Button onClick={goNext}>Continue</Button>
        ) : (
          <Button onClick={analyze}>Analyze My Space</Button>
        )}
      </div>
    </div>
  );
}
