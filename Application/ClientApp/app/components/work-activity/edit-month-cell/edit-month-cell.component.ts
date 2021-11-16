import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MonthActivityService } from '../../../services/month-activity.service';
import { MonthActivityEditModel } from '../../../models/month-activity-models/month-activity-edit.model';
import { ARRAY_COLORS } from '../../../constants/constants';

@Component({
    selector: 'edit-month-cell',
    templateUrl: './edit-month-cell.component.html',
    styleUrls: ['./edit-month-cell.component.css']
})

export class EditMonthCellComponent {
    
    public monthEditActivity: MonthActivityEditModel = new MonthActivityEditModel();    
    public arrayColors = ARRAY_COLORS;
    public selectedColor = '#FFFFFF';    

    constructor(private http: HttpClient,
        public dialogRef: MatDialogRef<EditMonthCellComponent>,
        private monthActivityService: MonthActivityService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.monthEditActivity = data;
        this.monthActivityService.monthActivityEdit = null;
    }

    public updateMonthCell(monthEditActivity: MonthActivityEditModel) {
        this.monthEditActivity.color = this.selectedColor;
        this.monthActivityService.editVacationTable(this.monthEditActivity).subscribe(
            result => {
                if (result) {
                    this.monthActivityService.monthActivityEdit = monthEditActivity;
                    this.dialogRef.close();

                }                
            }
        );       
    }

    public cancel(): void {
        if (this.dialogRef)
            this.monthActivityService.monthActivityEdit = null;
            this.dialogRef.close();
    }

    onChange(color: string) {
        this.selectedColor = color;
    }   
}