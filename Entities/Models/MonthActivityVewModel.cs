using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models
{
    public class MonthActivityVewModel
    {
        public List<List<MonthActivityModel>> MonthActivityModels { get; set; }
        public IList<string> Sheets { get; set; }
    }
}
