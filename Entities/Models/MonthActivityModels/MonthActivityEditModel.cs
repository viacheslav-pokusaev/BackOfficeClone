using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models.MonthActivityModels
{
    public class MonthActivityEditModel : MonthActivityModel
    {
        [JsonProperty(PropertyName = "sheetName")]
        public string SheetName { get; set; }
    }
}
