using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Entities
{
    public class AuditTrail
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public int UserId { get; set; } 

        public DateTime Date { get; set; }

        public virtual ICollection<AuditTrailEntity> AuditTrailEntities { get; set; }
    }
}
