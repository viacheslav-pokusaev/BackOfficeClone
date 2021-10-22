using Application.EntitiesModels.Models;
using Application.EntitiesModels.Models.QueryModels;
using System.Collections.Generic;

namespace Application.BBLInterfaces.BusinessServicesInterfaces
{
    public interface IOvertimeServices
    {
        OvertimeModel Add(OvertimeModel model);

        OvertimeModel Update(OvertimeModel model);

        bool Delete(int id);

        OvertimeQueryModel GetAll(OvertimeQueryModel querymodel);

        OvertimeModel GetById(int id);
    }
}
