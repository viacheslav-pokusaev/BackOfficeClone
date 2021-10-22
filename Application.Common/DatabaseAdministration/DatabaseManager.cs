using Application.Common.DataProtection;
using Application.DAL;
using Application.EntitiesModels.Entities;
using Application.EntitiesModels.Models.DataProtection;
using Microsoft.Extensions.Options;
using Microsoft.SqlServer.Management.Common;
using Microsoft.SqlServer.Management.Smo;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Text;

namespace Application.Common.DatabaseAdministration
{
    public class DatabaseManager
    {
        private IDbContextFactory _dbContextFactory;
        private DataProtector _dataProtector;

        private DatabaseModel databaseInfo;

        public DatabaseManager(IDbContextFactory dbContextFactory, DataProtector dataProtector, IOptions<ConnectionStringModel> connectionStringModel)
        {
            _dbContextFactory = dbContextFactory;
            _dataProtector = dataProtector;
            _dataProtector.RefreshKey();
            databaseInfo = connectionStringModel.Value.GetConfig();
        }

        public void MakeBackup(string path, string pathToSharedFolderOnDBServer)
        {
            Backup backupDatabaseFull = new Backup();

            backupDatabaseFull.Initialize = true; // rewite existing database backup if exists
            backupDatabaseFull.Action = BackupActionType.Database;
            backupDatabaseFull.Database = databaseInfo.DatabaseName;
            backupDatabaseFull.CompressionOption = BackupCompressionOptions.Off;
            backupDatabaseFull.Devices.AddDevice(path, DeviceType.File);
            backupDatabaseFull.BackupSetName = "Adventureworks database Backup - Compressed";
            backupDatabaseFull.BackupSetDescription = "Adventureworks database - Full Backup with Compressin - only in SQL Server 2008";
            backupDatabaseFull.SqlBackup(new Server(new ServerConnection(databaseInfo.ServerName, databaseInfo.UserID, databaseInfo.Password)));
        }

        public EncryptDecryptModel GetAllTables()
        {
            using (var context = _dbContextFactory.Create())
            {
                var columns = context.CryptColumns;
                return new EncryptDecryptModel()
                {
                    Tables = new List<TableModel>()
                {
                    new TableModel()
                    {
                        Name = "Clients",
                        Columns = new List<ColumnModel>()
                        {
                            new ColumnModel()
                            {
                                Name = "OrganizationName",
                                WillBeCrypted = columns.Select(c => c.ColumnName).Any(c => c == "OrganizationName")
                            },
                            new ColumnModel()
                            {
                                Name = "Description",
                                WillBeCrypted =  columns.Select(c => c.ColumnName).Any(c => c == "Description")
                            },
                        }
                    },
                    new TableModel()
                    {
                        Name = "ContactPersons",
                        Columns = new List<ColumnModel>()
                        {
                            new ColumnModel()
                            {
                                Name = "FirstName",
                                WillBeCrypted =  columns.Select(c => c.ColumnName).Any(c => c == "FirstName")
                            },
                            new ColumnModel()
                            {
                                Name = "LastName",
                                WillBeCrypted =  columns.Select(c => c.ColumnName).Any(c => c == "LastName")
                            },
                            new ColumnModel()
                            {
                                Name = "CommunicationChannel",
                                WillBeCrypted =  columns.Select(c => c.ColumnName).Any(c => c == "CommunicationChannel")
                            },
                            new ColumnModel()
                            {
                                Name = "Phone",
                                WillBeCrypted =  columns.Select(c => c.ColumnName).Any(c => c == "Phone")
                            },
                            new ColumnModel()
                            {
                                Name = "Email",
                                WillBeCrypted =  columns.Select(c => c.ColumnName).Any(c => c == "Email")
                            }
                        }
                    },
                    new TableModel()
                    {
                        Name = "Projects",
                        Columns = new List<ColumnModel>()
                        {
                            new ColumnModel()
                            {
                                Name = "Name",
                                WillBeCrypted =  columns.Select(c => c.ColumnName).Any(c => c == "Name")
                            },
                            new ColumnModel()
                            {
                                Name = "Comment",
                                WillBeCrypted =  columns.Select(c => c.ColumnName).Any(c => c == "Comment")
                            },
                        }
                    }
                },
                    Action = ""
                };
            }
        }

