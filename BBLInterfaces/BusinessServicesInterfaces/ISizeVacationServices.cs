using Application.EntitiesModels.Models;
using Application.EntitiesModels.Models.QueryModels;
using System.Collections.Generic;

namespace Application.BBLInterfaces.BusinessServicesInterfaces
{
    public interface ISizeVacationServices
    {
        SizeVacationModel Add(SizeVacationModel model);

        SizeVacationModel Update(SizeVacationModel model);

        bool Delete(int id);

        SizeVacationQueryModel GetAll(SizeVacationQueryModel queryModel);

        SizeVacationModel GetById(int id);
    }
}
