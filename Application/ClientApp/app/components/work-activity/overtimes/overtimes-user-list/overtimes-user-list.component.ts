﻿import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserStorageService } from '../../../../services/user-storage.service';

import { Overtime } from '../../../../models/overtime.model';
import { OvertimeService } from '../../../../services/overtime.service';
import { OvertimeQueryModel } from '../../../../models/query-models/overtime-query.model';
import { SickDayQueryModel } from '../../../../models/query-models/sick-day-query.model';
import { User } from '../../../../models/user.model';
import { UsersService } from '../../../../services/users.service';
import { UserQueryModel } from '../../../../models/query-models/user-query.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SPINNER_ANIMATIONS, SPINNER_PLACEMENT, ISpinnerConfig } from '@hardpool/ngx-spinner';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DeleteConfirmationComponent } from '../../../modals/delete-confirmation/delete-confirmation.component';
import { Subject, Subscription } from 'rxjs';


@Component({
    selector: 'user-overtimes',
    templateUrl: './overtimes-user-list.component.html',
    styleUrls: ['./overtimes-user-list.component.css']
})

export class OvertimeUserListComponent implements OnInit {
    overtimes: Array<Overtime> = new Array<Overtime>();
    newOvertime: Overtime = new Overtime();
    users: Array<User> = new Array<User>();
    id: number;
    status: string;
    isAddVisible: boolean;
    selectedUser = new User();
    newOvertimeForm: FormGroup;
    minOvertimeDate: Date;
    maxOvertimeDate: Date;
    submitAttempt: boolean;
    isBeginDateIncorrect = false;
    isEndDateIncorrect = false;
    loading = false;
    queryModel: OvertimeQueryModel;
    subject: Subject<any>;
    subscription: Subscription;

    @Input('userId') userId: number;

    spinnerConfig: ISpinnerConfig = {
            placement: SPINNER_PLACEMENT.block_ui,
            animation: SPINNER_ANIMATIONS.spin_3,
            size: "3rem",
            color: "#1574b3"
        };

    constructor(
        private route: ActivatedRoute,
        private userStorageService: UserStorageService,
        private overtimeService: OvertimeService,
        private usersService: UsersService,
        private fBuilder: FormBuilder,
        private location: Location,
        private dialog: MatDialog,
        private router: Router
    ) {

        
    };

    ngOnInit() {
        this.subject = new Subject<any>();

        this.isAddVisible = false;
        this.id = this.userId;
        this.queryModel = new OvertimeQueryModel();
        this.queryModel.Take =  10;
        if (this.id != null) this.queryModel.UserId = this.id;
        this.loading = true;
            this.overtimeService.get(this.queryModel).subscribe(response => {
                this.overtimes = response.Result;
                this.subject.next({from: "component", response: response});
                this.overtimes.forEach((value, index, array) => {
                    value.DateBegin = new Date(Date.parse(value.DateBegin.toString()));
                    value.DateEnd = new Date(Date.parse(value.DateEnd.toString()));
                });
                this.overtimes.sort((x, y) => {
                    if (x.DateBegin > y.DateBegin)
                        return -1;
                    if (x.DateBegin < y.DateBegin)
                        return 1;
                    return 0;
                });
                this.loading = false;
            });
            this.usersService.get(new UserQueryModel()).subscribe(response => {
                this.users = response.Result;
                }); 


                this.subscription = this.subject.asObservable().subscribe(response => {
                    if (response.fron == "tablebuttons") {
                        this.queryModel = response.response as OvertimeQueryModel;
                        this.id = this.userId;
                        if (this.id != null) this.queryModel.UserId = this.id;
                        this.loading = true;
                            this.overtimeService.get(this.queryModel).subscribe(response => {
                                this.overtimes = response.Result;
                                this.overtimes.forEach((value, index, array) => {
                                    value.DateBegin = new Date(Date.parse(value.DateBegin.toString()));
                                    value.DateEnd = new Date(Date.parse(value.DateEnd.toString()));
                                });
                                this.overtimes.sort((x, y) => {
                                    if (x.DateBegin > y.DateBegin)
                                        return -1;
                                    if (x.DateBegin < y.DateBegin)
                                        return 1;
                                    return 0;
                                });
                                this.loading = false;
                            });
                    }
                });
        this.initDates();
        this.initForm();
    }

    initForm() {
        this.newOvertimeForm = this.fBuilder.group({
            CountDays: ['', Validators.min(1)],
            BeginDate: ['', [
                Validators.required
            ]],
            EndDate: ['', [
                Validators.required
            ]],
            Comment: [],
            SelectedUser:[]
        });
    }

