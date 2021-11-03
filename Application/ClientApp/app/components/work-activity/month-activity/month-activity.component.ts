import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MonthActivityModel } from '../../../models/month-activity-model';
import { SPINNER_ANIMATIONS, SPINNER_PLACEMENT, ISpinnerConfig } from '@hardpool/ngx-spinner';


@Component({
    templateUrl: './month-activity.component.html',
    styleUrls: ['./month-activity.component.css']
})

export class MonthActivityComponent implements OnInit {    

    public tableData = Array<Array<MonthActivityModel>>();
    loading: boolean;

    constructor(private http: HttpClient) { };

    spinnerConfig: ISpinnerConfig = {
        placement: SPINNER_PLACEMENT.block_ui,
        animation: SPINNER_ANIMATIONS.spin_3,
        size: "3rem",
        color: "#1574b3"
    };
   

    ngOnInit(): void {
        this.loading = true
        this.http.get('/api/vacations-table/all').subscribe((res: Array<Array<MonthActivityModel>>) => 
        {            
            this.tableData = res;            
            this.loading = false;
        });

        this.http.put('/api/vacations-table/edit', new MonthActivityModel()).subscribe();
       
    }

   
}
