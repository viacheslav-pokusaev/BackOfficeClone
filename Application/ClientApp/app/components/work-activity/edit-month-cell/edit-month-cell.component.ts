import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MonthActivityModel } from '../../../models/month-activity-model';
import { SPINNER_ANIMATIONS, SPINNER_PLACEMENT, ISpinnerConfig } from '@hardpool/ngx-spinner';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
    selector: 'edit-month-cell',
    templateUrl: './edit-month-cell.component.html'    
})

export class EditMonthCellComponent {

    public loading: boolean = false;
    public monthActivity: MonthActivityModel = new MonthActivityModel();
    
    message = '';

    arrayColors: Color[] = [
        { ColorName: 'white', HexColor: '#FFFFFF' },
        { ColorName: 'blue', HexColor: '#0000FF' },
        { ColorName: 'red', HexColor: '#FF0000' },
        { ColorName: 'green', HexColor: '#00FF00' },
        { ColorName: 'yellow', HexColor: '#FFFF00' }
    ];

    public spinnerConfig: ISpinnerConfig = {
        placement: SPINNER_PLACEMENT.block_ui,
        animation: SPINNER_ANIMATIONS.spin_3,
        size: "3rem",
        color: "#1574b3"
    };

    constructor(private http: HttpClient, public dialogRef: MatDialogRef<EditMonthCellComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        /*this.loading = true;  */      
        this.monthActivity = data;
        

        this.message = "Work!";


        
    }

    public updateMonthCell(monthActivity: MonthActivityModel) {
        this.http.put('/api/vacations-table/edit', monthActivity).subscribe(
            result => {
                this.monthActivity.Data = result;
            }
        );
    }


    public cancel(): void {
        if (this.dialogRef != null && this.dialogRef != undefined) this.dialogRef.close();
    }
}


export class Color {
    ColorName: string;
    HexColor: string;
}
