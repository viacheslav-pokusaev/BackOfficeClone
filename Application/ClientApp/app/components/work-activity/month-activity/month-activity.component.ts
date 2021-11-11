import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MonthActivityModel } from '../../../models/month-activity-models/month-activity-model';
import { MonthActivityViewModel } from '../../../models/month-activity-models/month-activity-view.model';
import { SPINNER_ANIMATIONS, SPINNER_PLACEMENT, ISpinnerConfig } from '@hardpool/ngx-spinner';
import { MatDialog } from '@angular/material';
import { EditMonthCellComponent } from '../edit-month-cell/edit-month-cell.component';
import { MonthActivityGetModel } from '../../../models/month-activity-models/month-activity-get.model';
import { MonthActivityService } from '../../../services/month-activity.service';
import { MonthActivityEditModel } from '../../../models/month-activity-models/month-activity-edit.model';

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

    isClear:boolean = false;

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

    ChangeTargetSheet(value: any){
        if(this.getModel.SheetName != value.target.value){

            this.getModel.SheetName = value.target.value;
            this.tableData.length = 0;
            this.isAll = false;
            this.getModel.StartIndex = 1;
            this.getModel.EndIndex = 10;
            this.getModel.GetCount = this.step;
            
            if(this.tableData.length == 0){
                console.log("if case says: table data lenght + " + this.tableData.length);
                this.GetData();
            }
            else{
                console.log("tableData lenght more than zero: " + this.tableData.length);
            }
        }
    }

    GetData(){
        this.http.post('/api/vacations-table/all', this.getModel).subscribe((res: MonthActivityViewModel) => 
        {            
            if(res){
                    if(res.IsEmpty == false){
                        console.log("table data lenght: " + this.tableData.length);
                        console.log("res lenght: " + res.MonthActivityModels.length);
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

    public editMonthCell(cellData: MonthActivityEditModel) {
        let dialogRes = this.dialog.open(EditMonthCellComponent, {
            width: '1050px',
            data: {               
                    RowIndex: cellData.RowIndex,
                    ColumnIndex: cellData.ColumnIndex,
                    Data: cellData.Data,
                    Color: cellData.Color,                
                    SheetName: this.getModel.SheetName
            }                              
           
        });        

        dialogRes.afterClosed().subscribe(result => {
            if (this.monthActivityService.monthActivityEdit !== null) {
                cellData.Data = this.monthActivityService.monthActivityEdit.Data;
                cellData.Color = this.monthActivityService.monthActivityEdit.Color;
            }            
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
