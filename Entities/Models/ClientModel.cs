using Application.EntitiesModels.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Application.EntitiesModels.Models
{
    public class ClientModel
    {
        public int Id { get; set; }

        public string OrganizationName { get; set; }

        public string Description { get; set; }

        public int ProjectsCount { get; set; }

        public int ProjectId { get; set; }

        public IEnumerable<string> ProjectsNames { get; set; }

        public IEnumerable<ContactPersonModel> ContactPersons { get; set; }

        public string Comment { get; set; }

        public ProjectModel Project { get; set; }
    }
}
