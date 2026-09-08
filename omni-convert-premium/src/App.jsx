import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Activity, Menu, Moon, Sun, X } from "lucide-react";
import { STATIC_CATEGORIES, FINANCE_METADATA } from "./utils/converterTypes";
import { fetchLiveFinancialRates } from "./services/apiService";
import SidebarNav from "./components/SidebarNav";
import Footer from "./components/Footer";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContactSupport from "./pages/ContactSupport";
import ConversionLandingPage from "./pages/ConversionLandingPage";

export default function App() {
  const location = useLocation();
  const [activeCatId, setActiveCatId] = useState("length");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [liveFinanceRates, setLiveFinanceRates] = useState(null);
  const [apiStatus, setApiStatus] = useState("loading");
  const [themeMode, setThemeMode] = useState(
    () => localStorage.getItem("omni-theme") || "dark",
  );

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

  // Sync category state based on location pathname
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const cat = location.pathname.split("/")[1];
    if (cat && (STATIC_CATEGORIES[cat] || cat === "finance")) {
      setActiveCatId(cat);
    } else if (location.pathname === "/") {
      setActiveCatId("length");
    }
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("omni-theme", themeMode);
    document.documentElement.style.colorScheme = themeMode;
    const pageBackground = themeMode === "light" ? "#e9eef5" : "#213793";
    document.documentElement.style.backgroundColor = pageBackground;
    document.body.style.backgroundColor = pageBackground;
  }, [themeMode]);

  useEffect(() => {
    const portraitMobile = window.matchMedia(
      "(max-width: 767px) and (orientation: portrait)",
    );
    let unlockPage = null;

    const updateScrollLock = () => {
      if (unlockPage) {
        unlockPage();
        unlockPage = null;
      }

      if (!isMobileMenuOpen || !portraitMobile.matches) return;

      const scrollY = window.scrollY;
      const previousBodyStyles = {
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left,
        right: document.body.style.right,
        overflow: document.body.style.overflow,
      };
      const previousHtmlOverflow = document.documentElement.style.overflow;

      document.documentElement.style.overflow = "hidden";
      Object.assign(document.body.style, {
        position: "fixed",
        top: `-${scrollY}px`,
        left: "0",
        right: "0",
        overflow: "hidden",
      });

      unlockPage = () => {
        document.documentElement.style.overflow = previousHtmlOverflow;
        Object.assign(document.body.style, previousBodyStyles);
        window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });
      };
    };

    updateScrollLock();
    portraitMobile.addEventListener("change", updateScrollLock);

    return () => {
      portraitMobile.removeEventListener("change", updateScrollLock);
      unlockPage?.();
    };
  }, [isMobileMenuOpen]);

  const isLight = themeMode === "light";

  return (
    <div
      className={`min-h-screen flex flex-col antialiased font-sans transition-colors duration-300 ${
        isLight ? "theme-light" : "theme-dark"
      } ${
        isLight ? "bg-slate-100 text-slate-900" : "bg-[#213793] text-slate-100"
      }`}
    >
      {/* THEME TOGGLE TOP HEADER BAR */}
      <div
        className={`w-full px-4 py-2.5 border-b flex items-center justify-end gap-3 text-xs font-semibold transition-colors duration-300 ${
          isLight
            ? "bg-white/90 border-slate-200 text-slate-600 shadow-sm"
            : "bg-slate-950/80 border-slate-800 text-slate-300"
        }`}
      >
        <span className="hidden sm:inline">Appearance</span>
        <button
          type="button"
          onClick={() => setThemeMode(isLight ? "dark" : "light")}
          aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
          aria-pressed={isLight}
          className={`relative flex h-8 w-28 items-center rounded-full border p-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
            isLight
              ? "bg-gradient-to-r from-sky-100 to-indigo-100 border-indigo-200 text-indigo-900 shadow-inner"
              : "bg-slate-900 border-slate-700 text-slate-200 shadow-inner"
          }`}
        >
          <span
            className={`absolute flex h-6 w-6 items-center justify-center rounded-full shadow-md transition-transform duration-300 ${
              isLight
                ? "translate-x-[4.5rem] bg-white text-amber-500"
                : "translate-x-0 bg-indigo-600 text-white"
            }`}
          >
            {isLight ? (
              <Sun className="h-3.5 w-3.5" />
            ) : (
              <Moon className="h-3.5 w-3.5" />
            )}
          </span>
          <span
            className={`text-[10px] font-bold ${isLight ? "ml-2" : "ml-8"}`}
          >
            {isLight ? "LIGHT" : "DARK"}
          </span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row flex-1">
        {/* MOBILE RESPONSIVE TOP BAR */}
        <header
          className={`md:hidden backdrop-blur-md border-b px-4 py-3 sticky top-0 z-50 flex items-center justify-between ${
            isLight
              ? "bg-white/90 border-slate-200"
              : "bg-slate-900/90 border-slate-800"
          }`}
        >
          <Link
            to="/"
            className={`flex items-center gap-2 font-bold ${isLight ? "text-indigo-600" : "text-indigo-400"}`}
          >
            <Activity className="w-5 h-5 animate-pulse" />
            <span
              className={
                isLight
                  ? "text-slate-900 tracking-tight"
                  : "text-white tracking-tight"
              }
            >
              PremiumConvert
            </span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 border rounded-xl ${
              isLight
                ? "bg-slate-100 border-slate-200 text-slate-800"
                : "bg-slate-800 border-slate-700 text-slate-200"
            }`}
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
          themeMode={themeMode}
        />

        {/* VIEW GRID LAYER PORT PANELS */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6">
          <Routes>
            <Route
              path="/"
              element={
                <ConversionLandingPage
                  categoryParam="length"
                  apiStatus={apiStatus}
                  liveFinanceRates={liveFinanceRates}
                  themeMode={themeMode}
                />
              }
            />
            <Route
              path="/:category"
              element={
                <ConversionLandingPage
                  apiStatus={apiStatus}
                  liveFinanceRates={liveFinanceRates}
                  themeMode={themeMode}
                />
              }
            />
            <Route
              path="/:category/:pair"
              element={
                <ConversionLandingPage
                  apiStatus={apiStatus}
                  liveFinanceRates={liveFinanceRates}
                  themeMode={themeMode}
                />
              }
            />
            <Route path="/about" element={<About themeMode={themeMode} />} />
            <Route
              path="/privacy"
              element={<PrivacyPolicy themeMode={themeMode} />}
            />
            <Route
              path="/terms"
              element={<TermsOfService themeMode={themeMode} />}
            />
            <Route
              path="/contact"
              element={<ContactSupport themeMode={themeMode} />}
            />
          </Routes>
        </main>
      </div>
      <Footer themeMode={themeMode} />
    </div>
  );
}
