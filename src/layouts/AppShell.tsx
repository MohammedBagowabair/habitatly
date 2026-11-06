import { Leaf, Menu, RotateCcw, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Logo } from "../components/Logo";
import { useProject } from "../context/ProjectContext";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/project", label: "My Project", end: false },
  { to: "/designs", label: "Design Ideas", end: false },
  { to: "/materials", label: "Materials", end: false },
  { to: "/diy", label: "DIY Guide", end: false },
  { to: "/green-living", label: "Green Living", end: false },
];

function navClass(active: boolean) {
  return `rounded-full px-3 py-2 text-sm font-semibold ${active ? "bg-lime text-forest" : "text-forest hover:bg-lime/40"}`;
}

export function AppShell() {
  const { project, resetDemo } = useProject();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const started = Boolean(project.imageDataUrl || project.roomId);

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const reset = () => {
    resetDemo();
    setOpen(false);
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[70] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-forest/10 bg-ivory">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
            {LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => navClass(isActive)}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={reset}
              className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-forest hover:bg-lime/50 md:inline-flex"
            >
              <RotateCcw size={15} />
              Reset demo
            </button>
            <span
              className="hidden h-9 w-9 place-items-center rounded-full bg-lime text-forest sm:grid"
              title="Demo preview. Not a signed-in account."
              aria-label="Demo preview, not a signed-in account"
            >
              <Leaf size={16} />
            </span>
            <Button to="/project" className="hidden sm:inline-flex">
              {started ? "Continue" : "Get Started"}
            </Button>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-forest/15 text-forest xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </div>
        {open ? (
          <nav id="mobile-nav" className="border-t border-forest/10 bg-paper px-4 py-4 xl:hidden" aria-label="Mobile">
            <ul className="flex flex-col gap-1">
              {LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) => `block rounded-2xl px-3 py-3 text-base font-semibold ${isActive ? "bg-lime text-forest" : "text-ink"}`}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-2">
              <Button to="/project">{started ? "Continue project" : "Get Started"}</Button>
              <Button variant="ghost" onClick={reset}>
                Reset demo
              </Button>
            </div>
          </nav>
        ) : null}
      </header>
      <main id="main" key={location.pathname} className="page-enter flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-forest/10 bg-paper">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-3 max-w-sm text-sm leading-6 text-forest">
              Design Better. Live Greener. A frontend demo with illustrative figures. Prices are estimates. No account, payment, or live model is connected.
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-ink">Explore</p>
            <ul className="mt-3 space-y-2 text-sm">
              {LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} end={link.end} className="text-forest hover:text-ink">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold text-ink">This demo</p>
            <p className="mt-3 text-sm leading-6 text-forest">
              Your photo and choices stay in this browser. Reset clears them.
            </p>
            <button type="button" onClick={reset} className="mt-3 text-sm font-semibold text-forest underline decoration-lime decoration-2 underline-offset-4">
              Reset demo
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
