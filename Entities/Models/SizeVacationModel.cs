using System.ComponentModel.DataAnnotations;

namespace Application.EntitiesModels.Models
{
    public class SizeVacationModel
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public int Year { get; set; }
        [Required]
        public int CountDays { get; set; }


    }
}
