using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Entities
{
    public class AuditTrailValue
    {
        public int Id { get; set; }

        public int AuditTrailEntityId { get; set; }

        public string PropertyName { get; set; }

        public string OldValue { get; set; }

        public string NewValue { get; set; }

        public AuditTrailEntity AuditTrailEntity { get; set; }
    }
}
