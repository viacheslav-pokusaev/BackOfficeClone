using Application.BBLInterfaces.BusinessServicesInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.IO.Compression;
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
using System.Collections.Generic;
using System.Linq;

namespace Application.Api.Controllers
{
    public class LogAdministrateController : ApplicationApiController
    {
        private readonly string _currentLogFilePath;
        private readonly string _logFilesFolder;
        private readonly IHostingEnvironment _hostingEnvironment;

        private ILogger<LogAdministrateController> _logger;

        public LogAdministrateController(
            IHostingEnvironment hostingEnvironment,
            ILogger<LogAdministrateController> logger)
        {
            _hostingEnvironment = hostingEnvironment;
            _logFilesFolder = _hostingEnvironment.ContentRootPath + "\\logs";
            _currentLogFilePath = _logFilesFolder + "\\log.txt";
            _logger = logger;
        }

        [Authorize(Roles = "Admin, Super_Admin")]
        [HttpGet]
        [Route("~/api/logfile")]
        public IActionResult GetLogFile()
        {
            IActionResult result;
            try
            {
                var bytes = System.IO.File.ReadAllBytes(_currentLogFilePath);
                result = File(bytes, "application/octet-stream", "log.txt");                
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error while reading log files: " + e.Message);
                result = StatusCode(500, Json(e));
            }

            return result;
        }

        [Authorize(Roles = "Admin, Super_Admin")]
        [HttpGet]
        [Route("~/api/deleteoldlogfiles")]
        public IActionResult DeleteOldLogFiles()
        {
            IActionResult result;
            try
            {
                var logFilesPathes = Directory.GetFiles(_logFilesFolder);
                var logFilesInfos = new List<FileInfo>();
                foreach (var filePath in logFilesPathes)
                {
                    logFilesInfos.Add(new FileInfo(filePath));
                }

                List<FileInfo> filesToDelete = new List<FileInfo>();
                if (logFilesInfos.Count > 3)
                    filesToDelete.AddRange(logFilesInfos.OrderBy(f => f.LastWriteTimeUtc).Take(logFilesInfos.Count - 3).ToList());

                foreach (var filePath in filesToDelete)
                {
                    System.IO.File.Delete(filePath.FullName);
                }

                result = Ok();
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error while deleting old log files: " + e.Message);
                result = StatusCode(500);
            }

            return result;
        }

        [Authorize(Roles = "Admin, Super_Admin")]
        [HttpGet]
        [Route("~/api/lastthreelogfiles")]
        public IActionResult GetLastThreeLogfiles()
        {
            IActionResult result;
            try
            {
                string tmpFolder = _logFilesFolder + "\\tmp";
                string zipFilePath = _logFilesFolder + "\\last_three_logfiles.zip";
                Directory.CreateDirectory(tmpFolder);

                var logFilesPathes = Directory.GetFiles(_logFilesFolder);
                var logFilesInfos = new List<FileInfo>();
                foreach(var filePath in logFilesPathes)
                {
                    logFilesInfos.Add(new FileInfo(filePath));
                }
                var lastThreeFiles = logFilesInfos.OrderByDescending(f => f.LastWriteTimeUtc).Take(3).ToList();

                foreach(var fileInfo in lastThreeFiles)
                {
                    System.IO.File.Copy(fileInfo.FullName, fileInfo.DirectoryName + "\\tmp\\" + fileInfo.Name);
                }

                ZipFile.CreateFromDirectory(tmpFolder, zipFilePath);

                var bytes = System.IO.File.ReadAllBytes(zipFilePath);

                var tmpFilesPathes = Directory.GetFiles(tmpFolder);
                foreach (var filePath in tmpFilesPathes)
                {
                    System.IO.File.Delete(filePath);
                }
                Directory.Delete(tmpFolder);
                System.IO.File.Delete(zipFilePath);

                result = File(bytes, "application/octet-stream", "last_three_logfiles.zip");
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error while creating logfiles zip: " + e.Message);
                result = StatusCode(500);
            }

            return result;
        }
    }
}
