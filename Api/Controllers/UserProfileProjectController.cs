using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Models;
using Application.EntitiesModels.Models.QueryModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Application.Api.Controllers
{
    public class UserProfileProjectController : ApplicationApiController
    {
        private IUserProfileProjectService _userProfileProjectService;

        public UserProfileProjectController(IUserProfileProjectService userProfileProjectService)
        {
            _userProfileProjectService = userProfileProjectService;
        }

        [Authorize]
        [HttpPost]
        [Route("api/emploees/all")]
        public IActionResult GetAll([FromBody]UserProfileProjectQueryModel model)
        {
            return InvokeMethodWithParam(_userProfileProjectService.GetAll, model);
        }

        [Authorize(Roles = "Admin, Super_Admin, ProjectManager")]
        [HttpPut]
        [Route("api/emploees")]
        public IActionResult Update([FromBody]UserProfileProjectModel model)
        {
            return InvokeMethodWithParam(_userProfileProjectService.UpdateEmploee, model);
        }

        [Authorize(Roles = "Admin, Super_Admin, ProjectManager")]
        [HttpPost]
        [Route("api/emploees")]
        public IActionResult Create([FromBody]UserProfileProjectModel model)
        {
            return InvokeMethodWithParam(_userProfileProjectService.AddEmploee, model);
        }

        [Authorize(Roles = "Admin, Super_Admin, ProjectManager")]
        [HttpDelete]
        [Route("api/emploees/{id}")]
        public IActionResult Delete(int id)
        {
            return InvokeMethodWithParam(_userProfileProjectService.DeleteEmploee, id);
        }

        [Authorize]
        [HttpGet]
        [Route("api/emploees/{id}")]
        public IActionResult GetById(int id)
        {
            return InvokeMethodWithParam(_userProfileProjectService.GetEmploeeById, id);
        }
    }
}
