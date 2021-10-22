using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Models;
using Application.EntitiesModels.Models.QueryModels;
using Application.EntitiesModels.Models.Pegination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Application.Api.Controllers
{
    public class WorkActivityController : ApplicationApiController
    {
        private IWorkActivityServices _workActivityServices;

        public WorkActivityController(IWorkActivityServices workActivityServices)
        {
            _workActivityServices = workActivityServices;
        }

        [HttpPost]
        [Authorize]
        [Route("api/workactivities/all")]
        public IActionResult GetWorkActivities([FromBody] WorkActivityQueryModel model)
        {
            return InvokeMethodWithParam(_workActivityServices.GetWorkActivities, model);
        }
    }
}
