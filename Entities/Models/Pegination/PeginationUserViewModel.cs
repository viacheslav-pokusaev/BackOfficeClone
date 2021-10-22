using System.Collections.Generic;

namespace Application.EntitiesModels.Models.Pegination
{
    public class PeginationUserViewModel
    {
        public int TotalCount { get; set; }
        public IList<UserViewModel> UserViews { get; set; }
    }
}
