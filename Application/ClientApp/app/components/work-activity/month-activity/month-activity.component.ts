﻿import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MonthActivityModel } from '../../../models/month-activity-models/month-activity-model';
import { MonthActivityViewModel } from '../../../models/month-activity-models/month-activity-view.model';
import { SPINNER_ANIMATIONS, SPINNER_PLACEMENT, ISpinnerConfig } from '@hardpool/ngx-spinner';
import { MatDialog } from '@angular/material';
import { EditMonthCellComponent } from '../edit-month-cell/edit-month-cell.component';
import { MonthActivityGetModel } from '../../../models/month-activity-models/month-activity-get.model';
import { MonthActivityService } from '../../../services/month-activity.service';

@Component({
    templateUrl: './month-activity.component.html',
    styleUrls: ['./month-activity.component.css']
})

export class MonthActivityComponent implements OnInit {    

    public tableData = Array<Array<MonthActivityModel>>();
    public sheetList = Array<string>();
    step: number = 10;
    public previusSheetName:string = "default";
    public getModel: MonthActivityGetModel = {
        SheetName: "default",
        StartIndex: 1,
        EndIndex: 10,
        GetCount: this.step
    };

    public isAll:boolean;

    loading: boolean;

    constructor(private http: HttpClient, private dialog: MatDialog, private monthActivityService: MonthActivityService) {
        this.loading = true;        
    };

    spinnerConfig: ISpinnerConfig = {
        placement: SPINNER_PLACEMENT.block_ui,
        animation: SPINNER_ANIMATIONS.spin_3,
        size: "3rem",
        color: "#1574b3"
    };   

    ngOnInit(): void {
        this.loading = true;
        this.isAll = false;
        this.getModel.EndIndex = 10;
        this.GetData();
    }

    ChangeTargetSheet(value: string){
        if(this.getModel.SheetName != value){
            this.getModel.SheetName = value;
            this.isAll = false;
            this.tableData = Array<Array<MonthActivityModel>>();
            this.getModel.StartIndex = 1;
            this.getModel.EndIndex = 10;
            this.getModel.GetCount = this.step;
            this.GetData();
        }
    }
   
    GetData(){
        this.http.post('/api/vacations-table/all', this.getModel).subscribe((res: MonthActivityViewModel) => 
        {            
            if(res){
                if(res.IsEmpty == false){
                    res.MonthActivityModels.forEach(row =>{
                        this.tableData.push(row);
                    });
                    this.sheetList = res.Sheets; 
                    this.getModel.GetCount += 10;           
                    this.loading = false;
                }
                else{
                    this.isAll = res.IsEmpty;
                    alert("The table is empty or all rows are allready loaded!");
                }
            }
            else{
                alert("Error, when trying load the table!");
            }
        });
    }

    public editMonthCell(cellData: MonthActivityModel) {
        let dialogRes = this.dialog.open(EditMonthCellComponent, {
            width: '1050px',
            data: { RowIndex: cellData.RowIndex, ColumnIndex: cellData.ColumnIndex, Data: cellData.Data, Color: cellData.Color }
        });        

        dialogRes.afterClosed().subscribe(result => {                   
            cellData.Data = this.monthActivityService.monthActivity.Data;
            cellData.Color = this.monthActivityService.monthActivity.Color;
        });      
    }           

    public getNewRange(){
        if(this.isAll == false){
            this.getModel.StartIndex += 10;
            this.getModel.EndIndex += 10;
            this.GetData();
        }
        else{
            alert("The table is allready loaded!");
        }
    }
}
