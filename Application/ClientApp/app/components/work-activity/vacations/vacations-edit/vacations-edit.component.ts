import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UserStorageService } from '../../../../services/user-storage.service';
import { VacationService } from '../../../../services/vacation.service';
import { Vacation } from '../../../../models/vacation.model';

@Component({
    templateUrl: './vacations-edit.component.html'
})

export class VacationsEditComponent implements OnInit {
    vacation: Vacation = new Vacation();
    private id: number;
    beginDateErMsg: string;
    endDateErMsg: string;
    cntDayErMsg: string;

    constructor(
        private vacationService: VacationService,
        private location: Location,
        private route: ActivatedRoute,
        private userStorageService: UserStorageService,

    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.vacationService.getById(this.id).subscribe(responce => {
                this.vacation = responce;
                this.vacation.DateBegin = new Date(Date.parse(this.vacation.DateBegin.toString()));
                this.vacation.DateEnd = new Date(Date.parse(this.vacation.DateEnd.toString()));
            });
        });
    }

    public updateVacation(vacation: any) {
        if (this.isVacationsFormValid(vacation)) {
            this.vacation.DateBegin = new Date(Date.parse(this.vacation.DateBegin.toString()));
            this.vacation.DateBegin.setMinutes(this.vacation.DateBegin.getMinutes() - this.vacation.DateBegin.getTimezoneOffset());
            this.vacation.DateEnd = new Date(Date.parse(this.vacation.DateEnd.toString()));
            this.vacation.DateEnd.setMinutes(this.vacation.DateEnd.getMinutes() - this.vacation.DateEnd.getTimezoneOffset());
            this.vacationService.update(this.vacation).subscribe(response => {
                this.location.back();
            });
        }
    };

    public calcVacationDays(vacation: any) {
        if (vacation.DateBegin && vacation.DateEnd) {
            if (vacation.DateEnd.getTime() <= vacation.DateBegin.getTime()) {
                this.endDateErMsg = "End Date should be more than Begin Date"
            }
            else {
                this.vacation.CountDays = ((vacation.DateEnd.getTime() - vacation.DateBegin.getTime()) / 86400000) + 1;
                this.endDateErMsg = null;
            }
        }
    }

    public isVacationsFormValid(newVacation: Vacation): boolean {
        if (newVacation.DateBegin == null) {
            this.beginDateErMsg = "Begin Date is required field"
            return false;
        }
        else if (newVacation.DateEnd == null) {
            this.endDateErMsg = "End Date is required field"
            return false;
        }
        else if (newVacation.DateEnd.getTime() < newVacation.DateBegin.getTime()) {
            this.endDateErMsg = "End Date should be more than Begin Date"
            return false;
        }
        else if (newVacation.CountDays < 1) {
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
