using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models.QueryModels
{
    public class ProjectQueryModel: BaseQueryModel<ProjectModel>
    {
        public string NameContain { get; set; }

        public int? UserId { get; set; }

        public int? ClientId { get; set; }
    }
}
