import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MonthActivityModel } from '../../../models/month-activity-models/month-activity-model';
import { MonthActivityViewModel } from '../../../models/month-activity-models/month-activity-view.model';
import { AddSheetViewModel } from '../../../models/month-activity-models/add-sheet-view.model';
import { SPINNER_ANIMATIONS, SPINNER_PLACEMENT, ISpinnerConfig } from '@hardpool/ngx-spinner';
import { MatDialog } from '@angular/material';
import { EditMonthCellComponent } from '../edit-month-cell/edit-month-cell.component';

@Component({
    templateUrl: './month-activity.component.html',
    styleUrls: ['./month-activity.component.css']
})

export class MonthActivityComponent implements OnInit {    

    public tableData = Array<Array<MonthActivityModel>>();
    public sheetList = Array<string>();
    public sheetName: string = "default";
    loading: boolean;

    constructor(private http: HttpClient, private dialog: MatDialog) { };

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
        //this.AddNewList();
    }

    GetSheetName(value: string){
        if(this.sheetName != value){
            this.sheetName = value;
            this.GetData();
        }
    }
   
    GetData(){
        this.http.get('/api/vacations-table/all' + this.sheetName).subscribe((res: MonthActivityViewModel) => 
        {            
            if(res.MonthActivityModels != undefined){
                this.tableData = res.MonthActivityModels;
                this.sheetList = res.Sheets;            
                this.loading = false;
            }
        });
    }
    
    AddNewList(){
        var sheetModel = new AddSheetViewModel();
        sheetModel.SheetName = "TestWithData";
        sheetModel.ParrentSheetName = "Лист1";
        this.http.post('/api/vacations-table/add', sheetModel).subscribe(res => {
            console.log(res);
        })
    }

    public editMonthCell(cellData: MonthActivityModel) {
        let dialogRes = this.dialog.open(EditMonthCellComponent, {
            width: '1050px',
            data: { rowIndex: cellData.RowIndex, columnIndex: cellData.ColumnIndex, data: cellData.Data, color: cellData.Color }
        });
    }   
}
