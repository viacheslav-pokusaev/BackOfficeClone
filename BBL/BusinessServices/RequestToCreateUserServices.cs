using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.DAL;
using Application.EntitiesModels.Entities;
using Application.EntitiesModels.Models.AccountModels;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System;
using System.Collections.Generic;
using Application.EntitiesModels.Models.QueryModels;
using Application.Common.DataProtection;
using Application.Common.DatabaseAdministration;

namespace Application.BBL.BusinessServices
{
    public class RequestToCreateUserServices : IRequestToCreateUserServices
    {
        private readonly IDbContextFactory _dbContextFactory;
        private readonly UserManager<ApplicationUser> _userManage;

        private readonly DataProtector _dataProtector;

        private readonly DatabaseManager _databaseManager;

        public RequestToCreateUserServices(IDbContextFactory dbContextFactory, UserManager<ApplicationUser> userManage, DataProtector dataProtector, DatabaseManager databaseManager)
        {
            _dbContextFactory = dbContextFactory;
            _userManage = userManage;
            _dataProtector = dataProtector;
            _databaseManager = databaseManager;
        }

        public RequestToCreateUserViewModel Add(RequestToCreateUserViewModel model)
        {
            using (var context = _dbContextFactory.Create())
            {
                var requestToCreateUser = new RequestToCreateUser()
                {
                    Email = model.Email.ToLower(),
                    FirstName = model.FirstName ?? "",
                    LastName = model.LastName ?? "",
                    Password = model.Password,
                    Phone = model.Phone ?? "",
                    DateCreate = DateTime.Now,
                    DateBirthday = model.DateBirthday,
                };

                _databaseManager.EncryptDecrypt("RequestToCreateUsers", _dataProtector.Encrypt, requestToCreateUser);

                context.RequestToCreateUsers.Add(requestToCreateUser);
                context.SaveChanges();
                model.Id = requestToCreateUser.Id;
            }
            return model;
        }

        public bool Delete(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var requestToCreateUser = context.RequestToCreateUsers.FirstOrDefault(u => u.Id == id);

                if (requestToCreateUser == null)
                    throw new Exception("Profile not found");

                context.RequestToCreateUsers.Remove(requestToCreateUser);
                context.SaveChanges();

                return true;
            }
        }

        public RequestToCreateUserQueryModel GetAll(RequestToCreateUserQueryModel queryModel)
        {
            using (var context = _dbContextFactory.Create())
            {
                var requestsToCreateUser = context.RequestToCreateUsers.ToList();

                requestsToCreateUser.ForEach(x => _databaseManager.EncryptDecrypt("RequestToCreateUsers", _dataProtector.Decrypt, x));

                List<RequestToCreateUserViewModel> listRequestToCreateUserModel = requestsToCreateUser.Select(r => new RequestToCreateUserViewModel()
                {
                    Id = r.Id,
                    Phone = r.Phone,
                    Email = r.Email,
                    DateBirthday = r.DateBirthday.ToUniversalTime(),
                    FirstName = r.FirstName,
                    LastName = r.LastName,
                    Password = r.Password,
                    DateCreate = r.DateCreate,
                }).ToList();
                queryModel.Result = listRequestToCreateUserModel;
                return queryModel;
            }


        }

        public RequestToCreateUserViewModel GetById(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var requestToCreateUserModel = context.RequestToCreateUsers.FirstOrDefault(r => r.Id == id);

                _databaseManager.EncryptDecrypt("RequestToCreateUsers", _dataProtector.Encrypt, requestToCreateUserModel);

                if (requestToCreateUserModel == null)
                    throw new Exception("RequestToCreateUser not found");
                return new RequestToCreateUserViewModel()
                {
                    DateBirthday = requestToCreateUserModel.DateBirthday,
                    DateCreate = requestToCreateUserModel.DateCreate,
                    Email = requestToCreateUserModel.Email,
                    FirstName = requestToCreateUserModel.FirstName,
                    Id = requestToCreateUserModel.Id,
                    LastName = requestToCreateUserModel.LastName,
                    Password = requestToCreateUserModel.Password,
                    Phone = requestToCreateUserModel.Phone
                };
            }
        }

        public bool IsExistEmail(string email)
        {
            using (var context = _dbContextFactory.Create())
            {
                email = email.ToLower();

                var requestsToCreateUser = context.RequestToCreateUsers;

                requestsToCreateUser.ToList().ForEach(x => _databaseManager.EncryptDecrypt("RequestToCreateUsers", _dataProtector.Decrypt, x));

                var requestToCreateUserExist = requestsToCreateUser.FirstOrDefault(r => r.Email == email);

                var applicationUsers = context.ApplicationUsers;

                applicationUsers.ToList().ForEach(x => _databaseManager.EncryptDecrypt("ApplicationUsers", _dataProtector.Decrypt, x));

                var userExist = applicationUsers.FirstOrDefault(user => user.Email == email);

                if (requestToCreateUserExist == null && userExist == null)
                    return false;
                else
                    return true;
            }
        }

        public bool TransferToUser(RequestToCreateUserViewModel model)
        {
            using (var context = _dbContextFactory.Create())
            {
                var requestsToCreateUser = context.RequestToCreateUsers;

                requestsToCreateUser.ToList().ForEach(x => _databaseManager.EncryptDecrypt("RequestToCreateUsers", _dataProtector.Decrypt, x));

                var preUserModel = requestsToCreateUser.FirstOrDefault(x => x.Id == model.Id);
                if(preUserModel == null)
                    throw new Exception("RequestToCreateUser not found");
                var ApplicationUser = new ApplicationUser()
                {
                    CreatedDate = DateTime.Now,
                    FirstName = preUserModel.FirstName,
                    LastName = preUserModel.LastName,
                    Email = preUserModel.Email,
                    EmailConfirmed = true,
                    IsEnabled = true,
                    UserName = preUserModel.Email,
                    PhoneNumber = preUserModel.Phone,

                };
                _databaseManager.EncryptDecrypt("ApplicationUsers", _dataProtector.Encrypt, ApplicationUser);
                _userManage.CreateAsync(ApplicationUser, preUserModel.Password).Result.ToString();
                context.SaveChanges();
                var aspUser = _userManage.FindByNameAsync(ApplicationUser.UserName).GetAwaiter().GetResult();
                _userManage.AddToRolesAsync(aspUser, new[] { "User" }).Result.ToString();
                var profile = new UserProfile()
                {
                    DateBirthday = preUserModel.DateBirthday,
                    DateBeginWork = preUserModel.DateCreate,
                    DateBeginTrialWork = preUserModel.DateCreate,
                    ApplicationUserId = aspUser.Id

                };

                context.RequestToCreateUsers.Remove(preUserModel);
                _databaseManager.EncryptDecrypt("UsersProfiles", _dataProtector.Encrypt, profile);
                context.UsersProfiles.Add(profile);
                context.SaveChanges();
                return true;
            }
            

        }
    }
}
