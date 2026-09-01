import { describe, expect, it } from "vitest";
import {
  calculateConversion,
  formatOutputDisplay,
} from "../../omni-convert-premium/src/services/calculationService.js";

describe("calculateConversion", () => {
  it("converts between linear length units", () => {
    expect(
      calculateConversion({
        value: "1",
        fromUnit: "m",
        toUnit: "cm",
        categoryId: "length",
      }),
    ).toBe(100);
  });

  it("rounds conversion results to four decimal places", () => {
    expect(
      calculateConversion({
        value: "1",
        fromUnit: "mi",
        toUnit: "km",
        categoryId: "length",
      }),
    ).toBe(1.6093);
  });

  it("converts temperatures, including negative values", () => {
    expect(
      calculateConversion({
        value: "-40",
        fromUnit: "c",
        toUnit: "f",
        categoryId: "temperature",
      }),
    ).toBe(-40);
  });

  it("converts finance values using live rates", () => {
    expect(
      calculateConversion({
        value: "10",
        fromUnit: "GBP",
        toUnit: "USD",
        categoryId: "finance",
        liveFinanceRates: { GBP: 1, USD: 1.25 },
      }),
    ).toBe(12.5);
  });

  it("rejects negative values for non-temperature categories", () => {
    expect(
      calculateConversion({
        value: "-1",
        fromUnit: "kg",
        toUnit: "g",
        categoryId: "weight",
      }),
    ).toBe("");
  });

  it("returns an empty result for invalid input or units", () => {
    expect(
      calculateConversion({
        value: "not a number",
        fromUnit: "m",
        toUnit: "cm",
        categoryId: "length",
      }),
    ).toBe("");

    expect(
      calculateConversion({
        value: "1",
        fromUnit: "unknown",
        toUnit: "cm",
        categoryId: "length",
      }),
    ).toBe("");
  });
});

describe("formatOutputDisplay", () => {
  it("formats a number with grouping and at most four decimal places", () => {
    expect(formatOutputDisplay(12345.67891)).toBe(
      (12345.67891).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 4,
        useGrouping: true,
      }),
    );
  });

  it("displays empty and invalid values as zero", () => {
    expect(formatOutputDisplay("")).toBe("0");
    expect(formatOutputDisplay("invalid")).toBe("0");
  });
});
