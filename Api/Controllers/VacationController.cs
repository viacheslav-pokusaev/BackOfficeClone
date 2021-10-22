using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Models;
using Application.EntitiesModels.Models.QueryModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Application.Api.Controllers
{
    public class VacationController : ApplicationApiController
    {
        private IVacationServices _vacationServices;

        public VacationController(IVacationServices vacationServices)
        {
            _vacationServices = vacationServices;
        }

        [Authorize]
        [HttpPost]
        [Route("api/vacations")]
        public IActionResult Create([FromBody]VacationModel model)
        {
            return InvokeMethodWithParam(_vacationServices.Add, model);
        }

        [Authorize]
        [HttpPost]
        [Route("api/vacations/all")]
        public IActionResult Get([FromBody]VacationQueryModel queryModel)
        {
            return InvokeMethodWithParam(_vacationServices.GetAll, queryModel);
        }

        [Authorize]
        [HttpGet]
        [Route("api/vacations/{id}")]
        public IActionResult GetById(int id)
        {
            return InvokeMethodWithParam(_vacationServices.GetById, id);
        }

        [Authorize]
        [HttpDelete]
        [Route("api/vacations/{id}")]
        public IActionResult Delete(int id)
        {
            return InvokeMethodWithParam(_vacationServices.Delete, id);
        }

        [Authorize]
        [HttpPut]
        [Route("api/vacations")]
        public IActionResult Update([FromBody]VacationModel model)
        {
            return InvokeMethodWithParam(_vacationServices.Update, model);
        }
    }
}
