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

namespace Application.BBL.BusinessServices
{
    public class SickDayServices : ISickDayServices
    {
        private readonly IDbContextFactory _dbContextFactory;

        private readonly DataProtector _dataProtector;

        private readonly DatabaseManager _databaseManager;

        public SickDayServices(IDbContextFactory dbContextFactory, DataProtector dataProtector, DatabaseManager databaseManager)
        {
            _dbContextFactory = dbContextFactory;
            _dataProtector = dataProtector;
            _databaseManager = databaseManager;
        }

        public SickDayModel Add(SickDayModel model)
        {
            using (var context = _dbContextFactory.Create())
            {
                var sickDay = new SickDay()
                {
                    Comment = model.Comment,
                    DateBegin = model.DateBegin,
                    DateEnd = model.DateEnd,
                    UserProfileId = model.UserProfileId,
                    CountDays = model.CountDays,
                };
                _databaseManager.EncryptDecrypt("SickDays", _dataProtector.Encrypt, sickDay);
                context.SickDays.Add(sickDay);
                context.SaveChanges();
                model.Id = sickDay.Id;
            }
            return model;
        }

        public SickDayModel Update(SickDayModel model)
        {
            using (var context = _dbContextFactory.Create())
            {
                var sickDay = context.SickDays.FirstOrDefault(s => s.Id == model.Id);

                _databaseManager.EncryptDecrypt("SickDays", _dataProtector.Decrypt, sickDay);

                if (sickDay == null)
                    throw new Exception("Sick Day not found");

                sickDay.Comment = model.Comment;
                sickDay.DateBegin = model.DateBegin;
                sickDay.DateEnd = model.DateEnd;
                sickDay.Id = model.Id;
                sickDay.UserProfileId = model.UserProfileId;
                sickDay.CountDays = model.CountDays;

                _databaseManager.EncryptDecrypt("SickDays", _dataProtector.Encrypt, sickDay);

                context.SaveChanges();

                return model;
            }
        }

        public bool Delete(int id)
        {
            using (var context = _dbContextFactory.Create())
            {

                var sickDay = context.SickDays.Find(id);

                if (sickDay == null)
                    throw new Exception("Sick Day not found");

                context.SickDays.Remove(sickDay);
                context.SaveChanges();

                return true;
            }
        }

        public SickDayQueryModel GetAll(SickDayQueryModel query)
        {
            using (var context = _dbContextFactory.Create())
            {
                var sickDays = context.SickDays.Include(v => v.UserProfile).ThenInclude(a => a.ApplicationUser);

                sickDays.ToList().ForEach(x => _databaseManager.EncryptDecrypt("SickDays", _dataProtector.Decrypt, x));

                sickDays.ToList().ForEach(x => _databaseManager.EncryptDecrypt("UserProfiles", _dataProtector.Decrypt, x.UserProfile));

                sickDays.ToList().ForEach(x => _databaseManager.EncryptDecrypt("ApplicationUsers", _dataProtector.Decrypt, x.UserProfile.ApplicationUser));


                var dbQuery = sickDays.AsQueryable();

                if (!string.IsNullOrEmpty(query.CommentContain))
                    dbQuery = dbQuery.Where(x => x.Comment.Contains(query.CommentContain));

                    dbQuery = dbQuery.OrderBy(x => x.DateBegin);

                if (!string.IsNullOrEmpty(query.SortDescBy))
                    dbQuery = dbQuery.OrderByDescending(x => query.SortDescBy);

                if (query.UserId != null && query.UserId != 0)
                    dbQuery = dbQuery.Where(x => x.UserProfileId == query.UserId);

                query.TotalCount = dbQuery.Count();

                dbQuery = dbQuery.Skip(query.Skip ?? 0);

                dbQuery = dbQuery.Take(query.Take ?? (dbQuery.Count() == 0 ? 10 : dbQuery.Count()));

                query.Result = dbQuery.ToList().ConvertAll(x => new SickDayModel()
                {
                    Id = x.Id,
                    Comment = x.Comment,
                    DateBegin = x.DateBegin,
                    DateEnd = x.DateEnd,
                    UserProfileId = x.UserProfileId,
                    CountDays = x.CountDays,
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

        public SickDayModel GetById(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var sickDayM = context.SickDays.FirstOrDefault(v => v.Id == id);

                _databaseManager.EncryptDecrypt("SickDays", _dataProtector.Decrypt, sickDayM);

                if (sickDayM == null)
                    throw new Exception("Sick Day not found");
                return new SickDayModel()
                {
                    Comment = sickDayM.Comment,
                    DateBegin = sickDayM.DateBegin,
                    DateEnd = sickDayM.DateEnd,
                    Id = sickDayM.Id,
                    UserProfileId = sickDayM.UserProfileId,
                    CountDays = sickDayM.CountDays,
                };
            }
        }


    }
}
