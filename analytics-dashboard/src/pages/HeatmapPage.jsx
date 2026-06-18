import { useState } from "react";
import { useHeatmap } from "../hooks/useHeatmap";
import HeatmapCanvas from "../components/HeatmapCanvas";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";
import { MdWhatshot, MdOutlineMouse } from "react-icons/md";

export default function HeatmapPage() {
  const [selectedPage, setSelectedPage] = useState("");
  const { points, pages, loadingPages, loadingPoints, error, retryPages, retryPoints } =
    useHeatmap(selectedPage);

  return (
    <div className="p-6 lg:p-8 max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-100">Click Heatmap</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Visualise where users click on each page
          </p>
        </div>
      </div>

      {/* Page selector */}
      <div className="card p-5 mb-6">
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Select Page
        </label>

        {loadingPages ? (
          <div className="h-10 rounded-lg bg-slate-800 animate-pulse w-72" />
        ) : error && pages.length === 0 ? (
          <ErrorState message={error} onRetry={retryPages} />
        ) : (
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="w-full max-w-sm bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="">— Choose a page —</option>
            {pages.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Heatmap area */}
      {selectedPage && (
        <div className="space-y-4">
          {/* Click count badge */}
          {!loadingPoints && !error && (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-sm text-slate-300">
              <MdOutlineMouse className="text-red-400" />
                <strong className="text-red-300">{points.length}</strong>
                click{points.length !== 1 ? "s" : ""} recorded
              </span>
            </div>
          )}

          <div className="card p-4">
            {loadingPoints ? (
              <LoadingSpinner message="Loading heatmap…" />
            ) : error ? (
              <ErrorState message={error} onRetry={retryPoints} />
            ) : (
              <HeatmapCanvas points={points} pageUrl={selectedPage} />
            )}
          </div>
        </div>
      )}

      {/* Prompt when nothing is selected */}
      {!selectedPage && !loadingPages && (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-600">
          <MdWhatshot className="text-5xl" />
          <p className="text-sm">Select a page above to view its heatmap.</p>
        </div>
      )}
    </div>
  );
}
