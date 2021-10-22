using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models.QueryModels
{
    public class ListVacationQueryModel: BaseQueryModel<ListVacationModel>
    {
        public int UserId { get; set; }
    }
}
