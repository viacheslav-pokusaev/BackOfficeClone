using System;
using System.Drawing.Drawing2D;
using System.Drawing.Text;
using System.Drawing;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Application.EntitiesModels.Entities;
using Application.EntitiesModels.Models.AccountModels;
using Microsoft.AspNetCore.Http;
using Application.BBLInterfaces.BusinessServicesInterfaces;
using System.Resources;
using Microsoft.Extensions.Logging;

namespace Application.Server.Controllers
{
    [Authorize]
    public class AccountController : ValidationController
    {
        private readonly SignInManager<ApplicationUser> signManager;
        private readonly IRequestToCreateUserServices _requestToCreateUserServices;
        private readonly UserManager<ApplicationUser> _userManage;
        private readonly IUserViewServices _userViewServices;

        private ILogger logger;

        public AccountController(
            UserManager<ApplicationUser> userManage,
            SignInManager<ApplicationUser> _signManager,
            ILogger<AccountController> _logger,
            IRequestToCreateUserServices requestToCreateUserServices,
            IUserViewServices userViewServices
            ) : base(requestToCreateUserServices, userManage)
        {
            logger = _logger;
            signManager = _signManager;
            _requestToCreateUserServices = requestToCreateUserServices;
            _userManage = userManage;
            _userViewServices = userViewServices;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Login(string returnUrl = null)
        {
            logger.LogInformation("Test Hello world! AccountController.cs ln 63.");
            return View(new LoginViewModel() { ReturnUrl = returnUrl });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            var result = await signManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, false);

            if (result.Succeeded)
            {
                if (!string.IsNullOrEmpty(model.ReturnUrl) && Url.IsLocalUrl(model.ReturnUrl))
                    return Redirect(model.ReturnUrl);
                else
                    return Redirect("/");
            }
            else
                ModelState.AddModelError("", "Email or Password is incorrect");

            return View(model);
        }

        [AllowAnonymous]
        public IActionResult UpdatePassword()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [AllowAnonymous]
        public IActionResult UpdatePassword(UpdatePasswordModel model)
        {
            var searchResult = _userManage.FindByEmailAsync(model.Email).Result;
            if (searchResult == null)
            {
                ModelState.AddModelError("", "Login is not exist");
            }
            else
            {
               _userViewServices.MakeRequestToUpdatePassword(model);
            }
            return View();
            
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> LogOff()
        {
            await signManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }

        public IActionResult Admin()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Register(RequestToCreateUserViewModel model)
        {
            ResourceManager resManage = new ResourceManager("Application.Resources.RegistrationRes", System.Reflection.Assembly.GetExecutingAssembly());

            model = _requestToCreateUserServices.Add(model);

            if (model.Id != 0)
                return View("Register", resManage.GetString("reply_Registration_OK"));
            else
                return View("Register", resManage.GetString("reply_Registration_Failed"));
        }

        [AllowAnonymous]
        public string CaptchaImage()
        {
            var rand = new Random((int)DateTime.Now.Ticks);
            MemoryStream mem;
            //generate new question 
            int a = rand.Next(10, 99);
            int b = rand.Next(0, 9);
            var captcha = string.Format("{0} + {1} = ", a, b);

            //store answer 
            HttpContext.Session.SetString("Captcha", (a + b).ToString());
            // old  Session["Captcha" + prefix] = a + b;

            //image stream 
            FileContentResult img = null;
            using (mem = new MemoryStream())
            using (var bmp = new Bitmap(130, 30))
            using (var gfx = Graphics.FromImage((System.Drawing.Image)bmp))
            {
                gfx.TextRenderingHint = TextRenderingHint.ClearTypeGridFit;
                gfx.SmoothingMode = SmoothingMode.AntiAlias;
                gfx.FillRectangle(Brushes.White, new Rectangle(0, 0, bmp.Width, bmp.Height));

                //add noise 
                int i, r, x, y;
                var pen = new Pen(Color.Yellow);

                for (i = 1; i < 10; i++)
                {
                    pen.Color = Color.FromArgb(
                    (rand.Next(0, 255)),
                    (rand.Next(0, 255)),
                    (rand.Next(0, 255)));

                    r = rand.Next(0, (130 / 3));
                    x = rand.Next(0, 130);
                    y = rand.Next(0, 30);

                    gfx.DrawEllipse(pen, x - r, y - r, r, r);
                }

                //add question 
                gfx.DrawString(captcha, new Font("Tahoma", 15), Brushes.Gray, 2, 3);

                //render as Jpeg 
                bmp.Save(mem, System.Drawing.Imaging.ImageFormat.Jpeg);
                img = this.File(mem.GetBuffer(), "image/Jpeg");
            }
            var result = Convert.ToBase64String(mem.GetBuffer()); 
            return "url('data:image/png;base64," + result + "')";
        }

        //public IActionResult Error(/*int code, string text*/string ReturnUrl)
        //{
        //    //ViewBag.Code = code;
        //    //ViewBag.Text = text;
        //    return View("Error");
        //}
    }
}