import { NavLink } from "react-router-dom";
import { MdTableChart, MdWhatshot, MdAnalytics } from "react-icons/md";

const navLinks = [
  { to: "/sessions", label: "Sessions", icon: MdTableChart },
  { to: "/heatmap", label: "Heatmap", icon: MdWhatshot },
];

export default function Sidebar() {
  return (
    <aside className="flex flex-col w-56 shrink-0 h-screen sticky top-0 bg-slate-900 border-r border-slate-800 z-10">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-slate-800">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
          <MdAnalytics className="text-white text-lg" />
        </div>
        <span className="font-semibold text-sm text-slate-100 tracking-tight">
          Analytics
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 p-3 flex-1">
        <p className="px-2 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          Explore
        </p>
        {navLinks.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? "bg-indigo-600/20 text-indigo-300 border border-indigo-600/30"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              }`
            }
          >
            <Icon className="text-base shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <p className="text-[10px] text-slate-600 font-mono">v1.0.0</p>
      </div>
    </aside>
  );
}
