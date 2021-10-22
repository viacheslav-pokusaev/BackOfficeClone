using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Entities;
using Application.EntitiesModels.Models;
using Application.DAL;
using System.Linq;
using System;
using System.Collections.Generic;
using Application.EntitiesModels.Models.QueryModels;
using Application.Common.DataProtection;
using Application.Common.DatabaseAdministration;

namespace Application.BBL.BusinessServices
{
    public class SizeVacationServices: ISizeVacationServices
    {
        private readonly IDbContextFactory _dbContextFactory;

        private readonly DataProtector _dataProtector;

        private readonly DatabaseManager _databaseManager;

        public SizeVacationServices(IDbContextFactory dbContextFactory, DataProtector dataProtector, DatabaseManager databaseManager)
        {
            _dbContextFactory = dbContextFactory;
            _dataProtector = dataProtector;
            _databaseManager = databaseManager;
        }

        public SizeVacationModel Add(SizeVacationModel model)
        {
            using (var context = _dbContextFactory.Create())
            {
                var sizeVac = new SizeVacation()
                {
                    CountDay = model.CountDays,
                    Id = model.Id,
                    Year = model.Year,
                };

                _databaseManager.EncryptDecrypt("SizeVacations", _dataProtector.Encrypt, sizeVac);

                context.SizeVacations.Add(sizeVac);
                context.SaveChanges();
                model.Id = sizeVac.Id;
            }
            return model;
        }

        public SizeVacationModel Update(SizeVacationModel model)
        {
            using (var context = _dbContextFactory.Create())
            {
                var sizeVac = context.SizeVacations.FirstOrDefault(s => s.Id == model.Id);

                _databaseManager.EncryptDecrypt("SizeVacations", _dataProtector.Decrypt, sizeVac);

                if (sizeVac == null)
                    throw new Exception("Size Vacation not found");

                sizeVac.Id = model.Id;
                sizeVac.Year = model.Year;
                sizeVac.CountDay = model.CountDays;

                _databaseManager.EncryptDecrypt("SizeVacations", _dataProtector.Encrypt, sizeVac);

                context.SaveChanges();

                return model;
            }
        }

        public  bool Delete(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var sizeVac = context.SizeVacations.FirstOrDefault(s => s.Id == id);
                if (sizeVac == null)
                    throw new Exception("Size Vacation not found");

                context.SizeVacations.Remove(sizeVac);
                context.SaveChanges();

                return true;
            }
        }

        public SizeVacationQueryModel GetAll(SizeVacationQueryModel queryModel)
        {
            using (var context = _dbContextFactory.Create())
            {
                var sizeVacs = context.SizeVacations;

                sizeVacs.ToList().ForEach(x => _databaseManager.EncryptDecrypt("SizeVacations", _dataProtector.Decrypt, x));

                List<SizeVacationModel> listSizeVac = sizeVacs.Select(s => new SizeVacationModel()
                {
                    Id = s.Id,
                    Year = s.Year,
                    CountDays = s.CountDay
                }).ToList();
                queryModel.Result = listSizeVac;
                return queryModel;
            }
        }

        public SizeVacationModel GetById(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var sizeVac = context.SizeVacations.FirstOrDefault(s => s.Id == id);

                _databaseManager.EncryptDecrypt("SizeVacations", _dataProtector.Decrypt, sizeVac);

                if (sizeVac == null)
                    throw new Exception("Size Vacation not found");
                return new SizeVacationModel()
                {
                    Id = sizeVac.Id,
                    Year = sizeVac.Year,
                    CountDays = sizeVac.CountDay
                };
            }
        }
    }
}
