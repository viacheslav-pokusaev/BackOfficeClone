using Microsoft.AspNetCore.Identity;

namespace Application.EntitiesModels.Entities
{
    public class ApplicationRole : IdentityRole<int>
    {
        public string Description { get; set; }
    }
}
