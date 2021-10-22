using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.Common.DatabaseAdministration;
using Application.Common.DataProtection;
using Application.DAL;
using Application.EntitiesModels.Entities;
using Application.EntitiesModels.Models;
using Application.EntitiesModels.Models.QueryModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Application.BBL.BusinessServices
{
    public class WorkAtHomeService: IWorkAtHomeService
    {
        private readonly IDbContextFactory _dbContextFactory;

        private readonly DataProtector _dataProtector;

        private readonly DatabaseManager _databaseManager;

        public WorkAtHomeService(IDbContextFactory dbContextFactory, DataProtector dataProtector, DatabaseManager databaseManager)
        {
            _dbContextFactory = dbContextFactory;
            _dataProtector = dataProtector;
            _databaseManager = databaseManager;
        }

        public WorkAtHomeModel Add(WorkAtHomeModel model)
        {
            using (var context = _dbContextFactory.Create())
            {
                var workAtHome = new WorkAtHome()
                {
                    Comment = model.Comment,
                    Date = model.Date,
                    UserProfileId = model.UserProfileId,
                };

                _databaseManager.EncryptDecrypt("WorkAtHomes", _dataProtector.Encrypt, workAtHome);

                context.WorkAtHomes.Add(workAtHome);
                context.SaveChanges();
                model.Id = workAtHome.Id;
            }
            return model;
        }

        public WorkAtHomeModel Update(WorkAtHomeModel model)
        {
            using (var context = _dbContextFactory.Create())
            {
                var workAtHome = context.WorkAtHomes.FirstOrDefault(s => s.Id == model.Id);

                _databaseManager.EncryptDecrypt("WorkAtHomes", _dataProtector.Decrypt, workAtHome);

                if (workAtHome == null)
                    throw new Exception("Work at home not found");

                workAtHome.Comment = model.Comment;
                workAtHome.Date = model.Date;
                workAtHome.Id = model.Id;
                workAtHome.UserProfileId = model.UserProfileId;

                _databaseManager.EncryptDecrypt("WorkAtHomes", _dataProtector.Encrypt, workAtHome);

                context.SaveChanges();

                return model;
            }
        }

        public bool Delete(int id)
        {
            using (var context = _dbContextFactory.Create())
            {

                var workAtHome = context.WorkAtHomes.Find(id);

                if (workAtHome == null)
                    throw new Exception("Work at home not found");

                context.WorkAtHomes.Remove(workAtHome);
                context.SaveChanges();

                return true;
            }
        }

        public WorkAtHomeQueryModel GetAll(WorkAtHomeQueryModel query)
        {
            using (var context = _dbContextFactory.Create())
            {
                var workAtHomes = context.WorkAtHomes.Include(v => v.UserProfile).ThenInclude(a => a.ApplicationUser);

                workAtHomes.ToList().ForEach(x => _databaseManager.EncryptDecrypt("WorkAtHomes", _dataProtector.Decrypt, x));

                workAtHomes.ToList().ForEach(x => _databaseManager.EncryptDecrypt("WorkAtHomes", _dataProtector.Decrypt, x.UserProfile));

                workAtHomes.ToList().ForEach(x => _databaseManager.EncryptDecrypt("WorkAtHomes", _dataProtector.Decrypt, x.UserProfile.ApplicationUser));

                var dbQuery = workAtHomes.AsQueryable();

                if (!string.IsNullOrEmpty(query.CommentContain))
                    dbQuery = dbQuery.Where(x => x.Comment.Contains(query.CommentContain));

                dbQuery = dbQuery.OrderBy(x => x.Date);

                if (!string.IsNullOrEmpty(query.SortDescBy))
                    dbQuery = dbQuery.OrderByDescending(x => query.SortDescBy);

                if (query.UserId != null && query.UserId != 0)
                    dbQuery = dbQuery.Where(x => x.UserProfileId == query.UserId);

                query.TotalCount = dbQuery.Count();

                dbQuery = dbQuery.Skip(query.Skip ?? 0);

                dbQuery = dbQuery.Take(query.Take ?? (dbQuery.Count() == 0 ? 10 : dbQuery.Count()));

                query.Result = dbQuery.ToList().ConvertAll(x => new WorkAtHomeModel()
                {
                    Id = x.Id,
                    Comment = x.Comment,
                    Date = x.Date,
                    UserProfileId = x.UserProfileId,
                    UserProfile = new UserViewModel()
                    {
                        ApplicationUserId = x.UserProfile.ApplicationUserId,
                        FirstName = x.UserProfile.ApplicationUser.FirstName,
                        LastName = x.UserProfile.ApplicationUser.LastName,
                        UserProfileId = x.UserProfileId,
                    },
                });

                return query;
            }
        }

        public WorkAtHomeModel GetById(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var workAtHome = context.WorkAtHomes.FirstOrDefault(v => v.Id == id);

                _databaseManager.EncryptDecrypt("WorkAtHomes", _dataProtector.Decrypt, workAtHome);

                if (workAtHome == null)
                    throw new Exception("Work at home not found");
                return new WorkAtHomeModel()
                {
                    Comment = workAtHome.Comment,
                    Date = workAtHome.Date,
                    Id = workAtHome.Id,
                    UserProfileId = workAtHome.UserProfileId,
                };
            }
        }
    }
}
