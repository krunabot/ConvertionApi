import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Activity, Menu, X } from "lucide-react";
import { STATIC_CATEGORIES, FINANCE_METADATA } from "./utils/converterTypes";
import { fetchLiveFinancialRates } from "./services/apiService";
import {
  calculateConversion,
  formatOutputDisplay,
} from "./services/calculationService";
import SidebarNav from "./components/SidebarNav";
import ConversionCard from "./components/ConversionCard";
import Footer from "./components/Footer";
import About from "./pages/About";

function ConverterView({
  activeCatId,
  inputValue,
  setInputValue,
  fromUnit,
  setFromUnit,
  toUnit,
  setToUnit,
  unitOptions,
  formattedResult,
  apiStatus,
  liveFinanceRates,
}) {
  const ActiveIcon =
    activeCatId === "finance"
      ? FINANCE_METADATA.icon
      : STATIC_CATEGORIES[activeCatId]?.icon;

  return (
    <section className="space-y-6 min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div className="space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-widest text-indigo-400">
            Active Category
          </div>
          <h1 className="text-2xl font-black text-white capitalize flex items-center gap-2.5">
            {ActiveIcon && (
              <div
                className={`p-2 rounded-xl ${
                  activeCatId === "finance"
                    ? "bg-emerald-950 text-emerald-400 border border-emerald-800/40"
                    : "bg-indigo-950 text-indigo-400 border border-indigo-800/40"
                }`}
              >
                <ActiveIcon className="w-5 h-5" />
              </div>
            )}
            <span>
              {activeCatId === "finance"
                ? FINANCE_METADATA.title
                : STATIC_CATEGORIES[activeCatId]?.title}
            </span>
          </h1>
        </div>
        {activeCatId === "finance" && (
          <span className="self-start sm:self-center px-3 py-1.5 rounded-full bg-emerald-950/80 text-emerald-400 font-bold text-xs tracking-wider border border-emerald-700/50 flex items-center gap-1.5 animate-bounce">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            REAL-TIME FX RATES
          </span>
        )}
      </div>

      <ConversionCard
        inputValue={inputValue}
        setInputValue={setInputValue}
        fromUnit={fromUnit}
        setFromUnit={setFromUnit}
        toUnit={toUnit}
        setToUnit={setToUnit}
        unitOptions={unitOptions}
        formattedResult={formattedResult}
        disabled={activeCatId === "finance" && apiStatus === "error"}
        errorMessage={
          activeCatId === "finance" && apiStatus === "error"
            ? "Data not available"
            : null
        }
        allowNegative={activeCatId === "temperature"}
      />

      {/* DYNAMIC EVERYDAY SUMMARY OVERVIEW ELEMENT */}
      {activeCatId === "finance" && apiStatus === "error" ? null : (
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl shadow-xl p-5 md:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-sm font-bold text-slate-100 tracking-tight">
                Equivalency Matrix
              </h2>
              <p className="text-[11px] text-slate-400 font-medium">
                Quick reference values across all supported units
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-indigo-300 font-bold text-[10px] tracking-wider border border-slate-700">
              {unitOptions.length} Units Available
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {unitOptions.map((o) => {
              const stepResult = calculateConversion({
                value: inputValue || "0",
                fromUnit,
                toUnit: o.id,
                categoryId: activeCatId,
                liveFinanceRates,
              });
              const isTarget = o.id === toUnit;
              return (
                <div
                  key={o.id}
                  className={`p-3.5 rounded-xl border transition-all duration-300 relative group overflow-hidden ${
                    isTarget
                      ? "bg-indigo-950/40 border-indigo-500/50 shadow-sm ring-1 ring-indigo-500/20"
                      : "bg-slate-950/70 hover:bg-slate-800/80 border-slate-800/80 hover:border-slate-700 shadow-sm"
                  }`}
                >
                  {isTarget && (
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-indigo-500 rounded-bl"></div>
                  )}
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider truncate flex items-center gap-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        activeCatId === "finance"
                          ? "bg-emerald-400"
                          : "bg-indigo-400"
                      }`}
                    ></span>
                    {o.label}
                  </div>
                  <div className="text-base font-semibold mt-1 text-slate-200 truncate group-hover:text-indigo-400 transition-colors">
                    {formatOutputDisplay(stepResult, 4)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

export default function App() {
  const [activeCatId, setActiveCatId] = useState("length");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [liveFinanceRates, setLiveFinanceRates] = useState(null);
  const [apiStatus, setApiStatus] = useState("loading");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");

  const syncRatesPipeline = () => {
    setApiStatus("loading");
    fetchLiveFinancialRates()
      .then((rates) => {
        setLiveFinanceRates(rates);
        setApiStatus("online");
      })
      .catch(() => setApiStatus("error"));
  };

  useEffect(() => {
    syncRatesPipeline();
  }, []);

  useEffect(() => {
    setInputValue("");
    if (activeCatId === "finance") {
      setFromUnit("GBP");
      setToUnit("USD");
    } else if (STATIC_CATEGORIES[activeCatId]) {
      const keys = Object.keys(STATIC_CATEGORIES[activeCatId].units);
      setFromUnit(keys[0] || "");
      setToUnit(keys[1] || keys[0] || "");
    }
  }, [activeCatId]);

  useEffect(() => {
    if (
      activeCatId === "finance" &&
      liveFinanceRates &&
      (!fromUnit || !toUnit)
    ) {
      setFromUnit("GBP");
      setToUnit("USD");
    }
  }, [liveFinanceRates, activeCatId, fromUnit, toUnit]);

  const unitOptions =
    activeCatId === "finance"
      ? Object.keys(liveFinanceRates || {}).map((k) => ({ id: k, label: k }))
      : Object.entries(STATIC_CATEGORIES[activeCatId]?.units || {}).map(
          ([id, o]) => ({ id, label: o.name }),
        );

  const rawResult = calculateConversion({
    value: inputValue,
    fromUnit,
    toUnit,
    categoryId: activeCatId,
    liveFinanceRates,
  });
  const formattedResult = formatOutputDisplay(rawResult);

  return (
    <div
      className="min-h-screen text-slate-100 flex flex-col antialiased font-sans"
      style={{ backgroundColor: "#213793" }}
    >
      <div className="flex flex-col md:flex-row flex-1">
        {/* MOBILE RESPONSIVE TOP BAR */}
        <header className="md:hidden bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 sticky top-0 z-50 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-indigo-400"
          >
            <Activity className="w-5 h-5 animate-pulse" />
            <span className="text-white tracking-tight">PremiumConvert</span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 border border-slate-700 rounded-xl bg-slate-800 text-slate-200"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </header>

        {/* CORE SIDEBAR MODULE BLOCK */}
        <SidebarNav
          activeCatId={activeCatId}
          setActiveCatId={setActiveCatId}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          apiStatus={apiStatus}
          onRefresh={syncRatesPipeline}
        />

        {/* VIEW GRID LAYER PORT PANELS */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6">
          <Routes>
            <Route
              path="/"
              element={
                <ConverterView
                  activeCatId={activeCatId}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  fromUnit={fromUnit}
                  setFromUnit={setFromUnit}
                  toUnit={toUnit}
                  setToUnit={setToUnit}
                  unitOptions={unitOptions}
                  formattedResult={formattedResult}
                  apiStatus={apiStatus}
                  liveFinanceRates={liveFinanceRates}
                />
              }
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}
