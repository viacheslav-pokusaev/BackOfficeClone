import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UserStorageService } from '../../../../services/user-storage.service';
import { OvertimeService } from '../../../../services/overtime.service';
import { Overtime } from '../../../../models/overtime.model';

@Component({
    templateUrl: './overtimes-edit.component.html'
})

export class OvertimesEditComponent implements OnInit {
    overtime: Overtime = new Overtime();
    beginDateErMsg: string;
    endDateErMsg: string;
    cntDayErMsg: string;
    private id: number;

    constructor(
        private overtimeService: OvertimeService,
        private location: Location,
        private route: ActivatedRoute,
        private userStorageService: UserStorageService,
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.overtimeService.getById(this.id).subscribe(responce => {
                this.overtime = responce;
                this.overtime.DateBegin = new Date(Date.parse(this.overtime.DateBegin.toString()));
                this.overtime.DateEnd = new Date(Date.parse(this.overtime.DateEnd.toString()));
            });
        });
    }

    public updateOvertime(newOvertime: Overtime) {
        if (this.isVacationsFormValid(newOvertime)) {
            this.overtime.DateBegin = new Date(Date.parse(this.overtime.DateBegin.toString()));
            this.overtime.DateBegin.setMinutes(this.overtime.DateBegin.getMinutes() - this.overtime.DateBegin.getTimezoneOffset());
            this.overtime.DateEnd = new Date(Date.parse(this.overtime.DateEnd.toString()));
            this.overtime.DateEnd.setMinutes(this.overtime.DateEnd.getMinutes() - this.overtime.DateEnd.getTimezoneOffset());
            this.overtimeService.update(this.overtime).subscribe(response => {
                this.location.back();
            });
        }
    };

    isVacationsFormValid(newOvertime: Overtime): boolean {
        if (newOvertime.DateBegin == null) {
            this.beginDateErMsg = "Begin Date is required field"
            return false;
        }
        else if (newOvertime.DateEnd == null) {
            this.endDateErMsg = "End Date is required field"
            return false;
        }
        else if (newOvertime.DateEnd.getTime() < newOvertime.DateBegin.getTime()) {
            this.endDateErMsg = "End Date should be more than Begin Date"
            return false;
        }
        else if (newOvertime.CountDays < 1) {
            this.cntDayErMsg = "Count should more than 1";
            return false;
        }

        this.beginDateErMsg = null;
        this.endDateErMsg = null;
        return true;
    }

    goBack() {
        this.location.back();
    }
}