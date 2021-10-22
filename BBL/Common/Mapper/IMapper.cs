using Application.EntitiesModels.Entities;
using Application.EntitiesModels.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.BBL.Mapper
{
    public interface IMapper
    {
        UserViewModel MapUserViewModel(UserProfile model);

        WorkActivityModel MapWorkActivity(Vacation model);

        WorkActivityModel MapWorkActivity(Overtime model);

        WorkActivityModel MapWorkActivity(SickDay model);
     
    }
}
