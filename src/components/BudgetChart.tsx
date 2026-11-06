import { money } from "../utils/format";

export type ChartPart = { label: string; value: number; color: string };

export function BudgetChart({ parts }: { parts: ChartPart[] }) {
  const total = parts.reduce((sum, part) => sum + part.value, 0);
  if (total <= 0) {
    return <p className="text-sm text-forest">Add a material to see the breakdown.</p>;
  }
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex flex-wrap items-center gap-5">
      <svg viewBox="0 0 120 120" className="h-32 w-32" role="img" aria-label="Estimated budget breakdown">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#F8F8F3" strokeWidth="14" />
        {parts.map((part) => {
          const length = (part.value / total) * circumference;
          const dash = `${length} ${circumference - length}`;
          const circle = (
            <circle
              key={part.label}
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={part.color}
              strokeWidth="14"
              strokeDasharray={dash}
              strokeDashoffset={-offset}
              transform="rotate(-90 60 60)"
            />
          );
          offset += length;
          return circle;
        })}
        <text x="60" y="58" textAnchor="middle" fill="#252D29" fontSize="11" fontWeight="700">
          {money(total)}
        </text>
        <text x="60" y="74" textAnchor="middle" fill="#244C3B" fontSize="8">
          estimate
        </text>
      </svg>
      <ul className="min-w-40 space-y-2 text-sm">
        {parts.map((part) => (
          <li key={part.label} className="flex items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 text-ink">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: part.color }} />
              {part.label}
            </span>
            <span className="font-semibold tabular-nums">{money(part.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
