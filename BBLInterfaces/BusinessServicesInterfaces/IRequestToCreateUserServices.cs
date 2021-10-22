using Application.EntitiesModels.Models.AccountModels;
using Application.EntitiesModels.Models.QueryModels;
using System.Collections.Generic;

namespace Application.BBLInterfaces.BusinessServicesInterfaces
{
    public interface IRequestToCreateUserServices
    {
        RequestToCreateUserViewModel Add(RequestToCreateUserViewModel model);

        bool Delete(int id);

        RequestToCreateUserQueryModel GetAll(RequestToCreateUserQueryModel queryModel);

        RequestToCreateUserViewModel GetById(int id);

        bool IsExistEmail(string email);

        bool TransferToUser(RequestToCreateUserViewModel model);
    }
}
