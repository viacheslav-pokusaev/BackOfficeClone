import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Vacation } from '../models/vacation.model';
import { BaseRestService } from './base-rest-service';
import { VacationQueryModel } from '../models/query-models/vacation.query.model';
import { Subject } from 'rxjs/Rx';

@Injectable()

export class VacationService  extends BaseRestService<Vacation, VacationQueryModel> {
    constructor(private http: HttpClient) {
        super(http,"/api/vacations")
    }
}