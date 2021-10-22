using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Entities
{
    public class Value
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ValueOfField { get; set; }

        public int AuditTrailEntityId { get; set; }

        public AuditTrailEntity AuditTrailEntity { get; set; }
    }
}
