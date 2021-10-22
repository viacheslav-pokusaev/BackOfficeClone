using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models.QueryModels
{
    public class UserViewQueryModel: BaseQueryModel<UserViewModel>
    {
        public string CommentContain { get; set; }
        public string FirstNameContain { get; set; }
        public string LastNameContain { get; set; }
        public string EmailContain { get; set; }
        public string PhoneContain { get; set; }
    }
}
