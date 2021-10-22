using Application.EntitiesModels.Models;
using System.Collections.Generic;
using Application.EntitiesModels.Models.QueryModels;

namespace Application.BBLInterfaces.BusinessServicesInterfaces
{
    public interface IClientService
    {
        ClientModel Add(ClientModel model);

        ContactPersonModel AddContactPerson(ContactPersonModel model);

        ClientModel Update(ClientModel model);

        bool Delete(int id);

        ClientQueryModel GetAll(ClientQueryModel queryModel);

        ClientModel GetById(int id);

        ContactPersonModel UpdateContactPerson(ContactPersonModel model);

        bool DeleteContactPerson(int id);
    }
}
