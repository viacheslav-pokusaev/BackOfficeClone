using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Models;
using Application.EntitiesModels.Models.QueryModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Application.Api.Controllers
{
    public class WorkAtHomeController : ApplicationApiController
    {
        private IWorkAtHomeService _workAtHomeService;

        public WorkAtHomeController(IWorkAtHomeService workAtHomeService)
        {
            _workAtHomeService = workAtHomeService;
        }

        [Authorize]
        [HttpPost]
        [Route("api/workathome")]
        public IActionResult Create([FromBody]WorkAtHomeModel model)
        {
            return InvokeMethodWithParam(_workAtHomeService.Add, model);
        }

        [Authorize]
        [HttpPost]
        [Route("api/workathome/all")]
        public IActionResult Get([FromBody]WorkAtHomeQueryModel queryModel)
        {
            return InvokeMethodWithParam(_workAtHomeService.GetAll, queryModel);
        }

        [Authorize]
        [HttpGet]
        [Route("api/workathome/{id}")]
        public IActionResult GetById(int id)
        {
            return InvokeMethodWithParam(_workAtHomeService.GetById, id);
        }

        [Authorize]
        [HttpDelete]
        [Route("api/workathome/{id}")]
        public IActionResult Delete(int id)
        {
            return InvokeMethodWithParam(_workAtHomeService.Delete, id);
        }

        [Authorize]
        [HttpPut]
        [Route("api/workathome")]
        public IActionResult Update([FromBody]WorkAtHomeModel model)
        {
            return InvokeMethodWithParam(_workAtHomeService.Update, model);
        }
    }
}
