using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.DAL;
using Application.EntitiesModels.Entities;
using Application.EntitiesModels.Models;
using Application.EntitiesModels.Models.QueryModels;
using Application.EntitiesModels.Models.Pegination;
using Application.BBL.Mapper;

using Microsoft.AspNetCore.Identity;
using System.Linq;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Application.EntitiesModels.Models.AccountModels;
using Application.Common.DataProtection;
using Application.Common.DatabaseAdministration;
using Microsoft.Extensions.Logging;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Application.BBL.BusinessServices
{
    public class UserViewServices : IUserViewServices
    {
        private readonly IDbContextFactory _dbContextFactory;
        private readonly UserManager<ApplicationUser> _userManage;
        private readonly SignInManager<ApplicationUser> _signManager;
        private readonly IRoleDBEntityMapper _roleDBEntityMapper;
        private IPictureAttacherService _pictureAttacherService;

        private readonly DataProtector _dataProtector;

        private readonly DatabaseManager _databaseManager;

        private ILogger<UserViewServices> _logger;

        public UserViewServices(IDbContextFactory dbContextFactory,
            UserManager<ApplicationUser> userManage, SignInManager<ApplicationUser> signManager,
            IRoleDBEntityMapper roleDBEntityMapper, DataProtector dataProtector,
            DatabaseManager databaseManager, ILogger<UserViewServices> logger, 
            IPictureAttacherService pictureAttacherService)
        {
            _dbContextFactory = dbContextFactory;
            _signManager = signManager;
            _userManage = userManage;
            _roleDBEntityMapper = roleDBEntityMapper;
            _dataProtector = dataProtector;
            _databaseManager = databaseManager;
            _logger = logger;
            _pictureAttacherService = pictureAttacherService;
        }

        public UserViewModel GetById(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var profiles = context.UsersProfiles.Include(x => x.Projects).FirstOrDefault(u => u.Id == id);

                _databaseManager.EncryptDecrypt("UsersProfiles", _dataProtector.Decrypt, profiles);

                if (profiles == null)
                    throw new Exception("UserProfile not found");

                profiles.ApplicationUser = context.ApplicationUsers.FirstOrDefault(a => a.Id == profiles.ApplicationUserId);

                _databaseManager.EncryptDecrypt("ApplicationUsers", _dataProtector.Decrypt, profiles.ApplicationUser);

                if (profiles.ApplicationUser == null)
                    throw new Exception("AspNetUser not found");

                var userViewModel = _roleDBEntityMapper.MapDBEntity(profiles);

                userViewModel.CountAvailableVacationDay = GetCountAvailableVacationDays(id);

                userViewModel.ProjectsCount = profiles.Projects.Count();

                userViewModel.Role = _userManage.GetRolesAsync(profiles.ApplicationUser).Result[0];

                if (profiles.Avatar != "" && profiles.Avatar != null)
                {
                    userViewModel.Avatar = _pictureAttacherService.GetBase64String(profiles.Avatar);
                }
                else
                {
                    userViewModel.Avatar = _pictureAttacherService.GetBase64String();
                }

                return userViewModel;
            }
        }

        public UserViewModel Add(UserViewModel model)
        {
            using (var context = _dbContextFactory.Create())
            {
                var ApplicationUser = new ApplicationUser()
                {
                    CreatedDate = DateTime.Now,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Email = model.Email,
                    EmailConfirmed = true,
                    IsEnabled = true,
                    UserName = model.Email,
                    PhoneNumber = model.Phone,
                };
                _databaseManager.EncryptDecrypt("ApplicationUsers", _dataProtector.Encrypt, ApplicationUser);

                _userManage.CreateAsync(ApplicationUser, model.Password).Result.ToString();

                context.SaveChanges();

                var aspUser = _userManage.FindByNameAsync(ApplicationUser.UserName).GetAwaiter().GetResult();

                _databaseManager.EncryptDecrypt("ApplicationUsers", _dataProtector.Decrypt, aspUser);

                _userManage.AddToRoleAsync(aspUser, model.Role).Result.ToString();

                var profile = new UserProfile()
                {
                    DateBirthday = model.DateBirthday,
                    DateBeginWork = model.DateBeginWork,
                    DateBeginTrialWork = model.DateBeginTrialWork,
                    Comment = model.Comment,
                    ApplicationUserId = aspUser.Id

                };

                _databaseManager.EncryptDecrypt("UsersProfiles", _dataProtector.Encrypt, profile);

                context.UsersProfiles.Add(profile);

                context.SaveChanges();
                model.UserProfileId = profile.Id;
                model.ApplicationUserId = ApplicationUser.Id;
            }
            return model;
        }

        public UserViewModel Update(UserViewModel model)
        {
            using (var context = _dbContextFactory.Create())
            {
                var profile = context.UsersProfiles.FirstOrDefault(c => c.Id == model.UserProfileId);

                _databaseManager.EncryptDecrypt("UsersProfiles", _dataProtector.Decrypt, profile);

                if (profile == null)
                    throw new Exception("Profile User not found");

                var appUser = context.ApplicationUsers.FirstOrDefault(a => a.Id == profile.ApplicationUserId);

                _databaseManager.EncryptDecrypt("ApplicationUsers", _dataProtector.Decrypt, appUser);

                if (appUser == null)
                    throw new Exception("Application User not found");

                profile.DateBirthday = model.DateBirthday;
                profile.DateBeginWork = model.DateBeginWork;
                profile.DateBeginTrialWork = model.DateBeginTrialWork;
                profile.Comment = model.Comment;
                profile.ApplicationUserId = model.ApplicationUserId;
                profile.Skype = model.Skype;
                if (_pictureAttacherService.GetBase64String(profile.Avatar) == model.Avatar)
                {
                    profile.Avatar = profile.Avatar;
                }
                else
                {
                    profile.Avatar = model.Avatar;
                }
                profile.ResidentialAddress = model.ResidentialAddress;
                profile.Skills = model.Skills;
                profile.Hobbies = model.Hobbies;
                profile.Wishes = model.Wishes;

                appUser.Email = model.Email;
                appUser.LastName = model.LastName;
                appUser.FirstName = model.FirstName;
                appUser.PhoneNumber = model.Phone;

                var user = _userManage.Users.Where(u => u.Id == model.ApplicationUserId).FirstOrDefault();

                string role = _userManage.GetRolesAsync(user).Result[0];

                if (role != model.Role)
                {
                    var removeResult = _userManage.RemoveFromRoleAsync(user, role).Result;
                    var addResult = _userManage.AddToRoleAsync(user, model.Role).Result;
                }

                _databaseManager.EncryptDecrypt("UsersProfiles", _dataProtector.Encrypt, profile);

                _databaseManager.EncryptDecrypt("ApplicationUsers", _dataProtector.Encrypt, appUser);

                context.SaveChanges();

                return model;
            }
        }

        public bool Delete(int id)
        {
            using (var context = _dbContextFactory.Create())
            {

                var profile = context.UsersProfiles.FirstOrDefault(u => u.Id == id);

                if (profile == null)
                    throw new Exception("Profile not found");

                var applicationUser = context.ApplicationUsers.FirstOrDefault(a => a.Id == profile.ApplicationUserId);

                if (applicationUser == null)
                    throw new Exception("ApplicationUser not found");

                context.ApplicationUsers.Remove(applicationUser);
                context.UsersProfiles.Remove(profile);

                context.SaveChanges();

                return true;
            }
        }

        public UserViewQueryModel GetAll(UserViewQueryModel query)
        {
            using (var context = _dbContextFactory.Create())
            {
                var userProfiles = context.UsersProfiles.ToList();

                userProfiles.ToList().ForEach(x => { x.ApplicationUser = context.ApplicationUsers.Where(z => z.Id == x.ApplicationUserId).FirstOrDefault(); });

                userProfiles.ForEach(x => _databaseManager.EncryptDecrypt("UsersProfiles", _dataProtector.Decrypt, x));

                userProfiles.ForEach(x => _databaseManager.EncryptDecrypt("ApplicationUsers", _dataProtector.Decrypt, x.ApplicationUser));

                var dbQuery = userProfiles.AsQueryable();

                if (!string.IsNullOrEmpty(query.CommentContain))
                    dbQuery = dbQuery.Where(x => x.Comment.Contains(query.CommentContain));

                if (!string.IsNullOrEmpty(query.FirstNameContain))
                    dbQuery = dbQuery.Where(x => x.ApplicationUser.FirstName.Contains(query.FirstNameContain));

                if (!string.IsNullOrEmpty(query.LastNameContain))
                    dbQuery = dbQuery.Where(x => x.ApplicationUser.LastName.Contains(query.LastNameContain));

                if (!string.IsNullOrEmpty(query.EmailContain))
                    dbQuery = dbQuery.Where(x => x.ApplicationUser.Email.Contains(query.EmailContain));

                if (!string.IsNullOrEmpty(query.PhoneContain))
                    dbQuery = dbQuery.Where(x => x.ApplicationUser.PhoneNumber.Contains(query.PhoneContain));

                //if (!string.IsNullOrEmpty(query.SortDescBy))
                dbQuery = dbQuery.OrderByDescending(x => x.DateBeginWork);

                if (!string.IsNullOrEmpty(query.SortBy))
                    dbQuery = dbQuery.OrderBy(x => query.SortBy);

                query.TotalCount = dbQuery.Count();

                dbQuery = dbQuery.Skip(query.Skip ?? 0);

                dbQuery = dbQuery.Take(query.Take ?? dbQuery.Count());

                query.Result = dbQuery.ToList().ConvertAll(x => _roleDBEntityMapper.MapDBEntity(x));

                return query;
            }
        }

        public UserViewModel GetByEmail(string email)
        {
            using (var context = _dbContextFactory.Create())
            {
                var applicationUsers = context.ApplicationUsers.ToList();

                applicationUsers.ToList().ForEach(x => _databaseManager.EncryptDecrypt("ApplicationUsers", _dataProtector.Decrypt, x));

                var applicationUser = applicationUsers.FirstOrDefault(a => a.Email == email);

                if (applicationUser == null)
                    throw new Exception("ApplicationUser not found");

                var profiles = context.UsersProfiles.Include(u => u.Projects).FirstOrDefault(u => u.ApplicationUserId == applicationUser.Id);

                _databaseManager.EncryptDecrypt("UsersProfiles", _dataProtector.Decrypt, profiles);

                if (profiles == null)
                    throw new Exception("UserProfile not found");

                var userViewModel = _roleDBEntityMapper.MapDBEntity(profiles);

                userViewModel.CountAvailableVacationDay = GetCountAvailableVacationDays(profiles.Id);

                userViewModel.ProjectsCount = profiles.Projects.Count();

                userViewModel.Role = _userManage.GetRolesAsync(profiles.ApplicationUser).Result[0];

                return userViewModel;
            }
        }

        public ListVacationQueryModel GetVacationDays(ListVacationQueryModel query)
        {
            int userId = query.UserId;
            List<ListVacationModel> list = new List<ListVacationModel>();
            using (var context = _dbContextFactory.Create())
            {
                var userProfile = context.UsersProfiles.FirstOrDefault(x => x.Id == userId);

                _databaseManager.EncryptDecrypt("UsersProfiles", _dataProtector.Decrypt, userProfile);

                if (userProfile == null)
                    throw new Exception("UserProfile not found");

                DateTime? dateBeginWork = userProfile.DateBeginWork != null ? userProfile.DateBeginWork : userProfile.DateBeginTrialWork;

                if (dateBeginWork == null)
                    throw new Exception("UserProfile not found");

                var leftDays = 0;


                var availableDays = 0;

                var sizeVacations = context.SizeVacations.ToList();

                sizeVacations.ForEach(x => _databaseManager.EncryptDecrypt("SizeVacations", _dataProtector.Decrypt, x));

                var vacations = context.Vacations.ToList();

                vacations.ForEach(x => _databaseManager.EncryptDecrypt("Vacations", _dataProtector.Decrypt, x));

                var overtimes = context.Overtimes.ToList();

                overtimes.ForEach(x => _databaseManager.EncryptDecryptAll(_dataProtector.Decrypt));

                var lastVacationCount = vacations.Count;
                //for (int i = dateBeginWork.Value.Year; i <= DateTime.Now.Year; i++)
                for (int i = dateBeginWork.Value.Year; i <= lastVacationCount; i++)
                {
                    var vacation = sizeVacations.FirstOrDefault(s => s.Year == i);
                    //if (vacation == null)
                    //    throw new Exception("SizeVacations not found");

                    int workedDays = GetWorkedDaysInYear(i, userId, dateBeginWork, vacation, context);

                    int countKilledDays = vacations.Where(x => x.UserProfileId == userId).Where(x => (x.DateBegin.Year == i && x.DateEnd.Year == i)).Sum(x => x.CountDays);

                    int overtimesDays = overtimes.Where(x => x.UserProfileId == userId).Where(x => (x.DateBegin.Year == i && x.DateEnd.Year == i)).Sum(x => x.CountDays);


                    //if (leftDays < 0)
                    //{
                    //    countKilledDays += -leftDays;

                    //}
                    if (context.Vacations.Any(x => x.UserProfileId == userId && x.DateBegin.Year == i && x.DateEnd.Year > i))
                    {
                        countKilledDays += vacations.FirstOrDefault(x => x.UserProfileId == userId && x.DateBegin.Year == i && x.DateEnd.Year > i).CountDays;
                    }

                    int acumulatedDays = (i != DateTime.Now.Year + 1) ? (int)Math.Floor(Convert.ToDouble(vacation.CountDay * (workedDays) / new DateTime(vacation.Year, 12, 31).DayOfYear)) : 0;

                    var differenceDays = acumulatedDays - countKilledDays;

                    availableDays = acumulatedDays + leftDays + overtimesDays;

                    leftDays += differenceDays;

                    list.Add(new ListVacationModel(i, vacation.CountDay, countKilledDays, acumulatedDays, availableDays));
                }
                list.Reverse();

                var dbQuery = list.AsQueryable();

                query.TotalCount = dbQuery.Count();

                dbQuery = dbQuery.Skip(query.Skip ?? 0);

                dbQuery = dbQuery.Take(query.Take ?? (dbQuery.Count() == 0 ? 10 : dbQuery.Count()));

                query.Result = dbQuery.ToList();

                return query;
            }

        }

        private int GetWorkedDaysInYear(int year, int userId, DateTime? dateBeginWork, SizeVacation vacation, IApplicationDbContext context)
        {
            int workedDays = 0;
            if (dateBeginWork.Value.Year == DateTime.Now.Year)
                workedDays = DateTime.Now.Subtract(dateBeginWork.Value).Days;
            else if (dateBeginWork.Value.Year == vacation.Year)
                workedDays = new DateTime(vacation.Year, 12, 31).Subtract(dateBeginWork.Value).Days;
            else if (vacation.Year < DateTime.Now.Year)
                workedDays = new DateTime(vacation.Year, 12, 31).DayOfYear;
            else if (vacation.Year == DateTime.Now.Year)
                workedDays = DateTime.Now.Subtract(new DateTime(DateTime.Now.Year, 1, 1)).Days;
            return workedDays;
        }

        public int GetCountAvailableVacationDays(int userId)
        {
            using (var context = _dbContextFactory.Create())
            {
                var userProfile = context.UsersProfiles.FirstOrDefault(x => x.Id == userId);

                _databaseManager.EncryptDecrypt("UsersProfiles", _dataProtector.Decrypt, userProfile);

                if (userProfile == null)
                    throw new Exception("UserProfile not found");

                DateTime? dateBeginWork = userProfile.DateBeginWork != null ? userProfile.DateBeginWork : userProfile.DateBeginTrialWork;
                if (dateBeginWork == null)
                    throw new Exception("DateBeginWork not set");

                var vacationStatistic = GetVacationDays(new ListVacationQueryModel()
                {
                    UserId = userId
                });
                var countAvailableDays = vacationStatistic.Result.Sum(x => x.AccumulatedDays) - vacationStatistic.Result.Sum(x => x.KilledDays);

                var overtimes = context.Overtimes.Where(o => o.UserProfileId == userId).ToList();

                overtimes.ForEach(x => _databaseManager.EncryptDecrypt("Overtimes", _dataProtector.Decrypt, x));

                countAvailableDays += overtimes.Sum(x => x.CountDays);
                return countAvailableDays;
            }
        }

        public ChangePasswordViewModel ChangePassword(ChangePasswordViewModel model)
        {
            using (var context = _dbContextFactory.Create())
            {
                var userProfile = context.UsersProfiles.FirstOrDefault(x => x.Id == model.UserProfileID);

                _databaseManager.EncryptDecrypt("UsersProfiles", _dataProtector.Decrypt, userProfile);

                if (userProfile == null)
                    throw new Exception("UserProfile not found.");

                var ApplicationUser = context.ApplicationUsers.FirstOrDefault(x => x.Id == userProfile.ApplicationUserId);

                _databaseManager.EncryptDecrypt("ApplicationUsers", _dataProtector.Decrypt, ApplicationUser);

                if (ApplicationUser == null)
                    throw new Exception("ApplicationUser not found.");
                if (model.OldPassword != null && model.OldPassword != "")
                {
                    _userManage.ChangePasswordAsync(ApplicationUser, model.OldPassword, model.NewPassword);
                }
                else
                {
                    var appUser = _userManage.Users.Where(u => u.Id == model.UserProfileID).FirstOrDefault();
                    var token = _userManage.GeneratePasswordResetTokenAsync(appUser).Result;
                    var result = _userManage.ResetPasswordAsync(appUser, token, model.NewPassword).Result;
                    var request = context.RequestToUpdatePasswords.Where(r => r.NewPassword == model.NewPassword).First();
                    context.RequestToUpdatePasswords.Remove(request);
                }

                _databaseManager.EncryptDecrypt("UsersProfiles", _dataProtector.Encrypt, userProfile);

                _databaseManager.EncryptDecrypt("ApplicationUsers", _dataProtector.Encrypt, ApplicationUser);

                context.SaveChanges();
                return model;
            }
        }

        public bool MakeRequestToUpdatePassword(UpdatePasswordModel model)
        {
            using (var context = _dbContextFactory.Create())
            {
                var ApplicationUser = context.ApplicationUsers.FirstOrDefault(x => x.Email == model.Email);

                _databaseManager.EncryptDecrypt("ApplicationUsers", _dataProtector.Decrypt, ApplicationUser);

                if (ApplicationUser == null)
                    throw new Exception("ApplicationUser not found.");
                context.RequestToUpdatePasswords.Add(new RequestToUpdatePassword()
                {
                    Email = model.Email,
                    Id = model.Id,
                    NewPassword = model.Password
                });
                context.SaveChanges();
                return true;
            }
        }

        public RequestToUpdatePasswordQueryModel GetAllRequestsToUpdatePassword(RequestToUpdatePasswordQueryModel query)
        {
            using (var context = _dbContextFactory.Create())
            {
                var applicationUsers = context.ApplicationUsers;

                applicationUsers.ToList().ForEach(x => _databaseManager.EncryptDecrypt("ApplicationUsers", _dataProtector.Decrypt, x));

                var requests = context.RequestToUpdatePasswords;

                var dbQuery = requests.AsQueryable();

                query.TotalCount = dbQuery.Count();

                dbQuery = dbQuery.Skip(query.Skip ?? 0);

                dbQuery = dbQuery.Take(query.Take ?? (dbQuery.Count() == 0 ? 10 : dbQuery.Count()));

                query.Result = dbQuery.ToList().ConvertAll(x => new RequestToUpdatePasswordModel()
                {
                    Email = x.Email,
                    Id = applicationUsers.Where(u => u.Email == x.Email).FirstOrDefault().Id,
                    Name = applicationUsers.Where(u => u.Email == x.Email).FirstOrDefault().FirstName + " " + applicationUsers.Where(u => u.Email == x.Email).FirstOrDefault().FirstName,
                    NewPassword = x.NewPassword
                });

                return query;
            }
        }

        public Task Logout()
        {
            return _signManager.SignOutAsync();
        }
    }
}