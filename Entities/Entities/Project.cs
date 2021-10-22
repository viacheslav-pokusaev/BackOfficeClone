using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Entities
{
    public class Project
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime? DateBegin { get; set; }

        public DateTime? DateEnd { get; set; }

        public int EmploeeCount { get; set; }

        public int? ClientId { get; set; }

        public Client Client { get; set; }

        public string Comment { get; set; }

        public IEnumerable<UserProfileProject> Emploees { get; set; }
    }
}
