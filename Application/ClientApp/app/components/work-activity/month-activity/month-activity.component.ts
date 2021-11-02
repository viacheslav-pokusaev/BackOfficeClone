import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MonthActivityModel } from '../../../models/month-activity-model';

@Component({
    templateUrl: './month-activity.component.html',
    styleUrls: ['./month-activity.component.css']
})

export class MonthActivityComponent implements OnInit {
    

   public tableData = Array<Array<MonthActivityModel>>();
    constructor(private http: HttpClient) { };

   

    ngOnInit(): void {
        this.http.get('/api/vacations-table/all').subscribe((res: Array<Array<MonthActivityModel>>) => 
        {   
            console.log('requestRes: '+ res);
            this.tableData = res;
            console.log('tableData: '+ this.tableData);
        });
       
    }

   
}
