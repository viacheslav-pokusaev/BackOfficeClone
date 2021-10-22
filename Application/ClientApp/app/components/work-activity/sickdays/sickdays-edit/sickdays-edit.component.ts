import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UserStorageService } from '../../../../services/user-storage.service';
import { SickDayService } from '../../../../services/sick-day.service';
import { SickDay } from '../../../../models/sick-day.model';

@Component({
    templateUrl: './sickdays-edit.component.html'
})

export class SickDaysEditComponent implements OnInit {
    sickDay: SickDay;
    private id: any;
    cntDayErMsg: string;
    beginDateErMsg: string;
    endDateErMsg: string;

    constructor(
        private sickDayService: SickDayService,
        private location: Location,
        private route: ActivatedRoute,
        private userStorageService: UserStorageService,

    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.sickDayService.getById(this.id).subscribe(responce => {
                this.sickDay = responce;
                this.sickDay.DateBegin = new Date(Date.parse(this.sickDay.DateBegin.toString()));
                this.sickDay.DateEnd = new Date(Date.parse(this.sickDay.DateEnd.toString()));
            });
        });
    }

    public updateSickDay(newSickDay: SickDay) {
        if (this.isVacationsFormValid(newSickDay)) {
            this.sickDay.DateBegin = new Date(Date.parse(this.sickDay.DateBegin.toString()));
            this.sickDay.DateBegin.setMinutes(this.sickDay.DateBegin.getMinutes() - this.sickDay.DateBegin.getTimezoneOffset());
            this.sickDay.DateEnd = new Date(Date.parse(this.sickDay.DateEnd.toString()));
            this.sickDay.DateEnd.setMinutes(this.sickDay.DateEnd.getMinutes() - this.sickDay.DateEnd.getTimezoneOffset());
            this.sickDayService.update(this.sickDay).subscribe(response => {
                this.location.back();
            });
        }
    };

    public isVacationsFormValid(newSickDay: SickDay): boolean {
        if (newSickDay.DateBegin == null) {
            this.beginDateErMsg = "Begin Date is required field"
            return false;
        }
        else if (newSickDay.DateEnd == null) {
            this.endDateErMsg = "End Date is required field"
            return false;
        }
        else if (newSickDay.DateEnd.getTime() < newSickDay.DateBegin.getTime()) {
            this.endDateErMsg = "End Date should be more than Begin Date"
            return false;
        }
        else if (newSickDay.CountDays < 1) {
            this.cntDayErMsg = "Count should more than 1";
            return false;
        }

        this.beginDateErMsg = null;
        this.endDateErMsg = null;
        return true;
    }


    public goBack() {
        this.location.back();
    }
}