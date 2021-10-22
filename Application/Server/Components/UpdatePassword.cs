using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.EntitiesModels.Models.AccountModels;

namespace Application.Server.Components
{
    public class UpdatePassword : ViewComponent
    {
        public UpdatePassword()
        {

        }

        public IViewComponentResult Invoke(UpdatePasswordModel model)
        {
            return View("Index");
        }
    }
}
