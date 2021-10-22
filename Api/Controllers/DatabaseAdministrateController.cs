using Application.BBLInterfaces.BusinessServicesInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.SqlServer.Management.Common;
using Microsoft.SqlServer.Management.Smo;
using Application.Common.DatabaseAdministration;
using Application.Common.DataProtection;
using Application.EntitiesModels.Models;
using Application.EntitiesModels.Models.DataProtection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using System.Globalization;
using System.Security.AccessControl;
using System.Security.Principal;
using Microsoft.Extensions.Logging;
using Application.DAL;
using Microsoft.EntityFrameworkCore;

namespace Application.Api.Controllers
{
    public class DatabaseAdministrateController : ApplicationApiController
    {
        private string DBServerShareFolderPath = @"C:\Program Files\Microsoft SQL Server\MSSQL13.SQLEXPRESS\MSSQL\Backup\BackOfficeDB\";

        private string DeleteBackupSQLCommand = @"EXECUTE master.dbo.xp_delete_file 0,N'{0}',N'{1}',N'{2}',1";

        private string BackupFileExctention = "bak";

        private DatabaseManager _databaseManager;

        private DataProtector _dataProtector;

        private readonly IHostingEnvironment _hostingEnvironment;

        private DatabaseModel _databaseInfo;
        private ILogger<DatabaseAdministrateController> _logger;
        private ApplicationDbContext _context;

        public DatabaseAdministrateController(
            DatabaseManager databaseManager, 
            DataProtector dataProtector, 
            IHostingEnvironment hostingEnvironment, 
            IOptions<ConnectionStringModel> connectionStringModel,
            ILogger<DatabaseAdministrateController> logger,
            ApplicationDbContext context)
        {
            _databaseManager = databaseManager;
            _dataProtector = dataProtector;
            _hostingEnvironment = hostingEnvironment;
            _databaseInfo = connectionStringModel.Value.GetConfig();
            _logger = logger;
            _context = context;
        }

        [Authorize(Roles = "Admin, Super_Admin")]
        [HttpGet]
        [Route("~/api/database")]
        public IActionResult GetBackup()
        {
            IActionResult result;
            string sharedFolderOnDBServer = @"//192.168.1.3/BackOfficeDB/" + _databaseInfo.DatabaseFullName;
            string path = DBServerShareFolderPath + _databaseInfo.DatabaseFullName;

            try
            {
                _databaseManager.MakeBackup(path, sharedFolderOnDBServer);

                _logger.LogWarning("Trying to read backup file from shared folder by path: " + sharedFolderOnDBServer);
                var bytes = System.IO.File.ReadAllBytes(sharedFolderOnDBServer);

                result = File(bytes, "application/octet-stream", _databaseInfo.DatabaseFullName);
            }
            catch(Exception e)
            {
                _logger.LogError(e, "Error while generating backup file: " + e.Message);
                result = StatusCode(500, Json(e));
            }

            return result;
        }

        [Authorize(Roles = "Admin, Super_Admin")]
        [HttpGet]
        [Route("~/api/database/tables")]
        public IActionResult GetAllTables()
        {
            return Ok(_databaseManager.GetAllTables()); 
        }

        [Authorize(Roles = "Admin, Super_Admin")]
        [HttpPost]
        [Route("~/api/database/tables")]
        public IActionResult DecryptEncrypt([FromBody]EncryptDecryptModel encryptDecryptModel)
        {
            return Ok(_databaseManager.SaveConfiguration(encryptDecryptModel));
        }

        [Authorize(Roles = "Admin, Super_Admin")]
        [HttpPut]
        [Route("~/api/database/key")]
        public IActionResult SetKey([FromBody]CryptKeyModel cryptKeyModel)
        {
            return Ok(_databaseManager.SetKey(cryptKeyModel));
        }

        [Authorize(Roles = "Admin, Super_Admin")]
        [HttpGet]
        [Route("~/api/database/name")]
        public IActionResult GetDatabaseName()
        {
            return new JsonResult(new { name = "BackOffice_" + DateTime.Now.ToString() + ".bak" });
        }
    }
}
