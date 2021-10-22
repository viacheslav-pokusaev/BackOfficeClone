using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Models.AccountModels;
using Application.EntitiesModels.Models.QueryModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Application.Api.Controllers
{
    public class RequestToCreateUserController : ApplicationApiController
    {
        private IRequestToCreateUserServices _requestToCreateUserServices;

        public RequestToCreateUserController (IRequestToCreateUserServices requestToCreateUserServices)
        {
            _requestToCreateUserServices = requestToCreateUserServices;
        }

        [HttpPost]
        [Route("api/Registration")]
        public IActionResult Add([FromBody]RequestToCreateUserViewModel model)
        {
            return InvokeMethodWithParam(_requestToCreateUserServices.Add, model);
        }

        [Authorize(Roles = "Admin, Super_Admin, HumanResource")]
        [HttpPost]
        [Route("api/Proposals/all")]
        public IActionResult Get([FromBody]RequestToCreateUserQueryModel queryModel)
        {
            return InvokeMethodWithParam(_requestToCreateUserServices.GetAll, queryModel);
        }

        //[Authorize(Roles = "Admin")]
        //[HttpGet]
        //[Route("api/Proposal/{id}")]
        //public IActionResult GetById(int id)
        //{
        //    return InvokeMethodWithParam(_requestToCreateUserServices.GetById, id);
        //}


        [Authorize(Roles = "Admin, Super_Admin, HumanResource")]
        [HttpDelete]
        [Route("api/Proposals/{id}")]
        public IActionResult Delete(int id)
        {
            return InvokeMethodWithParam(_requestToCreateUserServices.Delete, id);
        }

        [Authorize(Roles = "Admin, Super_Admin, HumanResource")]
        [HttpPost]
        [Route("api/Proposals")]
        public IActionResult TransferToUser([FromBody]RequestToCreateUserViewModel model)
        {
            return InvokeMethodWithParam(_requestToCreateUserServices.TransferToUser, model);
        }
    }
}
