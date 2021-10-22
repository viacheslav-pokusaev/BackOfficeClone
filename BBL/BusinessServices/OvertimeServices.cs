using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Entities;
using Application.EntitiesModels.Models;
using Application.DAL;
using System.Linq;
using System;
using System.Collections.Generic;
using Application.EntitiesModels.Models.QueryModels;
using Microsoft.EntityFrameworkCore;
using Application.Common.DatabaseAdministration;
using Application.Common.DataProtection;

namespace Application.BBL.BusinessServices
{
    public class OvertimeServices : IOvertimeServices
    {
        private readonly IDbContextFactory _dbContextFactory;

        private readonly DataProtector _dataProtector;

        private readonly DatabaseManager _databaseManager;

        public OvertimeServices(IDbContextFactory dbContextFactory, DataProtector dataProtector, DatabaseManager databaseManager)
        {
            _dbContextFactory = dbContextFactory;
            _dataProtector = dataProtector;
            _databaseManager = databaseManager;
        }

        public OvertimeModel Add(OvertimeModel model)
        {
            using (var context = _dbContextFactory.Create())
            {
                var overtime = new Overtime()
                {
                    Comment = model.Comment,
                    DateBegin = model.DateBegin,
                    DateEnd = model.DateEnd,
                    UserProfileId = model.UserProfileId,
                    CountDays = model.CountDays,
                };
                _databaseManager.EncryptDecrypt("Overtimes", _dataProtector.Encrypt, overtime);
                context.Overtimes.Add(overtime);
                context.SaveChanges();
                model.Id = overtime.Id;
            }
            return model;
        }

        public OvertimeModel Update(OvertimeModel model)
        {
            using (var context = _dbContextFactory.Create())
            {
                var overtime = context.Overtimes.FirstOrDefault(o => o.Id == model.Id);

                _databaseManager.EncryptDecrypt("Overtimes", _dataProtector.Decrypt, overtime);

                if (overtime == null)
                    throw new Exception("Overtime not found");

                overtime.Comment = model.Comment;
                overtime.DateBegin = model.DateBegin;
                overtime.DateEnd = model.DateEnd;
                overtime.Id = model.Id;
                overtime.UserProfileId = model.UserProfileId;
                overtime.CountDays = model.CountDays;

                _databaseManager.EncryptDecrypt("Overtimes", _dataProtector.Encrypt, overtime);

                context.SaveChanges();

                return model;
            }
        }

        public bool Delete(int id)
        {
            using (var context = _dbContextFactory.Create())
            {

                var overtime = context.Overtimes.FirstOrDefault(o => o.Id == id);

                if (overtime == null)
                    throw new Exception("Overtime not found");

                context.Overtimes.Remove(overtime);
                context.SaveChanges();

                return true;
            }
        }

        public OvertimeQueryModel GetAll(OvertimeQueryModel query)
        {
            using (var context = _dbContextFactory.Create())
            {
                var overtimes = context.Overtimes.Include(v => v.UserProfile).ThenInclude(a => a.ApplicationUser);

                overtimes.ToList().ForEach(x => _databaseManager.EncryptDecrypt("Overtimes", _dataProtector.Decrypt, x));

                overtimes.ToList().ForEach(x => _databaseManager.EncryptDecrypt("UserProfiles", _dataProtector.Decrypt, x.UserProfile));

                overtimes.ToList().ForEach(x => _databaseManager.EncryptDecrypt("ApplicationUsers", _dataProtector.Decrypt, x.UserProfile.ApplicationUser));

                var dbQuery = overtimes.AsQueryable();

                if (!string.IsNullOrEmpty(query.CommentContain))
                    dbQuery = dbQuery.Where(x => x.Comment.Contains(query.CommentContain));

                dbQuery = dbQuery.OrderByDescending(x => x.DateBegin);

                if (!string.IsNullOrEmpty(query.SortBy))
                    dbQuery = dbQuery.OrderBy(x => query.SortBy);

                if (query.UserId != null && query.UserId != 0)
                    dbQuery = dbQuery.Where(x => x.UserProfileId == query.UserId);

                query.TotalCount = dbQuery.Count();

                dbQuery = dbQuery.Skip(query.Skip ?? 0);

                dbQuery = dbQuery.Take(query.Take ?? (dbQuery.Count() == 0 ? 10 : dbQuery.Count()));

                query.Result = dbQuery.ToList().ConvertAll(x => new OvertimeModel()
                {
                    Id = x.Id,
                    Comment = x.Comment,
                    DateBegin = x.DateBegin,
                    DateEnd = x.DateEnd,
                    CountDays = x.CountDays,
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

        public OvertimeModel GetById(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var overtimeM = context.Overtimes.FirstOrDefault(v => v.Id == id);

                _databaseManager.EncryptDecrypt("Overtimes", _dataProtector.Decrypt, overtimeM);

                if (overtimeM == null)
                    throw new Exception("Overtime not found");
                return new OvertimeModel()
                {
                    Comment = overtimeM.Comment,
                    DateBegin = overtimeM.DateBegin,
                    DateEnd = overtimeM.DateEnd,
                    Id = overtimeM.Id,
                    UserProfileId = overtimeM.UserProfileId,
                    CountDays = overtimeM.CountDays,                  
                };
            }
        }       
    }
}
