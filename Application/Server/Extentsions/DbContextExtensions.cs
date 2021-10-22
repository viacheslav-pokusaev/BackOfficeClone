using Application.Common.DatabaseAdministration;
using Application.Common.DataProtection;
using Application.DAL;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using System.Linq;

namespace Application.Server.Extentsions
{
    public static class DbContextExtensions
    {
        public static void Seed(this ApplicationDbContext context, IWebHost host)
        {
            if (!context.AllMigrationsApplied())
            {
                context.Database.Migrate();
            }
            var seed = new SeedDbData(host, context);
        }

        public static bool AllMigrationsApplied(this ApplicationDbContext context)
        {
            var applied = context.GetService<IHistoryRepository>()
                .GetAppliedMigrations()
                .Select(m => m.MigrationId);

            var total = context.GetService<IMigrationsAssembly>()
                .Migrations
                .Select(m => m.Key);

            return !total.Except(applied).Any();
        }
    }
}
