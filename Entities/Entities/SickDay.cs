using System;

namespace Application.EntitiesModels.Entities
{
    public class SickDay
    {
        public int Id { get; set; }
        public DateTime DateBegin { get; set; }
        public DateTime DateEnd { get; set; }
        public string Comment { get; set; }
        public int UserProfileId { get; set; }
        public virtual UserProfile UserProfile { get; set; }
        public int CountDays { get; set; }
    }
}
