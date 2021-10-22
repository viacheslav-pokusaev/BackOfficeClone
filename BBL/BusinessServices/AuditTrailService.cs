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
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
 
namespace Application.BBL.BusinessServices
{
    public class AuditTrailService: IAuditTrailService
    {
        private readonly IDbContextFactory _dbContextFactory;

        private readonly IHttpContextAccessor _httpContextAccessor;

        private readonly DataProtector _dataProtector;

        private Dictionary<string, string []> parentsDictionary; 

        public AuditTrailService(IHttpContextAccessor httpContextAccessor, IDbContextFactory dbContextFactory, DataProtector dataProtector)
        {
            _dbContextFactory = dbContextFactory;

            _httpContextAccessor = httpContextAccessor;

            _dataProtector = dataProtector;

            parentsDictionary = new Dictionary<string, string []>();

            parentsDictionary.Add("ContactPerson", new string [] { "Clients", "ClientId"});

            parentsDictionary.Add("Project", new string[] { "Clients", "ClientId" });

            parentsDictionary.Add("Overtime", new string[] { "ApplicationUsers", "UserProfileId" });

            parentsDictionary.Add("Vacation", new string[] { "ApplicationUsers", "UserProfileId" });

            parentsDictionary.Add("SickDay", new string[] { "ApplicationUsers", "UserProfileId" });

            parentsDictionary.Add("WorkAtHome", new string[] { "ApplicationUsers", "UserProfileId" });

            parentsDictionary.Add("UserProfileProject", new string[] { "Project", "ProjectId" });
        }

        public AuditTrail FormAndSaveDataAfterChangingKey(List<EntityEntry> reEncrypted)
        {
            using (var context = _dbContextFactory.Create())
            {
                var username = _httpContextAccessor.HttpContext != null ? _httpContextAccessor.HttpContext.User.Identity.Name : null;

                var applicationUser = username != null ? context.ApplicationUsers.Where(u => u.UserName == username).FirstOrDefault() : null;

                var fullName = applicationUser != null ? applicationUser.FirstName + ' ' + applicationUser.LastName : "UnknownUser";

                AuditTrail auditTrail = new AuditTrail()
                {
                    Date = DateTime.Now,

                    UserName = fullName,

                    UserId = applicationUser.Id
                };

                context.AuditTrails.Add(auditTrail);

                context.SaveChanges();
                
                foreach (var reEncryptedEntity in reEncrypted)
                {
                    AuditTrailEntity auditTrailEntity = new AuditTrailEntity()
                    {
                        EntityName = reEncryptedEntity.Metadata.Name,

                        Action = "Change key",

                        AuditTrailId = auditTrail.Id
                    };

                    context.AuditTrailEntities.Add(auditTrailEntity);

                    context.SaveChanges();

                    foreach (var property in reEncryptedEntity.Properties)
                    {
                        AuditTrailValue auditTrailValue = new AuditTrailValue()
                        {
                            AuditTrailEntityId = auditTrailEntity.Id,

                            OldValue = property.OriginalValue == null ? "" : property.OriginalValue.ToString(),

                            NewValue = property.CurrentValue == null ? "" : property.CurrentValue.ToString(),

                            PropertyName = property.Metadata.Name
                        };
                        context.AuditTrailValues.Add(auditTrailValue);

                        context.SaveChanges();
                    }
                }

                //for (int i = 0; i < auditTrail.AuditTrailEntities.ToList().Count; i++)
                //{
                //    var ate = auditTrail.AuditTrailEntities.ToList()[i];

                //    if (parentsDictionary[ate.EntityName.Split('.').Last()] != null)
                //    {
                //        var parentName = parentsDictionary[ate.EntityName.Split('.').Last()][0];
                //        var type = context.GetType();
                //        var dbSet = type.GetProperty(parentName).GetValue(context) as IEnumerable<object>;
                //        var obj = dbSet.Where(x =>  x.GetType().GetProperty("Id").GetValue(x).ToString() == ate.AuditTrailValues.Where(v => v.PropertyName == "Id").FirstOrDefault().NewValue.ToString()).FirstOrDefault();
                //        if (obj != null)
                //        {
                //            var props = obj.GetType().GetProperties();
                //            foreach (var prop in props)
                //            {
                //                Value value = new Value()
                //                {
                //                    AuditTrailEntityId = ate.Id,

                //                    Name = prop.Name,

                //                    ValueOfField = prop.GetValue(obj).ToString()
                //                };

                //                context.Values.Add(value);
                //            }
                //        }

                //    }
                //}

                context.SaveChanges();

                return auditTrail;
            }
        }

