﻿import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserStorageService } from '../../../../services/user-storage.service';

import { SickDay } from '../../../../models/sick-day.model';
import { SickDayService } from '../../../../services/sick-day.service';
import { SickDayQueryModel } from '../../../../models/query-models/sick-day-query.model';
import { UsersService } from '../../../../services/users.service';
import { UserQueryModel } from '../../../../models/query-models/user-query.model';
import { User } from '../../../../models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SPINNER_ANIMATIONS, SPINNER_PLACEMENT, ISpinnerConfig } from '@hardpool/ngx-spinner';
import { DeleteConfirmationComponent } from '../../../modals/delete-confirmation/delete-confirmation.component';
import { Subject, Subscription } from 'rxjs';

@Component({
    selector: 'user-sickdays',
    templateUrl: './sickdays-user-list.component.html',
    styleUrls: ['./sickdays-user-list.component.css']
})

export class SickDaysUserListComponent implements OnInit {
    sickDays: Array<SickDay> = new Array<SickDay>();
    newSickDay: SickDay = new SickDay();
    users: Array<User> = new Array<User>();
    id: number;
    status: string;
    isAdmin: boolean;
    isUser: boolean;
    isMyPage: boolean;
    isAddVisible: boolean;
    selectedUser = new User();
    isBeginDateIncorrect = false;
    isEndDateIncorrect = false;
    newSickDayForm: FormGroup;
    minSickDayDate: Date;
    maxSickDayDate: Date;
    submitAttempt: boolean;
    loading = false;
    queryModel: SickDayQueryModel;
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
        private sickDayService: SickDayService,
        private usersService: UsersService,
        private fBuilder: FormBuilder,
        private dialog: MatDialog,
        private location: Location,
        private router: Router
    ) {
        
    };
    
    ngOnInit( ){       
        this.subject = new Subject<any>();
        this.isAddVisible = false;
        this.id = this.userId;
        this.queryModel = new SickDayQueryModel();
        this.queryModel.Take =  10;
        if (this.id != null) this.queryModel.UserId = this.id;
        this.loading = true;
            this.sickDayService.get(this.queryModel).subscribe(response => {
                this.sickDays = response.Result;
                this.subject.next({from: "component", response: response});
                this.sickDays.forEach((value, index, array) => {
                    value.DateBegin = new Date(Date.parse(value.DateBegin.toString()));
                    value.DateEnd = new Date(Date.parse(value.DateEnd.toString()));
                });
                this.sickDays.sort((x, y) => {
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
                    this.queryModel = response.response as SickDayQueryModel;
                    this.id = this.userId;
                    if (this.id != null) this.queryModel.UserId = this.id;
                    this.loading = true;
                    this.sickDayService.get(this.queryModel).subscribe(response => {
                        this.sickDays = response.Result;
                        this.sickDays.forEach((value, index, array) => {
                            value.DateBegin = new Date(Date.parse(value.DateBegin.toString()));
                            value.DateEnd = new Date(Date.parse(value.DateEnd.toString()));
                        });
                        this.sickDays.sort((x, y) => {
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
                }
    
            });

        this.isMyPage = (this.id == this.userStorageService.getId() || this.isAdmin);
        this.initDates();
        this.initForm();
    }

    initForm() {
        this.newSickDayForm = this.fBuilder.group({
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
        this.minSickDayDate = new Date(new Date().getFullYear(), 0, 1);//Start of the year
        this.minSickDayDate.setFullYear(this.minSickDayDate.getFullYear() - 1);
        this.maxSickDayDate = new Date(new Date().getFullYear(), 11, 31);//End of the year
        this.maxSickDayDate.setFullYear(this.maxSickDayDate.getFullYear() + 1);
    }

    delete(index: number, indexOnArray: number) {
        this.sickDayService.delete(index).subscribe((result) => {
            this.queryModel.Take =  10;
            if (this.id != null) this.queryModel.UserId = this.id;
            this.loading = true;
            this.sickDayService.get(this.queryModel).subscribe(response => {
                this.sickDays = response.Result;
                this.subject.next({from: "component", response: response});
                this.sickDays.forEach((value, index, array) => {
                    value.DateBegin = new Date(Date.parse(value.DateBegin.toString()));
                    value.DateEnd = new Date(Date.parse(value.DateEnd.toString()));
                });
                this.sickDays.sort((x, y) => {
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

    public add(newSickDay: SickDay) {
        if (this.newSickDayForm.valid && !this.isBeginDateIncorrect && !this.isEndDateIncorrect) {
            this.submitAttempt = false;
        newSickDay.DateBegin = new Date(Date.parse(newSickDay.DateBegin.toString()));
        newSickDay.DateBegin.setMinutes(newSickDay.DateBegin.getMinutes() - newSickDay.DateBegin.getTimezoneOffset());
        newSickDay.DateEnd = new Date(Date.parse(newSickDay.DateEnd.toString()));
        newSickDay.DateEnd.setMinutes(newSickDay.DateEnd.getMinutes() - newSickDay.DateEnd.getTimezoneOffset());
        newSickDay.UserProfileId = (this.id != null && this.id != 0 && this.id != undefined) ? this.id : newSickDay.UserProfileId;
        this.sickDayService.create(newSickDay).subscribe((response) => {
            this.newSickDay = response;
            if (this.newSickDay.Id != 0) {
                this.queryModel = new SickDayQueryModel();
                this.queryModel.UserId = this.id;
                this.sickDayService.get(this.queryModel).subscribe(response => {
                    this.sickDays = response.Result;
                    this.subject.next({from: "component", response: response});
                    this.sickDays.forEach((value, index, array) => {
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

    public calcSickDayDays(newSickDay: any) {
        let currentDate = new Date();
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        this.isBeginDateIncorrect = false;
        this.isEndDateIncorrect = false;
        if (newSickDay.DateBegin && newSickDay.DateEnd) {
            if (newSickDay.DateEnd.getTime() < newSickDay.DateBegin.getTime()) {
                this.isEndDateIncorrect = true;
            }
            else {
                this.newSickDay.CountDays = ((newSickDay.DateEnd.getTime() - newSickDay.DateBegin.getTime()) / 86400000) + 1;
            }
        }
    }

    public menuAddNew() {
        this.isAddVisible = true;
        this.newSickDay = new SickDay();
    }

    public goBack() {
        this.location.back();
    }

    public goToUser(sickday: SickDay){
        this.router.navigateByUrl('/users/'+sickday.UserProfileId+'/info')
    }
}