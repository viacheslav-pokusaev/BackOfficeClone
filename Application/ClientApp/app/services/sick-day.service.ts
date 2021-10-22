import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { SickDay } from '../models/sick-day.model';
import { expand } from 'rxjs/operator/expand';
import { SickDayQueryModel } from '../models/query-models/sick-day-query.model';
import { BaseRestService } from './base-rest-service';

@Injectable()

export class SickDayService extends BaseRestService<SickDay, SickDayQueryModel> {
    constructor(private http: HttpClient) {
        super(http,"/api/sickdays")
    }
}