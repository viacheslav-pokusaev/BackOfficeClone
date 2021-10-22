using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.Common.DatabaseAdministration;
using Application.Common.DataProtection;
using Application.DAL;
using Application.EntitiesModels.Models;
using Application.EntitiesModels.Models.QueryModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;

namespace Application.BBL.BusinessServices
{
    public class UserProfileProjectService: IUserProfileProjectService
    {
        private readonly IDbContextFactory _dbContextFactory;

        private readonly DataProtector _dataProtector;

        private readonly DatabaseManager _databaseManager;

        public UserProfileProjectService(IDbContextFactory dbContextFactory, DataProtector dataProtector, DatabaseManager databaseManager)
        {
            _dbContextFactory = dbContextFactory;
            _dataProtector = dataProtector;
            _databaseManager = databaseManager;
        }

        public UserProfileProjectModel GetEmploeeById(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var emploee = context.UserProfileProjects.Include(u => u.UserProfile).ThenInclude(p => p.ApplicationUser).Include(u => u.Project).FirstOrDefault(u => u.Id == id);

                _databaseManager.EncryptDecrypt("UserProfileProjects", _dataProtector.Decrypt, emploee);

                _databaseManager.EncryptDecrypt("UserProfiles", _dataProtector.Decrypt, emploee.UserProfile);

                _databaseManager.EncryptDecrypt("ApplicationUsers", _dataProtector.Decrypt, emploee.UserProfile.ApplicationUser);

                _databaseManager.EncryptDecrypt("Projects", _dataProtector.Decrypt, emploee.Project);

                return new UserProfileProjectModel()
                {
                    Id = emploee.Id,
                    Comment = emploee.Comment,
                    Status = emploee.Status,
                    ProjectName = emploee.Project.Name,
                    DateStartWork = emploee.DateStartWork,
                    DateFinishWork = emploee.DateFinishWork,
                    FirstName = emploee.UserProfile.ApplicationUser.FirstName,
                    LastName = emploee.UserProfile.ApplicationUser.LastName,
                    Position = emploee.Position,
                    ProjectId = emploee.ProjectId,
                    UserProfileId = emploee.UserProfileId
                };
            }
        }

        public UserProfileProjectModel AddEmploee(UserProfileProjectModel userProfileProject)
        {
            using (var context = _dbContextFactory.Create())
            {
                EntitiesModels.Entities.UserProfileProject userProject = new EntitiesModels.Entities.UserProfileProject()
                {
                    Position = userProfileProject.Position,
                    UserProfileId = userProfileProject.UserProfileId,
                    ProjectId = userProfileProject.ProjectId,
                    Comment = userProfileProject.Comment,
                    Status = "IsWorking",
                    DateStartWork = userProfileProject.DateStartWork,
                    DateFinishWork = userProfileProject.DateFinishWork,
                    Id = userProfileProject.Id
                };

                _databaseManager.EncryptDecrypt("UserProfileProjects", _dataProtector.Encrypt, userProject);

                context.UserProfileProjects.Add(userProject);
                context.SaveChanges();
            }
            return userProfileProject;
        }

        public bool DeleteEmploee(int Id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var user = context.UserProfileProjects.Where(x => x.Id == Id).FirstOrDefault();
                context.UserProfileProjects.Remove(user);
                context.SaveChanges();
                return true;
            }
        }

        public UserProfileProjectModel UpdateEmploee(UserProfileProjectModel userProfileProject)
        {
            using (var context = _dbContextFactory.Create())
            {
                var user = context.UserProfileProjects.Where(x => x.Id == userProfileProject.Id).FirstOrDefault();

                _databaseManager.EncryptDecrypt("UserProfileProjects", _dataProtector.Decrypt, user);

                user.Position = userProfileProject.Position;
                user.Comment = userProfileProject.Comment;
                user.DateStartWork = userProfileProject.DateStartWork;
                user.DateFinishWork = userProfileProject.DateFinishWork;
                user.Status = userProfileProject.Status;

                _databaseManager.EncryptDecrypt("UserProfileProjects", _dataProtector.Encrypt, user);

                context.SaveChanges();
                return userProfileProject;
            }
        }

        public UserProfileProjectQueryModel GetAll(UserProfileProjectQueryModel query)
        {
            using (var context = _dbContextFactory.Create())
            {
                var dbQuery = context.UserProfileProjects.AsQueryable();

                if (query.ProjectId != null && query.ProjectId != 0)
                    dbQuery = dbQuery.Where(e => e.ProjectId == query.ProjectId);

                if (query.UserProfileId != null && query.UserProfileId != 0)
                    dbQuery = dbQuery.Where(e => e.UserProfileId == query.UserProfileId);

                var projects = dbQuery.Include(p => p.UserProfile).ThenInclude(up => up.ApplicationUser).Include(p => p.Project);

                projects.ToList().ForEach(x => _databaseManager.EncryptDecrypt("UserProfileProjects", _dataProtector.Decrypt, x));

                projects.ToList().ForEach(x => _databaseManager.EncryptDecrypt("UserProfiles", _dataProtector.Decrypt, x.UserProfile));

                projects.ToList().ForEach(x => _databaseManager.EncryptDecrypt("ApplicationUsers", _dataProtector.Decrypt, x.UserProfile.ApplicationUser));

                var allprojects = context.Projects.ToList();

                allprojects.ForEach(x => _databaseManager.EncryptDecrypt("Projects", _dataProtector.Decrypt, x));

                query.TotalCount = dbQuery.Count();

                dbQuery = dbQuery.Skip(query.Skip ?? 0);

                dbQuery = dbQuery.Take(query.Take ?? 0);

                query.Result = dbQuery.ToList().ConvertAll(x => new UserProfileProjectModel()
                {
                    Id = x.Id,
                    Comment = x.Comment,
                    DateStartWork = x.DateStartWork,
                    DateFinishWork = x.DateFinishWork,
                    FirstName = x.UserProfile.ApplicationUser.FirstName,
                    LastName = x.UserProfile.ApplicationUser.LastName,
                    Position = x.Position,
                    Status = x.Status,
                    ProjectName = x.Project.Name,
                    ProjectId = x.ProjectId,
                    UserProfileId = x.UserProfileId
                });

                return query;
            }
        }
    }
}
