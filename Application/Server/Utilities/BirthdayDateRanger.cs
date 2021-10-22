using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Server.Utilities
{
    public static class BirthdayDateRanger
    {
        private const short MaxinAgePerson = -60;
        private const short MininAgePerson = -18;

        public static DateTime MinBirthdayValue { get { return DateTime.Now.AddYears(-60); } }

        public static DateTime MaxBirthdayValue { get { return DateTime.Now.AddYears(-18); } }
    }
}
