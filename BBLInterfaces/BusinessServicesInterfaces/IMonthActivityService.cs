using Application.EntitiesModels.Models;
using Google.Apis.Sheets.v4;
using System.Collections.Generic;

namespace Application.BBLInterfaces.BusinessServicesInterfaces
{
    public interface IMonthActivityService
    {
        List<List<MonthActivityModel>> GetAllVacationsFromSheet();
        bool UpdateVacationOnSheet(MonthActivityModel vacations);
    }
}
