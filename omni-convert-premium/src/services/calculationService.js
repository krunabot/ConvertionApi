import { STATIC_CATEGORIES } from "../utils/converterTypes";

export function calculateConversion({
  value,
  fromUnit,
  toUnit,
  categoryId,
  liveFinanceRates,
}) {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return "";

  // Only temperature can have negative values
  if (categoryId !== "temperature" && numValue < 0) return "";

  let result = numValue;

  // 1. Live Financial Pipeline Calculations
  if (categoryId === "finance") {
    if (!liveFinanceRates) return "";
    const fromRate = liveFinanceRates[fromUnit];
    const toRate = liveFinanceRates[toUnit];
    if (!fromRate || !toRate) return numValue;
    result = (numValue / fromRate) * toRate;
  }
  // 2. Non-Linear Temperature Math Formulas
  else if (categoryId === "temperature") {
    let celsius;
    if (fromUnit === "c") celsius = numValue;
    else if (fromUnit === "f") celsius = ((numValue - 32) * 5) / 9;
    else if (fromUnit === "k") celsius = numValue - 273.15;

    if (toUnit === "c") result = celsius;
    else if (toUnit === "f") result = (celsius * 9) / 5 + 32;
    else if (toUnit === "k") result = celsius + 273.15;
    else result = numValue;
  }
  // 3. High-Performance Static Multipliers
  else {
    const category = STATIC_CATEGORIES[categoryId];
    if (!category || !category.units[fromUnit] || !category.units[toUnit])
      return "";
    result =
      (numValue * category.units[fromUnit].factor) /
      category.units[toUnit].factor;
  }

  // Round result to 3 significant figures only if it has a decimal part
  if (result === 0) return 0;
  if (result % 1 === 0 || Math.abs(result - Math.round(result)) < 1e-9) {
    return Math.round(result);
  }
  const digits = Math.floor(Math.log10(Math.abs(result)));
  const scale = Math.pow(10, 2 - digits);
  return Math.round(result * scale) / scale;
}

export function formatOutputDisplay(value) {
  if (value === "" || value === null || value === undefined) return "0";
  const num = Number(value);
  if (isNaN(num)) return "0";
  if (num === 0) return "0";

  if (num % 1 === 0) {
    return num.toLocaleString(undefined, { useGrouping: true });
  }

  return num.toLocaleString(undefined, {
    maximumSignificantDigits: 3,
    minimumSignificantDigits: 1,
    useGrouping: true,
  });
}
