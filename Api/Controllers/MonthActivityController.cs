using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Models.MonthActivityModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Api.Controllers
{
    public class MonthActivityController : ApplicationApiController
    {
        private readonly IMonthActivityService _vacationsTableService;
        public MonthActivityController(IMonthActivityService vacationsTableService)
        {
            _vacationsTableService = vacationsTableService;
        }
        //[Authorize(Roles = "Admin, Super_Admin")]
        [HttpPost]
        [Route("api/vacations-table/all")]
        public IActionResult Get([FromBody]MonthActivityGetModel getModel)
        {
            return InvokeMethodWithParam(_vacationsTableService.GetAllVacationsFromSheet, getModel);
        }
        [HttpPut]
        [Route("api/vacations-table/edit")]
        public IActionResult Edit([FromBody]MonthActivityEditModel vacation)
        {
            return InvokeMethodWithParam(_vacationsTableService.UpdateVacationOnSheet, vacation);
        }
    }
}
