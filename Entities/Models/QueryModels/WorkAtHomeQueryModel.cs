using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models.QueryModels
{
    public class WorkAtHomeQueryModel : BaseQueryModel<WorkAtHomeModel>
    {
        public string CommentContain { get; set; }

        public int? UserId { get; set; }
    }
}

