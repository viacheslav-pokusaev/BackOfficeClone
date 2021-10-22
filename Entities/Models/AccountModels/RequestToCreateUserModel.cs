using System.ComponentModel.DataAnnotations;
using System;
using Microsoft.AspNetCore.Mvc;

namespace Application.EntitiesModels.Models.AccountModels
{
    public class RequestToCreateUserViewModel
        : AuthenticationViewModel
    {
        [Remote("VerifyEmailInUse", "Account")]
        public override string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Passwords do not match")]
        public string ConfirmPassword { get; set; }

        [Remote("VerifyPhoneNumber", "Account")]
        public string Phone { get; set; }

        [Required]
        [Remote("VerifyBirthday", "Account")]
        public DateTime DateBirthday { get; set; }

        public DateTime DateCreate { get; set; }
    }
}
