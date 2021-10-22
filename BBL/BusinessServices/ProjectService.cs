using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Entities;
using Application.EntitiesModels.Models;
using Application.DAL;
using System.Linq;
using System;
using System.Collections.Generic;
using Application.EntitiesModels.Models.QueryModels;
using Microsoft.EntityFrameworkCore;
using Application.Common.DataProtection;
using Application.Common.DatabaseAdministration;
using Microsoft.AspNetCore.Identity;

namespace Application.BBL.BusinessServices
{
    public class ProjectService: IProjectService
    {
        private readonly IDbContextFactory _dbContextFactory;
        private readonly DataProtector _dataProtector;
        private readonly DatabaseManager _databaseManager;
        private UserManager<ApplicationUser> _userManager;
        private readonly IClientService _clientService;
        private IPictureAttacherService _pictureAttacherService;

        public ProjectService(IDbContextFactory dbContextFactory, 
            DataProtector dataProtector, DatabaseManager databaseManager, 
            UserManager<ApplicationUser> userManager, IClientService clientService, 
            IPictureAttacherService pictureAttacherService)
        {
            _dbContextFactory = dbContextFactory;
            _dataProtector = dataProtector;
            _databaseManager = databaseManager;
            _userManager = userManager;
            _clientService = clientService;
            _pictureAttacherService = pictureAttacherService;
        }

        public ProjectModel Add(ProjectModel model)
        {
            using (var context = _dbContextFactory.Create())
            {
                if (model.Client != null)
                {
                    model.Client = _clientService.Add(model.Client);
                }
                var project = new Project()
                {
                    ClientId = model.Client != null ? model.Client.Id : model.ClientId,
                    DateBegin = model.DateBegin,
                    DateEnd = model.DateEnd,
                    Name = model.Name,
                    Comment = model.Comment,
                    EmploeeCount = model.EmploeeCount
                };
                _databaseManager.EncryptDecrypt("Projects", _dataProtector.Encrypt, project);
                context.Projects.Add(project);
                context.SaveChanges();
                model.Id = project.Id;
            }
            return model;
        }

        public bool Delete(int id)
        {
            using (var context = _dbContextFactory.Create())
            {

                var project = context.Projects.Find(id);

                if (project == null)
                    throw new Exception("Project not found");

                context.Projects.Remove(project);
                context.SaveChanges();

                return true;
            }
        }

        public ProjectQueryModel GetAll(ProjectQueryModel query)
        {
            using (var context = _dbContextFactory.Create())
            {
                var projects = context.Projects.Skip(query.Skip ?? 0).Take(query.Take ?? context.Projects.Count()).Include(p => p.Client).Include(x=>x.Emploees).ThenInclude(e => e.UserProfile);

                projects.ToList().ForEach(x => _databaseManager.EncryptDecrypt("Projects", _dataProtector.Decrypt, x));

                projects.ToList().ForEach(x => _databaseManager.EncryptDecrypt("Clients", _dataProtector.Decrypt, x.Client));

                projects.ToList().ForEach(x => x.Emploees.ToList().ForEach(y => _databaseManager.EncryptDecrypt("UserProfileProjects", _dataProtector.Decrypt, y)));

                projects.ToList().ForEach(x => x.Emploees.ToList().ForEach(y => _databaseManager.EncryptDecrypt("UserProfile", _dataProtector.Decrypt, y.UserProfile)));

                var dbQuery = projects.AsQueryable();

                if (!string.IsNullOrEmpty(query.NameContain))
                    dbQuery = dbQuery.Where(x => x.Name.Contains(query.NameContain));

                if (query.UserId != null && (_userManager.GetRolesAsync(context.ApplicationUsers.FirstOrDefault(u => u.Id == query.UserId)).Result.Contains("ProjectManager") || _userManager.GetRolesAsync(context.ApplicationUsers.FirstOrDefault(u => u.Id == query.UserId)).Result.Contains("Developer")))
                    dbQuery = dbQuery.Where(p => p.Emploees.Any(e => e.UserProfileId == query.UserId));

                if (query.ClientId != null && query.ClientId != 0)
                    dbQuery = dbQuery.Where(p => p.ClientId == query.ClientId);

                query.TotalCount = dbQuery.Count();

                //dbQuery = dbQuery.Skip(query.Skip ?? 0);

                //dbQuery = dbQuery.Take(query.Take ?? (dbQuery.Count() == 0 ? 10 : dbQuery.Count()));

                query.Result = dbQuery.ToList().ConvertAll(x => new ProjectModel()
                {
                     ClientId = x.ClientId,
                     Name = x.Name,
                     DateBegin = x.DateBegin,
                     DateEnd = x.DateEnd,
                     EmploeeCount = x.Emploees.Count(),
                     Id = x.Id,
                     OrganizationName = (x.Client != null) ? x.Client.OrganizationName : "no client",
                     Comment = x.Comment,
                     EmploeesAvatars = x.Emploees.Select(e => 
                     e.UserProfile.Avatar != null && e.UserProfile.Avatar != "" ?
                     _pictureAttacherService.GetBase64String(e.UserProfile.Avatar) : 
                     _pictureAttacherService.GetBase64String()),
                     EmploeesPositions = x.Emploees.Select(e => e.Position)
                });

                return query;
            }
        }

        public ProjectModel GetById(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var project = context.Projects.Include(p => p.Client).Include(p => p.Emploees).FirstOrDefault(v => v.Id == id);

                _databaseManager.EncryptDecrypt("Projects", _dataProtector.Decrypt, project);

                _databaseManager.EncryptDecrypt("Clients", _dataProtector.Decrypt, project.Client);

                project.Emploees.ToList().ForEach(x => _databaseManager.EncryptDecrypt("UserProfileProjects", _dataProtector.Decrypt, x));

                if (project == null)
                    throw new Exception("Project not found");
                return new ProjectModel()
                {
                    ClientId = project.ClientId,
                    DateBegin = project.DateBegin,
                    DateEnd = project.DateEnd,
                    EmploeeCount = project.Emploees.Count(),
                    Name = project.Name,
                    Id = project.Id,
                    OrganizationName = (project.Client != null) ? project.Client.OrganizationName : "no client",
                    Comment = project.Comment
                };
            }
        }

        public ProjectModel Update(ProjectModel model)
        {
            using (var context = _dbContextFactory.Create())
            {
                var project = context.Projects.FirstOrDefault(v => v.Id == model.Id);

                _databaseManager.EncryptDecrypt("Projects", _dataProtector.Decrypt, project);

                if (project == null)
                    throw new Exception("Project not found");

                project.ClientId = model.ClientId;
                project.DateBegin = model.DateBegin;
                project.DateEnd = model.DateEnd;
                project.Name = model.Name;
                project.Id = model.Id;
                project.Comment = model.Comment;

                _databaseManager.EncryptDecrypt("Projects", _dataProtector.Encrypt, project);

                context.SaveChanges();
                return model;
            }
        }
    }
}
