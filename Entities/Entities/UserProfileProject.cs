using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Entities
{
    public class UserProfileProject
    {
        public int Id { get; set; }

        public UserProfile UserProfile { get; set; }

        public int UserProfileId { get; set; }

        public Project Project { get; set; }

        public int ProjectId { get; set; }

        public string Position { get; set; }

        public DateTime? DateStartWork { get; set; }

        public DateTime? DateFinishWork { get; set; }

        public string Comment { get; set; }

        public string Status { get; set; }
    }
}
