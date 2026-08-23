using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OmniConvert.Backend.Services
{
    public class ConversionEngineService : IConversionEngineService
    {
        private readonly IFinanceRateService _financeRateService;

        private static readonly Dictionary<string, Dictionary<string, double>> StaticFactors = new(StringComparer.OrdinalIgnoreCase)
        {
            ["length"] = new(StringComparer.OrdinalIgnoreCase)
            {
                ["in"] = 0.0254,
                ["cm"] = 0.01,
                ["mm"] = 0.001,
                ["m"] = 1.0,
                ["km"] = 1000.0,
                ["mi"] = 1609.344,
                ["yd"] = 0.9144,
                ["ft"] = 0.3048
            },
            ["weight"] = new(StringComparer.OrdinalIgnoreCase)
            {
                ["kg"] = 1.0,
                ["g"] = 0.001,
                ["lb"] = 0.45359237,
                ["oz"] = 0.028349523
            },
            ["volume"] = new(StringComparer.OrdinalIgnoreCase)
            {
                ["litres"] = 1.0,
                ["ml"] = 0.001,
                ["gal_us"] = 3.78541,
                ["cup"] = 0.236588
            },
            ["digital"] = new(StringComparer.OrdinalIgnoreCase)
            {
                ["bits"] = 0.125,
                ["bytes"] = 1.0,
                ["kb"] = 1000.0,
                ["kib"] = 1024.0,
                ["mb"] = 1000000.0,
                ["gb"] = 1000000000.0
            }
        };

        public ConversionEngineService(IFinanceRateService financeRateService)
        {
            _financeRateService = financeRateService;
        }

        public async Task<double> CalculateAsync(string categoryId, double value, string fromUnit, string toUnit)
        {
            double rawResult = value;

            if (string.Equals(categoryId, "finance", StringComparison.OrdinalIgnoreCase))
            {
                var rates = await _financeRateService.GetLiveRatesAsync();
                double fromRate = rates.GetValueOrDefault(fromUnit.ToUpperInvariant(), 1.0);
                double toRate = rates.GetValueOrDefault(toUnit.ToUpperInvariant(), 1.0);
                if (fromRate == 0) fromRate = 1.0;
                rawResult = (value / fromRate) * toRate;
            }
            else if (string.Equals(categoryId, "temperature", StringComparison.OrdinalIgnoreCase))
            {
                double celsius = fromUnit.ToLowerInvariant() switch
                {
                    "c" => value,
                    "f" => (value - 32.0) * 5.0 / 9.0,
                    "k" => value - 273.15,
                    _ => value
                };

                rawResult = toUnit.ToLowerInvariant() switch
                {
                    "c" => celsius,
                    "f" => (celsius * 9.0 / 5.0) + 32.0,
                    "k" => celsius + 273.15,
                    _ => value
                };
            }
            else if (StaticFactors.TryGetValue(categoryId, out var units))
            {
                double fromFactor = units.GetValueOrDefault(fromUnit, 1.0);
                double toFactor = units.GetValueOrDefault(toUnit, 1.0);
                if (toFactor == 0) toFactor = 1.0;
                rawResult = (value * fromFactor) / toFactor;
            }

            // Round result to 3 significant figures unless it's an exact integer
            if (rawResult == 0.0) return 0.0;
            if (Math.Abs(rawResult - Math.Round(rawResult)) < 1e-9)
            {
                return Math.Round(rawResult);
            }
            double digits = Math.Floor(Math.Log10(Math.Abs(rawResult)));
            double scale = Math.Pow(10, 2 - digits);
            return Math.Round(rawResult * scale) / scale;
        }

        public string FormatOutput(double value, int precision = 3)
        {
            if (value == 0.0) return "0";
            if (Math.Abs(value - Math.Round(value)) < 1e-9)
            {
                return Math.Round(value).ToString("N0");
            }
            double digits = Math.Floor(Math.Log10(Math.Abs(value)));
            int decimalPlaces = Math.Max(0, (int)(-digits + 2));
            return value.ToString("N" + Math.Min(decimalPlaces, 10));
        }
    }
}
