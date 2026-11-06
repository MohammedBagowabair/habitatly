import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { ScoreBar } from "../components/ScoreBar";
import { GOALS, SAMPLES, STYLES, roomById } from "../data/options";
import { useProject } from "../context/ProjectContext";
import { usePageTitle } from "../hooks/usePageTitle";
import { assessmentCopy, analysisScores, orderedOpportunities, recommendationsFor } from "../utils/analysis";
import { publicUrl } from "../utils/format";

const SCAN_LINES = ["Mapping the room", "Reading daylight", "Noting what the photo suggests", "Matching your goals"];

export function AnalysisPage() {
  usePageTitle("Smart Space Analysis");
  const { project, markAnalyzed, setImageFromUrl, setRoom, notify } = useProject();
  const [phase, setPhase] = useState<"scan" | "results">(project.analyzed || !project.imageDataUrl ? "results" : "scan");
  const [line, setLine] = useState(0);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (project.analyzed) setPhase("results");
    else if (project.imageDataUrl) setPhase("scan");
  }, [project.analyzed, project.imageDataUrl]);

  useEffect(() => {
    if (phase !== "scan") return;
    const stepTimer = window.setInterval(() => {
      setLine((current) => (current + 1) % SCAN_LINES.length);
    }, 600);
    const doneTimer = window.setTimeout(() => {
      markAnalyzed();
      setPhase("results");
    }, 2400);
    return () => {
      window.clearInterval(stepTimer);
      window.clearTimeout(doneTimer);
    };
  }, [phase, markAnalyzed]);

  const room = roomById(project.roomId);
  const scores = analysisScores(project);
  const opportunities = orderedOpportunities(project.goals);
  const recommendations = recommendationsFor(project.goals);
  const rows = assessmentCopy(project);
  const styleText = project.styles.length
    ? project.styles.map((style) => STYLES.find((item) => item.id === style)?.name ?? style).join(", ")
    : "no style selected yet";
  const goalText = project.goals.length
    ? project.goals.map((goal) => GOALS.find((item) => item.id === goal)?.name.toLowerCase() ?? goal).join(", ")
    : "no goals selected yet";

  const useSample = async () => {
    const sample = SAMPLES[0];
    setBusy(true);
    try {
      await setImageFromUrl(publicUrl(sample.image), `${sample.name} sample`);
      if (!project.roomId) setRoom(sample.roomId);
      setPhase("scan");
    } catch {
      notify("The sample photo could not be prepared.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">Your Space, Understood.</h1>
      <p className="mt-4 max-w-2xl text-lg leading-7 text-forest">
        {room
          ? `A simulated read of your ${room.name.toLowerCase()}, shaped by ${styleText} and ${goalText}.`
          : "A simulated read. Choose a room in your project and the notes will name it."}
      </p>

      {!project.imageDataUrl ? (
        <div className="mt-8 rounded-3xl border border-dashed border-forest/30 bg-paper p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <p className="max-w-xl text-sm leading-6 text-forest">
            This screen is waiting for a photo. Start a project, or use the living room sample to see the analysis with a real image.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 sm:mt-0">
            <Button onClick={() => void useSample()} disabled={busy}>
              {busy ? "Preparing…" : "Use the living room sample"}
            </Button>
            <Button to="/project" variant="ghost">
              Start your project
            </Button>
          </div>
        </div>
      ) : null}

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div>
          <div className="relative overflow-hidden rounded-[1.75rem] bg-forest">
            {project.imageDataUrl ? (
              <img src={project.imageDataUrl} alt={project.imageLabel ?? "Room being reviewed"} className="aspect-[4/3] w-full object-cover" />
            ) : (
              <div className="grid aspect-[4/3] place-items-center px-6 text-center text-sm text-lime">Your photo will appear here.</div>
            )}
            {phase === "scan" && project.imageDataUrl ? (
              <div className="absolute inset-0 bg-forest/25">
                <div className="scan-line absolute right-0 left-0 h-24 bg-gradient-to-b from-transparent via-lime/80 to-transparent" />
                <div className="absolute right-4 bottom-4 left-4 rounded-2xl bg-ink/80 px-4 py-3 text-paper">
                  <p className="text-sm font-semibold">{SCAN_LINES[line]}</p>
                  <p className="mt-1 text-xs text-lime">Simulated scan. The photo stays on this device.</p>
                  <button
                    type="button"
                    className="mt-2 text-xs font-semibold underline decoration-lime underline-offset-2"
                    onClick={() => {
                      markAnalyzed();
                      setPhase("results");
                    }}
                  >
                    Skip animation
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {phase === "results" ? (
          <div>
            <h2 className="text-2xl font-extrabold tracking-[-0.03em]">Room assessment</h2>
            <dl className="mt-4 divide-y divide-forest/10 rounded-2xl border border-forest/10 bg-paper">
              {rows.map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-4 px-4 py-3 text-sm">
                  <dt className="font-semibold">{row.label}</dt>
                  <dd className="text-right text-forest">{row.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {scores.map((score) => (
                <ScoreBar key={score.label} label={score.label} value={score.value} note={score.note} />
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-forest/10 bg-paper p-6">
            <h2 className="text-2xl font-extrabold">Reading the photo</h2>
            <p className="mt-2 text-sm leading-6 text-forest">
              This takes a couple of seconds and does not call an outside service. You can skip it.
            </p>
          </div>
        )}
      </div>

      {phase === "results" ? (
        <>
          <section className="mt-14">
            <h2 className="text-3xl font-extrabold tracking-[-0.03em]">Opportunities identified</h2>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {opportunities.map((item, index) => (
                <li key={item.title} className="rounded-2xl bg-paper p-5 ring-1 ring-forest/10">
                  <p className="text-sm font-bold text-forest">{index + 1}</p>
                  <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-forest">{item.detail}</p>
                </li>
              ))}
            </ol>
          </section>
          <section className="mt-14">
            <h2 className="text-3xl font-extrabold tracking-[-0.03em]">Recommended improvements</h2>
            <ul className="mt-6 grid gap-4 lg:grid-cols-3">
              {recommendations.map((item) => (
                <li key={item.title} className="rounded-2xl border border-forest/10 bg-ivory p-5">
                  <p className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${item.impact === "High" ? "bg-forest text-paper" : "bg-lime text-forest"}`}>
                    {item.impact} impact
                  </p>
                  <h3 className="mt-3 text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-forest">{item.detail}</p>
                </li>
              ))}
            </ul>
          </section>
          <div className="mt-10">
            <Button to="/designs">Explore My Design Concepts</Button>
            {!project.roomId ? (
              <p className="mt-3 text-sm text-forest">
                Room type is still open. <Link to="/project" className="font-semibold underline decoration-lime underline-offset-4">Set it in your project</Link> and this page will name it.
              </p>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}
