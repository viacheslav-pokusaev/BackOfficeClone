import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MonthActivityModel } from '../../../models/month-activity-models/month-activity-model';
import { SPINNER_ANIMATIONS, SPINNER_PLACEMENT, ISpinnerConfig } from '@hardpool/ngx-spinner';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VacationColor } from '../../../models/month-activity-models/vacation-color.model';
import { MonthActivityService } from '../../../services/month-activity.service';

@Component({
    selector: 'edit-month-cell',
    templateUrl: './edit-month-cell.component.html'    
})

export class EditMonthCellComponent {

    public loading: boolean = false;
    public monthActivity: MonthActivityModel = new MonthActivityModel();
    

    arrayColors: VacationColor[] = [
        { Vacation: '', HexColor: '#FFFFFF' },
        { Vacation: 'отпуск', HexColor: '#0000FF' },
        { Vacation: 'больничный', HexColor: '#FF0000' },
        { Vacation: 'работа в выходной (+ день к отпуску)', HexColor: '#00FF00' },
        { Vacation: 'работа в выходной (доплата к зп)', HexColor: '#FFFF00' }
    ];

    public selectedColor: string;

    public spinnerConfig: ISpinnerConfig = {
        placement: SPINNER_PLACEMENT.block_ui,
        animation: SPINNER_ANIMATIONS.spin_3,
        size: "3rem",
        color: "#1574b3"
    };

    constructor(private http: HttpClient,
        public dialogRef: MatDialogRef<EditMonthCellComponent>,
        private monthActivityService: MonthActivityService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.monthActivity = data;
    }

    public updateMonthCell(monthActivity: MonthActivityModel) {
        this.monthActivity.Color = this.selectedColor;
        this.monthActivityService.update(monthActivity).subscribe(
            result => {
                if (result == true) {
                    this.monthActivityService.monthActivity = monthActivity;
                    this.dialogRef.close();
                }                
            }
        );       
    }

    public cancel(): void {
        if (this.dialogRef != null && this.dialogRef != undefined) this.dialogRef.close();
    }

    onChange(color: string) {
        this.selectedColor = color;
    }   
}