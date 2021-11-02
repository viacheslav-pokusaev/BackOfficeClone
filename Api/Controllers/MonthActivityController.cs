using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Models;
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
        [HttpGet]
        [Route("api/vacations-table/all")]
        public IActionResult Get()
        {
            return InvokeMethodWithoutParam(_vacationsTableService.GetAllVacationsFromSheet);
        }
        [HttpPut]
        [Route("api/vacations-table/edit")]
        public IActionResult Edit([FromBody]MonthActivityModel vacation)
        {
            return InvokeMethodWithParam(_vacationsTableService.UpdateVacationOnSheet, vacation);
        }
    }
}
