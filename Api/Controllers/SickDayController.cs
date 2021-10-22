using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Models;
using Application.EntitiesModels.Models.QueryModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Application.Api.Controllers
{
    public class SickDayController : ApplicationApiController
    {
        private ISickDayServices _sickDayServices;

        public SickDayController(ISickDayServices sickDayServices)
        {
            _sickDayServices = sickDayServices;
        }

        [Authorize]
        [HttpPost]
        [Route("api/sickdays")]
        public IActionResult Create([FromBody]SickDayModel model)
        {
            return InvokeMethodWithParam(_sickDayServices.Add, model);
        }

        [Authorize]
        [HttpPost]
        [Route("api/sickdays/all")]
        public IActionResult Get([FromBody]SickDayQueryModel queryModel)
        {
            return InvokeMethodWithParam(_sickDayServices.GetAll, queryModel);
        }

        [Authorize]
        [HttpGet]
        [Route("api/sickdays/{id}")]
        public IActionResult GetById(int id)
        {
            return InvokeMethodWithParam(_sickDayServices.GetById, id);
        }

        [Authorize]
        [HttpDelete]
        [Route("api/sickdays/{id}")]
        public IActionResult Delete(int id)
        {
            return InvokeMethodWithParam(_sickDayServices.Delete, id);
        }

        [Authorize]
        [HttpPut]
        [Route("api/sickdays")]
        public IActionResult Update([FromBody]SickDayModel model)
        {
            return InvokeMethodWithParam(_sickDayServices.Update, model);
        }
    }
}
