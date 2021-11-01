﻿using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Api.Controllers
{
    public class VacationsTableController : ApplicationApiController
    {
        private readonly IVacationsTableService _vacationsTableService;
        public VacationsTableController(IVacationsTableService vacationsTableService)
        {
            _vacationsTableService = vacationsTableService;
        }
        //[Authorize(Roles = "Admin, Super_Admin")]
        [HttpPost]
        [Route("api/vacations-table/all")]
        public IActionResult Get()
        {
            return InvokeMethodWithoutParam(_vacationsTableService.GetAllVacationsFromSheet);
        }
        [HttpPut]
        [Route("api/vacations-table/edit")]
        public IActionResult Edit([FromBody]VacationsTableModel vacation)
        {
            return InvokeMethodWithParam(_vacationsTableService.UpdateVacationOnSheet, vacation);
        }
    }
}
