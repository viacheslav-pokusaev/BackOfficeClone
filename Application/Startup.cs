using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net;
using System.IO;
using System.Globalization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Application.Server.Extentsions;
using Newtonsoft.Json.Serialization;
using Application.EntitiesModels.Models;
using NLog;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption;
using Application.EntitiesModels.Models.DataProtection;
using Application.Server;
using NLog.Config;
using NLog.Targets;
using Application.BBL.BusinessServices;
using Microsoft.AspNetCore.Hosting.Internal;

namespace Application
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public static IConfiguration Configuration { get; set; }
       
        public void ConfigureDevelopmentServices(IServiceCollection services)
        {
            services.AddCustomDevDbContext();

            services.AddDependencies();

            services.AddDistributedMemoryCache();

            services.AddSession();

            services.AddCustomIdentity();

            services.AddLocalization(option =>
               option.ResourcesPath = "Resources"
            );

            services.ConfigureApplicationCookie(config =>
            {
                config.Events = new CookieAuthenticationEvents
                {
                    OnRedirectToLogin = ctx =>
                    {
                        if (ctx.Request.Path.StartsWithSegments("/api"))
                        {
                            ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        }
                        else
                        {
                            ctx.Response.Redirect(ctx.RedirectUri);
                        }
                        return Task.FromResult(0);
                    }
                };
                //config.AccessDeniedPath = "/Account/Error";
            });

            services.AddApplicationInsightsTelemetry(Configuration);

            services.Configure<RequestLocalizationOptions>(options =>
            {
                var supportedCultures = new[]
                {
                    new CultureInfo("en"),
                    new CultureInfo("ru")
                };

                var defaultLanguage = Configuration["Localization:DefaultLanguage"];
                if(defaultLanguage != null)
                    options.DefaultRequestCulture = new RequestCulture(Configuration["Localization:DefaultLanguage"], Configuration["Localization:DefaultLanguage"]);
                options.SupportedCultures = supportedCultures;
                options.SupportedUICultures = supportedCultures;
                options.RequestCultureProviders = new List<IRequestCultureProvider>
                {
                    new QueryStringRequestCultureProvider(),
                    new CookieRequestCultureProvider()
                };

            });

            services.AddDataProtection();

            services.AddMvc()
                .AddApplicationPart(typeof(Application.Api.Controllers.UsersController).Assembly)
                .AddDataAnnotationsLocalization()
                .AddViewLocalization()
                .AddSessionStateTempDataProvider()
                .AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

            //services.AddSwaggerGen(c =>
            //{
            //    c.SwaggerDoc("v1", new Info { Title = "Back Office API ", Version = "v1" });
            //    var path = Path.Combine(PlatformServices.Default.Application.ApplicationBasePath, Configuration["Swagger:FileName"]);
            //    c.IncludeXmlComments(path);
            //    c.DescribeAllEnumsAsStrings();
            //});

            services.Configure<ConnectionStringModel>(Configuration.GetSection("Data:Dev"));

            SheduleConfigurationPreset.InitializationSheduleConfigurationPreset(services.BuildServiceProvider());

            services.AddSingleton(SheduleConfigurationPreset.GetSheduleConfigurations());

            services.AddHostedService<SheduleService>();
        }


        public void ConfigureDevelopment(IApplicationBuilder app, IHostingEnvironment env)
        {
            //app.UseExceptionHandler()......

            app.UseDeveloperExceptionPage();

            app.UseDefaultFiles();

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseSession();

            //ConfigureDevelopmentNLog();

            var locOptions = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>();
            app.UseRequestLocalization(locOptions.Value);

            //app.UseMiddleware(typeof(ErrorHandlingMiddleware));

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Admin}/{action=Index}/{id?}");


                routes.MapSpaFallbackRoute(
                name: "spa-fallback",
                defaults: new { controller = "Account", action = "Admin" }
                );
            });

            //app.UseSwagger();

            //app.UseSwaggerUI(c =>
            //{
            //
            //    if(env.IsDevelopment())
            //        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Jwt Security Api v1 (DEBUG)");
            //    else
            //        c.SwaggerEndpoint("/[]virtualDir]/swagger/v1/swagger.json", "Jwt Security Api v1 (RELEASE)");
            //});

            app.UseExceptionHandler(
                builder =>
                {
                    builder.Run(async context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        context.Response.ContentType = "text/html";

                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if (error != null)
                        {
                            await context.Response.WriteAsync($"<h1>Error: {error.Error.Message}</h1>").ConfigureAwait(false);
                        }
                    });
                });
        }

        //private static void ConfigureDevelopmentNLog()
        //{
        //    var config = new LoggingConfiguration();
        //    var consoleTarget = new ColoredConsoleTarget("target1")
        //    {
        //        Layout = @"${date:format=HH\:mm\:ss} ${level} ${message} ${exception}"
        //    };
        //    config.AddTarget(consoleTarget);
        //    config.AddRuleForAllLevels(consoleTarget);

        //    var fileTarget = new FileTarget("target2")
        //    {
        //        FileName = "${basedir}/log.txt",
        //        Layout = "${longdate} ${level} ${message}  ${exception}"
        //    };
        //    config.AddTarget(fileTarget);
        //    config.AddRuleForAllLevels(fileTarget);

        //    LogManager.Configuration = config;
        //}

        //private static void ConfigureProductionNLog()
        //{
        //    var config = new LoggingConfiguration();
        //    var fileTarget = new FileTarget("target2")
        //    {
        //        FileName = "${basedir}/log.txt",
        //        Layout = "${longdate} ${level} ${message}  ${exception}"
        //    };
        //    config.AddTarget(fileTarget);
        //    config.AddRuleForAllLevels(fileTarget);
        //    LogManager.Configuration = config;
        //}

        public void ConfigureProductionServices(IServiceCollection services)
        {
            services.AddCustomProdDbContext();

            services.AddDependencies();

            services.AddSession();

            services.AddCustomIdentity();

            services.AddLocalization(option =>
               option.ResourcesPath = "Resources"
            );

            services.Configure<RequestLocalizationOptions>(options =>
            {
                var supportedCultures = new[]
                {
                    new CultureInfo("en"),
                    new CultureInfo("ru")
                };
            
                options.DefaultRequestCulture = new RequestCulture(Configuration["Localization:DefaultLanguage"], Configuration["Localization:DefaultLanguage"]);
                options.SupportedCultures = supportedCultures;
                options.SupportedUICultures = supportedCultures;
                options.RequestCultureProviders = new List<IRequestCultureProvider>
                {
                    new QueryStringRequestCultureProvider(),
                    new CookieRequestCultureProvider()
                };
            
            });

            services.ConfigureApplicationCookie(config =>
            {
                config.Events = new CookieAuthenticationEvents
                {
                    OnRedirectToLogin = ctx =>
                    {
                        if (ctx.Request.Path.StartsWithSegments("/api"))
                        {
                            ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        }
                        else
                        {
                            ctx.Response.Redirect(ctx.RedirectUri);
                        }
                        return Task.FromResult(0);
                    }
                };
            });

            services.AddApplicationInsightsTelemetry(Configuration);

            services.AddDataProtection();

            services.AddMvc()
                .AddApplicationPart(typeof(Application.Api.Controllers.UsersController).Assembly)
                .AddDataAnnotationsLocalization()
                .AddViewLocalization()
                .AddSessionStateTempDataProvider()
                .AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

            services.Configure<IISOptions>(options => 
            {
                options.ForwardClientCertificate = false;
                
            });

            services.Configure<ConnectionStringModel>(Configuration.GetSection("Data:Prod"));

            SheduleConfigurationPreset.InitializationSheduleConfigurationPreset(services.BuildServiceProvider());

            services.AddSingleton(SheduleConfigurationPreset.GetSheduleConfigurations());

            services.AddHostedService<SheduleService>();
        }


        public void ConfigureProduction(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseDeveloperExceptionPage();

            app.UseDefaultFiles();

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseSession();

            //ConfigureProductionNLog();

            var locOptions = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>();
            app.UseRequestLocalization(locOptions.Value);

            //app.UseMiddleware(typeof(ErrorHandlingMiddleware));

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Admin}/{action=Index}/{id?}");


                routes.MapSpaFallbackRoute(
                name: "spa-fallback",
                defaults: new { controller = "Account", action = "Admin" }
                );
            });
        }
    }
}
