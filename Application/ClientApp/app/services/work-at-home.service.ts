import { Injectable } from '@angular/core';
import { BaseRestService } from './base-rest-service';
import { WorkAtHome } from '../models/work-at-home.model';
import { WorkAtHomeQueryModel } from '../models/query-models/work-at-home-query.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WorkAtHomeService extends BaseRestService<WorkAtHome, WorkAtHomeQueryModel> {
    constructor(private http: HttpClient) {
        super(http,"/api/workathome")
    }
}