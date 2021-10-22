using Microsoft.AspNetCore.Identity;
using System;

namespace Application.EntitiesModels.Entities
{
    public class ApplicationUser : IdentityUser<int>
    {
        public bool IsEnabled { get; set; }
        public DateTime CreatedDate { get; set; }
        public virtual UserProfile UserProfile { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
