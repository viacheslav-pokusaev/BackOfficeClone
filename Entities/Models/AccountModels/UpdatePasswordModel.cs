using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models.AccountModels
{
    public class UpdatePasswordModel
        : AuthenticationViewModel
    {
        public override string Email { get; set; }

        public override string Password { get; set; }

        public string ConfirmPassword { get; set; }

        public string ReturnUrl { get; set; }
    }
}
