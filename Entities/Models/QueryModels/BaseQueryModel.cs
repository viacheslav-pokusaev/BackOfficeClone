using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models.QueryModels
{
    public class BaseQueryModel<T>
    {
        public int? Skip { get; set; }

        public int? Take { get; set; }

        public string SortBy { get; set; }

        public string SortDescBy { get; set; }

        public List<T> Result { get; set; }

        public int TotalCount { get; set; }
    }
}
