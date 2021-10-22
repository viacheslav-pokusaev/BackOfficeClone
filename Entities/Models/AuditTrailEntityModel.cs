using System;
using System.Collections.Generic;
using System.Text;

namespace Application.EntitiesModels.Models
{
    public class AuditTrailEntityModel
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public int UserId { get; set; }

        public DateTime Date { get; set; }

        public string EntityName { get; set; }

        public string Action { get; set; }

        public virtual IEnumerable<AuditTrailValueModel> AuditTrailValues { get; set; }

        public string Parent { get; set; }

        public virtual ICollection<ValueModel> Values { get; set; }
    }
}
