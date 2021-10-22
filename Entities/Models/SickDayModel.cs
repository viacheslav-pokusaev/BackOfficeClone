using System;
using System.ComponentModel.DataAnnotations;

namespace Application.EntitiesModels.Models
{
    public class SickDayModel
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime DateBegin { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime DateEnd { get; set; }

        [Required]
        public int CountDays { get; set; }

        [MaxLength(1000)]
        public string Comment { get; set; }

        public int UserProfileId { get; set; }

        [Required]
        public UserViewModel UserProfile;
    }
}
