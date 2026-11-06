import { Link } from "react-router-dom";

type LogoProps = {
  tone?: "dark" | "light";
};

export function Logo({ tone = "dark" }: LogoProps) {
  const mark = tone === "light" ? "#FFFFFF" : "#244C3B";
  const word = tone === "light" ? "#FFFFFF" : "#252D29";
  return (
    <Link to="/" className="inline-flex items-center gap-2.5 rounded-full" aria-label="Habitatly, home">
      <svg width="32" height="32" viewBox="0 0 36 36" aria-hidden="true" className="shrink-0">
        <path
          d="M18 4.2 31.2 16.4h-4.6V31H9.4V16.4H4.8L18 4.2Z"
          fill="none"
          stroke={mark}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M18 12.4s-4.6 4.8-4.6 8c0 2.6 1.9 4.6 4.6 4.6s4.6-2 4.6-4.6c0-3.2-4.6-8-4.6-8Z"
          fill={mark}
        />
      </svg>
      <span className="text-[1.15rem] font-extrabold tracking-[-0.03em]" style={{ color: word }}>
        Habitatly
      </span>
    </Link>
  );
}
