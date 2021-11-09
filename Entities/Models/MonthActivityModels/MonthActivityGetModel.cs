using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models.MonthActivityModels
{
    public class MonthActivityGetModel
    {
        public string SheetName { get; set; }
        public int StartIndex { get; set; }
        public int EndIndex { get; set; }
    }
}
