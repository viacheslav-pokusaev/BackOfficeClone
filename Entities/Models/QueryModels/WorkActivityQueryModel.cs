using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models.QueryModels
{
    public class WorkActivityQueryModel : BaseQueryModel<WorkActivityModel>
    {
        public string CommentContain { get; set; }

        public string NameContain { get; set; }

        public string TypeContain { get; set; }

        public int? UserId { get; set; }
    }
}
