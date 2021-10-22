using Application.EntitiesModels.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models
{
    public class WorkActivityModel
    {
        public string Type { get; set; }
        public DateTime DateBegin { get; set; }
        public DateTime DateEnd { get; set; }
        public int CountDays { get; set; }
        public string Comment { get; set; }
        public int UserProfileId { get; set; }

        public string Name { get; set; }

    }
}
