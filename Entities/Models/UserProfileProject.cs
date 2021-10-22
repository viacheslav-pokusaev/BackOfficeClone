using Application.EntitiesModels.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models
{
    public class UserProfileProjectModel
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int UserProfileId { get; set; }

        public string Position { get; set; }

        public int ProjectId { get; set; }

        public string ProjectName { get; set; }

        public DateTime? DateStartWork { get; set; }

        public DateTime? DateFinishWork { get; set; }

        public string Comment { get; set; }

        public string Status { get; set; }
    }
}
