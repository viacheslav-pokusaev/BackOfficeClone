import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableData } from '../../../models/table-data.model';

@Component({
    templateUrl: './month-activity.component.html',
    styleUrls: ['./month-activity.component.css']
})

export class MonthActivityComponent implements OnInit {
    

   public tableData = Array<Array<TableData>>();
    constructor(private http: HttpClient) { };

   

    ngOnInit(): void {
        this.http.get('/api/vacations-table/all').subscribe((res: Array<Array<TableData>>) => 
        {   
            console.log('requestRes: '+ res);
            this.tableData = res;
            console.log('tableData: '+ this.tableData);
        });
       
    }

   
}
