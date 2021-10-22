import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Overtime } from '../models/overtime.model';
import { OvertimeQueryModel } from '../models/query-models/overtime-query.model';
import { BaseRestService } from './base-rest-service';

@Injectable()

export class OvertimeService extends BaseRestService<Overtime, OvertimeQueryModel> {
    constructor(private http: HttpClient) {
        super(http,"/api/overtimes")
    }

    getOvertimeForUser(id: number): Observable<any> {
        return this.http.get('/api/Overtimes/User/' + id);
    };
}