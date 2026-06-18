import { MdTouchApp } from "react-icons/md";

const CANVAS_W = 1380;
const CANVAS_H = 1500;

export default function HeatmapCanvas({ points, pageUrl }) {
  if (points.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-slate-500 card">
        <MdTouchApp className="text-4xl" />
        <p className="text-sm">No click data available for this page.</p>
      </div>
    );
  }

  return (
    <div className="overflow-auto pb-2" style={{ maxHeight: "80vh" }}>
      <div
       className="relative rounded-xl border border-slate-800"
style={{ width: CANVAS_W, height: CANVAS_H }}
      >
        {/* Live website preview via iframe */}
        <iframe
          src={pageUrl}
          title="Page Preview"
          width={CANVAS_W}
          height={CANVAS_H}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: CANVAS_W,
            height: CANVAS_H,
            border: "none",
            pointerEvents: "none", // prevent interaction, dots stay on top
          }}
          sandbox="allow-scripts allow-same-origin"
        />

        {/* Click dots overlaid on top of iframe */}
        {points.map((pt, i) => (
          <div
            key={i}
            className="heatmap-dot absolute rounded-full pointer-events-auto"
            title={`Click at (${pt.x}, ${pt.y})`}
            style={{
              left: pt.x,
              top: pt.y,
              width: 24,
              height: 24,
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(239,68,68,0.8) 0%, rgba(239,68,68,0.2) 70%, transparent 100%)",
              zIndex: 10,
            }}
          />
        ))}
      </div>
    </div>
  );
}