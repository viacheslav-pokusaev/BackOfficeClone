using System;

namespace Application.EntitiesModels.Entities
{
    public class RequestToCreateUser
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Password { get; set; }

        public string Phone { get; set; }

        public DateTime DateBirthday { get; set; }

        public DateTime DateCreate { get; set; }
    }
}
