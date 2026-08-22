using System.Threading.Tasks;
using OmniConvert.Backend.Models;

namespace OmniConvert.Backend.Services
{
    public interface IConversionEngineService
    {
        Task<double> CalculateAsync(string categoryId, double value, string fromUnit, string toUnit);
        string FormatOutput(double value, int precision = 6);
    }
}
