import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { MonthActivityModel } from '../models/month-activity-models/month-activity-model';


@Injectable()

export class MonthActivityService  {
    public monthActivity: MonthActivityModel = new MonthActivityModel();

    constructor(private http: HttpClient) {   
    }

    update(monthActivity: MonthActivityModel) {
        return this.http.put('/api/vacations-table/edit', monthActivity);
    };
}