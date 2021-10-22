using Microsoft.AspNetCore.Mvc;
using Application.EntitiesModels.Models.AccountModels;

namespace Application.Server.Components
{
    public class Registration : ViewComponent
    {
        public Registration()
        {

        }
       
        public IViewComponentResult Invoke(LoginViewModel model)
        {
            return View("Index", model);
        }
    }
}
