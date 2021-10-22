using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Models;
using Application.EntitiesModels.Models.QueryModels;
using Application.EntitiesModels.Models.Pegination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Application.Api.Controllers
{
    public class UsersController : ApplicationApiController
    {
        private IUserViewServices _userViewServices;

        public UsersController(IUserViewServices userInfoServices)
        {
            _userViewServices = userInfoServices;
        }

        [Authorize]
        [HttpPost]
        [Route("api/Users")]
        public IActionResult Create([FromBody]UserViewModel model)
        {
            return InvokeMethodWithParam(_userViewServices.Add, model);
        }

        [Authorize]
        [HttpPost] 
        [Route("api/Users/all")]
        public IActionResult Get([FromBody]UserViewQueryModel queryModel)
        {
            return InvokeMethodWithParam(_userViewServices.GetAll, queryModel);
        }

        [Authorize]
        [HttpGet]
        [Route("api/Users/{id}")]
        public IActionResult GetById(int id)
        {
            return InvokeMethodWithParam(_userViewServices.GetById, id);
        }


        [Authorize(Roles = "Admin, Super_Admin")]
        [HttpDelete]
        [Route("api/Users/{id}")]
        public IActionResult Delete(int id)
        {
            return InvokeMethodWithParam(_userViewServices.Delete, id);
        }

        [Authorize]
        [HttpPut]
        [Route("api/Users")]
        public IActionResult Update([FromBody]UserViewModel model)
        {
            return InvokeMethodWithParam(_userViewServices.Update, model);
        }

        [Authorize]
        [HttpPost]
        [Route("api/Users/ChangePassword")]
        public IActionResult ChangePassword([FromBody]ChangePasswordViewModel model)
        {
            return InvokeMethodWithParam(_userViewServices.ChangePassword, model);
        }

        [Authorize]
        [HttpGet]
        [Route("api/Users/GetCurentUser")]
        public IActionResult GetCurentUser()
        {
            string email = HttpContext.User.Identity.Name;
            return InvokeMethodWithParam(_userViewServices.GetByEmail, email);
        }

        [Authorize]
        [HttpPost]
        [Route("api/Users/GetVacationDay")]
        public IActionResult GetVacationDays([FromBody]ListVacationQueryModel model)
        {
            return InvokeMethodWithParam(_userViewServices.GetVacationDays, model);
        }

        [Authorize]
        [HttpGet]
        [Route("api/Users/SignOut")]
        public IActionResult SingOut()
        {
            return InvokeMethodWithoutParam(_userViewServices.Logout);
        }

        [Authorize(Roles = "Admin, Super_Admin")]
        [HttpPost]
        [Route("api/Users/GetRequestsToUpdatePasswords")]
        public IActionResult GetRequestsToUpdatePasswords(RequestToUpdatePasswordQueryModel model)
        {
            return InvokeMethodWithParam(_userViewServices.GetAllRequestsToUpdatePassword, model);
        }

    }
}
