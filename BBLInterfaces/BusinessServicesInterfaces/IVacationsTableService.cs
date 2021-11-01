using Application.EntitiesModels.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.BBLInterfaces.BusinessServicesInterfaces
{
    public interface IVacationsTableService
    {
        List<VacationsTableModel> GetAllVacationsFromSheet();
        void UpdateVacationOnSheet(VacationsTableModel vacations);
    }
}
