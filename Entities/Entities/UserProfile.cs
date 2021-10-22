using System;
using System.Collections.Generic;

namespace Application.EntitiesModels.Entities
{
    public class UserProfile
    {

        public int Id { get; set; }
        public DateTime DateBirthday{ get; set; }
        public DateTime? DateBeginWork { get; set; }
        public DateTime? DateBeginTrialWork { get; set; }
        public string Comment { get; set; }
        public string Skype { get; set; }
        public string ResidentialAddress { get; set; }
        public string Skills { get; set; }
        public string Hobbies { get; set; }
        public string Wishes { get; set; }
        public int ApplicationUserId { get; set; }
        public string Avatar { get; set; }
        public virtual ApplicationUser ApplicationUser  { get; set; }
        public virtual ICollection<Vacation> Vacations { get; set; }
        public virtual ICollection<SickDay> SickDays { get; set; }
        public virtual ICollection<Overtime> Overtimes { get; set; }
        public virtual ICollection<WorkAtHome> WorkAtHomes { get; set; }
        public IEnumerable<UserProfileProject> Projects { get; set; }
    }
}
