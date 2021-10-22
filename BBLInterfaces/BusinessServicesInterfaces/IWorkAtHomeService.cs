using Application.EntitiesModels.Models;
using Application.EntitiesModels.Models.QueryModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.BBLInterfaces.BusinessServicesInterfaces
{
    public interface IWorkAtHomeService
    {
        WorkAtHomeModel Add(WorkAtHomeModel model);

        WorkAtHomeModel Update(WorkAtHomeModel model);

        bool Delete(int id);

        WorkAtHomeQueryModel GetAll(WorkAtHomeQueryModel queryModel);

        WorkAtHomeModel GetById(int id);
    }
}
