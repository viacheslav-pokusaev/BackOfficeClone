using Application.BBL.BusinessServices;
using Application.BBL.Mapper;
using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.DAL;
using Application.EntitiesModels.Entities;
using Application.Common.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Application.Common.DatabaseAdministration;
using Application.EntitiesModels.Models;
using System.Collections.Generic;
using System;
using FluentScheduler;

namespace Application.Server.Extentsions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCustomDevDbContext(this IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                string useSqLite = Startup.Configuration["Data:useSqLite"];
                if (useSqLite.ToLower() == "true")
                {
                    options.UseSqlite(Startup.Configuration["Data:Dev:SqlLiteConnectionString"]);
                }
                else
                {
                    options.UseSqlServer(Startup.Configuration["Data:Dev:SqlServerConnectionString"], b => b.MigrationsAssembly("Application.DAL"));
                }
            });
            return services;
        }

        public static IServiceCollection AddCustomProdDbContext(this IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                string useSqLite = Startup.Configuration["Data:useSqLite"];
                if (useSqLite.ToLower() == "true")
                {
                    options.UseSqlite(Startup.Configuration["Data:Prod:SqlLiteConnectionString"]);
                }
                else
                {
                    options.UseSqlServer(Startup.Configuration["Data:Prod:SqlServerConnectionString"], b => b.MigrationsAssembly("Application.DAL"));
                }
            });
            return services;
        }

        public static IServiceCollection AddCustomIdentity(this IServiceCollection services)
        {
            services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
            {
                options.Password.RequiredLength = 1;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireDigit = false;
            })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

            return services;
        }

        public static IServiceCollection AddDependencies(this IServiceCollection services)
        {  
            services.AddScoped<IApplicationDbContext, ApplicationDbContext>();

            services.AddScoped<IDbContextFactory, DbContextFactory>();

            services.AddTransient<IPictureAttacherService, PictureAttacherService>();

            services.AddTransient<IUserViewServices, UserViewServices>();

            services.AddTransient<IRequestToCreateUserServices, RequestToCreateUserServices>();

            services.AddTransient<IVacationServices, VacationServices>();

            services.AddTransient<ISickDayServices, SickDayServices>();

            services.AddTransient<ISizeVacationServices, SizeVacationServices>();

            services.AddTransient<IOvertimeServices, OvertimeServices>();

            services.AddTransient<IRoleDBEntityMapper, RoleDBEntityMapper>();

            services.AddTransient<IWorkActivityServices, WorkActivityServices>();

            services.AddTransient<IWorkAtHomeService, WorkAtHomeService>();

            services.AddTransient<IClientService, ClientService>();

            services.AddTransient<IProjectService, ProjectService>();

            services.AddTransient<IUserProfileProjectService, UserProfileProjectService>();

            services.AddTransient<IAuditTrailService, AuditTrailService>();            

            services.AddTransient<IFeedbackService, FeedbackService>();
            
            services.AddScoped<DataProtector>();

            services.AddTransient<DatabaseManager>();

            services.AddSingleton<ISendEmailService, SendEmailService>();

            services.AddSingleton<IBirthdayNotificationService, BirthdayNotificationService>();

            services.AddSingleton<IBackUpNotificationService, BackUpNotificationService>();

            services.AddSingleton<ISheduleService, SheduleService>();

            services.AddScoped<IVacationsTableService, VacationsTableService>();

            return services;
        }
    }
}
