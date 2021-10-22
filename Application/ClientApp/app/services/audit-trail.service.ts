import { Injectable } from '@angular/core';
import { BaseRestService } from './base-rest-service';
import { HttpClient } from '@angular/common/http';
import { AuditTrailEntity } from '../models/audit-trail-entity.model';
import { AuditTrailQueryModel } from '../models/query-models/audit-trail-query.model';


@Injectable()
export class AuditTrailService extends BaseRestService<AuditTrailEntity, AuditTrailQueryModel> {
    constructor(private http: HttpClient) {
        super(http,"/api/audit")
    }
}