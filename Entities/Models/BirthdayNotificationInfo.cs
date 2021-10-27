using System;

namespace Application.EntitiesModels.Models
{
    public class BirthdayNotificationInfo
    {
        public string FullName { get; set; }
        public DateTime Birthday { get; set; }
        public string RecipientEmail { get; set; }
        public enum UpcomingBirthdays
        {
            Week = 7, TwoWeek = 14, Month = 31
        }
    }
}
