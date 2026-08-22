using System.Collections.Generic;
using System.Threading.Tasks;

namespace OmniConvert.Backend.Services
{
    public interface IFinanceRateService
    {
        Task<Dictionary<string, double>> GetLiveRatesAsync();
    }
}
