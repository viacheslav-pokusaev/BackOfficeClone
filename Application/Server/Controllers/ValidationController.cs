using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Application.EntitiesModels.Entities;
using Microsoft.AspNetCore.Http;
using Application.BBLInterfaces.BusinessServicesInterfaces;
using System.Linq;
using Application.Server.Utilities;

namespace Application.Server.Controllers
{
    public class ValidationController : Controller
    {
        private readonly IRequestToCreateUserServices _requestToCreateUserServices;
        private readonly UserManager<ApplicationUser> _userManage;

        public ValidationController(IRequestToCreateUserServices requestToCreateUserServices,
            UserManager<ApplicationUser> userManage)
        {
            _requestToCreateUserServices = requestToCreateUserServices;
            _userManage = userManage;
        }

        [AllowAnonymous]
        public virtual IActionResult VerifyEmailInUse(string email)
        {
            var isEmailInUse = _requestToCreateUserServices.IsExistEmail(email.ToLower()) || (_userManage.Users.Any(u => u.Email == email));
            if (!isEmailInUse)
                return Json(true);
            else
                return Json("The specified email address is already in use");
        }

       
        [AllowAnonymous]
        public virtual IActionResult VerifyCapture(string captcha)
        {
            if (captcha == HttpContext.Session.GetString("Captcha"))
                return Json(true);
            else
                return Json("Wrong captcha");
        }

        [AllowAnonymous]
        public virtual IActionResult VerifyPhoneNumber(string phone)
        {
            if(phone.Length < 15)
            {
                return Json("The specified phone number is incorrect");
            }
                return Json(true);
        }

        [AllowAnonymous]
        public virtual IActionResult VerifyBirthday(DateTime dateBirthday)
        {
            if (dateBirthday < BirthdayDateRanger.MinBirthdayValue || dateBirthday > BirthdayDateRanger.MaxBirthdayValue)
                return Json(string.Format("The specified birthday must be within {0} - {1} ",
                    DateTime.Now.AddYears(-60).ToShortDateString(), DateTime.Now.AddYears(-18).ToShortDateString()));

            return Json(true);
        }
        
    }
}
