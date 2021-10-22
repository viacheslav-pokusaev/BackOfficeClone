import { AuditTrailValue } from "./audit-trail-value.model";
import { ValueModel } from "./value.model";

export class AuditTrailEntity {
    Id: number;

    UserName: string;

    UserId: number;

    Date: Date;

    EntityName: string;

    Action: string;

    AuditTrailValues: Array<AuditTrailValue>;

    Valuses: Array<ValueModel>;
}