        public AuditTrail FormAndSaveAuditData(IList<EntityEntry> added, IList<EntityEntry> modified, IList<EntityEntry> deleted)
        {
            using (var context = _dbContextFactory.Create())
            {
                var username = _httpContextAccessor.HttpContext != null ? _httpContextAccessor.HttpContext.User.Identity.Name : null;

                var applicationUser = username != null ? context.ApplicationUsers.Where(u => u.UserName == username).FirstOrDefault() : null;

                var fullName = applicationUser != null ? applicationUser.FirstName + ' ' + applicationUser.LastName : "UnknownUser";

                AuditTrail auditTrail = new AuditTrail()
                {
                    Date = DateTime.Now,

                    UserName = fullName
                };

                context.AuditTrails.Add(auditTrail);

                context.SaveChanges();

                foreach (var addedEntity in added)
                {
                    AuditTrailEntity auditTrailEntity = new AuditTrailEntity()
                    {
                        EntityName = addedEntity.Metadata.Name,

                        Action = "Add",

                        AuditTrailId = auditTrail.Id
                    };

                    context.AuditTrailEntities.Add(auditTrailEntity);

                    context.SaveChanges();

                    foreach (var property in addedEntity.Properties)
                    {
                        AuditTrailValue auditTrailValue = new AuditTrailValue()
                        {
                            AuditTrailEntityId = auditTrailEntity.Id,

                            NewValue = property.CurrentValue == null ? "" : property.CurrentValue.ToString(),

                            PropertyName = property.Metadata.Name
                        };

                        if (auditTrailValue.NewValue != "") context.AuditTrailValues.Add(auditTrailValue);

                        context.SaveChanges();
                    }
                }
                foreach (var modifiedEntity in modified)
                {
                    AuditTrailEntity auditTrailEntity = new AuditTrailEntity()
                    {
                        EntityName = modifiedEntity.Metadata.Name,

                        Action = "Edit",

                        AuditTrailId = auditTrail.Id
                    };

                    context.AuditTrailEntities.Add(auditTrailEntity);

                    context.SaveChanges();

                    foreach (var property in modifiedEntity.Properties)
                    {
                        AuditTrailValue auditTrailValue = new AuditTrailValue()
                        {
                            AuditTrailEntityId = auditTrailEntity.Id,

                            OldValue = property.OriginalValue == null ? "" : property.OriginalValue.ToString(),

                            NewValue = property.CurrentValue == null ? "" : property.CurrentValue.ToString(),

                            PropertyName = property.Metadata.Name
                        };
                        if (auditTrailValue.OldValue != auditTrailValue.NewValue)
                            context.AuditTrailValues.Add(auditTrailValue);

                        context.SaveChanges();
                    }
                }

                foreach (var deletedEntity in deleted)
                {
                    AuditTrailEntity auditTrailEntity = new AuditTrailEntity()
                    {
                        EntityName = deletedEntity.Metadata.Name,

                        Action = "Delete",

                        AuditTrailId = auditTrail.Id
                    };

                    context.AuditTrailEntities.Add(auditTrailEntity);

                    context.SaveChanges();

                    foreach (var property in deletedEntity.Properties)
                    {
                        AuditTrailValue auditTrailValue = new AuditTrailValue()
                        {
                            AuditTrailEntityId = auditTrailEntity.Id,

                            PropertyName = property.Metadata.Name,

                            OldValue = property.OriginalValue == null ? "" : property.OriginalValue.ToString(),
                        };

                        context.AuditTrailValues.Add(auditTrailValue);

                        context.SaveChanges();
                    }
                }

                //for (int i = 0; i < auditTrail.AuditTrailEntities.ToList().Count; i++)
                //{
                //    var ate = auditTrail.AuditTrailEntities.ToList()[i];

                //    if (parentsDictionary.Keys.Contains(ate.EntityName.Split('.').Last()))
                //    {
                //        var parentName = parentsDictionary[ate.EntityName.Split('.').Last()][0];
                //        var type = context.GetType();
                //        var dbSet = type.GetProperty(parentName).GetValue(context) as IEnumerable<object>;
                //        var obj = dbSet.Where(x => x.GetType().GetProperty("Id").GetValue(x).ToString() == ate.GetType().GetProperty(parentsDictionary[ate.EntityName.Split('.').Last()][1]).ToString()).FirstOrDefault();
                //        if (obj != null)
                //        {
                //            var props = obj.GetType().GetProperties();
                //            foreach (var prop in props)
                //            {
                //                Value value = new Value()
                //                {
                //                    AuditTrailEntityId = ate.Id,

                //                    Name = prop.Name,

                //                    ValueOfField = prop.GetValue(obj).ToString()
                //                };

                //                context.Values.Add(value);
                //            }
                //        }

                //    }
                //}

                context.SaveChanges();

                return auditTrail;
            }
        }

