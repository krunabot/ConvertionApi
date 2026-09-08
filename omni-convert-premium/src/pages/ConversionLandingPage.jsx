import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { STATIC_CATEGORIES, FINANCE_METADATA } from "../utils/converterTypes";
import Seo from "../components/Seo";
import ConversionCard from "../components/ConversionCard";
import {
  calculateConversion,
  formatOutputDisplay,
} from "../services/calculationService";
import { HelpCircle, Calculator, BookOpen, Layers } from "lucide-react";

// Helper map for unit formulas and explanations
const UNIT_FORMULAS = {
  "kg-lb": {
    formula: "lbs = kg × 2.20462",
    description:
      "To convert kilograms to pounds, multiply the mass in kilograms by 2.20462262.",
    example: "10 kg = 10 × 2.20462 = 22.0462 lbs",
  },
  "lb-kg": {
    formula: "kg = lbs ÷ 2.20462",
    description:
      "To convert pounds to kilograms, divide the mass in pounds by 2.20462262.",
    example: "50 lbs = 50 ÷ 2.20462 = 22.6796 kg",
  },
  "cm-in": {
    formula: "inches = cm ÷ 2.54",
    description:
      "To convert centimeters to inches, divide the length in centimeters by 2.54.",
    example: "25.4 cm = 25.4 ÷ 2.54 = 10 inches",
  },
  "in-cm": {
    formula: "cm = inches × 2.54",
    description:
      "To convert inches to centimeters, multiply the length in inches by 2.54.",
    example: "12 inches = 12 × 2.54 = 30.48 cm",
  },
  "c-f": {
    formula: "°F = (°C × 9/5) + 32",
    description:
      "To convert Celsius to Fahrenheit, multiply by 9/5 (1.8) and add 32.",
    example: "20 °C = (20 × 1.8) + 32 = 68 °F",
  },
  "f-c": {
    formula: "°C = (°F - 32) × 5/9",
    description:
      "To convert Fahrenheit to Celsius, subtract 32 and multiply by 5/9.",
    example: "77 °F = (77 - 32) × 5/9 = 25 °C",
  },
  "km-mi": {
    formula: "miles = km ÷ 1.609344",
    description:
      "To convert kilometers to miles, divide distance in kilometers by 1.609344.",
    example: "10 km = 10 ÷ 1.609344 = 6.2137 miles",
  },
  "mi-km": {
    formula: "km = miles × 1.609344",
    description:
      "To convert miles to kilometers, multiply distance in miles by 1.609344.",
    example: "5 miles = 5 × 1.609344 = 8.0467 km",
  },
};

// Popular unit shortcuts per category
const CATEGORY_SHORTCUTS = {
  length: [
    { label: "cm to inches", path: "/length/cm-to-in" },
    { label: "inches to cm", path: "/length/in-to-cm" },
    { label: "km to miles", path: "/length/km-to-mi" },
    { label: "miles to km", path: "/length/mi-to-km" },
    { label: "feet to metres", path: "/length/ft-to-m" },
    { label: "metres to feet", path: "/length/m-to-ft" },
  ],
  weight: [
    { label: "kg to lbs", path: "/weight/kg-to-lb" },
    { label: "lbs to kg", path: "/weight/lb-to-kg" },
    { label: "grams to ounces", path: "/weight/g-to-oz" },
    { label: "ounces to grams", path: "/weight/oz-to-g" },
    { label: "kg to grams", path: "/weight/kg-to-g" },
    { label: "lbs to ounces", path: "/weight/lb-to-oz" },
  ],
  volume: [
    { label: "litres to US gallons", path: "/volume/litres-to-gal_us" },
    { label: "US gallons to litres", path: "/volume/gal_us-to-litres" },
    { label: "millilitres to cups", path: "/volume/ml-to-cup" },
    { label: "cups to millilitres", path: "/volume/cup-to-ml" },
    { label: "litres to millilitres", path: "/volume/litres-to-ml" },
  ],
  digital: [
    { label: "bytes to kilobytes", path: "/digital/bytes-to-kb" },
    { label: "kilobytes to megabytes", path: "/digital/kb-to-mb" },
    { label: "megabytes to gigabytes", path: "/digital/mb-to-gb" },
    { label: "bits to bytes", path: "/digital/bits-to-bytes" },
    { label: "kibibytes to kilobytes", path: "/digital/kib-to-kb" },
  ],
  temperature: [
    { label: "Celsius to Fahrenheit", path: "/temperature/c-to-f" },
    { label: "Fahrenheit to Celsius", path: "/temperature/f-to-c" },
    { label: "Celsius to Kelvin", path: "/temperature/c-to-k" },
    { label: "Kelvin to Celsius", path: "/temperature/k-to-c" },
    { label: "Fahrenheit to Kelvin", path: "/temperature/f-to-k" },
  ],
  finance: [
    { label: "GBP to USD", path: "/finance/GBP-to-USD" },
    { label: "USD to GBP", path: "/finance/USD-to-GBP" },
    { label: "EUR to USD", path: "/finance/EUR-to-USD" },
    { label: "GBP to EUR", path: "/finance/GBP-to-EUR" },
  ],
};

