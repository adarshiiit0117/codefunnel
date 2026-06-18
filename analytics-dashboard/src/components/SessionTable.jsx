import { useNavigate } from "react-router-dom";
import { MdArrowForward, MdAccessTime, MdTag } from "react-icons/md";

// Format ISO timestamp into a readable local string
function formatTime(iso) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Compute session duration in a human-readable form
function duration(first, last) {
  const ms = new Date(last) - new Date(first);
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  return `${m}m ${s % 60}s`;
}

export default function SessionTable({ sessions }) {
  const navigate = useNavigate();

  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-500">
        <MdTag className="text-4xl" />
        <p className="text-sm">No sessions found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-800">
            <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Session ID
            </th>
            <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Events
            </th>
            <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 hidden md:table-cell">
              First Event
            </th>
            <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 hidden lg:table-cell">
              Last Event
            </th>
            <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 hidden sm:table-cell">
              Duration
            </th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {sessions.map((s) => (
            <tr
              key={s.sessionId}
              onClick={() => navigate(`/sessions/${s.sessionId}`)}
              className="border-b border-slate-800/60 hover:bg-slate-800/40 cursor-pointer transition-colors group"
            >
              {/* Session ID — truncated with monospace font */}
              <td className="px-5 py-4">
                <span className="font-mono text-xs text-indigo-300 bg-indigo-500/10 px-2 py-1 rounded">
                  {s.sessionId.slice(0, 8)}…
                </span>
              </td>

              {/* Total events */}
              <td className="px-4 py-4 text-right">
                <span className="inline-flex items-center justify-center min-w-[2rem] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium text-xs">
                  {s.totalEvents}
                </span>
              </td>

              {/* First event */}
              <td className="px-4 py-4 text-slate-400 hidden md:table-cell">
                <span className="flex items-center gap-1.5">
                  <MdAccessTime className="text-slate-600 shrink-0" />
                  {formatTime(s.firstEvent)}
                </span>
              </td>

              {/* Last event */}
              <td className="px-4 py-4 text-slate-400 hidden lg:table-cell">
                {formatTime(s.lastEvent)}
              </td>

              {/* Duration */}
              <td className="px-4 py-4 text-right hidden sm:table-cell">
                <span className="text-xs text-slate-500 font-mono">
                  {duration(s.firstEvent, s.lastEvent)}
                </span>
              </td>

              {/* Action */}
              <td className="px-4 py-4 text-right">
                <button className="btn-ghost opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                  View
                  <MdArrowForward />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
