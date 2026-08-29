import React, { useState, useEffect, useRef } from "react";
import { ArrowLeftRight, ChevronDown, Search } from "lucide-react";

/**
 * A searchable select component that behaves like a standard select when options <= 10,
 * and becomes a searchable dropdown when options > 10.
 */
function UnitSelect({
  value,
  onChange,
  options,
  disabled,
  variant = "indigo", // "indigo" for input, "emerald" for converted
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  const isSearchable = options.length > 10;

  // Handle outside click to close
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!isSearchable) {
    const selectStyles =
      variant === "emerald"
        ? "bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border-emerald-800/50"
        : "bg-slate-800/90 hover:bg-slate-700/90 text-indigo-300 border-slate-700";

    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`${selectStyles} px-3 py-2 text-base xl:text-sm font-semibold border-l min-w-[160px] xl:min-w-[190px] outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition rounded-r-xl`}
      >
        {options.map((o) => (
          <option
            key={o.id}
            value={o.id}
            className="bg-slate-900 text-slate-100 text-xs"
          >
            {o.label}
          </option>
        ))}
      </select>
    );
  }

  // Searchable custom dropdown - filter options beginning with the search term
  const filteredOptions = options.filter(
    (o) =>
      o.label.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
      o.id.toLowerCase().startsWith(searchTerm.toLowerCase()),
  );

  const selectedOption = options.find((o) => o.id === value);
  const selectedLabel = selectedOption ? selectedOption.label : value;

  const btnStyles =
    variant === "emerald"
      ? "bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border-emerald-800/50"
      : "bg-slate-800/90 hover:bg-slate-700/90 text-indigo-300 border-slate-700";

  const activeOptionStyles =
    variant === "emerald"
      ? "bg-emerald-950/80 text-emerald-300 font-bold"
      : "bg-indigo-950/80 text-indigo-300 font-bold";

  return (
    <div
      className="relative border-l border-slate-700 min-w-[160px] xl:min-w-[190px] flex items-stretch"
      ref={containerRef}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          setIsOpen(!isOpen);
          setSearchTerm("");
        }}
        className={`${btnStyles} w-full h-full px-3 py-2 text-base xl:text-sm font-semibold flex items-center justify-between gap-1.5 outline-none disabled:opacity-50 disabled:cursor-not-allowed transition rounded-r-xl`}
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-72 max-w-[85vw] bg-slate-900 rounded-xl shadow-2xl border border-slate-700 py-1 z-50 overflow-hidden text-slate-200 animate-in fade-in zoom-in duration-150">
          <div className="px-2 py-1.5 border-b border-slate-800 bg-slate-950/80 sticky top-0 z-10">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                placeholder="Type to filter..."
                className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 text-slate-100 font-medium placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((o) => {
                const isSelected = o.id === value;
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => {
                      onChange(o.id);
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-slate-800 transition flex items-center justify-between gap-2 ${
                      isSelected ? activeOptionStyles : "text-slate-300"
                    }`}
                  >
                    <span className="truncate">{o.label}</span>
                    {isSelected && (
                      <span className="text-[10px] uppercase font-bold text-indigo-400">
                        Active
                      </span>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-4 text-xs text-slate-500 text-center font-medium">
                No units matching "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ConversionCard({
  inputValue,
  setInputValue,
  fromUnit,
  setFromUnit,
  toUnit,
  setToUnit,
  unitOptions,
  formattedResult,
  disabled = false,
  errorMessage = null,
  allowNegative = false,
}) {
  const handleSwapUnits = () => {
    if (disabled) return;
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const handleKeyDown = (e) => {
    if (!allowNegative && (e.key === "-" || e.key === "Subtract")) {
      e.preventDefault();
    }
    if (e.key === "Enter" || e.keyCode === 13) {
      e.target.blur();
    }
  };

  const handleInputChange = (e) => {
    let val = e.target.value;
    if (!allowNegative && val.includes("-")) {
      val = val.replace(/-/g, "");
    }
    setInputValue(val);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-indigo-950/60 border border-slate-800 rounded-2xl shadow-xl p-5 md:p-6 relative transition-all duration-300 z-20">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-500 rounded-t-2xl"></div>

      {errorMessage ? (
        <div className="py-8 text-center space-y-2">
          <div className="text-lg font-semibold text-red-400">
            {errorMessage}
          </div>
          <p className="text-xs text-slate-400">
            Rates data could not be retrieved from the backend API.
          </p>
        </div>
      ) : (
        <div className="flex flex-col xl:flex-row gap-4 items-center max-w-4xl w-full">
          {/* FROM ELEMENT INPUT SLOTS */}
          <div className="w-full space-y-1.5 min-w-0">
            <label className="text-[13px] xl:text-[10px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
              Input Amount
            </label>
            <div className="flex border border-slate-700 rounded-xl focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all bg-slate-950/80 shadow-sm relative">
              <input
                type="number"
                value={inputValue}
                placeholder="0"
                min={allowNegative ? undefined : "0"}
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
                disabled={disabled}
                className="w-full px-3.5 py-2.5 text-xl sm:text-base font-medium text-slate-100 outline-none min-w-0 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed rounded-l-xl placeholder:text-slate-600"
                inputMode="decimal"
              />
              <UnitSelect
                value={fromUnit}
                onChange={setFromUnit}
                options={unitOptions}
                disabled={disabled}
                variant="indigo"
              />
            </div>
          </div>

          {/* SWAP ICON SWITCH ACTION TOGGLE BUTTON */}
          <button
            onClick={handleSwapUnits}
            disabled={disabled}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl mt-4 text-indigo-400 transition shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
            title="Swap Units"
          >
            <ArrowLeftRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
          </button>

          {/* TO ELEMENT OUTPUT SLOTS */}
          <div className="w-full space-y-1.5 min-w-0">
            <label className="text-[13px] xl:text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Converted Result
            </label>
            <div className="flex border border-emerald-800/50 rounded-xl bg-emerald-950/30 shadow-sm relative">
              <div className="w-full px-3.5 py-2.5 text-xl sm:text-base font-semibold text-emerald-400 flex items-center overflow-x-auto whitespace-nowrap scrollbar-none truncate rounded-l-xl">
                {formattedResult}
              </div>
              <UnitSelect
                value={toUnit}
                onChange={setToUnit}
                options={unitOptions}
                disabled={disabled}
                variant="emerald"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
