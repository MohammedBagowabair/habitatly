import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import App from "./App";
import { ToastViewport } from "./components/ToastViewport";
import { ProjectProvider } from "./context/ProjectContext";
import "./index.css";

const base = import.meta.env.BASE_URL;
const basename = !base || base === "/" ? undefined : base.replace(/\/$/, "");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <ProjectProvider>
        <App />
        <ToastViewport />
      </ProjectProvider>
    </BrowserRouter>
  </StrictMode>,
);
