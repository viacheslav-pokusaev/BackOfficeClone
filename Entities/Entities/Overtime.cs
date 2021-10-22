using System;

namespace Application.EntitiesModels.Entities
{
    public class Overtime
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public DateTime DateBegin { get; set; }
        public DateTime DateEnd { get; set; }
        public int CountDays { get; set; }
        public string Comment { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
