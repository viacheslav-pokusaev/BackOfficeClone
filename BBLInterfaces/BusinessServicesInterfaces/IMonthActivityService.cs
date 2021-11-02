using Application.EntitiesModels.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.BBLInterfaces.BusinessServicesInterfaces
{
    public interface IMonthActivityService
    {
        List<List<MonthActivityModel>> GetAllVacationsFromSheet();
        bool UpdateVacationOnSheet(MonthActivityModel vacations);
    }
}