        public AuditTrailQueryModel GetAuditTrailEntityModels(AuditTrailQueryModel model)
        {
            var result = new List<AuditTrailEntityModel>();

            using (var context = _dbContextFactory.Create())
            {
                var allAuditTrailEntities = context.AuditTrailEntities.Skip(model.Skip ?? 0).Take(model.Take ?? 0).Include(a => a.AuditTrail).Include(a => a.AuditTrailValues).Include(a => a.Values).ToList();

                //var auditTrailEntities = allAuditTrailEntities.Skip(model.Skip ?? 0).ToList();

                //auditTrailEntities = auditTrailEntities.Take(model.Take ?? (auditTrailEntities.Count == 0 ? 10 : auditTrailEntities.Count)).ToList();

                foreach (var ate in allAuditTrailEntities)
                {
                    result.Add(new AuditTrailEntityModel()
                    {
                        Action = ate.Action,

                        AuditTrailValues = ate.AuditTrailValues.Where(x => x.PropertyName != "Id").Select(x => new AuditTrailValueModel()
                        {
                            AuditTrailEntityId = x.AuditTrailEntityId,

                            Id = x.Id,

                            NewValue = x.NewValue == null ? "" : x.NewValue,

                            OldValue = x.OldValue == null ? "" : x.OldValue,

                            PropertyName = x.PropertyName
                        }).Where(x => x.NewValue + x.OldValue != "").ToList(),

                        Id = ate.Id,

                        Date = ate.AuditTrail.Date,

                        EntityName = ate.EntityName.Split('.').Last(),

                        UserName = ate.AuditTrail.UserName,

                        UserId = ate.AuditTrail.UserId,

                        Values = ate.Values.Select(x => new ValueModel()
                        {
                            AuditTrailEntityId = x.AuditTrailEntityId,

                            Id = x.Id,

                            Name = x.Name,

                            ValueOfField = x.ValueOfField
                        }).ToList()
                    });
                }


                model.Result = result.ToList();

                model.TotalCount = context.AuditTrailEntities.Count();

                var keys = context.CryptKeys.ToList();

                var columns = context.CryptColumns.ToList();

                foreach (var entity in model.Result)
                {
                    var date = entity.Date;

                    var rightKey = "";

                    var rightKeyOld = "";

                    for (int i = 0; i < keys.Count - 1; i++)
                    {
                        if (date > keys[i].ChangingDate && date < keys[i + 1].ChangingDate)
                        {
                            rightKey = keys.ElementAt(i).Value;
                            if (i > 0 && /*Math.Abs(keys[i].ChangingDate.Ticks - date.Ticks) / TimeSpan.TicksPerSecond < 4*/ entity.Action == "Change key")
                            {
                                rightKeyOld = keys.ElementAt(i - 1).Value;
                                //entity.Action = "Change key";
                            }
                        }

                    }
                    if (date > keys[keys.Count - 1].ChangingDate)
                    {
                        rightKey = keys[keys.Count - 1].Value;
                        if (/*Math.Abs(keys[keys.Count - 1].ChangingDate.Ticks - date.Ticks) / TimeSpan.TicksPerSecond < 4*/ entity.Action == "Change key")
                        {
                            rightKeyOld = keys[keys.Count - 2].Value;
                            //entity.Action = "Change key";
                        }
                    }
                    foreach (var value in entity.AuditTrailValues)
                    {
                        if (columns.Any(c => c.TableName == entity.EntityName + "s" && c.ColumnName == value.PropertyName))
                        {
                            if (value.NewValue.Length > 80 && value.OldValue.Length > 80)
                            {
                                value.NewValue = _dataProtector.Decrypt(value.NewValue, rightKey);

                                value.OldValue = _dataProtector.Decrypt(value.OldValue, rightKeyOld != "" ? rightKeyOld : rightKey);
                            }
                            else
                            {
                                if (value.NewValue.Length > 80)
                                {
                                    value.NewValue = _dataProtector.Decrypt(value.NewValue, rightKey);
                                }

                                if (value.OldValue.Length > 80)
                                    value.OldValue = _dataProtector.Decrypt(value.OldValue, rightKey);
                            }
                        }
                    }

                    foreach (var value in entity.Values)
                    {
                        if (columns.Any(c => c.TableName == entity.EntityName + "s" && c.ColumnName == value.Name))
                        {
                            if (value.ValueOfField.Length > 80)
                            {
                                value.ValueOfField = _dataProtector.Decrypt(value.ValueOfField, rightKey);
                            }
                        }
                    }
                    if (entity.Action == "Edit") entity.AuditTrailValues = entity.AuditTrailValues.Where((v => v.NewValue != v.OldValue)).ToList();
                }
            }

            return model;
        }
    }
}