        public EncryptDecryptModel SaveConfiguration(EncryptDecryptModel encryptDecryptModel)
        {
            EncryptDecryptAll(_dataProtector.Decrypt);
            using (var context = _dbContextFactory.Create())
            {
                var currentCryptoColumns = context.CryptColumns;
                foreach (var cryptoColumn in currentCryptoColumns)
                {
                    context.CryptColumns.Remove(cryptoColumn);
                }
                context.SaveChanges();
                foreach (var t in encryptDecryptModel.Tables)
                {
                    foreach (var c in t.Columns)
                    {
                        if (c.WillBeCrypted)
                        {
                            CryptColumn cryptColumn = new CryptColumn()
                            {
                                ColumnName = c.Name,
                                TableName = t.Name
                            };
                            context.CryptColumns.Add(cryptColumn);
                        }
                    }
                }
                context.SaveChanges();
            }
            EncryptDecryptAll(_dataProtector.Encrypt);
            return encryptDecryptModel;
        }

        public void EncryptDecryptAll(Func<string, string> action)
        {
            using (var context = _dbContextFactory.Create())
            {
                var columns = context.CryptColumns;
                var type = context.GetType();
                var dbSets = type.GetProperties().Select(p => p.Name);
                foreach (var p in dbSets)
                {
                    if (columns.Any(x => x.TableName == p))
                    {
                        var dbSet = type.GetProperty(p).GetValue(context);
                        var collection = dbSet as IEnumerable<object>;
                        if (collection != null)
                        {
                            foreach (var element in collection)
                            {
                                EncryptDecrypt(p, action, element);
                            }
                        }
                        type.GetProperty(p).SetValue(context, dbSet);
                    }
                }
                context.SaveChangesAfterChangingKey();
            }
        }

        public void EncryptDecrypt(string tableName, Func<string, string> action, object obj)
        {
            if (obj != null)
            {
                using (var context = _dbContextFactory.Create())
                {
                    var columns = context.CryptColumns.Where(c => c.TableName == tableName).Select(c => c.ColumnName).ToList();
                    var className = tableName.Remove(tableName.Length - 1, 1);
                    var type = Type.GetType("Application.EntitiesModels.Entities." + className + ", Application.EntitiesModels, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null");
                    foreach (var c in columns)
                    {
                        var property = type.GetProperty(c);
                        if (property != null)
                        {
                            var oldValue = property.GetValue(obj);
                            property.SetValue(obj, oldValue != null ? action(oldValue.ToString()) : null);
                            //property.SetValue(obj, oldValue != null ? Convert.ChangeType(action(oldValue.ToString()), oldValue.GetType()) : null);
                        }
                    }
                }
            }
        }

        public void EncryptDecryptColumn(string tableName, string columnName, Func<string, string> action, object obj)
        {
            if (obj != null)
            {
                using (var context = _dbContextFactory.Create())
                {
                    var columns = context.CryptColumns.Where(c => c.TableName == tableName).Select(c => c.ColumnName).ToList();
                    var className = tableName.Remove(tableName.Length - 1, 1);
                    var type = Type.GetType("Application.EntitiesModels.Entities." + className + ", Application.EntitiesModels, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null");
                    if (columns.Contains(columnName))
                    {
                        var property = type.GetProperty(columnName);
                        if (property != null)
                        {
                            var oldValue = property.GetValue(obj);
                            property.SetValue(obj, oldValue != null ? action(oldValue.ToString()) : null);
                        }
                    }
                    context.SaveChanges();
                }
            }
        }

        public CryptKeyModel SetKey(CryptKeyModel cryptKey)
        {
            using (var _context = _dbContextFactory.Create())
            {
                //EncryptDecryptAll(_dataProtector.Decrypt);
                //_context.SaveChanges();
                CryptKey newCryptKey = new CryptKey()
                {
                    Value = cryptKey.Value,
                    ChangingDate = DateTime.Now
                };
                _context.CryptKeys.Add(newCryptKey);
                _context.SaveChanges();
                EncryptDecryptAll(_dataProtector.DecryptEncrypt);
                //_context.SaveChanges();
            }
            return cryptKey;
        }
    }
}
