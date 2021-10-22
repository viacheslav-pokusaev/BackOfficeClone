using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Models;
using Application.EntitiesModels.Models.QueryModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Application.Api.Controllers
{
    public class OvertimeController : ApplicationApiController
    {
        private IOvertimeServices _overtimeServices;

        public OvertimeController(IOvertimeServices overtimeServices)
        {
            _overtimeServices = overtimeServices;
        }

        [Authorize]
        [HttpPost]
        [Route("api/overtimes")]
        public IActionResult Create([FromBody]OvertimeModel model)
        {
            return InvokeMethodWithParam(_overtimeServices.Add, model);
        }

        [Authorize]
        [HttpPost]
        [Route("api/overtimes/all")]
        public IActionResult Get([FromBody]OvertimeQueryModel queryModel)
        {
            return InvokeMethodWithParam(_overtimeServices.GetAll, queryModel);
        }

        [Authorize]
        [HttpGet]
        [Route("api/overtimes/{id}")]
        public IActionResult GetById(int id)
        {
            return InvokeMethodWithParam(_overtimeServices.GetById, id);
        }

        [Authorize]
        [HttpDelete]
        [Route("api/overtimes/{id}")]
        public IActionResult Delete(int id)
        {
            return InvokeMethodWithParam(_overtimeServices.Delete, id);
        }

        [Authorize]
        [HttpPut]
        [Route("api/overtimes")]
        public IActionResult Update([FromBody]OvertimeModel model)
        {
            return InvokeMethodWithParam(_overtimeServices.Update, model);
        }
    }
}
