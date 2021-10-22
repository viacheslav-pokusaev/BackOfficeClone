using Application.EntitiesModels.Models;
using Application.EntitiesModels.Models.QueryModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.BBLInterfaces.BusinessServicesInterfaces
{
    public interface IUserProfileProjectService
    {
        UserProfileProjectModel AddEmploee(UserProfileProjectModel userProfileProject);

        UserProfileProjectModel UpdateEmploee(UserProfileProjectModel userProfileProject);

        bool DeleteEmploee(int id);

        UserProfileProjectModel GetEmploeeById(int id);

        UserProfileProjectQueryModel GetAll(UserProfileProjectQueryModel userProfileProject);
    }
}
