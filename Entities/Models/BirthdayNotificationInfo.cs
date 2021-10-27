using System;

namespace Application.EntitiesModels.Models
{
    public class BirthdayNotificationInfo
    {
        public string FullName { get; set; }
        public DateTime Birthday { get; set; }
        public string RecipientEmail { get; set; }        
    }
}
