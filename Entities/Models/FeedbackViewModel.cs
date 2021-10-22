namespace Application.EntitiesModels.Models
{
    public class FeedbackViewModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int AuthorId { get; set; }
        // This field helps optimize displaying feedbacks.
        // Since at the frontend you will not need to receive a user FOR EVERY feedback in order to display the author’s name
        public string AuthorFullName { get; set; }
        public string ProjectName { get; set; }
        public string Position { get; set; }
        public string Feedback { get; set; }
    }
}
