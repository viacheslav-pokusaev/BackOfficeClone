using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Application.Server;
using Microsoft.Extensions.Logging;
using NLog.Web;
using System;

namespace Application
{
    public class Program
    {
      
        public static void Main(string[] args)
        {
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
    }
}
