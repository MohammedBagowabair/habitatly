import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

const VARIANTS = {
  primary: "bg-forest text-white hover:bg-[#1c3c2e]",
  lime: "bg-lime text-forest hover:bg-[#d5e6ae]",
  ghost: "border border-forest/20 bg-transparent text-forest hover:border-forest/50",
  white: "bg-paper text-forest hover:bg-ivory",
  quiet: "bg-transparent text-ink hover:bg-forest/5",
} as const;

type Variant = keyof typeof VARIANTS;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  to?: string;
  children: ReactNode;
};

export function Button({ variant = "primary", className = "", to, children, type = "button", ...rest }: ButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className}`;
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  );
}
