import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { SizeVacation } from '../models/size-vacation.model';
import { BaseRestService } from './base-rest-service';
import { SizeVacationQueryModel } from '../models/query-models/size-vacation-query.model';

@Injectable()

export class SizeVacationsService  extends BaseRestService<SizeVacation, SizeVacationQueryModel> {
    constructor(private http: HttpClient) {
        super(http,"/api/sizevacations")
    }
}