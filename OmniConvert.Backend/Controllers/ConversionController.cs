using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OmniConvert.Backend.DTOs;
using OmniConvert.Backend.Services;

namespace OmniConvert.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConversionController : ControllerBase
    {
        private readonly IConversionEngineService _conversionEngine;
        private readonly IFinanceRateService _financeRateService;

        public ConversionController(IConversionEngineService conversionEngine, IFinanceRateService financeRateService)
        {
            _conversionEngine = conversionEngine;
            _financeRateService = financeRateService;
        }

        [HttpPost]
        public async Task<ActionResult<ConversionResponseDto>> Convert([FromBody] ConversionRequestDto request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.CategoryId))
            {
                return BadRequest(new { message = "Invalid conversion request parameters." });
            }

            double result = await _conversionEngine.CalculateAsync(request.CategoryId, request.Value, request.FromUnit, request.ToUnit);
            string formatted = _conversionEngine.FormatOutput(result);

            var response = new ConversionResponseDto
            {
                CategoryId = request.CategoryId,
                InputValue = request.Value,
                FromUnit = request.FromUnit,
                ToUnit = request.ToUnit,
                Result = result,
                FormattedResult = formatted
            };

            return Ok(response);
        }

        [HttpGet("rates")]
        public async Task<ActionResult> GetLiveRates()
        {
            try
            {
                var rates = await _financeRateService.GetLiveRatesAsync();
                if (rates == null || rates.Count == 0)
                {
                    return StatusCode(503, new { message = "Data not available" });
                }
                return Ok(rates);
            }
            catch (Exception ex)
            {
                return StatusCode(503, new { message = "Data not available", error = ex.Message });
            }
        }
    }
}
