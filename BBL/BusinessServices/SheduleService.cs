using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Models;
using FluentScheduler;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.BBL.BusinessServices
{
    public class SheduleService : IHostedService, ISheduleService
    {
        private readonly IServiceProvider _serviceProvider;
        private List<SheduleConfiguration> _sheduleConfigurations;

        public SheduleService
            ( IServiceProvider serviceProvider,
            List<SheduleConfiguration> sheduleConfigurations)
        {
            _serviceProvider = serviceProvider;
            _sheduleConfigurations = sheduleConfigurations;
        }

        public void ConfigureShedule()
        {
            foreach (var sheduleConfiguration in _sheduleConfigurations)
            {
                JobManager.AddJob(
                    sheduleConfiguration.ServiceFunction,
                    sheduleConfiguration.ConfigurePeriod);
            }

            JobManager.Start();
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            // Create a new scope to retrieve scoped services
            using (var scope = _serviceProvider.CreateScope())
            {
                //Send Email async
                await Task.Run(() => ConfigureShedule());
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
