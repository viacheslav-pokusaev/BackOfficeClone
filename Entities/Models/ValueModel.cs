using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models
{
    public class ValueModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ValueOfField { get; set; }

        public int AuditTrailEntityId { get; set; }
    }
}
