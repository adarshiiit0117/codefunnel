import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import SessionsPage from "../pages/SessionsPage";
import SessionDetailsPage from "../pages/SessionDetailsPage";
import HeatmapPage from "../pages/HeatmapPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Redirect root to /sessions */}
        <Route index element={<Navigate to="/sessions" replace />} />
        <Route path="sessions" element={<SessionsPage />} />
        <Route path="sessions/:sessionId" element={<SessionDetailsPage />} />
        <Route path="heatmap" element={<HeatmapPage />} />
        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/sessions" replace />} />
      </Route>
    </Routes>
  );
}
