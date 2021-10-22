﻿import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStorageService } from '../../../../services/user-storage.service';
import { Vacation } from '../../../../models/vacation.model';
import { VacationService } from '../../../../services/vacation.service';
import { UsersService } from '../../../../services/users.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DeleteConfirmationComponent } from '../../../modals/delete-confirmation/delete-confirmation.component'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VacationQueryModel } from '../../../../models/query-models/vacation.query.model';
import { User } from '../../../../models/user.model';
import { UserQueryModel } from '../../../../models/query-models/user-query.model';
import { SPINNER_ANIMATIONS, SPINNER_PLACEMENT, ISpinnerConfig } from '@hardpool/ngx-spinner';
import { Location } from '@angular/common';
import { Subject, Subscription } from 'rxjs';

@Component({
    selector: 'user-vacations',
    templateUrl: './vacations-user-list.component.html',
    styleUrls: ['./vacations-user-list.component.css']
})

export class VacationsUserListComponent implements OnInit {
    vacations = new Array<Vacation>();
    newVacation = new Vacation();
    id: number;
    status: string;
    isAddVisible: boolean;
    beginDateErMsg: string;
    endDateErMsg: string;
    vacationDaysExist: boolean;
    newVacationForm: FormGroup;
    minVacationDate: Date;
    maxVacationDate: Date;
    submitAttempt: boolean;
    isBeginDateIncorrect = false;
    isEndDateIncorrect = false;
    selectedUser = new User();
    users: Array<User> = new Array<User>();
    loading = false;
    queryModel: VacationQueryModel;
    subject: Subject<any>;
    subscription: Subscription;
    isWaitingExist: boolean = false;
    isAdmin: boolean;

    spinnerConfig: ISpinnerConfig = {
            placement: SPINNER_PLACEMENT.block_ui,
            animation: SPINNER_ANIMATIONS.spin_3,
            size: "3rem",
            color: "#1574b3"
        };

    @Input('userId') userId: number;

    constructor(
        private route: ActivatedRoute,
        private userStorageService: UserStorageService,
        private vacationService: VacationService,
        private dialog: MatDialog,
        private usersService: UsersService,
        private fBuilder: FormBuilder,
        private location: Location,
        private router: Router
    ) {
        this.isAddVisible = false;
            
    };
    
