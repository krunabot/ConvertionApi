import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Activity, Info } from "lucide-react";
import { STATIC_CATEGORIES, FINANCE_METADATA } from "../utils/converterTypes";

export default function SidebarNav({
  activeCatId,
  setActiveCatId,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  apiStatus,
  onRefresh,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const isFinanceActive =
    location.pathname === "/" && activeCatId === "finance";

  const handleCategoryClick = (id) => {
    setActiveCatId(id);
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <aside
      className={`
      fixed inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-slate-100 border-r border-slate-800 p-5 flex flex-col space-y-2
      transform transition-transform duration-200 ease-in-out md:translate-x-0 md:relative md:flex md:h-screen md:sticky md:top-0 shadow-xl
      ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      {/* Sidebar Desktop Logo Header */}
      <Link
        to="/"
        className="hidden md:flex items-center gap-3 px-2 py-4 mb-3 border-b border-slate-800/80 hover:opacity-90 transition-opacity"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <Activity className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div>
          <span className="text-white font-extrabold tracking-tight text-lg block">
            PremiumConvert
          </span>
          <span className="text-[10px] text-indigo-300 font-semibold uppercase tracking-widest block">
            Pro Suite v2.5
          </span>
        </div>
      </Link>

      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-1.5 block">
        Standard Categories
      </span>
      {Object.entries(STATIC_CATEGORIES).map(([id, data]) => {
        const Icon = data.icon;
        const isActive = location.pathname === "/" && activeCatId === id;
        return (
          <button
            key={id}
            onClick={() => handleCategoryClick(id)}
            className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all group ${
              isActive
                ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/25 ring-1 ring-white/20"
                : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
            }`}
          >
            <div
              className={`p-1.5 rounded-lg transition-colors ${isActive ? "bg-white/20 text-white" : "bg-slate-800 text-indigo-400 group-hover:text-indigo-300"}`}
            >
              <Icon className="w-4 h-4" />
            </div>
            <span>{data.title}</span>
          </button>
        );
      })}

      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 pt-4 mb-1.5 block">
        Market Feeds
      </span>
      <button
        onClick={() => handleCategoryClick("finance")}
        className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all group ${
          isFinanceActive
            ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/25 ring-1 ring-white/20"
            : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
        }`}
      >
        <div
          className={`p-1.5 rounded-lg transition-colors ${isFinanceActive ? "bg-white/20 text-white" : "bg-slate-800 text-emerald-400 group-hover:text-emerald-300"}`}
        >
          <FINANCE_METADATA.icon className="w-4 h-4" />
        </div>
        <span>{FINANCE_METADATA.title}</span>
      </button>

      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 pt-4 mb-1.5 block">
        Information
      </span>
      <Link
        to="/about"
        onClick={() => setIsMobileMenuOpen(false)}
        className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all group ${
          location.pathname === "/about"
            ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg shadow-sky-600/25 ring-1 ring-white/20"
            : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
        }`}
      >
        <div
          className={`p-1.5 rounded-lg transition-colors ${location.pathname === "/about" ? "bg-white/20 text-white" : "bg-slate-800 text-sky-400 group-hover:text-sky-300"}`}
        >
          <Info className="w-4 h-4" />
        </div>
        <span>About Us</span>
      </Link>

      {/* Network Pipeline Health Monitor bar */}
      <div className="pt-auto mt-auto border-t border-slate-800/80 px-2 py-3 flex items-center justify-between text-xs text-slate-400 font-medium">
        <span className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full shadow-sm ${apiStatus === "online" ? "bg-emerald-400 shadow-emerald-400/50" : "bg-amber-400 animate-pulse shadow-amber-400/50"}`}
          ></span>
          <span className="text-slate-300">
            {apiStatus === "online" ? "API Live" : "Connecting..."}
          </span>
        </span>
        <button
          onClick={onRefresh}
          disabled={!isFinanceActive || apiStatus === "loading"}
          className={`font-bold transition px-2 py-1 rounded-md ${
            isFinanceActive && apiStatus !== "loading"
              ? "text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/50 cursor-pointer"
              : "text-slate-600 cursor-not-allowed opacity-40"
          }`}
          title={
            !isFinanceActive
              ? "Refresh is only active in the Finance category"
              : apiStatus === "loading"
                ? "Refreshing rates..."
                : "Refresh live financial exchange rates"
          }
        >
          Refresh
        </button>
      </div>
    </aside>
  );
}
