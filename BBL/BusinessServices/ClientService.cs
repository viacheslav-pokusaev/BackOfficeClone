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
    public class ClientService: IClientService
    {
        private readonly IDbContextFactory _dbContextFactory;

        private readonly DataProtector _dataProtector;

        private readonly DatabaseManager _databaseManager;

        public ClientService(IDbContextFactory dbContextFactory,DataProtector dataProtector, DatabaseManager databaseManager)
        {
            _dbContextFactory = dbContextFactory;
            _dataProtector = dataProtector;
            _databaseManager = databaseManager;
        }

        public ClientModel Add(ClientModel model)
        {
            using (var context = _dbContextFactory.Create())
            {
                if (model.Project != null)
                {
                    var project = new Project()
                    {
                        ClientId = model.Id,
                        DateBegin = model.Project.DateBegin,
                        DateEnd = model.Project.DateEnd,
                        Name = model.Project.Name,
                        Comment = model.Project.Comment,
                        EmploeeCount = model.Project.EmploeeCount
                    };
                    _databaseManager.EncryptDecrypt("Projects", _dataProtector.Encrypt, project);
                    context.Projects.Add(project);
                    context.SaveChanges();
                    model.Project.Id = project.Id;
                }
                var client = new Client()
                {
                    Description = model.Description,
                    OrganizationName = model.OrganizationName,
                    Comment = model.Comment
                };

                _databaseManager.EncryptDecrypt("Clients", _dataProtector.Encrypt, client);

                context.Clients.Add(client);

                context.SaveChanges();

                model.Id = client.Id;

                if (model.ProjectId != 0)
                {
                    var project = context.Projects.Where(p => p.Id == model.ProjectId).FirstOrDefault();
                    project.ClientId = client.Id;
                }

                context.SaveChanges();
            }
            return model;
        }

        public ContactPersonModel AddContactPerson(ContactPersonModel model)
        {
            using (var context = _dbContextFactory.Create())
            {
                var contactPerson = new ContactPerson()
                {
                    Email = model.Email,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Phone = model.Phone,
                    CommunicationChannel = model.CommunicationChannel,
                    ClientId = model.ClientId,
                    Comment = model.Comment
                };

                _databaseManager.EncryptDecrypt("ContactPersons", _dataProtector.Encrypt, contactPerson);

                context.ContactPersons.Add(contactPerson);

                context.SaveChanges();
            }
            return model;
        }

        public bool Delete(int id)
        {
            using (var context = _dbContextFactory.Create())
            {

                var client = context.Clients.Find(id);

                if (client == null)
                    throw new Exception("Client not found");

                var projects = context.Projects.Where(p => p.ClientId.Value == id);

                foreach(var project in projects)
                {
                    project.ClientId = null;
                }

                context.SaveChanges();

                context.Clients.Remove(client);

                context.SaveChanges();

                return true;
            }
        }

        public bool DeleteContactPerson(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var contactPerson = context.ContactPersons.Where(cp => cp.Id == id).FirstOrDefault();

                context.ContactPersons.Remove(contactPerson);

                context.SaveChanges();

                return true;
            }
        }

        public ClientQueryModel GetAll(ClientQueryModel query)
        {
            using (var context = _dbContextFactory.Create())
            {
                var clients = context.Clients.Skip(query.Skip ?? 0).Take(query.Take ?? 0).Include(c => c.Projects).Include(c => c.ContactPersons);

                clients.ToList().ForEach(x => _databaseManager.EncryptDecrypt("Clients", _dataProtector.Decrypt, x));
                clients.ToList().ForEach(x => x.Projects.ToList().ForEach(y => _databaseManager.EncryptDecrypt("Projects", _dataProtector.Decrypt, y)));
                clients.ToList().ForEach(x => x.ContactPersons.ToList().ForEach(y => _databaseManager.EncryptDecrypt("ContactPersons", _dataProtector.Decrypt, y)));

                var dbQuery = clients.AsQueryable();

                if (query.UserId != null && query.UserId != 0)
                    dbQuery = dbQuery.Where(x => x.Projects.Any(p => p.Emploees.Any(e => e.UserProfileId == query.UserId)));

                query.TotalCount = dbQuery.Count();

                //dbQuery = dbQuery.Skip(query.Skip ?? 0);

                //dbQuery = dbQuery.Take(query.Take ?? (dbQuery.Count() == 0 ? 10 : dbQuery.Count()));

                query.Result = dbQuery.ToList().ConvertAll(x => new ClientModel()
                {
                    Id = x.Id,
                    Description = x.Description,
                    ProjectsCount = x.Projects.Count(),
                    ProjectsNames = x.Projects.Select(p => p.Name),
                    Comment = x.Comment,
                    ContactPersons = x.ContactPersons.Select(y => new ContactPersonModel()
                    {
                        CommunicationChannel = y.CommunicationChannel,
                        Email = y.Email,
                        FirstName = y.FirstName,
                        LastName = y.LastName,
                        Phone = y.Phone,
                        ClientId = y.ClientId,
                        Id = y.Id,
                        Comment = y.Comment
                    }),
                    OrganizationName = x.OrganizationName,
                });

                return query;
            }
        }

        public ClientModel GetById(int id)
        {
            using (var context = _dbContextFactory.Create())
            {
                var client = context.Clients.Include(c => c.Projects).Include(c => c.ContactPersons).FirstOrDefault(v => v.Id == id);

                _databaseManager.EncryptDecrypt("Clients", _dataProtector.Decrypt, client);

                client.Projects.ToList().ForEach(x => _databaseManager.EncryptDecrypt("Projects", _dataProtector.Decrypt, x));

                client.ContactPersons.ToList().ForEach(y => _databaseManager.EncryptDecrypt("ContactPersons", _dataProtector.Decrypt, y));

                if (client == null)
                    throw new Exception("Client not found");
                return new ClientModel()
                {
                    Id = client.Id,
                    Description = client.Description,
                    ProjectsCount = client.Projects.Count(),
                    OrganizationName = client.OrganizationName,
                    Comment = client.Comment,
                    ContactPersons = client.ContactPersons.Select(x => new ContactPersonModel()
                    {
                        CommunicationChannel = x.CommunicationChannel,
                        Email = x.Email,
                        FullName = x.FirstName + " " + x.LastName,
                        FirstName = x.FirstName,
                        LastName = x.LastName,
                        ClientId = x.ClientId,
                        Phone = x.Phone,
                        Id = x.Id,
                        Comment = x.Comment
                    })
                };
            }
        }

        public ClientModel Update(ClientModel model)
        {
            using (var context = _dbContextFactory.Create())
            {
                var client = context.Clients.FirstOrDefault(c => c.Id == model.Id);

                _databaseManager.EncryptDecrypt("Clients", _dataProtector.Decrypt, client);

                if (client == null)
                    throw new Exception("Client not found");

                client.Id = model.Id;
                client.Description = model.Description;
                client.OrganizationName = model.OrganizationName;
                client.Comment = model.Comment;

                _databaseManager.EncryptDecrypt("Clients", _dataProtector.Encrypt, client);

                context.SaveChanges();

                return model;
            }
        }

        public ContactPersonModel UpdateContactPerson(ContactPersonModel model)
        {
            using (var context = _dbContextFactory.Create())
            {
                var contactPerson = context.ContactPersons.FirstOrDefault(c => c.Id == model.Id);

                _databaseManager.EncryptDecrypt("ContactPersons", _dataProtector.Decrypt, contactPerson);

                if (contactPerson == null)
                    throw new Exception("ContactPerson not found");

                contactPerson.Email = model.Email;

                contactPerson.FirstName = model.FirstName;

                contactPerson.LastName = model.LastName;

                contactPerson.Phone = model.Phone;

                contactPerson.CommunicationChannel = model.CommunicationChannel;

                contactPerson.Comment = model.Comment;

                _databaseManager.EncryptDecrypt("ContactPersons", _dataProtector.Encrypt, contactPerson);

                context.SaveChanges();

                return model;
            }
        }
    }
}