    ngOnInit () {
        this.isAdmin = this.userStorageService.hasPermission(["Admin", "Super_Admin"]);
        this.subject = new Subject<any>();
        this.id = this.userId;
        this.queryModel = new VacationQueryModel();
        if (this.id != null) this.queryModel.UserId = this.id;
        this.queryModel.Take = 10;
        this.queryModel.Skip = 0;
        this.loading = true;
        this.vacationService.get(this.queryModel).subscribe(response => {
            this.vacations = response.Result;
            this.subject.next({from: "component", response: response});
            this.vacations.forEach((value, index, array) => {
                value.DateBegin = new Date(Date.parse(value.DateBegin.toString()));
                value.DateEnd = new Date(Date.parse(value.DateEnd.toString()));
                value.CreatedDate = new Date(Date.parse(value.CreatedDate.toString()));
                value.Status = value.CreatedDate.setTime(value.CreatedDate.getTime() + 48*60*60*1000) < Date.now() ? "Confirmed" : value.Status;
                if (value.Status == "IsWaiting") this.isWaitingExist = true;
            });

            this.vacations.sort((x, y) => {
                if (x.DateBegin > y.DateBegin)
                    return -1;
                if (x.DateBegin < y.DateBegin)
                    return 1;
                return 0;
            });
            this.loading = false;
        });

        this.subscription = this.subject.asObservable().subscribe(response => {
            if (response.from == "tablebuttons") {
                this.queryModel = response.response as VacationQueryModel;
                if (this.id != null) this.queryModel.UserId = this.id;
                this.loading = true;
                this.vacationService.get(this.queryModel).subscribe(response => {
                    this.vacations = response.Result;
                    this.vacations.forEach((value, index, array) => {
                        value.DateBegin = new Date(Date.parse(value.DateBegin.toString()));
                        value.DateEnd = new Date(Date.parse(value.DateEnd.toString()));
                        value.CreatedDate = new Date(Date.parse(value.CreatedDate.toString()));
                        value.Status = value.CreatedDate.setTime(value.CreatedDate.getTime() + 48*60*60*1000) < Date.now() ? "Confirmed" : value.Status;
                    });
    
                    this.vacations.sort((x, y) => {
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

        this.usersService.get(new UserQueryModel()).subscribe(response => {
            this.users = response.Result;
        });
        
    this.initDates();
    this.initForm();
    }

    initForm() {
        this.newVacationForm = this.fBuilder.group({
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
        this.minVacationDate = new Date(new Date().getFullYear(), 0, 1);//Start of the year
        this.minVacationDate.setFullYear(this.minVacationDate.getFullYear() - 1);
        this.maxVacationDate = new Date(new Date().getFullYear(), 11, 31);//End of the year
        this.maxVacationDate.setFullYear(this.maxVacationDate.getFullYear() + 1);
    }

    private delete(id, index) {
        this.vacationService.delete(id).subscribe((result) => {
            this.usersService.updateVacDays(this.vacations[index].CountDays*(-1));
            if (this.id != null) this.queryModel.UserId = this.id;
            this.queryModel.Take = 10;
            this.queryModel.Skip = 0;
            this.loading = true;
            this.vacationService.get(this.queryModel).subscribe(response => {
                this.vacations = response.Result;
                this.subject.next({from: "component", response: response});
                this.vacations.forEach((value, index, array) => {
                    value.DateBegin = new Date(Date.parse(value.DateBegin.toString()));
                    value.DateEnd = new Date(Date.parse(value.DateEnd.toString()));
                    value.CreatedDate = new Date(Date.parse(value.CreatedDate.toString()));
                    value.Status = value.CreatedDate.setTime(value.CreatedDate.getTime() + 48*60*60*1000) < Date.now() ? "Confirmed" : value.Status;
                    if (value.Status == "IsWaiting") this.isWaitingExist = true;
                });
    
                this.vacations.sort((x, y) => {
                    if (x.DateBegin > y.DateBegin)
                        return -1;
                    if (x.DateBegin < y.DateBegin)
                        return 1;
                    return 0;
                });
                this.loading = false;
            })
            this.status = "Deleted";
        })
    }

    confirmDeleteDialog(id, index) {

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

    public add(newVacation: Vacation) {
        if (this.newVacationForm.valid && !this.isBeginDateIncorrect && !this.isEndDateIncorrect) {
            this.submitAttempt = false;
            newVacation.DateBegin = new Date(Date.parse(newVacation.DateBegin.toString()));
            newVacation.DateBegin.setMinutes(newVacation.DateBegin.getMinutes() - newVacation.DateBegin.getTimezoneOffset());
            newVacation.DateEnd = new Date(Date.parse(newVacation.DateEnd.toString()));
            newVacation.DateEnd.setMinutes(newVacation.DateEnd.getMinutes() - newVacation.DateEnd.getTimezoneOffset());
            newVacation.CreatedDate = new Date();
            newVacation.CreatedDate.setMinutes(newVacation.CreatedDate.getMinutes() - newVacation.CreatedDate.getTimezoneOffset());
            newVacation.UserProfileId = (this.id != null && this.id != 0  && this.id != undefined) ? this.id : newVacation.UserProfileId;
            newVacation.Status = "IsWaiting";
            this.vacationService.create(newVacation).subscribe((result) => {
                this.newVacation = result;
                if (this.newVacation.Id != 0) {
                    this.usersService.updateVacDays(this.newVacation.CountDays);
                    this.queryModel.UserId = this.id;
                    this.vacationService.get(this.queryModel).subscribe(response => {
                    this.vacations = response.Result;
                    this.subject.next({from: "component", response: response});
                        this.vacations.forEach((value, index, array) => {
                            value.DateBegin = new Date(Date.parse(value.DateBegin.toString()));
                            value.DateEnd = new Date(Date.parse(value.DateEnd.toString()));
                            value.CreatedDate = new Date(Date.parse(value.CreatedDate.toString()));
                            value.Status = value.CreatedDate.setTime(value.CreatedDate.getTime() + 48*60*60*1000) < Date.now() ? "Confirmed" : value.Status;
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

   
    public calcVacationDays(newVacation: any) {
        let currentDate = new Date();
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        this.isBeginDateIncorrect = false;
        this.isEndDateIncorrect = false;
        if (newVacation.DateBegin && newVacation.DateEnd) {
            if (newVacation.DateEnd.getTime() < newVacation.DateBegin.getTime()) {
                this.isEndDateIncorrect = true;
            }
            else {
                this.newVacation.CountDays = ((newVacation.DateEnd.getTime() - newVacation.DateBegin.getTime()) / 86400000) + 1;
            }
        }
    }

    menuAddNew() {
        this.isAddVisible = true;
        this.newVacation = new Vacation();
    }

    goBack() {
        this.location.back();
    }

    public confirmVacation(vacation: Vacation) {
        this.isWaitingExist = false;
            vacation.DateBegin = new Date(Date.parse(vacation.DateBegin.toString()));
            vacation.DateBegin.setMinutes(vacation.DateBegin.getMinutes() - vacation.DateBegin.getTimezoneOffset());
            vacation.DateEnd = new Date(Date.parse(vacation.DateEnd.toString()));
            vacation.DateEnd.setMinutes(vacation.DateEnd.getMinutes() - vacation.DateEnd.getTimezoneOffset());
            vacation.Status = "Confirmed";
            this.vacationService.update(vacation).subscribe(response => {
                this.vacations.forEach((value, index, array) => {
                    value.Status = value.CreatedDate.setTime(value.CreatedDate.getTime() + 48*60*60*1000) < Date.now() ? "Confirmed" : value.Status;
                    if (value.Status == "IsWaiting") this.isWaitingExist = true;
                });
            });
    }

    public rejectVacation(vacation: Vacation) {
        this.isWaitingExist = false;
        vacation.DateBegin = new Date(Date.parse(vacation.DateBegin.toString()));
        vacation.DateBegin.setMinutes(vacation.DateBegin.getMinutes() - vacation.DateBegin.getTimezoneOffset());
        vacation.DateEnd = new Date(Date.parse(vacation.DateEnd.toString()));
        vacation.DateEnd.setMinutes(vacation.DateEnd.getMinutes() - vacation.DateEnd.getTimezoneOffset());
        vacation.Status = "Rejected";
        this.vacationService.update(vacation).subscribe(response => {
            this.vacations.forEach((value, index, array) => {
                value.Status = value.CreatedDate.setTime(value.CreatedDate.getTime() + 48*60*60*1000) < Date.now() ? "Confirmed" : value.Status;
                if (value.Status == "IsWaiting") this.isWaitingExist = true;
            });
        });
    }

    public goToUser(vacation: Vacation){
        this.router.navigateByUrl('/users/'+vacation.UserProfileId+'/info')
    }
}