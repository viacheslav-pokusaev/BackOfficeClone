import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { MonthActivityModel } from '../models/month-activity-models/month-activity-model';
import { MonthActivityEditModel } from '../models/month-activity-models/month-activity-edit.model';



@Injectable()

export class MonthActivityService  {
    public monthActivityEdit: MonthActivityEditModel = new MonthActivityEditModel();

    constructor(private http: HttpClient) {   
    }

    update(monthActivityEdit: MonthActivityEditModel) {
        return this.http.put('/api/vacations-table/edit', monthActivityEdit);
    };
}