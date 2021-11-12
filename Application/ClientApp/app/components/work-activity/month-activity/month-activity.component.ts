import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MonthActivityModel } from '../../../models/month-activity-models/month-activity-model';
import { MonthActivityViewModel } from '../../../models/month-activity-models/month-activity-view.model';
import { SPINNER_ANIMATIONS, SPINNER_PLACEMENT, ISpinnerConfig } from '@hardpool/ngx-spinner';
import { MatDialog } from '@angular/material';
import { EditMonthCellComponent } from '../edit-month-cell/edit-month-cell.component';
import { MonthActivityGetModel } from '../../../models/month-activity-models/month-activity-get.model';
import { MonthActivityService } from '../../../services/month-activity.service';
import { MonthActivityEditModel } from '../../../models/month-activity-models/month-activity-edit.model';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    templateUrl: './month-activity.component.html',
    styleUrls: ['./month-activity.component.css']
})

export class MonthActivityComponent implements OnInit, OnDestroy {    

    sheetChange = new Subject<string>();

    public tableData = Array<Array<MonthActivityModel>>();
    public sheetList = Array<string>();
    public getModel: MonthActivityGetModel = {
        SheetName: "default",
        StartIndex: 1,
        EndIndex: 10,
        GetCount: 10
    };

    public isAll:boolean;

    loading: boolean;

    modelChange: string;

    constructor(private http: HttpClient, private dialog: MatDialog, private monthActivityService: MonthActivityService) {
        this.loading = true;
        this.modelChange = 'default';
        this.sheetChange.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => {
            this.tableData.length = 0;
            this.isAll = false;
            this.getModel.StartIndex = 1;
            this.getModel.EndIndex = 10;
            this.getModel.GetCount = 10;
            
            if (this.tableData.length == 0) {
                this.loading = true;
                this.getData();
            }
      });  
    }


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
        this.getData();
    }

    changeTargetSheet(value: any){
        if(this.getModel.SheetName != value.target.value){
            this.getModel.SheetName = value.target.value;
            this.modelChange = this.sheetList[0];

        }
    }

    getData() {        
        this.http.post('/api/vacations-table/all', this.getModel).subscribe((res: MonthActivityViewModel) => 
        {            
            if(res){
                if(!res.ErrorMessage){
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
                    alert(res.ErrorMessage);
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
            this.getData();
        }
        else{
            alert("The table is allready loaded!");
        }
    }

    ngOnDestroy(): void {
        this.sheetChange.unsubscribe();
    }
}