export default function ConversionLandingPage({
  categoryParam,
  apiStatus,
  liveFinanceRates,
  themeMode,
}) {
  const params = useParams();
  const navigate = useNavigate();
  const currentCategory = categoryParam || params.category || "length";
  const currentPair = params.pair || null;

  const categoryData =
    currentCategory === "finance"
      ? FINANCE_METADATA
      : STATIC_CATEGORIES[currentCategory] || STATIC_CATEGORIES.length;

  const categoryTitle = categoryData.title;

  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");

  // Initialize and update selected units whenever category or route pair changes
  useEffect(() => {
    setInputValue("");
    if (currentPair) {
      const pParts = currentPair.split("-to-");
      if (pParts.length === 2) {
        setFromUnit(pParts[0]);
        setToUnit(pParts[1]);
        return;
      }
    }

    if (currentCategory === "length") {
      setFromUnit("in");
      setToUnit("cm");
    } else if (currentCategory === "weight") {
      setFromUnit("kg");
      setToUnit("g");
    } else if (currentCategory === "finance") {
      setFromUnit("GBP");
      setToUnit("USD");
    } else if (STATIC_CATEGORIES[currentCategory]) {
      const keys = Object.keys(STATIC_CATEGORIES[currentCategory].units);
      setFromUnit(keys[0] || "");
      setToUnit(keys[1] || keys[0] || "");
    }
  }, [currentCategory, currentPair]);

  // When fromUnit or toUnit changes, navigate to the specific pair URL if valid
  const handleFromUnitChange = (newFrom) => {
    setFromUnit(newFrom);
    if (newFrom && toUnit && newFrom !== toUnit) {
      navigate(`/${currentCategory}/${newFrom}-to-${toUnit}`);
    }
  };

  const handleToUnitChange = (newTo) => {
    setToUnit(newTo);
    if (fromUnit && newTo && fromUnit !== newTo) {
      navigate(`/${currentCategory}/${fromUnit}-to-${newTo}`);
    }
  };

  const unitOptions =
    currentCategory === "finance"
      ? Object.keys(liveFinanceRates || {}).map((k) => ({ id: k, label: k }))
      : Object.entries(STATIC_CATEGORIES[currentCategory]?.units || {}).map(
          ([id, o]) => ({ id, label: o.name }),
        );

  const rawResult = calculateConversion({
    value: inputValue,
    fromUnit,
    toUnit,
    categoryId: currentCategory,
    liveFinanceRates,
  });
  const formattedResult = formatOutputDisplay(rawResult);

  // Custom SEO Titles and Descriptions
  let seoTitle = `${categoryTitle} Online | PremiumConvert`;
  let seoDescription = `Free online ${categoryTitle.toLowerCase()} calculator with instant accuracy, formulas, equivalency matrix, and unit tables.`;
  let h1Text = `${categoryTitle} Converter`;

  if (currentPair) {
    const parts = currentPair.split("-to-");
    if (parts.length === 2) {
      const fromLabel = parts[0].toUpperCase();
      const toLabel = parts[1].toUpperCase();
      seoTitle = `Convert ${fromLabel} to ${toLabel} (${parts[0]} to ${parts[1]}) | PremiumConvert`;
      seoDescription = `Instant, accurate ${fromLabel} to ${toLabel} (${parts[0]} to ${parts[1]}) conversion calculator. Includes conversion formulas, worked examples, and reference tables.`;
    }
  }

  const formulaInfo = currentPair ? UNIT_FORMULAS[currentPair] : null;

  const pathUrl = currentPair
    ? `/${currentCategory}/${currentPair}`
    : `/${currentCategory}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: seoTitle,
    url: `https://convertionapi.pages.dev${pathUrl}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    description: seoDescription,
    offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
  };

  return (
    <div className="space-y-8 min-w-0">
      <Seo
        title={seoTitle}
        description={seoDescription}
        path={pathUrl}
        structuredData={structuredData}
      />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div className="space-y-1">
          <div className="text-xs sm:text-[11px] font-bold uppercase tracking-widest text-indigo-400">
            {currentCategory === "finance"
              ? "Live FX Rates"
              : "Unit Conversion Category"}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white capitalize flex items-center gap-2.5">
            {categoryData.icon && (
              <div className="p-2 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800/40">
                <categoryData.icon className="w-6 h-6" />
              </div>
            )}
            <span>{h1Text}</span>
          </h1>
        </div>
      </div>

      {/* Converter Interactive Card */}
      <ConversionCard
        inputValue={inputValue}
        setInputValue={setInputValue}
        fromUnit={fromUnit}
        setFromUnit={handleFromUnitChange}
        toUnit={toUnit}
        setToUnit={handleToUnitChange}
        unitOptions={unitOptions}
        formattedResult={formattedResult}
        disabled={currentCategory === "finance" && apiStatus === "error"}
        errorMessage={
          currentCategory === "finance" && apiStatus === "error"
            ? "Data not available"
            : null
        }
        allowNegative={currentCategory === "temperature"}
      />

      {/* Equivalency Matrix */}
      {currentCategory === "finance" && apiStatus === "error" ? null : (
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl shadow-xl p-5 md:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base sm:text-sm font-bold text-slate-100 tracking-tight flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" /> Equivalency
                Matrix
              </h2>
              <p className="text-xs sm:text-[11px] text-slate-400 font-medium">
                Quick reference values across all supported units • Click any
                card to switch
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-indigo-300 font-bold text-xs sm:text-[10px] tracking-wider border border-slate-700">
              {unitOptions.length} Units Available
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {unitOptions.map((o) => {
              const stepResult = calculateConversion({
                value: inputValue || "0",
                fromUnit,
                toUnit: o.id,
                categoryId: currentCategory,
                liveFinanceRates,
              });
              const isTarget = o.id === toUnit;
              return (
                <button
                  type="button"
                  key={o.id}
                  onClick={() => {
                    if (
                      stepResult !== "" &&
                      stepResult !== null &&
                      stepResult !== undefined
                    ) {
                      const clickedUnitId = o.id;
                      const prevFromUnit = fromUnit;
                      setInputValue(String(stepResult));
                      setFromUnit(clickedUnitId);
                      if (toUnit === clickedUnitId) {
                        setToUnit(prevFromUnit);
                        navigate(
                          `/${currentCategory}/${clickedUnitId}-to-${prevFromUnit}`,
                        );
                      } else {
                        navigate(
                          `/${currentCategory}/${clickedUnitId}-to-${toUnit}`,
                        );
                      }
                    }
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 relative group overflow-hidden cursor-pointer active:scale-[0.98] ${
                    isTarget
                      ? "bg-indigo-950/40 border-indigo-500/50 shadow-sm ring-1 ring-indigo-500/20 hover:bg-indigo-900/40"
                      : "bg-slate-950/70 hover:bg-slate-800/80 border-slate-800/80 hover:border-slate-700 shadow-sm"
                  }`}
                >
                  <div className="text-sm sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider truncate flex items-center justify-between gap-1.5">
                    <span className="flex items-center gap-1.5 truncate">
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          currentCategory === "finance"
                            ? "bg-emerald-400"
                            : "bg-indigo-400"
                        }`}
                      ></span>
                      {o.label}
                    </span>
                  </div>
                  <div className="text-xl sm:text-base font-semibold mt-1 text-slate-200 truncate group-hover:text-indigo-300 transition-colors">
                    {formatOutputDisplay(stepResult, 4)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* SEO Content Section: Formula, Worked Example & Guide */}
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl shadow-xl p-6 md:p-8 space-y-6 text-slate-300">
        {formulaInfo && (
          <div className="space-y-3 pb-6 border-b border-slate-800">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-400" /> Conversion
              Formula & Explanation
            </h2>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="text-sm text-indigo-300 font-mono font-bold">
                Formula: {formulaInfo.formula}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {formulaInfo.description}
              </p>
              <div className="text-xs text-slate-400 font-medium">
                <strong>Example:</strong> {formulaInfo.example}
              </div>
            </div>
          </div>
        )}

        {/* Detailed Category Guide */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" /> About{" "}
            {categoryTitle} Conversion
          </h2>
          <p className="text-sm leading-relaxed text-slate-300">
            The <strong>{categoryTitle}</strong> conversion tool on
            PremiumConvert provides high-precision, instant calculations
            according to international standards (NIST / SI Units). Whether you
            are an engineer, researcher, student, or everyday user, our platform
            guarantees institutional-grade accuracy.
          </p>

          <h3 className="text-base font-bold text-slate-200 pt-2">
            Popular {categoryTitle} Shortcuts
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {(
              CATEGORY_SHORTCUTS[currentCategory] || CATEGORY_SHORTCUTS.length
            ).map((shortcut) => (
              <Link
                key={shortcut.path}
                to={shortcut.path}
                className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-indigo-300 hover:bg-slate-700 hover:text-white transition"
              >
                {shortcut.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" /> Frequently Asked
            Questions
          </h2>
          <div className="space-y-3">
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-1">
              <h3 className="text-sm font-bold text-slate-200">
                How accurate are the conversion results?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                All unit factors follow standardized international scientific
                formulas (NIST / SI Standards). Financial rates update live via
                real-time market API feeds.
              </p>
            </div>
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-1">
              <h3 className="text-sm font-bold text-slate-200">
                Is registration or payment required?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                No, PremiumConvert is 100% free with unlimited conversions and
                no registration needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
