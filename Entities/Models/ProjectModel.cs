using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Application.EntitiesModels.Models
{
    public class ProjectModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime? DateBegin { get; set; }

        public DateTime? DateEnd { get; set; }

        public int EmploeeCount { get; set; }

        public int? ClientId { get; set; }

        public string OrganizationName { get; set; }

        public IEnumerable<UserProfileProjectModel> Emploees { get; set; }

        public IEnumerable<string> EmploeesAvatars { get; set; }

        public IEnumerable<string> EmploeesPositions { get; set; }

        public string Comment { get; set; }

        public ClientModel Client { get; set; }
    }
}
