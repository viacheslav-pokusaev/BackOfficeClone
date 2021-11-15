using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models.MonthActivityModels
{
    public class MonthActivityModel
    {
        [JsonProperty(PropertyName = "rowIndex")]
        public int RowIndex { get; set; }
        [JsonProperty(PropertyName = "columnIndex")]
        public int ColumnIndex { get; set; }
        [JsonProperty(PropertyName = "data")]
        public object Data { get; set; }
        [JsonProperty(PropertyName = "color")]
        public string Color { get; set; }
    }
}
