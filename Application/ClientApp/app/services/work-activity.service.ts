import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { WorkActivity } from '../models/work-activity.model';
import { ChangePassword } from '../models/change-password.model';
import { BaseRestService } from './base-rest-service';
import { WorkActivityQueryModel } from '../models/query-models/work-activity-query.model';

@Injectable()

export class WorkActivityService extends BaseRestService<WorkActivity, WorkActivityQueryModel> {

    public data: Array<WorkActivity>;

    constructor(private http: HttpClient) {
        super(http,"/api/workactivities");
    }
}
