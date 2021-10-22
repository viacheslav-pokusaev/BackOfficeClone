using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models.QueryModels
{
    public class VacationQueryModel: BaseQueryModel<VacationModel>
    {
        public string CommentContain { get; set; }

        public int? UserId { get; set; }
    }
}
