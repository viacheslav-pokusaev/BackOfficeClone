using OfficeOpenXml.FormulaParsing.Excel.Functions.Math;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace Application.Server.Utilities
{
    public static class ConfigurationValues
    {
        public enum FrequencyScaling
        {
            One = 1, Two, Tree, Four, Five, Six, Seven, Eight, Nine, Ten
        }

        public enum DaysInMonth
        {
            First = 1, Second, Trird, Fourth, Fiveth, Sith, Seventh, Eight, Nine, Ten
        }

        public static (short Hour, short Minute) Morning = (8, 0);
        public static (short Hour, short Minute) Afternoon = (13, 0);
        public static (short Hour, short Minute) Evening = (18, 0);
        public static (short Hour, short Minute) Night = (3, 0);
    }
}
