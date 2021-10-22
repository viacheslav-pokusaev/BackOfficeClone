using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Models;
using Application.EntitiesModels.Models.QueryModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Application.Api.Controllers
{
    public class SizeVacationController : ApplicationApiController
    {
        private ISizeVacationServices _sizeVacationServices;

        public SizeVacationController(ISizeVacationServices sizeVacationServices)
        {
            _sizeVacationServices = sizeVacationServices;
        }

        [Authorize(Roles = "Admin, Super_Admin")]
        [HttpPost]
        [Route("api/sizevacations")]
        public IActionResult Create([FromBody]SizeVacationModel model)
        {
            return InvokeMethodWithParam(_sizeVacationServices.Add, model);
        }

        [Authorize]
        [HttpPost]
        [Route("api/sizevacations/all")]
        public IActionResult Get([FromBody]SizeVacationQueryModel queryModel)
        {
            return InvokeMethodWithParam(_sizeVacationServices.GetAll, queryModel);
        }

        [Authorize]
        [HttpGet]
        [Route("api/sizevacations/{id}")]
        public IActionResult GetById(int id)
        {
            return InvokeMethodWithParam(_sizeVacationServices.GetById, id);
        }


        [Authorize(Roles = "Admin, Super_Admin")]
        [HttpDelete]
        [Route("api/sizevacations/{id}")]
        public IActionResult Delete(int id)
        {
            return InvokeMethodWithParam(_sizeVacationServices.Delete, id);
        }

        [Authorize(Roles = "Admin, Super_Admin")]
        [HttpPut]
        [Route("api/sizevacations")]
        public IActionResult Update([FromBody]SizeVacationModel model)
        {
            return InvokeMethodWithParam(_sizeVacationServices.Update, model);
        }
    }
}
