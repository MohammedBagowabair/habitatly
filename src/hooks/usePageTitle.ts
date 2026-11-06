import { useEffect } from "react";

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title =
      title === "Home" ? "Habitatly — Design Better. Live Greener." : `${title} — Habitatly`;
  }, [title]);
}
