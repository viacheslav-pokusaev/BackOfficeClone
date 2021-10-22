using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Models;
using Application.EntitiesModels.Models.QueryModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Application.Api.Controllers
{
    [Authorize(Roles = "Admin, Super_Admin, ProjectManager")]
    public class ClientController : ApplicationApiController
    {
        private IClientService _clientService;

        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }

        [Authorize]
        [HttpPost]
        [Route("api/clients")]
        public IActionResult Create([FromBody]ClientModel model)
        {
            return InvokeMethodWithParam(_clientService.Add, model);
        }

        [Authorize]
        [HttpPost]
        [Route("api/clients/all")]
        public IActionResult Get([FromBody]ClientQueryModel queryModel)
        {
            return InvokeMethodWithParam(_clientService.GetAll, queryModel);
        }

        [Authorize]
        [HttpGet]
        [Route("api/clients/{id}")]
        public IActionResult GetById(int id)
        {
            return InvokeMethodWithParam(_clientService.GetById, id);
        }

        [Authorize]
        [HttpDelete]
        [Route("api/clients/{id}")]
        public IActionResult Delete(int id)
        {
            return InvokeMethodWithParam(_clientService.Delete, id);
        }

        [Authorize]
        [HttpPut]
        [Route("api/clients")]
        public IActionResult Update([FromBody]ClientModel model)
        {
            return InvokeMethodWithParam(_clientService.Update, model);
        }

        [Authorize]
        [HttpPut]
        [Route("api/contact_persons")]
        public IActionResult UpdateContactPerson([FromBody]ContactPersonModel contactPersonModel)
        {
            return InvokeMethodWithParam(_clientService.UpdateContactPerson, contactPersonModel);
        }

        [Authorize]
        [HttpPost]
        [Route("api/contact_persons")]
        public IActionResult CreateContactPerson([FromBody]ContactPersonModel contactPersonModel)
        {
            return InvokeMethodWithParam(_clientService.AddContactPerson, contactPersonModel);
        }

        [Authorize]
        [HttpDelete]
        [Route("api/contact_persons/{id}")]
        public IActionResult DeleteContactPerson(int id)
        {
            return InvokeMethodWithParam(_clientService.DeleteContactPerson, id);
        }
    }
}
