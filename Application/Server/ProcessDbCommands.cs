using Application.Common.DatabaseAdministration;
using Application.Common.DataProtection;
using Application.DAL;
using Application.Server.Extentsions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace Application.Server
{
    public class ProcessDbCommands
    {
        public static void Process(IWebHost host)
        {
            var services = (IServiceScopeFactory)host.Services.GetService(typeof(IServiceScopeFactory));

            using (var scope = services.CreateScope())
            {
                var db = GetApplicationDbContext(scope);
                db.Seed(host);
            }
        }

        private static ApplicationDbContext GetApplicationDbContext(IServiceScope services)
        {
            var db = services.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            return db;
        }
    }
}
