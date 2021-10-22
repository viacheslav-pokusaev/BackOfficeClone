using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Application.EntitiesModels.Models
{
    public class WorkAtHomeModel
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }

        [MaxLength(1000)]
        public string Comment { get; set; }

        public int UserProfileId { get; set; }

        [Required]
        public UserViewModel UserProfile;
    }
}
