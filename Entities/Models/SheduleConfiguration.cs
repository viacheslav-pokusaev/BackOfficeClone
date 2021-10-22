using FluentScheduler;
using System;
using System.Collections.Generic;
using System.Text;


namespace Application.EntitiesModels.Models
{
    public class SheduleConfiguration
    {
        public Action<Schedule> ConfigurePeriod { get; set; }
        public Action ServiceFunction { get; set; }          
    }
}
