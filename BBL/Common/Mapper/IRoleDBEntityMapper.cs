using Application.EntitiesModels.Entities;
using Application.EntitiesModels.Models;

namespace Application.BBL.Mapper
{
    public interface IRoleDBEntityMapper
    {
        UserViewModel MapDBEntity(UserProfile dbModel);
        WorkActivityModel MapDBEntity(Vacation dbModel);
        WorkActivityModel MapDBEntity(Overtime dbModel);
        WorkActivityModel MapDBEntity(SickDay dbModel);
    }
}
