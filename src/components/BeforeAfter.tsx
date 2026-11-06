import { ChevronsLeftRight } from "lucide-react";
import { useRef, useState } from "react";

type BeforeAfterProps = {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
};

export function BeforeAfter({
  before,
  after,
  beforeLabel = "Current room",
  afterLabel = "Concept",
}: BeforeAfterProps) {
  const [value, setValue] = useState(58);
  const frameRef = useRef<HTMLDivElement>(null);

  const setFromClientX = (clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setValue(Math.min(96, Math.max(4, next)));
  };

  return (
    <div>
      <div
        ref={frameRef}
        className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-forest"
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          (event.currentTarget as HTMLDivElement).setPointerCapture(event.pointerId);
          setFromClientX(event.clientX);
        }}
        onPointerMove={(event) => {
          if (event.buttons !== 1) return;
          setFromClientX(event.clientX);
        }}
      >
        <img src={before} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <img
          src={after}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        />
        <div className="pointer-events-none absolute inset-y-0 w-px bg-paper" style={{ left: `${value}%` }}>
          <span className="absolute top-1/2 left-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper text-forest shadow-md">
            <ChevronsLeftRight size={16} />
          </span>
        </div>
        <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-ink/75 px-3 py-1 text-xs font-semibold text-paper">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-paper/90 px-3 py-1 text-xs font-semibold text-forest">
          {afterLabel}
        </span>
      </div>
      <label className="mt-3 block text-sm text-forest">
        <span className="mb-1 block font-semibold">Drag to compare</span>
        <input
          type="range"
          min={4}
          max={96}
          value={Math.round(value)}
          onChange={(event) => setValue(Number(event.target.value))}
          aria-valuetext={`${Math.round(value)} percent of the concept visible`}
          className="w-full"
        />
      </label>
      <p className="sr-only">
        Before image is {beforeLabel}. After image is {afterLabel}.
      </p>
    </div>
  );
}
