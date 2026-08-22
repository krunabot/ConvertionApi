using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;

namespace OmniConvert.Backend.Services
{
    /// <summary>
    /// Service responsible for fetching, caching, and normalizing live financial exchange rates (Fiat from Frankfurter API and Cryptocurrencies from CoinGecko API) relative to GBP base.
    /// </summary>
    public class FinanceRateService : IFinanceRateService
    {
        private readonly HttpClient _httpClient;
        private readonly IMemoryCache _cache;
        private readonly ILogger<FinanceRateService> _logger;
        private const string CacheKey = "LiveFinanceRatesCache";
        private static readonly TimeSpan CacheDuration = TimeSpan.FromMinutes(10);

        public FinanceRateService(HttpClient httpClient, IMemoryCache cache, ILogger<FinanceRateService> logger)
        {
            _httpClient = httpClient;
            _cache = cache;
            _logger = logger;
            // Set a standard user agent header to comply with external API requirements
            _httpClient.DefaultRequestHeaders.UserAgent.ParseAdd("OmniConvertBackend/1.0");
        }

        /// <summary>
        /// Retrieves live finance rates asynchronously. Utilizes memory caching to minimize external API calls and handles rate conversion against GBP base.
        /// </summary>
        public async Task<Dictionary<string, double>> GetLiveRatesAsync()
        {
            // Check if cached rates exist in memory cache to avoid redundant network requests within CacheDuration
            if (_cache.TryGetValue(CacheKey, out Dictionary<string, double>? cachedRates) && cachedRates != null)
            {
                return cachedRates;
            }

            try
            {
                // 1. Fetch fiat rates from Frankfurter API (Base EUR)
                var fiatItems = await _httpClient.GetFromJsonAsync<List<FrankfurterRateItem>>("https://api.frankfurter.dev/v2/rates?base=EUR");
                
                // 2. Fetch live crypto prices in GBP from CoinGecko API
                var cryptoResponse = await _httpClient.GetFromJsonAsync<CoinGeckoResponse>("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=gbp");

                // Map Frankfurter fiat rate items into a lookup dictionary
                var fiatDict = new Dictionary<string, double>(StringComparer.OrdinalIgnoreCase);
                if (fiatItems != null)
                {
                    foreach (var item in fiatItems)
                    {
                        if (!string.IsNullOrEmpty(item.Quote))
                        {
                            fiatDict[item.Quote] = item.Rate;
                        }
                    }
                }

                // Determine EUR to GBP conversion factor (defaulting to 0.85 if missing)
                double eurToGbp = fiatDict.GetValueOrDefault("GBP", 0.85);
                if (eurToGbp <= 0) eurToGbp = 0.85;

                if (fiatDict.Count > 0)
                {
                    // Construct normalized exchange rate dictionary with GBP as base (1.0)
                    var rates = new Dictionary<string, double>(StringComparer.OrdinalIgnoreCase)
                    {
                        ["GBP"] = 1.0,
                        ["EUR"] = Math.Round(1.0 / eurToGbp, 4)
                    };

                    // Dynamically map all live fiat quotes returned from Frankfurter API converted to GBP base
                    foreach (var (quote, rate) in fiatDict)
                    {
                        if (string.Equals(quote, "GBP", StringComparison.OrdinalIgnoreCase)) continue;
                        if (string.Equals(quote, "EUR", StringComparison.OrdinalIgnoreCase)) continue;
                        
                        // Convert EUR-based rate to GBP-based rate: (EUR -> Quote) / (EUR -> GBP)
                        int precision = string.Equals(quote, "JPY", StringComparison.OrdinalIgnoreCase) ? 2 : 4;
                        rates[quote.ToUpperInvariant()] = Math.Round(rate / eurToGbp, precision);
                    }

                    // Extract cryptocurrency prices in GBP (falling back to market defaults if API response fields are null)
                    double btcGbp = cryptoResponse?.Bitcoin?.Gbp ?? 85000.0;
                    double ethGbp = cryptoResponse?.Ethereum?.Gbp ?? 3200.0;
                    double solGbp = cryptoResponse?.Solana?.Gbp ?? 130.0;

                    // Store crypto rates (units of coin per 1 GBP, retaining high precision for micro-values like Bitcoin)
                    rates["BTC"] = btcGbp > 0 ? Math.Round(1.0 / btcGbp, 8) : 0.000016;
                    rates["ETH"] = ethGbp > 0 ? Math.Round(1.0 / ethGbp, 8) : 0.00038;
                    rates["SOL"] = solGbp > 0 ? Math.Round(1.0 / solGbp, 6) : 0.0076;

                    // Store rates in memory cache for subsequent requests
                    _cache.Set(CacheKey, rates, CacheDuration);
                    return rates;
                }
            }
            catch (Exception ex)
            {
                // Log warning and bubble exception if live feeds are unreachable
                _logger.LogWarning(ex, "Failed to fetch live finance rates from external APIs.");
                throw new InvalidOperationException("Data not available", ex);
            }

            throw new InvalidOperationException("Data not available");
        }

        private class FrankfurterRateItem
        {
            [System.Text.Json.Serialization.JsonPropertyName("date")]
            public string Date { get; set; } = string.Empty;

            [System.Text.Json.Serialization.JsonPropertyName("base")]
            public string Base { get; set; } = string.Empty;

            [System.Text.Json.Serialization.JsonPropertyName("quote")]
            public string Quote { get; set; } = string.Empty;

            [System.Text.Json.Serialization.JsonPropertyName("rate")]
            public double Rate { get; set; }
        }

        private class CoinGeckoResponse
        {
            [System.Text.Json.Serialization.JsonPropertyName("bitcoin")]
            public CryptoCoin? Bitcoin { get; set; }

            [System.Text.Json.Serialization.JsonPropertyName("ethereum")]
            public CryptoCoin? Ethereum { get; set; }

            [System.Text.Json.Serialization.JsonPropertyName("solana")]
            public CryptoCoin? Solana { get; set; }
        }

        private class CryptoCoin
        {
            [System.Text.Json.Serialization.JsonPropertyName("gbp")]
            public double Gbp { get; set; }
        }
    }
}
