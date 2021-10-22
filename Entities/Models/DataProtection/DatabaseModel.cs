using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models.DataProtection
{
    public class DatabaseModel
    {
        public string DatabaseName { get; set; }

        public string DatabaseFullName { get; set; }

        public string ServerName { get; set; }

        public string UserID { get; set; }

        public string Password { get; set; }
    }
}
