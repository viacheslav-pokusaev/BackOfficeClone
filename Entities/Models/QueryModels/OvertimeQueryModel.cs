using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models.QueryModels
{
    public class OvertimeQueryModel: BaseQueryModel<OvertimeModel>
    {
        public string CommentContain { get; set; }

        public int? UserId { get; set; }
    }
}
