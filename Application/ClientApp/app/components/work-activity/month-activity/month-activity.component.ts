import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MonthActivityModel } from '../../../models/month-activity-model';
import { MonthActivityViewModel } from '../../../models/month-activity-view.model';
import { SPINNER_ANIMATIONS, SPINNER_PLACEMENT, ISpinnerConfig } from '@hardpool/ngx-spinner';


@Component({
    templateUrl: './month-activity.component.html',
    styleUrls: ['./month-activity.component.css']
})

export class MonthActivityComponent implements OnInit {    

    public tableData = Array<Array<MonthActivityModel>>();
    public sheetList = Array<string>();
    public sheetName: string = "";
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
        this.GetData();
        //this.http.put('/api/vacations-table/edit', new MonthActivityModel()).subscribe();   
    }
    GetSheetName(value: string){
        if(this.sheetName != value){
            this.GetData(value);
        }
    }
   
    GetData(sheetName: string = "October'21"){
        this.http.post('/api/vacations-table/all', sheetName).subscribe((res: MonthActivityViewModel) => 
        {            
            this.tableData = res.MonthActivityModels;
            this.sheetList = res.Sheets;            
            this.loading = false;
            sheetName = sheetName
        });
    }
}
