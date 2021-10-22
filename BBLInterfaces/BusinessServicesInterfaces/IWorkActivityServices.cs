using Application.EntitiesModels.Models.Pegination;
using Application.EntitiesModels.Models.QueryModels;
using Application.EntitiesModels.Models;

namespace Application.BBLInterfaces.BusinessServicesInterfaces
{
    public interface IWorkActivityServices
    {
        WorkActivityQueryModel GetWorkActivities(WorkActivityQueryModel queryModel);
    }
}
