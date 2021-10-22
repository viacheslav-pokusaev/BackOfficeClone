using Application.EntitiesModels.Models;
using System.Collections.Generic;
using Application.EntitiesModels.Models.QueryModels;

namespace Application.BBLInterfaces.BusinessServicesInterfaces
{
    public interface IProjectService
    {
        ProjectModel Add(ProjectModel model);

        ProjectModel Update(ProjectModel model);

        bool Delete(int id);

        ProjectQueryModel GetAll(ProjectQueryModel queryModel);

        ProjectModel GetById(int id);
    }
}
