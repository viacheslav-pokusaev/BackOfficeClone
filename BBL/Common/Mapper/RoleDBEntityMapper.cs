using Application.EntitiesModels.Entities;
using Application.EntitiesModels.Models;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Application.DAL;
using Application.BBLInterfaces.BusinessServicesInterfaces;

namespace Application.BBL.Mapper
{
    public class RoleDBEntityMapper : IRoleDBEntityMapper
    {
        IDictionary<string, IMapper> _mappers;
        private readonly SignInManager<ApplicationUser> _signManager;

        public RoleDBEntityMapper(SignInManager<ApplicationUser> signManager, 
            UserManager<ApplicationUser> userManager, IDbContextFactory dbContextFactory, 
            IPictureAttacherService pictureAttacherService)
        {
            _mappers = new Dictionary<string, IMapper>();
            _mappers.Add("Full", new AdminDBEntityMaper(userManager, dbContextFactory, pictureAttacherService));
            _mappers.Add("Limited", new UserDBEntityMaper(userManager, dbContextFactory, pictureAttacherService));
            _signManager = signManager;
        }

        public string GetAccess()
        {
            if (_signManager.Context.User.IsInRole("Admin") || _signManager.Context.User.IsInRole("Super_Admin"))
                return "Full";
            else
                return "Limited";
        }

        public UserViewModel MapDBEntity(UserProfile dbModel)
        {
            return _mappers[GetAccess()].MapUserViewModel(dbModel);
        }

        public WorkActivityModel MapDBEntity(Vacation dbModel)
        {
            return _mappers[GetAccess()].MapWorkActivity(dbModel);
        }

        public WorkActivityModel MapDBEntity(Overtime dbModel)
        {
            return _mappers[GetAccess()].MapWorkActivity(dbModel);
        }

        public WorkActivityModel MapDBEntity(SickDay dbModel)
        {
            return _mappers[GetAccess()].MapWorkActivity(dbModel);
        }



    }
}
