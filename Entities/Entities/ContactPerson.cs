using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Entities
{
    public class ContactPerson
    {
        public int Id { get; set; }

        public int ClientId { get; set; }

        public Client Client { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string CommunicationChannel { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string Comment { get; set; }
    }
}
