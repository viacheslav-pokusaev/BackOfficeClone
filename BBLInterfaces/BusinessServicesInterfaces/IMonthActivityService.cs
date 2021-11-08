﻿using Application.EntitiesModels.Models.MonthActivityModels;
using Google.Apis.Sheets.v4;
using System.Collections.Generic;

namespace Application.BBLInterfaces.BusinessServicesInterfaces
{
    public interface IMonthActivityService
    {
        MonthActivityVewModel GetAllVacationsFromSheet(MonthActivityGetModel getModel);
        bool UpdateVacationOnSheet(MonthActivityModel vacations);
    }
}
