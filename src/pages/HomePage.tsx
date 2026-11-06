import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { DESIGNS } from "../data/designs";
import { usePageTitle } from "../hooks/usePageTitle";
import { publicUrl } from "../utils/format";

const FEATURED = ["scandinavian", "modern-earth", "biophilic", "minimalist"];

const STEPS = [
  {
    title: "Discover Your Space",
    text: "Upload a photo and tell Habitatly about your room.",
  },
  {
    title: "Explore Your Design",
    text: "Discover personalized renovation concepts and sustainable alternatives.",
  },
  {
    title: "Bring It to Life",
    text: "Estimate your budget and follow your renovation roadmap.",
  },
];

const REASONS = [
  { title: "Smarter renovation planning", text: "One project carries the photo, the room, and the goals from the first step to the last." },
  { title: "Sustainable material discovery", text: "Compare a lower-impact option with a conventional stand-in before you commit." },
  { title: "Transparent cost estimation", text: "Quantities, labor, and extras stay visible. Every price is marked as an estimate." },
  { title: "Practical DIY guidance", text: "Eight steps, with tools and a checklist you can tick off as the room changes." },
];

export function HomePage() {
  usePageTitle("Home");
  const featured = FEATURED.map((id) => DESIGNS.find((design) => design.id === id)).filter((design) => design !== undefined);

  return (
    <div>
      <section className="relative min-h-[92vh] overflow-hidden">
        <img
          src={publicUrl("images/home/hero.jpg")}
          alt="Sunlit living room with a cognac sofa, large windows, and several indoor plants."
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/88 via-forest/55 to-forest/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-forest/25" />
        <div className="relative mx-auto grid min-h-[92vh] max-w-6xl items-end gap-8 px-4 pt-16 pb-12 sm:px-6 lg:grid-cols-[1.35fr_0.75fr] lg:pb-20">
          <div className="max-w-2xl text-paper">
            <h1 className="text-[clamp(2.7rem,6vw,5.25rem)] leading-[0.95] font-extrabold tracking-[-0.04em] text-balance">
              Your Dream Home, Designed Smarter and Greener.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-7 text-paper">
              Transform your space with intelligent renovation ideas, sustainable materials, and personalized guidance. Create a beautiful home while making better choices for the planet.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/project" variant="lime">
                Start Your Project
                <ArrowRight size={16} />
              </Button>
              <Button to="/designs" variant="white">
                Explore Design Ideas
              </Button>
            </div>
          </div>
          <aside className="rounded-3xl bg-paper p-6 text-ink shadow-[0_24px_60px_-28px_rgba(20,30,24,0.65)] lg:translate-y-10">
            <h2 className="text-xl font-extrabold tracking-[-0.03em]">Your Home Transformation</h2>
            <dl className="mt-5 space-y-4">
              <div className="flex items-end justify-between gap-3">
                <dt className="text-sm text-forest">Sustainable Design Score</dt>
                <dd className="text-2xl font-extrabold tabular-nums text-forest">92/100</dd>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-lime">
                <div className="h-full w-[92%] rounded-full bg-forest" />
              </div>
              <div className="flex items-end justify-between gap-3">
                <dt className="text-sm text-forest">Estimated Savings</dt>
                <dd className="text-2xl font-extrabold tabular-nums">$1,250</dd>
              </div>
              <div className="flex items-end justify-between gap-3">
                <dt className="text-sm text-forest">Environmental Impact</dt>
                <dd className="text-lg font-bold text-forest">Excellent</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs leading-5 text-forest">Illustrative preview for this demo, not a measured audit of a real home.</p>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-24 pb-8 sm:px-6 lg:pt-32">
        <h2 className="text-4xl font-extrabold tracking-[-0.03em] text-balance">How it works</h2>
        <ol className="mt-8 grid gap-px overflow-hidden rounded-3xl border border-forest/10 bg-forest/10 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="bg-paper p-6 sm:p-8">
              <p className="text-3xl font-extrabold text-forest">{index + 1}</p>
              <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 max-w-[36ch] text-sm leading-6 text-forest">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl font-extrabold tracking-[-0.03em]">Featured design inspiration</h2>
          <Link to="/designs" className="text-sm font-semibold text-forest underline decoration-lime decoration-2 underline-offset-4">
            Open the studio
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((design, index) => (
            <Link
              key={design.id}
              to={`/designs?concept=${design.id}`}
              className={`group relative min-h-72 overflow-hidden rounded-3xl ${index === 0 ? "md:col-span-2 md:min-h-[28rem] lg:row-span-2" : "min-h-64"}`}
            >
              <img
                src={publicUrl(design.image)}
                alt={design.alt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 p-5 text-paper">
                <h3 className="text-2xl font-extrabold tracking-[-0.03em]">{design.homeLabel ?? design.name}</h3>
                <p className="mt-1 max-w-sm text-sm leading-5 text-paper/90">{design.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-forest text-paper">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="max-w-xl text-4xl font-extrabold tracking-[-0.03em] text-balance">Why Habitatly?</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {REASONS.map((reason) => (
              <div key={reason.title}>
                <h3 className="text-2xl font-bold tracking-[-0.02em]">{reason.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-lime">{reason.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-4xl font-extrabold tracking-[-0.03em]">A sense of scale</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-forest">
          Illustrative platform statistics for this demo. They are not verified company results.
        </p>
        <dl className="mt-10 grid gap-8 sm:grid-cols-3">
          <div>
            <dt className="text-sm font-semibold text-forest">Sustainable ideas in the library</dt>
            <dd className="mt-2 text-5xl font-extrabold tracking-[-0.04em] text-forest">2,400+</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-forest">Average material waste reduction</dt>
            <dd className="mt-2 text-5xl font-extrabold tracking-[-0.04em] text-forest">35%</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-forest">Potential energy savings</dt>
            <dd className="mt-2 text-5xl font-extrabold tracking-[-0.04em] text-forest">28%</dd>
          </div>
        </dl>
      </section>

      <section className="relative mx-4 mb-16 overflow-hidden rounded-[2rem] sm:mx-6">
        <img
          src={publicUrl("images/home/cta.jpg")}
          alt="Modern house with a lit garden at dusk."
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-forest/75" />
        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center text-paper sm:py-28">
          <h2 className="text-4xl font-extrabold tracking-[-0.03em] text-balance sm:text-5xl">
            Your Home Can Make a Difference.
          </h2>
          <div className="mt-8 flex justify-center">
            <Button to="/project" variant="lime">
              Start Transforming Your Home
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
