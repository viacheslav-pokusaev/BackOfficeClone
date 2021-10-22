using Application.EntitiesModels.Entities;
using Application.EntitiesModels.Models;
using Application.EntitiesModels.Models.QueryModels;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.BBLInterfaces.BusinessServicesInterfaces
{
    public interface IAuditTrailService
    {
        AuditTrail FormAndSaveAuditData(IList<EntityEntry> added, IList<EntityEntry> modified, IList<EntityEntry> deleted);

        AuditTrail FormAndSaveDataAfterChangingKey(List<EntityEntry> reEncrypted);

        AuditTrailQueryModel GetAuditTrailEntityModels(AuditTrailQueryModel model);
    }
}
