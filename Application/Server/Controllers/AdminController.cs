using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Application.EntitiesModels.Entities;

namespace Application.Server.Controllers
{
    public class AdminController : Controller
    {
        private readonly SignInManager<ApplicationUser> signManager;

        public AdminController(SignInManager<ApplicationUser> _signInManager)
        {
            signManager = _signInManager;
        }

        public IActionResult Index()
        {
            if(signManager.IsSignedIn(HttpContext.User))
            {
                return RedirectToAction("Admin", "Account");
            }
            else
            {               
                return RedirectToAction("Login", "Account", new {returnUrl = Request.Path});
            }          
        }
    }
}