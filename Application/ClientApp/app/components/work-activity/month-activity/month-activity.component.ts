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
    public previusSheetName:string = "default";
    public getModel: MonthActivityGetModel = {
        SheetName: "default",
        StartIndex: 1,
        EndIndex: 10
    };

    public isAll;

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
        this.GetData();
    }

    GetSheetName(value: string){
        if(this.getModel.SheetName != value){
            this.previusSheetName = this.getModel.SheetName;
            this.getModel.SheetName = value;
            this.GetData();
        }
    }
   
    GetData(){

        this.http.post('/api/vacations-table/all', this.getModel).subscribe((res: MonthActivityViewModel) => 
        {            
                if(res){
                    this.tableData = res.MonthActivityModels;
                    this.sheetList = res.Sheets;            
                    this.loading = false;
                }
                else{
                    alert("The table is empty!");
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

    get mydata(): MonthActivityEditModel{
        return this.monthActivityService.monthActivityEdit;
    };

    public getNewRange() {
        this.getModel.EndIndex += 10;
        this.GetData();
    }
}
