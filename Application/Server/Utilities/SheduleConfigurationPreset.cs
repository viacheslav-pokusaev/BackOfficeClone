using Application.EntitiesModels.Models;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Application.Server.Utilities.ConfigurationValues;

namespace Application
{
    public static class SheduleConfigurationPreset
    {
        private static List<SheduleConfiguration> sheduleConfigurations = new List<SheduleConfiguration>();

        public static void InitializationSheduleConfigurationPreset(ServiceProvider serviceProvider)
        {
            var birthdayNotificationService = serviceProvider.GetService<BBLInterfaces.BusinessServicesInterfaces.IBirthdayNotificationService>();
            var backUpNotificationService = serviceProvider.GetService<BBLInterfaces.BusinessServicesInterfaces.IBackUpNotificationService>();

            sheduleConfigurations.Add(
                new SheduleConfiguration
                {
                    ServiceFunction = new Action(() => birthdayNotificationService.CheckBirthday(true)),
                    ConfigurePeriod = new Action<FluentScheduler.Schedule>(
                        (s) => s.ToRunNow().AndEvery((int)FrequencyScaling.One).Months().On((int)DaysInMonth.First).At(Night.Hour, Night.Minute))
                });
            sheduleConfigurations.Add(
                new SheduleConfiguration
                {
                    ServiceFunction = new Action(() => birthdayNotificationService.CheckBirthday(false)),
                    ConfigurePeriod = new Action<FluentScheduler.Schedule>(
                        (s) => s.ToRunNow().AndEvery((int)FrequencyScaling.One).Days().At(Night.Hour, Night.Minute))
                });
            sheduleConfigurations.Add(
                new SheduleConfiguration
                {
                    ServiceFunction = new Action(() => backUpNotificationService.CheckBackUp()),
                    ConfigurePeriod = new Action<FluentScheduler.Schedule>(
                        (s) => s.ToRunNow().AndEvery((int)FrequencyScaling.One).Months().On((int)DaysInMonth.First).At(Morning.Hour, Morning.Minute))
                });
        }

        public static List<SheduleConfiguration> GetSheduleConfigurations()
        {          
            return sheduleConfigurations;
        }
    }
}
