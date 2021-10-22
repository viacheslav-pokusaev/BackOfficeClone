using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Entities
{
    public class Client
    {
        public int Id { get; set; }

        public string OrganizationName { get; set; }

        public string Description { get; set; }

        public IEnumerable<Project> Projects { get; set; }

        public IEnumerable<ContactPerson> ContactPersons { get; set; }

        public string Comment { get; set; }
    }
}
