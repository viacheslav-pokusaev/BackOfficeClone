using Application.EntitiesModels.Models;
using Application.EntitiesModels.Models.QueryModels;
using System.Collections.Generic;

namespace Application.BBLInterfaces.BusinessServicesInterfaces
{
    public interface IVacationServices
    {
        VacationModel Add(VacationModel model);

        VacationModel Update(VacationModel model);

        bool Delete(int id);

        VacationQueryModel GetAll(VacationQueryModel queryModel);

        VacationModel GetById(int id);
    }
}
