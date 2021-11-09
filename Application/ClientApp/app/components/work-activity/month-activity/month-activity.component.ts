import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MonthActivityModel } from '../../../models/month-activity-models/month-activity-model';
import { MonthActivityViewModel } from '../../../models/month-activity-models/month-activity-view.model';
import { SPINNER_ANIMATIONS, SPINNER_PLACEMENT, ISpinnerConfig } from '@hardpool/ngx-spinner';
import { MatDialog } from '@angular/material';
import { EditMonthCellComponent } from '../edit-month-cell/edit-month-cell.component';
import { MonthActivityGetModel } from '../../../models/month-activity-models/month-activity-get.model';

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
    constructor(private http: HttpClient, private dialog: MatDialog) { };

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
                    //this.tableData = res.MonthActivityModels;
                    res.MonthActivityModels.forEach(row =>{
                        this.tableData.push(row);
                    });
                    this.sheetList = res.Sheets; 
                    this.getModel.GetCount += 10;           
                    this.loading = false;
                }
                else{
                    alert("The table is empty!");
                }
                if(res.IsAll == true){
                    this.isAll = res.IsAll;
                    alert("The table is allready loaded!");
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
            data: { rowIndex: cellData.RowIndex, columnIndex: cellData.ColumnIndex, data: cellData.Data, color: cellData.Color }
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
