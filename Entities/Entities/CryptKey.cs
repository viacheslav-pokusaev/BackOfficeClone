using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Entities
{
    public class CryptKey
    {
        public int Id { get; set; }

        public string Value { get; set; }

        public DateTime ChangingDate { get; set; }
    }
}
