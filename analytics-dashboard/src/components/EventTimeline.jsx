import { MdOpenInNew, MdOutlineMouse, MdVisibility } from "react-icons/md";

// Color + label config per event type
const EVENT_CONFIG = {
  page_view: {
    label: "Page View",
    bg: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    dot: "bg-sky-500",
    icon: MdVisibility,
  },
  click: {
    label: "Click",
    bg: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    dot: "bg-amber-500",
    icon: MdOutlineMouse,
  },
};

function fallbackConfig(type) {
  return {
    label: type,
    bg: "bg-slate-700/50 text-slate-300 border-slate-600",
    dot: "bg-slate-500",
    icon: MdOpenInNew,
  };
}

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function EventItem({ event }) {
  const config = EVENT_CONFIG[event.eventType] ?? fallbackConfig(event.eventType);
  const Icon = config.icon;

  return (
    <li className="timeline-item relative flex gap-4 pb-4">
      {/* Timeline dot */}
      <div className="shrink-0 flex flex-col items-center">
        <div
          className={`mt-1 h-5 w-5 rounded-full border-2 border-slate-950 flex items-center justify-center ${config.dot}`}
        >
          <Icon className="text-white text-[10px]" />
        </div>
      </div>

      {/* Content card */}
      <div className="flex-1 card p-3.5 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
          <span className={`badge border ${config.bg}`}>
            {config.label}
          </span>
          <time className="text-xs text-slate-500 font-mono shrink-0">
            {formatTime(event.timestamp)}
          </time>
        </div>

        <p className="text-xs text-slate-400 truncate" title={event.pageUrl}>
          {event.pageUrl}
        </p>

        {/* Show coordinates for click events */}
        {event.eventType === "click" && event.clickData && (
          <p className="mt-1.5 text-xs font-mono text-amber-400/80">
            x: {event.clickData.x}, y: {event.clickData.y}
          </p>
        )}
      </div>
    </li>
  );
}

export default function EventTimeline({ events }) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-500">
        <MdVisibility className="text-4xl" />
        <p className="text-sm">No events available for this session.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col">
      {events.map((event) => (
        <EventItem key={event._id} event={event} />
      ))}
    </ul>
  );
}
