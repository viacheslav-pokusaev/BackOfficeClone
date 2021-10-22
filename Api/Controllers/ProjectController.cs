using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Models;
using Application.EntitiesModels.Models.QueryModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Application.Api.Controllers
{
    public class ProjectController : ApplicationApiController
    {
        private IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [Authorize(Roles = "Admin, Super_Admin, ProjectManager")]
        [HttpPost]
        [Route("api/projects")]
        public IActionResult Create([FromBody]ProjectModel model)
        {
            return InvokeMethodWithParam(_projectService.Add, model);
        }

        [Authorize]
        [HttpPost]
        [Route("api/projects/all")]
        public IActionResult Get([FromBody]ProjectQueryModel queryModel)
        {
            return InvokeMethodWithParam(_projectService.GetAll, queryModel);
        }

        [Authorize]
        [HttpGet]
        [Route("api/projects/{id}")]
        public IActionResult GetById(int id)
        {
            return InvokeMethodWithParam(_projectService.GetById, id);
        }

        [Authorize(Roles = "Admin, Super_Admin, ProjectManager")]
        [HttpDelete]
        [Route("api/projects/{id}")]
        public IActionResult Delete(int id)
        {
            return InvokeMethodWithParam(_projectService.Delete, id);
        }

        [Authorize(Roles = "Admin, Super_Admin, ProjectManager")]
        [HttpPut]
        [Route("api/projects")]
        public IActionResult Update([FromBody]ProjectModel model)
        {
            return InvokeMethodWithParam(_projectService.Update, model);
        }
    }
}
