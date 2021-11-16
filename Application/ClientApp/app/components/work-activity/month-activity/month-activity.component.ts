﻿import { Component, OnInit } from '@angular/core';
import { MonthActivityModel } from '../../../models/month-activity-models/month-activity-model';
import { MonthActivityViewModel } from '../../../models/month-activity-models/month-activity-view.model';
import { ISpinnerConfig } from '@hardpool/ngx-spinner';
import { MatDialog } from '@angular/material';
import { EditMonthCellComponent } from '../edit-month-cell/edit-month-cell.component';
import { MonthActivityGetModel } from '../../../models/month-activity-models/month-activity-get.model';
import { MonthActivityService } from '../../../services/month-activity.service';
import { MonthActivityEditModel } from '../../../models/month-activity-models/month-activity-edit.model';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SPINNER_CONFIG, DIALOG_WIDTH } from '../../../constants/constants';

@Component({
    templateUrl: './month-activity.component.html',
    styleUrls: ['./month-activity.component.css']
})

export class MonthActivityComponent implements OnInit {    

    sheetChange = new Subject<string>();
    public tableData = Array<Array<MonthActivityModel>>();
    public sheetList = Array<string>();
    public getModel: MonthActivityGetModel = {
        sheetName: null,
        startIndex: 1,
        endIndex: 10,
        getCount: 10
    };

    public isAll:boolean;

    loading: boolean;

    modelChange: string;

    constructor(private dialog: MatDialog, private monthActivityService: MonthActivityService) {
        this.loading = true;
        this.sheetChange.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => {
            this.tableData.length = 0;
            this.isAll = false;
            this.getModel.startIndex = 1;
            this.getModel.endIndex = 10;
            this.getModel.getCount = 10;
            
            if (this.tableData.length == 0) {
                this.loading = true;
                this.getData();
            }
      });  
    }

    spinnerConfig: ISpinnerConfig = SPINNER_CONFIG;    

    ngOnInit(): void {
        this.getModel.endIndex = 10;
        this.getData();
    }

    changeTargetSheet(value: any){
        if(this.getModel.sheetName !== value.target.value){
            this.getModel.sheetName = value.target.value;
            this.modelChange = this.sheetList[0];
            this.sheetChange.next(value);
        }
    }

    getData() {        
        this.monthActivityService.getTable(this.getModel).subscribe((res: MonthActivityViewModel) =>
        {       
            if(!res){
                alert("Error, when trying load the table!");
                 return;
                }   
            else if(res.errorMessage){
                alert(res.errorMessage);
                 return;
                }
            else if(res.isEmpty){
                this.isAll = res.isEmpty;
                alert("The table is empty or all rows are allready loaded!");
                return;
                }
            else{
                res.monthActivityModels.forEach(row =>{
                    this.tableData.push(row);
                });
                this.sheetList = res.sheets;
                this.getModel.getCount += 10;           
                this.loading = false;
            }
            this.modelChange = res.sheets[0];
        });
    }

    public editMonthCell(cellData: MonthActivityEditModel) {
        let dialogRes = this.dialog.open(EditMonthCellComponent, {
            width: DIALOG_WIDTH,
            data: {               
                    rowIndex: cellData.rowIndex,
                    columnIndex: cellData.columnIndex,
                    data: cellData.data,
                    color: cellData.color,                
                    sheetName: this.getModel.sheetName
            }                              
           
        });        

        dialogRes.afterClosed().subscribe(result => {
            if (this.monthActivityService.monthActivityEdit !== null) {
                cellData.data = this.monthActivityService.monthActivityEdit.data;
                cellData.color = this.monthActivityService.monthActivityEdit.color;
            }            
        });      
    }           

    public getNewRange(){
        if(this.isAll === false){
            this.getModel.startIndex += 10;
            this.getModel.endIndex += 10;
            this.getData();
        }
        else{
            alert("The table is allready loaded!");
        }
    }
}
