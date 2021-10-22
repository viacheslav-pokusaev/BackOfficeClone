using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models.DataProtection
{
    public class TableModel
    {
        public string Name { get; set; }

        public IEnumerable<ColumnModel> Columns { get; set; }
    }
}
