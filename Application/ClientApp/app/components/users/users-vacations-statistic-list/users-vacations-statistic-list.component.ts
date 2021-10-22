import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserStorageService } from '../../../services/user-storage.service';

import { ListVacation } from '../../../models/list-vacation.model';
import { UsersService } from '../../../services/users.service';
import { SPINNER_ANIMATIONS, SPINNER_PLACEMENT, ISpinnerConfig } from '@hardpool/ngx-spinner';
import { Subscription, Subject } from 'rxjs';
import { OvertimeQueryModel } from '../../../models/query-models/overtime-query.model';
import { ListVacationQueryModel } from '../../../models/query-models/list-vacation-query.model';

@Component({
    selector: 'user-vacations-statistic',
    templateUrl: './users-vacations-statistic-list.component.html',
    styleUrls: ['./users-vacations-statistic-list.component.css']
})

export class UsersVacationsStatisticListComponent implements OnInit  {
    listVacation: Array<ListVacation>;

    status: string;
    isAdmin: boolean;
    isUser: boolean;
    isAddVisible: boolean;
    id: number;
    loading = false;
    subscription: Subscription;
    vacationSubscription: Subscription;
    queryModel: ListVacationQueryModel;
    subject: Subject<any>;

    spinnerConfig: ISpinnerConfig;

    constructor(
        private usersService: UsersService,
        private userStorageService: UserStorageService,
        private route: ActivatedRoute,

    ) {
       
    }

    @Input('userId') userId: number;

    ngOnInit(): void {
        this.spinnerConfig = {
            placement: SPINNER_PLACEMENT.block_ui,
            animation: SPINNER_ANIMATIONS.spin_3,
            size: "3rem",
            color: "#1574b3"
        };
        this.loading = true;
        this.isAddVisible = false;
        this.id = this.userId;
        this.subject = new Subject();
        this.queryModel = new ListVacationQueryModel();
        this.queryModel.userId = this.id;
        this.queryModel.Take =  10;
            this.usersService.getVacationDays(this.queryModel).subscribe((response) => { 
                this.listVacation = response.Result;
                this.subject.next(response);
                this.loading = false;
            });

            this.subscription = this.subject.asObservable().subscribe(response => {
                this.loading = true;
                this.isAddVisible = false;
                this.id = this.userId;
                this.queryModel = new ListVacationQueryModel();
                this.queryModel.userId = this.id;
                this.queryModel.Take =  10;
                    this.usersService.getVacationDays(this.queryModel).subscribe((response) => { 
                        this.listVacation = response.Result;
                        this.loading = false;
                    });
            });

        this.vacationSubscription = this.usersService.getVacDays().subscribe(response => { 
            this.loading = true;
            this.usersService.getVacationDays(this.queryModel).subscribe((responce) => { 
                this.listVacation = responce.Result;
                this.loading = false;
            });
        });
    }
} 