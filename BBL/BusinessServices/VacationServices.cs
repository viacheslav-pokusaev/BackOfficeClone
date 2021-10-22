using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Entities;
using Application.EntitiesModels.Models;
using Application.DAL;
using System.Linq;
using System;
using System.Collections.Generic;
using Application.EntitiesModels.Models.QueryModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Application.Common.DataProtection;
using Application.Common.DatabaseAdministration;

namespace Application.BBL.BusinessServices
{
    public class VacationServices : IVacationServices
    {
        private readonly IDbContextFactory _dbContextFactory;

        private readonly UserManager<ApplicationUser> _userManager;

        private readonly DataProtector _dataProtector;

        private readonly DatabaseManager _databaseManager;


        public VacationServices(IDbContextFactory dbContextFactory, UserManager<ApplicationUser> userManager, DataProtector dataProtector, DatabaseManager databaseManager)
        {
            _dbContextFactory = dbContextFactory;
            _userManager = userManager;
            _dataProtector = dataProtector;
            _databaseManager = databaseManager;
        }

        public VacationModel Add(VacationModel model)
        {
            using (var context = _dbContextFactory.Create())
            {
                var vacation = new Vacation()
                {
                    Comment = model.Comment,
                    DateBegin = model.DateBegin,
                    DateEnd = model.DateEnd,
                    UserProfileId = model.UserProfileId,
                    CountDays = model.CountDays,
                    CreatedDate = model.CreatedDate,
                    Status = model.Status,
                };

                _databaseManager.EncryptDecrypt("Vacations", _dataProtector.Encrypt, vacation);

                context.Vacations.Add(vacation);
                context.SaveChanges();
                model.Id = vacation.Id;
            }
            return model;
        }

        public VacationModel Update(VacationModel model)
        {
            using (var context = _dbContextFactory.Create())
            {
                var vacation = context.Vacations.FirstOrDefault(v => v.Id == model.Id);

                _databaseManager.EncryptDecrypt("Vacations", _dataProtector.Decrypt, vacation);

                if (vacation == null)
                    throw new Exception("Vacation not found");

                vacation.Comment = model.Comment;
                vacation.DateBegin = model.DateBegin;
                vacation.DateEnd = model.DateEnd;
                vacation.Id = model.Id;
                vacation.UserProfileId = model.UserProfileId;
                vacation.CountDays = model.CountDays;
                vacation.Status = model.Status;

                _databaseManager.EncryptDecrypt("Vacations", _dataProtector.Encrypt, vacation);

                context.SaveChanges();

                return model;
            }
        }

        public bool Delete(int id)
        {
            using (var context = _dbContextFactory.Create())
            {

                var vacation = context.Vacations.FirstOrDefault(v => v.Id == id);

                if (vacation == null)
                    throw new Exception("Vacation not found");

                context.Vacations.Remove(vacation);
                context.SaveChanges();

                return true;
            }
        }

        public VacationQueryModel GetAll(VacationQueryModel query)
        {
            using (var context = _dbContextFactory.Create())
            {
                var vacations = context.Vacations.Include(v => v.UserProfile).ThenInclude(a => a.ApplicationUser);

                vacations.ToList().ForEach(x => _databaseManager.EncryptDecrypt("Vacations", _dataProtector.Decrypt, x));

                vacations.ToList().ForEach(x => _databaseManager.EncryptDecrypt("UserProfiles", _dataProtector.Decrypt, x.UserProfile));

                vacations.ToList().ForEach(x => _databaseManager.EncryptDecrypt("ApplicationUsers", _dataProtector.Decrypt, x.UserProfile.ApplicationUser));

                var dbQuery = vacations.AsQueryable();

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

                query.Result = dbQuery.ToList().ConvertAll(x => new VacationModel()
                {
                    Id = x.Id,
                    Comment = x.Comment,
                    DateBegin = x.DateBegin,
                    DateEnd = x.DateEnd,
                    CountDays = x.CountDays,
                    UserProfileId = x.UserProfileId,
                    CreatedDate = x.CreatedDate,
                    Status = x.Status,
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

        public VacationModel GetById(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var vacationM = context.Vacations.FirstOrDefault(v => v.Id == id);

                _databaseManager.EncryptDecrypt("Vacations", _dataProtector.Decrypt, vacationM);

                if (vacationM == null)
                    throw new Exception("Vacation not found");
                return new VacationModel()
                {
                    Comment = vacationM.Comment,
                    DateBegin = vacationM.DateBegin,
                    DateEnd = vacationM.DateEnd,
                    Id = vacationM.Id,
                    UserProfileId = vacationM.UserProfileId,
                    CountDays = vacationM.CountDays,   
                    CreatedDate = vacationM.CreatedDate,
                    Status = vacationM.Status
                };
            }
        }  
    }
}
