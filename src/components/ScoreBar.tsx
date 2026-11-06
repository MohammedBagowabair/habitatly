type ScoreBarProps = {
  label: string;
  value: number;
  note?: string;
};

export function ScoreBar({ label, value, note }: ScoreBarProps) {
  return (
    <div className="rounded-2xl border border-forest/10 bg-paper p-4">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-semibold text-ink">{label}</p>
        <p className="text-lg font-extrabold tabular-nums text-forest">
          {value}
          <span className="text-sm font-semibold text-forest">/100</span>
        </p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-lime/70" role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <div className="h-full rounded-full bg-forest" style={{ width: `${value}%` }} />
      </div>
      {note ? <p className="mt-2 text-sm leading-5 text-forest">{note}</p> : null}
    </div>
  );
}
