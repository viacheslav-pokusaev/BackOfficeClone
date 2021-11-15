using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models.MonthActivityModels
{
    public class MonthActivityVewModel
    {
        [JsonProperty(PropertyName = "monthActivityModels")]
        public List<List<MonthActivityModel>> MonthActivityModels { get; set; }
        [JsonProperty(PropertyName = "sheets")]
        public IList<string> Sheets { get; set; }
        [JsonProperty(PropertyName = "isEmpty")]
        public bool IsEmpty { get; set; }
        [JsonProperty(PropertyName = "errorMessage")]
        public string ErrorMessage { get; set; }
    }
}
