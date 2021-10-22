using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

using Application.EntitiesModels.Models.DataProtection;

namespace Application.EntitiesModels.Models.DataProtection
{
    public class ConnectionStringModel
    {
        public string SqlServerConnectionString { get; set; }

        public string SqlLiteConnectionString { get; set; }

        public DatabaseModel GetConfig()
        {
            var configs = SqlServerConnectionString.Split(';', '=').Where(x => x.Length > 0).ToArray();
            for(int i = 0; i < configs.Length; i++)
            {
                if (configs[i].First() == ' ')
                {
                    configs[i] = configs[i].Remove(0, 1);
                }
                if (configs[i].Last() == ' ')
                {
                    configs[i] = configs[i].Remove(configs[i].Length - 1, 1);
                }
            }
            DatabaseModel databaseModel = new DatabaseModel()
            {
                DatabaseName = configs[3],
                Password = configs[7],
                ServerName = configs[1],
                UserID = configs[5],
                DatabaseFullName = configs[3] + ".bak"
            };
            return databaseModel;
        }
    }
}
