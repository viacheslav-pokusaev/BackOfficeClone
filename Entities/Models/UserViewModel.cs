using Application.EntitiesModels.Entities;
using System;
using System.Collections.Generic;

namespace Application.EntitiesModels.Models
{
    public class UserViewModel
    {

        //UserProfile
        public int UserProfileId { get; set; }             
        public DateTime DateBirthday { get ; set; }
        public DateTime? DateBeginWork { get; set; }
        public DateTime? DateBeginTrialWork { get; set; }
        public string Comment { get; set; }

        //ApplicationUser
        public int ApplicationUserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Skype { get; set; }
        public string Avatar { get; set; }

        public string ResidentialAddress { get; set; }
        public string Skills { get; set; }
        public string Hobbies { get; set; }
        public string Wishes { get; set; }

        public string Password { get; set; }
        public string Role { get; set; }

        public int CountAvailableVacationDay { get; set; }
        public int ProjectsCount { get; set; }
    }
}
