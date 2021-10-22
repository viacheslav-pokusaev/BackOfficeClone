using Application.EntitiesModels.Models;
using Application.EntitiesModels.Models.QueryModels;
using Application.EntitiesModels.Models.Pegination;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.EntitiesModels.Models.AccountModels;

namespace Application.BBLInterfaces.BusinessServicesInterfaces
{
    public interface IUserViewServices
    {
        UserViewModel Add(UserViewModel model);

        UserViewModel Update(UserViewModel model);

        bool Delete(int id);

        UserViewQueryModel GetAll(UserViewQueryModel queryModel);

        UserViewModel GetById(int id);

        UserViewModel GetByEmail(string email);

        ListVacationQueryModel GetVacationDays(ListVacationQueryModel query);

        int GetCountAvailableVacationDays(int userId);

        ChangePasswordViewModel ChangePassword(ChangePasswordViewModel model);

        bool MakeRequestToUpdatePassword(UpdatePasswordModel model);

        RequestToUpdatePasswordQueryModel GetAllRequestsToUpdatePassword(RequestToUpdatePasswordQueryModel query);

        Task Logout();
    }

}
