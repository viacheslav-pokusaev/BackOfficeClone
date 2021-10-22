using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models
{
    public class RequestToUpdatePasswordModel
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string Name { get; set; }

        public string NewPassword { get; set; }
    }
}
