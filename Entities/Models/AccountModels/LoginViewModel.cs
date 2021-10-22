using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace Application.EntitiesModels.Models.AccountModels
{
    public class LoginViewModel
        : AuthenticationViewModel
    {
        public override string Email { get; set; }

        public override string Password { get; set; }

        public bool RememberMe { get; set; }

        public string ReturnUrl { get; set; }
    }
}