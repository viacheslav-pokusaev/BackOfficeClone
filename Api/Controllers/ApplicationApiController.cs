using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Application.Api.Controllers
{
    public class ApplicationApiController : Controller
    {
        protected IActionResult InvokeMethodWithoutParam<IN>(Func<IN> method)
        {
            try
            {
                return Ok(method());
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

        }


        protected IActionResult InvokeMethodWithParam<IN, OUT>(Func<IN, OUT> method, IN model)
        {
            try
            {
                return Ok(method(model));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

        }

        protected IActionResult InvokeVoidMethodWithParam<IN, OUT>(Func<IN, OUT> method, IN model)
        {
            try
            {
                method(model);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

        }
    }
}
