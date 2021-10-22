using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Api.Controllers
{
    [Authorize(Roles = "Admin, Super_Admin, ProjectManager, HumanResource")]
    [Route("api/feedback")]
    public class FeedbackController : ApplicationApiController
    {
        private IFeedbackService _feedbackService;

        public FeedbackController(IFeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        [Authorize]
        [HttpPost]
        [Route("add")]
        public IActionResult Add([FromBody]FeedbackViewModel model)
        {
            return InvokeMethodWithParam(_feedbackService.Add, model);
        }

        [Authorize]
        [HttpGet]
        [Route("{id}")]
        public IActionResult Get(int id)
        {
            return InvokeMethodWithParam(_feedbackService.GetById, id);
        }

        [Authorize]
        [HttpGet]
        [Route("user/{id}")]
        public IActionResult GetUserFeedbacks(int id)
        {
            return InvokeMethodWithParam(_feedbackService.GetByUserId, id);
        }

        [Authorize]
        [HttpDelete]
        [Route("remove/{id}")]
        public IActionResult Delete (int id)
        {
            return InvokeMethodWithParam(_feedbackService.Remove, id);
        }

        [Authorize]
        [HttpPut]
        [Route("update")]
        public IActionResult Update([FromBody]FeedbackViewModel model)
        {
            return InvokeMethodWithParam(_feedbackService.Update, model);
        }
    }
}
