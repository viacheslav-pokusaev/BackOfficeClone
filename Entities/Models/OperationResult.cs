namespace Application.EntitiesModels.Models
{
    public class OperationResult
    {
        public bool IsSucceded { get; set; }

        public object Result { get; set; }

        public string OperationMessage { get; set; }

        public string ErrorMessage { get; set; }
    }
}
