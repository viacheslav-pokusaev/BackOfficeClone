using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.DAL;
using Application.EntitiesModels.Entities;
using Application.EntitiesModels.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;

namespace Application.BBL.Mapper
{
    public class UserDBEntityMaper : IMapper
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IDbContextFactory _dbContextFactory;
        private IPictureAttacherService _pictureAttacherService;

        public UserDBEntityMaper(UserManager<ApplicationUser> userManager,
                      IDbContextFactory dbContextFactory,
                      IPictureAttacherService pictureAttacherService)
        {
            _dbContextFactory = dbContextFactory;
            _userManager = userManager;
            _pictureAttacherService = pictureAttacherService;
        }

        public UserViewModel MapUserViewModel(UserProfile model)
        {
            UserProfile profile = (UserProfile)model;
            var roleOfUser = _userManager.GetRolesAsync(model.ApplicationUser).Result[0].ToString();
            string imageAvatar;

            if (profile.Avatar != "" && profile.Avatar != null)
            {
                imageAvatar = _pictureAttacherService.GetBase64String(profile.Avatar);
            }
            else
            {
                imageAvatar = _pictureAttacherService.GetBase64String();
            }

            return new UserViewModel()
            {
                ApplicationUserId = profile.ApplicationUserId,
                Comment = profile.Comment,
                DateBeginWork = profile.DateBeginWork,
                DateBeginTrialWork = profile.DateBeginTrialWork,
                DateBirthday = profile.DateBirthday,
                UserProfileId = profile.Id,
                Email = profile.ApplicationUser.Email,
                FirstName = profile.ApplicationUser.FirstName,
                LastName = profile.ApplicationUser.LastName,
                Phone = profile.ApplicationUser.PhoneNumber,
                Skype = profile.Skype,
                Role = roleOfUser,
                Avatar = imageAvatar,
                Hobbies = profile.Hobbies,
                Wishes = profile.Wishes,
                Skills = profile.Skills,
                ResidentialAddress = profile.ResidentialAddress
            };
        }

        public WorkActivityModel MapWorkActivity(Vacation model)
        {
            return new WorkActivityModel()
            {
                Comment = model.Comment,
                CountDays = model.CountDays,
                DateBegin = model.DateBegin,
                DateEnd = model.DateEnd,
                UserProfileId = model.UserProfileId,
                Name = model.UserProfile.ApplicationUser.FirstName + " " + model.UserProfile.ApplicationUser.LastName,
                Type = "Vacation"
            };
        }

        public WorkActivityModel MapWorkActivity(Overtime model)
        {
            return new WorkActivityModel()
            {
                Comment = model.Comment,
                CountDays = model.CountDays,
                DateBegin = model.DateBegin,
                DateEnd = model.DateEnd,
                UserProfileId = model.UserProfileId,
                Name = model.UserProfile.ApplicationUser.FirstName + " " + model.UserProfile.ApplicationUser.LastName,
                Type = "Overtime"
            };
        }

        public WorkActivityModel MapWorkActivity(SickDay model)
        {
            return new WorkActivityModel()
            {
                Comment = model.Comment,
                CountDays = model.CountDays,
                DateBegin = model.DateBegin,
                DateEnd = model.DateEnd,
                UserProfileId = model.UserProfileId,
                Name = model.UserProfile.ApplicationUser.FirstName + " " + model.UserProfile.ApplicationUser.LastName,
                Type = "SickDay"
            };
        }
    }
}