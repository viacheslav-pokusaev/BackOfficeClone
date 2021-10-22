using System;
using System.Collections.Generic;


namespace Application.EntitiesModels.Models.Pegination
{
    public class PeginationWorkActivityModel
    {
        public int TotalCount { get; set; }
        public IList<WorkActivityModel> WorkActivities { get; set; }
    }
}