    initDates() {
        //Allow begin date vacation and end date vacation
        //only in previous or in the next year
        this.minOvertimeDate = new Date(new Date().getFullYear(), 0, 1);//Start of the year
        this.minOvertimeDate.setFullYear(this.minOvertimeDate.getFullYear() - 1);
        this.maxOvertimeDate = new Date(new Date().getFullYear(), 11, 31);//End of the year
        this.maxOvertimeDate.setFullYear(this.maxOvertimeDate.getFullYear() + 1);
    }

    delete(index: number, indexOnArray: number) {
        this.overtimeService.delete(index).subscribe((result) => {
            this.usersService.updateVacDays(this.overtimes[indexOnArray].CountDays);
            this.queryModel.Take =  10;
            if (this.id != null) this.queryModel.UserId = this.id;
            this.loading = true;
            this.overtimeService.get(this.queryModel).subscribe(response => {
                this.overtimes = response.Result;
                this.subject.next({from: "component", response: response});
                this.overtimes.forEach((value, index, array) => {
                    value.DateBegin = new Date(Date.parse(value.DateBegin.toString()));
                    value.DateEnd = new Date(Date.parse(value.DateEnd.toString()));
                });
                this.overtimes.sort((x, y) => {
                    if (x.DateBegin > y.DateBegin)
                        return -1;
                    if (x.DateBegin < y.DateBegin)
                        return 1;
                    return 0;
                });
                this.loading = false;
            });
            this.usersService.get(new UserQueryModel()).subscribe(response => {
                this.users = response.Result;
                }); 

            this.status = "Deleted";
        })
    }

    public confirmDeleteDialog(id, index) {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.position = { top: '0' };
        dialogConfig.autoFocus = false;

        this.dialog.open(DeleteConfirmationComponent, dialogConfig)
            .afterClosed().subscribe(dialogResult => {
                if (dialogResult)
                    this.delete(id, index);
            });
    }

    public add(newOvertime: Overtime) {
        if (this.newOvertimeForm.valid && !this.isBeginDateIncorrect && !this.isEndDateIncorrect) {
            this.submitAttempt = false;
        newOvertime.DateBegin = new Date(Date.parse(newOvertime.DateBegin.toString()));
        newOvertime.DateBegin.setMinutes(newOvertime.DateBegin.getMinutes() - newOvertime.DateBegin.getTimezoneOffset());
        newOvertime.DateEnd = new Date(Date.parse(newOvertime.DateEnd.toString()));
        newOvertime.DateEnd.setMinutes(newOvertime.DateEnd.getMinutes() - newOvertime.DateEnd.getTimezoneOffset());
        newOvertime.UserProfileId = (this.id != null && this.id != 0  && this.id != undefined) ? this.id : newOvertime.UserProfileId;
        this.overtimeService.create(newOvertime).subscribe((response) => {
            this.newOvertime = response;
            if (this.newOvertime.Id != 0) {
                this.usersService.updateVacDays(this.newOvertime.CountDays*(-1));
                this.queryModel = new OvertimeQueryModel();
                this.queryModel.UserId = this.id;
                this.overtimeService.get(this.queryModel).subscribe(response => {
                    this.overtimes = response.Result;
                    this.subject.next({from: "component", response: response});
                    this.overtimes.forEach((value, index, array) => {
                        value.DateBegin = new Date(Date.parse(value.DateBegin.toString()));
                        value.DateEnd = new Date(Date.parse(value.DateEnd.toString()));
                    });
                });
                this.isAddVisible = false;
            }
        });
    }
    else {
        this.submitAttempt = true;
    }
    }

    public calcOvertimeDays(newOvertime: any) {
        let currentDate = new Date();
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        this.isBeginDateIncorrect = false;
        this.isEndDateIncorrect = false;
        if (newOvertime.DateBegin && newOvertime.DateEnd) {
            if (newOvertime.DateEnd.getTime() < newOvertime.DateBegin.getTime()) {
                this.isEndDateIncorrect = true;
            }
            else {
                this.newOvertime.CountDays = ((newOvertime.DateEnd.getTime() - newOvertime.DateBegin.getTime()) / 86400000) + 1;
            }
        }
    }

    public menuAddNew() {
        this.isAddVisible = true;
        this.newOvertime = new Overtime();
    }

    public goBack() {
        this.location.back();
    }

    public goToUser(overtime: Overtime){
        this.router.navigateByUrl('/users/'+overtime.UserProfileId+'/info')
    }
}