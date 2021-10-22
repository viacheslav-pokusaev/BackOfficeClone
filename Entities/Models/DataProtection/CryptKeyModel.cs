using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models.DataProtection
{
    public class CryptKeyModel
    {
        public int Id { get; set; }

        public string Value { get; set; }

        public DateTime ChangingDate { get; set; }
    }
}
