using Application.EntitiesModels.Models;
using System.Collections.Generic;
using Application.EntitiesModels.Models.QueryModels;

namespace Application.BBLInterfaces.BusinessServicesInterfaces
{
    public interface ISickDayServices
    {
        SickDayModel Add(SickDayModel model);

        SickDayModel Update(SickDayModel model);

        bool Delete(int id);

        SickDayQueryModel GetAll(SickDayQueryModel queryModel);

        SickDayModel GetById(int id);
    }
}
