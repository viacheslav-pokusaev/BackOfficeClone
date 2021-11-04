using Application.EntitiesModels.Models;
using Google.Apis.Sheets.v4;
using System.Collections.Generic;

namespace Application.BBLInterfaces.BusinessServicesInterfaces
{
    public interface IMonthActivityService
    {
        MonthActivityVewModel GetAllVacationsFromSheet(string sheetName);
        bool UpdateVacationOnSheet(MonthActivityModel vacations);
    }
}
