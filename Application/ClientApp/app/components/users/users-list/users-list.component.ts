import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { UsersService } from '../../../services/users.service';
import { UserStorageService } from '../../../services/user-storage.service';
import { UserQueryModel } from '../../../models/query-models/user-query.model';
import { SPINNER_ANIMATIONS, SPINNER_PLACEMENT, ISpinnerConfig } from '@hardpool/ngx-spinner';
import { Subject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { UsersShortInfoComponent } from '../users-short-info/users-short-info.component';
import { UserFeedbackCreateComponent } from '../user-feedback-create/user-feedback-create.component';
import { UserFeedbacksComponent } from '../user-feedbacks/user-feedbacks.component';
import { SPINNER_CONFIG } from '../../../constants/constants';


@Component({
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css']
})

export class UsersListComponent implements OnInit {
    users: Array<User> = new Array<User>();
    status: string;
    loading: boolean;
    queryModel: UserQueryModel;
    subject: Subject<any>;
    subscription: Subscription;

    testlist = [1,2,3,4,5,6,7,8,9];

    spinnerConfig: ISpinnerConfig = SPINNER_CONFIG;

    constructor(
        private usersService: UsersService,
        private location: Location,
        private router: Router,
        private userStorageService: UserStorageService,
        private dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.subject = new Subject<any>();
        this.queryModel = new UserQueryModel();
        this.queryModel.Take =  9;
        this.loading = true;
        this.usersService.get(this.queryModel).subscribe(response => {
            this.users = response.Result;
            this.subject.next({from: "component", response: response});
            this.loading = false;
        })

        this.subscription = this.subject.asObservable().subscribe(response => {
            if (response.from == "tablebuttons") {
                this.queryModel = response.response as UserQueryModel;
                this.loading = true;
                this.usersService.get(this.queryModel).subscribe(response => {
                this.users = response.Result;
                this.loading = false;
            })
            }
        });


    }


    public delete(index: number, indexOnArray: number) {
        this.usersService.delete(index).subscribe((result) => {
            this.users.splice(indexOnArray, 1);
            this.status = "Deleted";
            this.location.back();
        })
    }

    public dateFormatter(params) {
        if (params.value)
            return new Date(params.value).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    }

    public goBack() {
        this.location.back();
    }

    public showInfo(user: User) {
        const dialogRef = this.dialog.open(UsersShortInfoComponent, {
            width: '1050px',
            data: {user: user}
          });

          dialogRef.afterClosed().subscribe(result => {
            });
    }

    public viewProfile(user: User) {
        this.router.navigateByUrl('/users/'+user.UserProfileId+'/info')
    }

    public getSubStr(str: string) {
        if (str != null) {
            if (str.length > 40)
            return str.substr(0, 40) + "..."
            else return str;
        }
        else 
        return "";
    }

    public IsToltiptextVisible(user: User) {
        return user.Wishes != null ? user.Wishes.length >= 40 : false;
    }

    public addFeedback(userId: number) {
        let currentUserId: number = this.userStorageService.getId();
        let dialogRes = this.dialog.open(UserFeedbackCreateComponent, {
            width: '1050px',
            data: { authorId: currentUserId, userId: userId }
        });
    }

    public showFeedbacks(userId: number): void {
        let dialogRes = this.dialog.open(UserFeedbacksComponent, {
            width: '1050px',
            data: { userId: userId }
        });
    }
}