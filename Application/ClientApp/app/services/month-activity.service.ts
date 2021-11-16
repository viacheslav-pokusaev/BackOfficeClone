import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { MonthActivityModel } from '../models/month-activity-models/month-activity-model';
import { MonthActivityEditModel } from '../models/month-activity-models/month-activity-edit.model';
import { BaseRestService } from './base-rest-service';
import { MonthActivityEditQueryModel } from '../models/query-models/month-activity-edit-query.model';
import { MonthActivityGetModel } from '../models/month-activity-models/month-activity-get.model';



@Injectable()

export class MonthActivityService extends BaseRestService<MonthActivityEditModel, MonthActivityEditQueryModel>  {
    public monthActivityEdit: MonthActivityEditModel = new MonthActivityEditModel();

    constructor(private http: HttpClient) {
        super(http, "/api/vacations-table")
    }

    editVacationTable(monthActivityEdit: MonthActivityEditModel) {
        return this.http.put('/api/vacations-table/edit', monthActivityEdit);
    };    

    getTable(getModel: MonthActivityGetModel) {
        return this.http.post('/api/vacations-table/all', getModel);
    }
}