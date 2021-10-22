using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.EntitiesModels.Models.AccountModels;

namespace Application.Server.Components
{
    public class Login : ViewComponent
    {
        public Login()
        {

        }

        public IViewComponentResult Invoke(LoginViewModel model)
        {
            return View("Index");
        }
    }
}
