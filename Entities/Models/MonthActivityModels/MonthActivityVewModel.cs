using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models.MonthActivityModels
{
    public class MonthActivityVewModel
    {
        public List<List<MonthActivityModel>> MonthActivityModels { get; set; }
        public IList<string> Sheets { get; set; }
        public bool IsEmpty { get; set; }
        public bool IsAll { get; set; }
    }
}
