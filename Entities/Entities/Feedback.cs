using System.ComponentModel.DataAnnotations.Schema;

namespace Application.EntitiesModels.Entities
{
    public class Feedback
    {
        public int Id { get; set; }
        public string ProjectName { get; set; }
        public string Position { get; set; }
        public string Description { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public ApplicationUser User { get; set; }

        [ForeignKey("Author")]
        public int AuthorId { get; set; }
        public ApplicationUser Author { get; set; }
    }
}
