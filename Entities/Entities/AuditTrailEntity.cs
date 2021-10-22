using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Entities
{
    public class AuditTrailEntity
    {
        public int Id { get; set; }

        public int AuditTrailId { get; set; }

        public string EntityName { get; set; }

        public string Action { get; set; }

        public AuditTrail AuditTrail { get; set; }

        public string Parent { get; set; }

        public virtual ICollection<Value> Values { get; set; }

        public virtual ICollection<AuditTrailValue> AuditTrailValues { get; set; }
    }
}
