using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Application.Server;
using Microsoft.Extensions.Logging;
using NLog.Web;
using System;
using Google.Apis.Sheets.v4;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using System.Collections.Generic;

namespace Application
{
    public class Program
    {
        static readonly string[] Scopes = { SheetsService.Scope.Spreadsheets };
        static readonly string ApplicationName = "Dot Tutorials";
        static readonly string sheet = "October'21";
        static readonly string SpreadsheetId = "18XJpskb88AAKQEBKE0C49z43NQfwKJR5JEMTgE-EYSc";
        static SheetsService service;

        public static void Main(string[] args)
        {
            Init();
            ReadSheet();
            var logger = NLogBuilder.ConfigureNLog("NLog.config").GetCurrentClassLogger();
            try
            {
                logger.Debug("App started");
                var host = BuildWebHost(args);
                ProcessDbCommands.Process(host);
                host.Run();
            }
            catch (Exception ex)
            {
                logger.Error(ex, ex.Message);
            }
            finally
            {
                NLog.LogManager.Shutdown();
            }            
        }

        public static IWebHost BuildWebHost(string[] args)
        {
            return new WebHostBuilder()
            .UseKestrel(options =>
            {
                options.Limits.MaxRequestBodySize = long.MaxValue;
            })
            .ConfigureLogging(logging =>
            {
                logging.ClearProviders();
                logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Trace);
            })
            .UseNLog()
            .UseStartup<Startup>()
            .UseContentRoot(Directory.GetCurrentDirectory())
            .UseIISIntegration()
            .UseConfiguration(new ConfigurationBuilder()
                  .AddCommandLine(args)
                  .SetBasePath(Directory.GetCurrentDirectory())
                  .AddJsonFile("appsettings.json", optional: true)
                  .Build()
            )
           .Build();
        }

        private static void  SplitArgument(string[] args,out  string[] dbArgs,out string[] commonArgs)
        {
            dbArgs = args.Where(x =>  x.Contains("seeddb") || x.Contains("migratedb") || x.Contains("dropdb")).ToArray();

            commonArgs = args.Except(dbArgs).ToArray();            
        }


        static void Init()
        {

            GoogleCredential credential;
            //Reading Credentials File...
            using (var stream = new FileStream("inlaid-crowbar-330810-0492784c4579.json", FileMode.Open, FileAccess.Read))
            {
                credential = GoogleCredential.FromStream(stream)
                    .CreateScoped(Scopes);
            }

            // Creating Google Sheets API service...
            service = new SheetsService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = ApplicationName,
            });
        }

        static void ReadSheet()
        {
            // Specifying Column Range for reading...
            var range = $"{sheet}!A:AJ";
            SpreadsheetsResource.ValuesResource.GetRequest request =
                    service.Spreadsheets.Values.Get(SpreadsheetId, range);

            // Ecexuting Read Operation...
            var response = request.Execute();
            // Getting all records from Column A to E...
            IList<IList<object>> values = response.Values;
            //if (values != null && values.Count > 0)
            //{
            //    foreach (var row in values)
            //    {
            //        // Writing Data on Console...
            //        Console.WriteLine("{0} | {1} | {2} | {3} | {4} ", row[0], row[1], row[2], row[3], row[4]);
            //    }
            //}
            //else
            //{
            //    Console.WriteLine("No data found.");
            //}
        }
    }
}
