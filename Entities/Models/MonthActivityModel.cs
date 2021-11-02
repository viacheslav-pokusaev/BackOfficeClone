using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models
{
    public class MonthActivityModel
    {
        public int RowIndex { get; set; }
        public int ColumnIndex { get; set; }
        public object Data { get; set; }
        public string Color { get; set; }
    }
}
