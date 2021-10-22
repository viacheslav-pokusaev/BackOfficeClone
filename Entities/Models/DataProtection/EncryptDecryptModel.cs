using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models.DataProtection
{
    public class EncryptDecryptModel
    {
        public string Action { get; set; }

        public List<TableModel> Tables { get; set; }
    }
}
