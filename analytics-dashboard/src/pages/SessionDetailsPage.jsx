import { useParams, useNavigate } from "react-router-dom";
import { useSessionEvents } from "../hooks/useSessionEvents";
import EventTimeline from "../components/EventTimeline";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";
import { MdArrowBack, MdOutlineMouse, MdVisibility } from "react-icons/md";

export default function SessionDetailsPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { events, loading, error, retry } = useSessionEvents(sessionId);

  // Tally event types for the mini stat bar
  const clicks = events.filter((e) => e.eventType === "click").length;
  const pageViews = events.filter((e) => e.eventType === "page_view").length;

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      {/* Back button */}
      <button onClick={() => navigate("/sessions")} className="btn-ghost mb-5 -ml-1">
        <MdArrowBack />
        All Sessions
      </button>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-100">Session Detail</h1>
        <p className="text-xs font-mono text-slate-500 mt-1 break-all">{sessionId}</p>
      </div>

      {/* Mini stats */}
      {!loading && !error && events.length > 0 && (
        <div className="flex gap-3 mb-6">
          <div className="stat-card flex-1">
            <span className="text-xs text-slate-500 uppercase tracking-wide">Events</span>
            <span className="text-2xl font-bold text-slate-100">{events.length}</span>
          </div>
          <div className="stat-card flex-1">
            <span className="flex items-center gap-1 text-xs text-sky-400 uppercase tracking-wide">
              <MdVisibility /> Page Views
            </span>
            <span className="text-2xl font-bold text-sky-300">{pageViews}</span>
          </div>
          <div className="stat-card flex-1">
            <span className="flex items-center gap-1 text-xs text-amber-400 uppercase tracking-wide">
            <MdOutlineMouse /> Clicks
            </span>
            <span className="text-2xl font-bold text-amber-300">{clicks}</span>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-slate-400 mb-5">Event Timeline</h2>
        {loading ? (
          <LoadingSpinner message="Loading events…" />
        ) : error ? (
          <ErrorState message={error} onRetry={retry} />
        ) : (
          <EventTimeline events={events} />
        )}
      </div>
    </div>
  );
}
