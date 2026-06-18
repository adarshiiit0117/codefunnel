import { useSessions } from "../hooks/useSessions";
import SessionTable from "../components/SessionTable";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";
import { MdRefresh } from "react-icons/md";

// Skeleton row for the loading state
function SkeletonRow() {
  return (
    <tr className="border-b border-slate-800/60">
      {[1, 2, 3, 4].map((i) => (
        <td key={i} className="px-5 py-4">
          <div className="h-4 rounded bg-slate-800 animate-pulse" style={{ width: `${60 + i * 10}%` }} />
        </td>
      ))}
    </tr>
  );
}

export default function SessionsPage() {
  const { sessions, loading, error, retry } = useSessions();

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-100">Sessions</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            All recorded user sessions
          </p>
        </div>
        <button onClick={retry} className="btn-ghost" title="Refresh">
          <MdRefresh className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Stats bar */}
      {!loading && !error && (
        <div className="flex gap-4 mb-6">
          <div className="stat-card flex-1 max-w-[160px]">
            <span className="text-xs text-slate-500 uppercase tracking-wide">Total</span>
            <span className="text-2xl font-bold text-slate-100">{sessions.length}</span>
          </div>
          <div className="stat-card flex-1 max-w-[160px]">
            <span className="text-xs text-slate-500 uppercase tracking-wide">Total Events</span>
            <span className="text-2xl font-bold text-slate-100">
              {sessions.reduce((sum, s) => sum + s.totalEvents, 0)}
            </span>
          </div>
        </div>
      )}

      {/* Main card */}
      <div className="card overflow-hidden">
        {loading ? (
          <table className="w-full">
            <tbody>
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </tbody>
          </table>
        ) : error ? (
          <ErrorState message={error} onRetry={retry} />
        ) : (
          <SessionTable sessions={sessions} />
        )}
      </div>
    </div>
  );
}
