import { Route, Routes } from "react-router-dom";
import { AppShell } from "./layouts/AppShell";
import { AnalysisPage } from "./pages/AnalysisPage";
import { DesignsPage } from "./pages/DesignsPage";
import { DiyPage } from "./pages/DiyPage";
import { GreenPage } from "./pages/GreenPage";
import { HomePage } from "./pages/HomePage";
import { MaterialsPage } from "./pages/MaterialsPage";
import { ProjectPage } from "./pages/ProjectPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/designs" element={<DesignsPage />} />
        <Route path="/materials" element={<MaterialsPage />} />
        <Route path="/diy" element={<DiyPage />} />
        <Route path="/green-living" element={<GreenPage />} />
      </Route>
    </Routes>
  );
}
