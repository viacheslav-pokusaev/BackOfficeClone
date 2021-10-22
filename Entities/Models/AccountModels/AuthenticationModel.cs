using System.ComponentModel.DataAnnotations;
using System;
using Microsoft.AspNetCore.Mvc;


namespace Application.EntitiesModels.Models.AccountModels
{
    public abstract class AuthenticationViewModel
    {
        public int Id { get; set; }

        [Required]
        [EmailAddress]
        public virtual string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password:")]
        public virtual string Password { get; set; }

        [Required]
        [Remote("VerifyCapture", "Account")]
        public string Captcha { get; set; }
    }
}
