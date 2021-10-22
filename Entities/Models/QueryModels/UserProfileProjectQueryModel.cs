using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models.QueryModels
{
    public class UserProfileProjectQueryModel: BaseQueryModel<UserProfileProjectModel>
    {
        public int? ProjectId { get; set; }

        public int? UserProfileId { get; set; }
    }
}
