using System.ComponentModel.DataAnnotations;

namespace Application.EntitiesModels.Models
{
    public class ChangePasswordViewModel
    {
        [Required]
        public int UserProfileID;
        [Required]
        [DataType(DataType.Password)]
        public string OldPassword;
        [Required]
        [DataType(DataType.Password)]
        public string NewPassword;
        [Required]
        [DataType(DataType.Password)]
        public string ConfirmNewPassword;
    }
}
