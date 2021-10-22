using Application.EntitiesModels.Models.Pegination;
using Application.EntitiesModels.Models;
using Application.EntitiesModels.Entities;
using Application.DAL;
using Application.BBL.Mapper;
using Application.BBLInterfaces.BusinessServicesInterfaces;

using System.Collections.Generic;
using System.Linq;
using Application.EntitiesModels.Models.QueryModels;
using Microsoft.EntityFrameworkCore;
using Application.Common.DataProtection;
using Application.Common.DatabaseAdministration;

namespace Application.BBL.BusinessServices
{
    public class WorkActivityServices : IWorkActivityServices
    {
        private readonly IDbContextFactory _dbContextFactory;
        private readonly IRoleDBEntityMapper _roleDBEntityMapper;

        private readonly DataProtector _dataProtector;

        private readonly DatabaseManager _databaseManager;

        public WorkActivityServices(IDbContextFactory dbContextFactory, IRoleDBEntityMapper roleDBEntityMapper, DataProtector dataProtector, DatabaseManager databaseManager)
        {
            _dbContextFactory = dbContextFactory;
            _roleDBEntityMapper = roleDBEntityMapper;
            _dataProtector = dataProtector;
            _databaseManager = databaseManager;
        }

        public WorkActivityQueryModel GetWorkActivities(WorkActivityQueryModel query)
        {
            using (var context = _dbContextFactory.Create())
            {
                var vacations = context.Vacations.Include(v => v.UserProfile).ThenInclude(a => a.ApplicationUser);
                vacations.ToList().ForEach(x => _databaseManager.EncryptDecrypt("Vacations", _dataProtector.Decrypt, x));
                vacations.ToList().ForEach(x => _databaseManager.EncryptDecrypt("UserProfiles", _dataProtector.Decrypt, x.UserProfile));
                vacations.ToList().ForEach(x => _databaseManager.EncryptDecrypt("ApplicationUsers", _dataProtector.Decrypt, x.UserProfile.ApplicationUser));
                var dbQueryVacations = vacations.AsQueryable().Select(x => _roleDBEntityMapper.MapDBEntity(x)).ToList();
                var sickDays = context.SickDays.Include(v => v.UserProfile).ThenInclude(a => a.ApplicationUser);
                sickDays.ToList().ForEach(x => _databaseManager.EncryptDecrypt("SickDays", _dataProtector.Decrypt, x));
                sickDays.ToList().ForEach(x => _databaseManager.EncryptDecrypt("UserProfiles", _dataProtector.Decrypt, x.UserProfile));
                sickDays.ToList().ForEach(x => _databaseManager.EncryptDecrypt("ApplicationUsers", _dataProtector.Decrypt, x.UserProfile.ApplicationUser));
                var dbQuerySickDays = sickDays.AsQueryable().Select(x => _roleDBEntityMapper.MapDBEntity(x)).ToList();
                var overtimes = context.Overtimes.Include(v => v.UserProfile).ThenInclude(a => a.ApplicationUser);
                overtimes.ToList().ForEach(x => _databaseManager.EncryptDecrypt("Overtimes", _dataProtector.Decrypt, x));
                overtimes.ToList().ForEach(x => _databaseManager.EncryptDecrypt("UserProfiles", _dataProtector.Decrypt, x.UserProfile));
                overtimes.ToList().ForEach(x => _databaseManager.EncryptDecrypt("ApplicationUsers", _dataProtector.Decrypt, x.UserProfile.ApplicationUser));
                var dbQueryOvertimes = overtimes.AsQueryable().Select(x => _roleDBEntityMapper.MapDBEntity(x)).ToList();
                var dbQueryAll = dbQueryVacations.Union(dbQuerySickDays).Union(dbQueryOvertimes);

                if (!string.IsNullOrEmpty(query.CommentContain))
                    dbQueryAll = dbQueryAll.Where(x => x.Comment.Contains(query.CommentContain));

                if (!string.IsNullOrEmpty(query.NameContain))
                    dbQueryAll = dbQueryAll.Where(x => x.Name.Contains(query.NameContain));

                if (!string.IsNullOrEmpty(query.TypeContain))
                    dbQueryAll = dbQueryAll.Where(x => x.Type.Contains(query.TypeContain));

                dbQueryAll = dbQueryAll.OrderByDescending(o => o.DateBegin);

                if (!string.IsNullOrEmpty(query.SortDescBy))
                    dbQueryAll = dbQueryAll.OrderBy(x => query.SortBy);

                dbQueryAll = dbQueryAll.Skip(query.Skip ?? 0);

                dbQueryAll = dbQueryAll.Take(query.Take ?? (dbQueryAll.Count() == 0 ? 10 : dbQueryAll.Count()));

                query.Result = dbQueryAll.ToList();

                query.TotalCount = vacations.Count() + sickDays.Count() + overtimes.Count();
            }
            return query;
        }
    }
}
