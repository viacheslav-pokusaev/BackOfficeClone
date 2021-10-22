using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Models;
using Application.EntitiesModels.Models.QueryModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Application.Api.Controllers
{
    public class AuditTrailController : ApplicationApiController
    {
        private IAuditTrailService _auditTrailService;

        public AuditTrailController(IAuditTrailService auditTrailService)
        {
            _auditTrailService = auditTrailService;
        }

        [Authorize(Roles = "Admin, Super_Admin")]
        [HttpPost]
        [Route("api/audit/all")]
        public IActionResult Get([FromBody]AuditTrailQueryModel model)
        {
            return InvokeMethodWithParam(_auditTrailService.GetAuditTrailEntityModels, model);
        }
    }
}
